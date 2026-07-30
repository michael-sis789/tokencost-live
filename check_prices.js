const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET_FILES = ["index.html", path.join("public", "index.html")].filter(file => fs.existsSync(path.join(ROOT, file)));
const CONTENTS_URL = "https://api.github.com/repos/simonw/llm-prices/contents/data";
const RAW_BASE = "https://raw.githubusercontent.com/simonw/llm-prices/main/data/";
const USER_AGENT = "tokencost-price-sync/1.0";
const FIELDS = ["id", "name", "input", "output", "input_cached"];

function readFile(file) {
  return fs.readFileSync(path.join(ROOT, file), "utf8");
}

function writeFile(file, contents) {
  fs.writeFileSync(path.join(ROOT, file), contents);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "user-agent": USER_AGENT,
      accept: "application/vnd.github+json"
    }
  });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

function extractFallbackBlock(html) {
  const match = html.match(/\/\* PRICE_FALLBACK_START \*\/[\s\S]*?\/\* PRICE_FALLBACK_END \*\//);
  if (!match) {
    throw new Error("Could not find PRICE_FALLBACK block in index.html");
  }
  return match[0];
}

function parseFallbackData(block) {
  const match = block.match(/const fallbackData = (\[[\s\S]*?\]);\s*const fallbackSyncDate = "([^"]+)";/);
  if (!match) {
    throw new Error("Could not parse fallbackData block");
  }
  const fallbackData = Function(`"use strict"; return (${match[1]});`)();
  const fallbackSyncDate = match[2];
  return { fallbackData, fallbackSyncDate };
}

function normalizePrice(price = {}) {
  return {
    input: Number(price.input ?? 0),
    output: Number(price.output ?? 0),
    input_cached: price.input_cached === null || price.input_cached === undefined ? null : Number(price.input_cached)
  };
}

function latestPrice(history = []) {
  if (!Array.isArray(history)) return {};
  return history.find(entry => entry.to_date === null || entry.to_date === undefined) || history[history.length - 1] || {};
}

function normalizeLiveDataset(filename, dataset) {
  const vendor = filename.replace(/\.json$/, "");
  const models = Array.isArray(dataset?.models) ? dataset.models : [];
  return {
    vendor,
    models: models.map(model => {
      const price = model.price_history ? latestPrice(model.price_history) : normalizePrice(model);
      return {
        id: String(model.id || ""),
        name: String(model.name || model.id || ""),
        input: Number(price.input ?? model.input ?? 0),
        output: Number(price.output ?? model.output ?? 0),
        input_cached: price.input_cached === null || price.input_cached === undefined
          ? (model.input_cached === undefined ? null : model.input_cached)
          : Number(price.input_cached)
      };
    }).filter(model => model.id)
  };
}

function canonicalSignature(data) {
  return data.flatMap(vendor => vendor.models.map(model => ({
    vendor: vendor.vendor,
    ...FIELDS.reduce((acc, field) => {
      acc[field] = model[field] ?? null;
      return acc;
    }, {})
  }))).sort((a, b) => a.vendor.localeCompare(b.vendor) || a.id.localeCompare(b.id));
}

function sameSignature(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function buildReplacementBlock(data, date) {
  return [
    "      /* PRICE_FALLBACK_START */",
    `      const fallbackData = ${JSON.stringify(data, null, 2)};`,
    `      const fallbackSyncDate = "${date}";`,
    "      /* PRICE_FALLBACK_END */"
  ].join("\n");
}

async function loadLiveData() {
  const files = await fetchJson(CONTENTS_URL);
  const vendorFiles = files
    .filter(file => file.type === "file" && /\.json$/i.test(file.name))
    .map(file => file.name)
    .sort();

  const datasets = [];
  for (const file of vendorFiles) {
    const dataset = await fetchJson(`${RAW_BASE}${file}`);
    datasets.push(normalizeLiveDataset(file, dataset));
  }
  return datasets;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const liveData = await loadLiveData();
  const liveSignature = canonicalSignature(liveData);

  let changed = false;
  for (const file of TARGET_FILES) {
    const fullPath = path.join(ROOT, file);
    const html = readFile(file);
    const block = extractFallbackBlock(html);
    const { fallbackData } = parseFallbackData(block);
    const fallbackSignature = canonicalSignature(fallbackData);

    if (!sameSignature(liveSignature, fallbackSignature)) {
      const nextHtml = html.replace(block, buildReplacementBlock(liveData, today));
      writeFile(file, nextHtml);
      changed = true;
    }
  }

  if (!changed) {
    console.log("No price updates today");
    return;
  }

  console.log(`Updated ${TARGET_FILES.length} file(s) with live pricing data for ${today}`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
