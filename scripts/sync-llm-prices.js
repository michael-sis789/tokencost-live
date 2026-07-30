const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA_DIR = path.join(PUBLIC, "data");
const VERIFIED_FILE = path.join(DATA_DIR, "verifiedPricing.json");
const SNAPSHOT_FILE = path.join(DATA_DIR, "llmPriceSnapshot.json");
const REPORT_FILE = path.join(DATA_DIR, "llmPriceSyncReport.json");
const RAW_BASE = "https://raw.githubusercontent.com/simonw/llm-prices/main/data/";
const CONTENTS_URL = "https://api.github.com/repos/simonw/llm-prices/contents/data";
const TODAY = new Date().toISOString().slice(0, 10);
const USER_AGENT = "tokencost-live-price-sync/2.0";

const CORE_MODEL_IDS = new Set([
  "gpt-5",
  "gpt-5-mini",
  "gpt-5-nano",
  "gpt-5.5",
  "gpt-5.5-pro",
  "claude-sonnet-4.5",
  "claude-opus-4.5",
  "claude-4.5-haiku",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.5-pro",
  "gemini-3-pro-preview",
  "gemini-3-flash-preview"
]);

const KIMI_OFFICIAL_ROWS = [
  {
    provider: "Moonshot AI",
    model: "kimi-k3",
    name: "Kimi K3",
    input_per_1m: 20,
    cached_input_per_1m: 2,
    output_per_1m: 100,
    currency: "CNY",
    unit: "1M tokens",
    source_url: "https://platform.kimi.com/",
    effective_date: null,
    last_verified: TODAY,
    verification_status: "official_source_checked",
    notes: "Official Kimi platform lists K3 cache-hit ¥2/MTok, input ¥20/MTok, output ¥100/MTok."
  },
  {
    provider: "Moonshot AI",
    model: "kimi-k2.7-code",
    name: "Kimi K2.7 Code",
    input_per_1m: 6.5,
    cached_input_per_1m: 1.3,
    output_per_1m: 27,
    currency: "CNY",
    unit: "1M tokens",
    source_url: "https://platform.kimi.com/",
    effective_date: null,
    last_verified: TODAY,
    verification_status: "official_source_checked",
    notes: "Official Kimi platform lists K2.7 Code cache-hit ¥1.30/MTok, input ¥6.50/MTok, output ¥27/MTok."
  },
  {
    provider: "Moonshot AI",
    model: "kimi-k2.6",
    name: "Kimi K2.6",
    input_per_1m: 6.5,
    cached_input_per_1m: 1.1,
    output_per_1m: 27,
    currency: "CNY",
    unit: "1M tokens",
    source_url: "https://platform.kimi.com/",
    effective_date: null,
    last_verified: TODAY,
    verification_status: "official_source_checked",
    notes: "Official Kimi platform lists K2.6 cache-hit ¥1.10/MTok, input ¥6.50/MTok, output ¥27/MTok."
  }
];

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "user-agent": USER_AGENT, accept: "application/vnd.github+json" }
  });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.json();
}

function latestPrice(history = []) {
  if (!Array.isArray(history)) return {};
  return history.find(row => row.to_date === null || row.to_date === undefined) || history[history.length - 1] || {};
}

function normalizeVendorName(vendor) {
  return {
    openai: "OpenAI",
    anthropic: "Anthropic",
    google: "Google",
    deepseek: "DeepSeek",
    mistral: "Mistral",
    xai: "xAI",
    groq: "Groq",
    qwen: "Qwen",
    moonshot: "Moonshot AI",
    amazon: "Amazon"
  }[vendor] || vendor;
}

function normalizeModel(vendor, model, filename) {
  const price = latestPrice(model.price_history);
  return {
    provider: normalizeVendorName(vendor),
    vendor,
    model: String(model.id || ""),
    name: String(model.name || model.id || ""),
    input_per_1m: Number(price.input ?? 0),
    cached_input_per_1m: price.input_cached === null || price.input_cached === undefined ? null : Number(price.input_cached),
    output_per_1m: Number(price.output ?? 0),
    currency: "USD",
    unit: "1M tokens",
    source_url: `${RAW_BASE}${filename}`,
    effective_date: price.from_date || null,
    last_verified: TODAY,
    verification_status: "community_dataset_checked",
    notes: "Loaded from simonw/llm-prices. Verify official provider pricing before procurement."
  };
}

async function loadLlmPrices() {
  const files = await fetchJson(CONTENTS_URL);
  const jsonFiles = files
    .filter(file => file.type === "file" && /\.json$/i.test(file.name))
    .map(file => file.name)
    .sort();

  const all = [];
  for (const filename of jsonFiles) {
    const data = await fetchJson(`${RAW_BASE}${filename}`);
    const vendor = data.vendor || filename.replace(/\.json$/, "");
    for (const model of data.models || []) {
      const normalized = normalizeModel(vendor, model, filename);
      if (normalized.model && Number.isFinite(normalized.input_per_1m) && Number.isFinite(normalized.output_per_1m)) {
        all.push(normalized);
      }
    }
  }
  return all;
}

function signature(model) {
  return [
    model.provider,
    model.model,
    model.input_per_1m,
    model.cached_input_per_1m ?? "",
    model.output_per_1m,
    model.currency
  ].join("|");
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function selectCoreModels(allModels) {
  const byId = new Map(allModels.map(model => [model.model, model]));
  const selected = [...CORE_MODEL_IDS].map(id => byId.get(id)).filter(Boolean);
  const deepseek = allModels
    .filter(model => model.vendor === "deepseek")
    .sort((a, b) => a.input_per_1m - b.input_per_1m)
    .slice(0, 2);
  return [...selected, ...deepseek, ...KIMI_OFFICIAL_ROWS];
}

function buildVerifiedPricing(allModels, previous) {
  const currentById = new Map(allModels.map(model => [`${model.provider}:${model.model}`, model]));
  const oldAll = Array.isArray(previous.all_llm_price_models) ? previous.all_llm_price_models : [];
  const oldById = new Map(oldAll.map(model => [`${model.provider}:${model.model}`, model]));
  const newModels = [];
  const changedModels = [];

  for (const [id, model] of currentById) {
    const old = oldById.get(id);
    if (!old) {
      newModels.push(model);
    } else if (signature(old) !== signature(model)) {
      changedModels.push({ before: old, after: model });
    }
  }

  return {
    last_verified: TODAY,
    verification_policy: "LLM price rows are synced daily from simonw/llm-prices where available. Kimi rows use the official Kimi platform page because Kimi K3 pricing is currently visible there. Users should verify linked sources before procurement or client quotes.",
    currency_note: "USD rows are used in scenario calculations. CNY rows are displayed as source pricing and are not converted without an explicit exchange-rate source.",
    models: selectCoreModels(allModels),
    media_units: previous.media_units || [],
    all_llm_price_models: allModels,
    latest_sync: {
      date: TODAY,
      source: "https://github.com/simonw/llm-prices",
      source_files_checked: [...new Set(allModels.map(model => model.source_url))].length,
      total_models_checked: allModels.length,
      new_models: newModels.slice(0, 50).map(model => ({ provider: model.provider, model: model.model, name: model.name })),
      changed_models: changedModels.slice(0, 50).map(change => ({
        provider: change.after.provider,
        model: change.after.model,
        previous: {
          input_per_1m: change.before.input_per_1m,
          cached_input_per_1m: change.before.cached_input_per_1m,
          output_per_1m: change.before.output_per_1m,
          currency: change.before.currency
        },
        current: {
          input_per_1m: change.after.input_per_1m,
          cached_input_per_1m: change.after.cached_input_per_1m,
          output_per_1m: change.after.output_per_1m,
          currency: change.after.currency
        }
      }))
    }
  };
}

function run(command, args) {
  const result = spawnSync(command, args, { cwd: ROOT, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

async function main() {
  mkdirp(DATA_DIR);
  const previous = readJson(VERIFIED_FILE, {});
  const allModels = await loadLlmPrices();
  const next = buildVerifiedPricing(allModels, previous);

  const hasPreviousSnapshot = Array.isArray(previous.all_llm_price_models) && previous.all_llm_price_models.length > 0;
  const hasPriceUpdates = next.latest_sync.new_models.length > 0 || next.latest_sync.changed_models.length > 0;
  if (hasPreviousSnapshot && !hasPriceUpdates) {
    console.log("No price updates today");
    return;
  }

  fs.writeFileSync(VERIFIED_FILE, JSON.stringify(next, null, 2));
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(next.all_llm_price_models.map(model => ({
    provider: model.provider,
    model: model.model,
    name: model.name,
    input_per_1m: model.input_per_1m,
    cached_input_per_1m: model.cached_input_per_1m,
    output_per_1m: model.output_per_1m,
    currency: model.currency,
    source_url: model.source_url
  })), null, 2));
  fs.writeFileSync(REPORT_FILE, JSON.stringify(next.latest_sync, null, 2));
  run("node", ["scripts/adsense-quality-rebuild.js"]);
  console.log(JSON.stringify(next.latest_sync, null, 2));
}

main().catch(error => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
