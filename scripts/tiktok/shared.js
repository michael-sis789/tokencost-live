const fs = require("fs");
const path = require("path");
const axios = require("axios");

const API_BASE = "https://open.tiktokapis.com";
const TOKEN_DIR = path.resolve(process.cwd(), ".tiktok");
const TOKEN_PATH = path.join(TOKEN_DIR, "tokens.json");
const MAX_CHUNK_SIZE = 64 * 1024 * 1024;
const DEFAULT_CHUNK_SIZE = 32 * 1024 * 1024;

function requireConfig() {
  const config = {
    clientKey: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    redirectUri: process.env.TIKTOK_REDIRECT_URI || "http://127.0.0.1:8787/callback",
  };

  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(`Missing TikTok configuration: ${missing.join(", ")}`);
  }
  return config;
}

function saveTokens(payload) {
  fs.mkdirSync(TOKEN_DIR, { recursive: true, mode: 0o700 });
  const now = Date.now();
  const tokens = {
    ...payload,
    access_expires_at: now + Number(payload.expires_in || 0) * 1000,
    refresh_expires_at: now + Number(payload.refresh_expires_in || 0) * 1000,
  };
  fs.writeFileSync(TOKEN_PATH, `${JSON.stringify(tokens, null, 2)}\n`, { mode: 0o600 });
  fs.chmodSync(TOKEN_PATH, 0o600);
  return tokens;
}

function loadTokens() {
  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error("TikTok is not authorized. Run `npm run tiktok:auth` first.");
  }
  return JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
}

async function exchangeCode(code, codeVerifier) {
  const config = requireConfig();
  if (!codeVerifier) throw new Error("Missing PKCE code verifier.");
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
    code_verifier: codeVerifier,
  });
  const { data } = await axios.post(`${API_BASE}/v2/oauth/token/`, body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (data.error || !data.access_token) {
    throw new Error(data.error_description || data.error || "TikTok token exchange failed.");
  }
  return saveTokens(data);
}

async function getAccessToken() {
  let tokens = loadTokens();
  if (tokens.access_expires_at > Date.now() + 5 * 60 * 1000) {
    return tokens.access_token;
  }

  const config = requireConfig();
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    grant_type: "refresh_token",
    refresh_token: tokens.refresh_token,
  });
  const { data } = await axios.post(`${API_BASE}/v2/oauth/token/`, body.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (data.error || !data.access_token) {
    throw new Error(data.error_description || data.error || "TikTok token refresh failed.");
  }
  tokens = saveTokens(data);
  return tokens.access_token;
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index];
    if (!item.startsWith("--")) continue;
    const key = item.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
}

function resolveChapterFile(chapter, directory = path.resolve("milerepa/final_mp4")) {
  const number = Number(chapter);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error("Chapter must be a positive integer.");
  }
  const prefix = `Milerepa_Chapter_${String(number).padStart(2, "0")}`;
  const match = fs.readdirSync(directory).find((name) => name.startsWith(prefix) && name.endsWith(".mp4"));
  if (!match) throw new Error(`No ready MP4 found for Chapter ${number}.`);
  return path.join(directory, match);
}

function captionForChapter(chapter) {
  return `密勒日巴尊者传 第${Number(chapter)}集｜雪山修行与觉悟之路 #密勒日巴 #佛法 #修行 #智慧`;
}

function makeChunkPlan(size) {
  if (!Number.isInteger(size) || size <= 0) throw new Error("Video size must be positive.");
  if (size <= MAX_CHUNK_SIZE) {
    return { chunkSize: size, chunks: [{ start: 0, end: size - 1, length: size }] };
  }

  const chunkSize = DEFAULT_CHUNK_SIZE;
  const totalChunkCount = Math.floor(size / chunkSize);
  const chunks = [];
  for (let index = 0; index < totalChunkCount; index += 1) {
    const start = index * chunkSize;
    const isLast = index === totalChunkCount - 1;
    const end = isLast ? size - 1 : start + chunkSize - 1;
    chunks.push({ start, end, length: end - start + 1 });
  }
  return { chunkSize, chunks };
}

async function initializeDraftUpload(filePath, accessToken) {
  const size = fs.statSync(filePath).size;
  const plan = makeChunkPlan(size);
  const { data } = await axios.post(
    `${API_BASE}/v2/post/publish/inbox/video/init/`,
    {
      source_info: {
        source: "FILE_UPLOAD",
        video_size: size,
        chunk_size: plan.chunkSize,
        total_chunk_count: plan.chunks.length,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  if (data.error?.code !== "ok" || !data.data?.upload_url) {
    throw new Error(data.error?.message || data.error?.code || "TikTok upload initialization failed.");
  }
  return { ...data.data, plan, size };
}

async function uploadChunks(filePath, uploadUrl, size, plan, onProgress = () => {}) {
  for (let index = 0; index < plan.chunks.length; index += 1) {
    const chunk = plan.chunks[index];
    const response = await axios.put(uploadUrl, fs.createReadStream(filePath, {
      start: chunk.start,
      end: chunk.end,
    }), {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": chunk.length,
        "Content-Range": `bytes ${chunk.start}-${chunk.end}/${size}`,
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      validateStatus: (status) => status === 201 || status === 206,
    });
    onProgress(index + 1, plan.chunks.length, response.status);
  }
}

async function fetchPublishStatus(publishId, accessToken) {
  const { data } = await axios.post(
    `${API_BASE}/v2/post/publish/status/fetch/`,
    { publish_id: publishId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json; charset=UTF-8",
      },
    }
  );
  if (data.error?.code !== "ok") {
    throw new Error(data.error?.message || data.error?.code || "TikTok status request failed.");
  }
  return data.data;
}

module.exports = {
  TOKEN_PATH,
  captionForChapter,
  exchangeCode,
  fetchPublishStatus,
  getAccessToken,
  initializeDraftUpload,
  makeChunkPlan,
  parseArgs,
  requireConfig,
  resolveChapterFile,
  uploadChunks,
};
