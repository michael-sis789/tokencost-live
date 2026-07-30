const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const today = "2026-07-08";
const site = "https://tokencost.live";

const nav = [
  ["/", "Calculator"],
  ["/tools/", "Tools"],
  ["/guides/", "Guides"],
  ["/compare/", "Compare"],
  ["/methodology/", "Methodology"],
  ["/about/", "About"],
  ["/contact/", "Contact"]
];

const coreLinks = {
  calculators: [
    ["/", "AI agent cost calculator"],
    ["/music-cost-calculator/", "AI music cost calculator"],
    ["/ai-video-cost-calculator/", "AI video cost calculator"],
    ["/ai-voice-cost-calculator/", "AI voice cost calculator"],
    ["/ai-saas-profit-calculator/", "AI SaaS profit calculator"],
    ["/creator-profit-calculator/", "Creator profit calculator"]
  ],
  guides: [
    ["/guides/how-ai-token-billing-works/", "How AI token billing works"],
    ["/guides/how-to-reduce-ai-api-costs/", "How to reduce AI API costs"],
    ["/guides/beginner-guide-to-ai-model-pricing/", "Beginner guide to AI model pricing"],
    ["/guides/ai-saas-profit-calculation/", "AI SaaS profit calculation"]
  ],
  comparisons: [
    ["/compare/gpt-vs-claude/", "GPT vs Claude"],
    ["/compare/gpt-vs-gemini/", "GPT vs Gemini"],
    ["/compare/claude-vs-gemini/", "Claude vs Gemini"]
  ]
};

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[ch]));
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function words(text) {
  return text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function listLinks(items) {
  return items.map(([href, label]) => `<a href="${href}" class="inline-flex rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-100 hover:border-emerald-400/50">${label}</a>`).join("");
}

function shell({ title, description, canonical, type = "website", body, schema = [], date = today }) {
  const jsonLd = schema.length ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="Tokencost">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site}/og-image.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#07111f">
  <link rel="icon" href="/og-image.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://www.googletagmanager.com">
  <link rel="preconnect" href="https://pagead2.googlesyndication.com">
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-D7BLVRRXDS"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-D7BLVRRXDS');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7206423892750616" crossorigin="anonymous"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { ink: "#07111f" }, boxShadow: { glow: "0 0 0 1px rgba(99,102,241,.16), 0 24px 80px rgba(15,23,42,.55)" } } } };
  </script>
  ${jsonLd}
  <style>
    * { box-sizing: border-box; }
    body { background: radial-gradient(circle at top left, rgba(16,185,129,.16), transparent 26rem), radial-gradient(circle at top right, rgba(99,102,241,.18), transparent 28rem), #07111f; }
    .glass { background: linear-gradient(180deg, rgba(15,23,42,.88), rgba(15,23,42,.72)); border: 1px solid rgba(148,163,184,.18); }
    .article p { margin-top: .85rem; line-height: 1.8; color: rgb(203 213 225); }
    .article h2 { margin-top: 2rem; font-size: 1.45rem; line-height: 1.25; font-weight: 800; color: white; }
    .article h3 { margin-top: 1.35rem; font-size: 1.05rem; font-weight: 800; color: white; }
    .article ul, .article ol { margin-top: .85rem; padding-left: 1.25rem; color: rgb(203 213 225); line-height: 1.75; }
    .article li { margin-top: .35rem; }
    .article table { width: 100%; margin-top: 1rem; border-collapse: collapse; font-size: .92rem; }
    .article th, .article td { border-top: 1px solid rgba(148,163,184,.18); padding: .75rem; text-align: left; vertical-align: top; }
    .article th { color: rgb(226 232 240); background: rgba(15,23,42,.75); }
    .ad-slot { background: repeating-linear-gradient(135deg, rgba(15,23,42,.92), rgba(15,23,42,.92) 12px, rgba(30,41,59,.72) 12px, rgba(30,41,59,.72) 24px); border: 1px dashed rgba(148,163,184,.32); }
  </style>
</head>
<body class="min-h-screen text-slate-100 antialiased">
  <header class="border-b border-slate-800 bg-slate-950/70">
    <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <a href="/" class="text-lg font-extrabold tracking-tight text-white">Tokencost</a>
      <nav class="flex flex-wrap gap-2 text-sm font-semibold">${nav.map(([href, label]) => `<a class="rounded-md px-2.5 py-1.5 text-slate-300 hover:bg-slate-900 hover:text-white" href="${href}">${label}</a>`).join("")}</nav>
    </div>
  </header>
  <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    ${body}
  </main>
  <footer class="mt-10 border-t border-slate-800 bg-slate-950/70">
    <div class="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-slate-400 sm:px-6 md:grid-cols-3 lg:px-8">
      <div><div class="font-bold text-white">Tokencost</div><p class="mt-2 leading-6">Educational calculators and guides for AI pricing, API cost planning, creator workflows, and AI SaaS economics.</p></div>
      <div><div class="font-bold text-white">Trust</div><div class="mt-2 flex flex-col gap-1"><a href="/methodology/">Methodology</a><a href="/pricing-updates/">How pricing is updated</a><a href="/data-accuracy/">Data accuracy</a><a href="/editorial-policy/">Editorial policy</a></div></div>
      <div><div class="font-bold text-white">Legal</div><div class="mt-2 flex flex-col gap-1"><a href="/privacy-policy/">Privacy Policy</a><a href="/terms/">Terms of Use</a><a href="/disclaimer/">Disclaimer</a><a href="/contact/">Contact</a></div><p class="mt-3">Last updated ${date}</p></div>
    </div>
  </footer>
</body>
</html>`;
}

function hero(title, subtitle, kicker = "AI pricing resource") {
  return `<section class="glass rounded-lg p-5 shadow-glow">
    <div class="text-xs font-bold uppercase tracking-[0.25em] text-emerald-200">${kicker}</div>
    <h1 class="mt-2 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl">${title}</h1>
    <p class="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">${subtitle}</p>
  </section>`;
}

function linkPanel(title = "Related resources") {
  return `<section class="glass mt-5 rounded-lg p-5 shadow-glow">
    <h2 class="text-xl font-bold text-white">${title}</h2>
    <div class="mt-4 grid gap-4 lg:grid-cols-3">
      <div><h3 class="text-sm font-bold uppercase tracking-wide text-slate-400">Calculators</h3><div class="mt-3 flex flex-wrap gap-2">${listLinks(coreLinks.calculators.slice(0, 4))}</div></div>
      <div><h3 class="text-sm font-bold uppercase tracking-wide text-slate-400">Guides</h3><div class="mt-3 flex flex-wrap gap-2">${listLinks(coreLinks.guides.slice(0, 4))}</div></div>
      <div><h3 class="text-sm font-bold uppercase tracking-wide text-slate-400">Comparisons</h3><div class="mt-3 flex flex-wrap gap-2">${listLinks(coreLinks.comparisons)}</div></div>
    </div>
  </section>`;
}

const guideTopics = [
  ["how-ai-token-billing-works", "How AI Token Billing Works", "Learn how AI token billing works in practical terms, including input tokens, output tokens, context windows, caching, reasoning tokens, and monthly usage.", "token billing", ["input tokens", "output tokens", "context windows", "monthly calls"]],
  ["ai-token-cost-comparison", "AI Token Cost Comparison", "Compare token pricing across leading AI models and learn why input, output, context, caching, and workload shape the real bill.", "token comparison", ["input tokens", "output tokens", "cache pricing", "model mix"]],
  ["gemini-vs-chatgpt-cost", "Gemini vs ChatGPT Cost", "A practical guide for comparing Gemini and ChatGPT API costs for agents, search, content, and SaaS workflows.", "model comparison", ["long context", "chat workflows", "multimodal plans", "agent routing"]],
  ["claude-api-pricing-guide", "Claude API Pricing Guide", "Understand Claude pricing, long-context tradeoffs, prompt caching, and when premium reasoning quality can justify the cost.", "Claude pricing", ["Sonnet", "Opus", "long context", "quality-sensitive tasks"]],
  ["ai-saas-profit-calculation", "AI SaaS Profit Calculation", "Learn how to turn API cost assumptions into subscription pricing, break-even users, gross margin, and runway planning.", "AI SaaS", ["subscription price", "payment fees", "churn", "gross margin"]],
  ["music-video-ai-generation-cost", "Music and Video AI Generation Cost", "Estimate the real cost of AI music, AI video clips, retries, credits, and finished creator assets.", "creator economics", ["retry rate", "credits", "usable output", "RPM"]],
  ["how-to-estimate-api-usage", "How to Estimate API Usage", "A step-by-step method for forecasting API usage before launch, including user segments, calls per session, and traffic spikes.", "API planning", ["active users", "calls per session", "tokens per request", "growth scenarios"]],
  ["how-to-reduce-ai-api-costs", "How to Reduce AI API Costs", "Practical tactics for lowering AI spend without wrecking quality: routing, caching, summarization, batching, and observability.", "cost optimization", ["routing", "caching", "batching", "summaries"]],
  ["beginner-guide-to-ai-model-pricing", "Beginner Guide to AI Model Pricing", "A non-technical guide to tokens, model rates, API plans, context windows, and why output tokens often dominate cost.", "beginner guide", ["tokens", "context", "per million pricing", "monthly budget"]],
  ["openai-pricing-explained", "OpenAI Pricing Explained", "How to think about OpenAI model pricing for chat, agents, reasoning, embeddings, and production SaaS usage.", "OpenAI", ["GPT models", "reasoning tokens", "batch API", "embeddings"]],
  ["gemini-pricing-explained", "Gemini Pricing Explained", "How Gemini pricing works for long-context workloads, multimodal apps, search-like workflows, and cost-sensitive products.", "Gemini", ["long context", "flash models", "Pro models", "multimodal"]],
  ["gpt-5-api-pricing-guide", "GPT-5 API Pricing Guide", "How to prepare your AI product pricing model for new flagship API releases, including migration and fallback planning.", "future pricing", ["migration", "fallback models", "premium tiers", "testing"]],
  ["prompt-caching-explained", "Prompt Caching Explained", "Prompt caching can cut repeated context cost. Learn when it applies, how to estimate savings, and where teams overestimate it.", "prompt caching", ["static context", "cache hit rate", "system prompts", "retrieval"]],
  ["how-much-does-chatgpt-cost-businesses", "How Much Does ChatGPT Cost Businesses", "A business-oriented way to estimate ChatGPT and GPT API costs across employees, tools, automations, and customer features.", "business cost", ["employee tools", "automation", "support", "internal apps"]],
  ["ai-startup-cost-planning", "AI Startup Cost Planning", "A founder guide to API spend, hosting, storage, evals, model monitoring, and runway for AI startups.", "startup planning", ["runway", "hosting", "API budget", "observability"]],
  ["choosing-the-right-ai-model", "Choosing the Right AI Model", "Choose models by workload instead of hype: quality, latency, context, price, safety, and failure cost.", "model selection", ["quality", "latency", "context", "failure cost"]],
  ["compare-gpt-claude-gemini", "Compare GPT vs Claude vs Gemini", "A practical framework for comparing the three major model families across cost, quality, context, and product fit.", "model comparison", ["GPT", "Claude", "Gemini", "routing"]],
  ["openrouter-pricing", "OpenRouter Pricing", "How to evaluate OpenRouter-style routing costs and compare aggregator convenience with direct API pricing.", "routing platforms", ["aggregators", "routing", "provider choice", "fallback"]],
  ["deepseek-api-guide", "DeepSeek API Guide", "How to evaluate DeepSeek pricing for cost-sensitive apps, coding tools, agents, and high-volume inference.", "DeepSeek", ["low cost", "coding", "reasoning", "high volume"]],
  ["ai-inference-pricing", "How AI Inference Pricing Works", "Understand the economics behind inference pricing: compute, memory, context length, batching, and provider margins.", "inference economics", ["compute", "memory", "batching", "latency"]],
  ["best-ai-apis-for-startups", "Best AI APIs for Startups", "A startup-focused checklist for choosing AI APIs by cost, reliability, docs, ecosystem, and upgrade path.", "startup tools", ["reliability", "docs", "ecosystem", "cost"]],
  ["embedding-cost-calculator-guide", "Embedding Cost Calculator Guide", "How to estimate embedding cost for search, RAG, recommendations, and document ingestion pipelines.", "embeddings", ["RAG", "documents", "indexing", "refresh rate"]],
  ["fine-tuning-cost-guide", "Fine-Tuning Cost Guide", "When fine-tuning pays off, how to model training and inference cost, and common mistakes in dataset planning.", "fine tuning", ["training", "inference", "dataset", "quality"]],
  ["batch-api-cost-guide", "Batch API Cost Guide", "Batch APIs can reduce cost for offline jobs. Learn when to batch, what to measure, and where latency tradeoffs matter.", "batch API", ["offline jobs", "latency", "discounts", "throughput"]],
  ["gpu-vs-api-cost", "GPU vs API Cost", "Compare managed API pricing with renting GPUs, including utilization, engineering time, reliability, and scale.", "GPU economics", ["utilization", "ops", "reliability", "scale"]],
  ["cloud-cost-for-ai-apps", "Cloud Cost for AI Apps", "AI apps pay for more than tokens. Estimate hosting, databases, queues, storage, logs, and monitoring.", "cloud cost", ["hosting", "database", "storage", "logs"]],
  ["agent-loop-costs", "Agent Loop Costs", "Why multi-turn agents can become expensive quickly, and how to keep planning, tool calls, and retries under control.", "agent loops", ["turn count", "tool calls", "retries", "context growth"]],
  ["reasoning-token-costs", "Reasoning Token Costs", "Reasoning models can spend invisible tokens. Learn how to model that cost and when deeper reasoning is worth paying for.", "reasoning tokens", ["hidden tokens", "complex tasks", "quality", "budget"]],
  ["ai-creator-tool-budget", "AI Creator Tool Budget", "Plan a monthly creator stack for AI images, video, voice, music, editing tools, and promotion.", "creator budget", ["images", "video", "voice", "music"]],
  ["api-cost-monitoring", "API Cost Monitoring", "Set up cost alerts, per-feature tracking, and usage dashboards before API spend surprises you.", "monitoring", ["alerts", "dashboards", "per-user cost", "feature cost"]],
  ["pricing-ai-saas-plans", "Pricing AI SaaS Plans", "How to design subscription tiers when your gross margin depends on API calls, power users, and model choice.", "SaaS pricing", ["tiers", "usage limits", "power users", "margins"]]
];

function guideArticle(topic) {
  const [slug, title, description, category, terms] = topic;
  const canonical = `${site}/guides/${slug}/`;
  const paragraphs = `
    <p>${title} matters because AI pricing is rarely a single number. A product team usually pays for input tokens, output tokens, repeated attempts, hidden reasoning work, embeddings, tool calls, and monthly user behavior. The headline rate on a model page is useful, but it is not enough to price a real feature or a real business.</p>
    <p>The practical way to estimate cost is to model the workflow. Start with the user action, list each model call, estimate the context sent to the model, estimate the visible answer, then multiply by the number of calls per user and the number of active users. This gives you a cost shape that can be tested before launch.</p>
    <h2>How the calculation works</h2>
    <p>The base formula is simple: input tokens multiplied by the input price, plus output tokens multiplied by the output price. Real systems add more variables. Agent loops multiply the same workflow across turns. Prompt caching can lower repeated input cost. Reasoning models may bill for hidden thinking tokens. Creator tools add retries because not every generated image, track, voice, or clip is usable.</p>
    <p>For ${category}, pay close attention to ${terms.join(", ")}. These are the assumptions that usually move the monthly bill more than small model-rate differences. A cheaper model can become expensive if it needs more retries, and a premium model can be economical if it completes the task in fewer turns.</p>
    <h2>Step-by-step tutorial</h2>
    <ol>
      <li>Choose the workflow you want to price, such as support answers, document analysis, AI video generation, or a SaaS onboarding assistant.</li>
      <li>Estimate the average request size. Include system prompts, retrieved context, examples, and user input.</li>
      <li>Estimate the output size. Output tokens are often more expensive than input tokens, so do not ignore verbose responses.</li>
      <li>Add retries, regeneration attempts, or agent turns. Multi-step workflows are where simple calculators usually undercount.</li>
      <li>Multiply by monthly volume. A feature that is cheap once can become expensive at scale.</li>
      <li>Compare at least three models. Do not choose only by benchmark score; choose by cost for the exact workload.</li>
    </ol>
    <h2>Real-world example</h2>
    <p>Suppose a founder is building a support assistant. Each answer sends 8,000 input tokens because the app includes policy text and previous conversation. The assistant writes 800 output tokens. If the agent takes three turns, the input and output bill is not one call; it is a repeated workflow. If the static policy text can be cached, the cost can drop materially. If the workflow also classifies the ticket with a smaller model before sending only complex cases to a premium model, the monthly spend can fall again.</p>
    <p>A creator workflow has a different pattern. A music track or video clip may require three or four attempts before the creator keeps one. The cost per final output is therefore the cost of all attempts, not the cost of one generation. That is why Tokencost includes attempts, finished outputs, RPM, and break-even views in the creator calculators.</p>
    <h2>Common mistakes</h2>
    <ul>
      <li>Using only the model's input price and forgetting output tokens.</li>
      <li>Estimating one perfect request instead of retries and failed generations.</li>
      <li>Ignoring hidden reasoning tokens for complex tasks.</li>
      <li>Forgetting that long context grows across agent turns.</li>
      <li>Pricing the average user but not the power user who can consume most of the budget.</li>
      <li>Choosing a model by brand instead of by measured cost for the actual workflow.</li>
    </ul>
    <h2>Tips to reduce cost</h2>
    <p>Start with routing. Send simple classification, extraction, and formatting tasks to cheaper models. Reserve premium models for final answers, reasoning-heavy decisions, or user-visible work where quality has business value. Next, reduce context. Summarize history, trim repeated boilerplate, and cache static prompts where supported.</p>
    <p>Batch offline jobs when latency is not important. Track per-feature cost, not just total API spend. A team that can see cost per user, per workflow, and per model can make better product decisions than a team that only checks the monthly invoice after the fact.</p>
    <h2>Limitations</h2>
    <p>All calculators are estimates. Model pricing changes, providers may define billable tokens differently, and private enterprise plans can differ from public pricing. Treat Tokencost as a planning tool, then verify official pricing before committing budget or quoting a customer contract.</p>
    <h2>FAQ</h2>
    <details><summary>Is token cost the same as product cost?</summary><p>No. Product cost also includes hosting, database, storage, observability, payment fees, support, and engineering time.</p></details>
    <details><summary>Why do output tokens matter so much?</summary><p>Many providers charge more for output than input because generation is more compute-intensive than reading context.</p></details>
    <details><summary>How often should pricing assumptions be reviewed?</summary><p>Review them monthly, and any time you change models, prompts, routing, or product usage limits.</p></details>
    <details><summary>Should I always choose the cheapest model?</summary><p>No. Choose the model that produces the lowest cost for acceptable quality. Retries and support failures can erase cheap token pricing.</p></details>
    <details><summary>Can prompt caching help every app?</summary><p>Only when enough of the prompt is repeated and the model/provider supports cached input billing.</p></details>
    <details><summary>What is a good starting budget for an AI SaaS?</summary><p>Start with conservative volume assumptions, then model best, base, and worst cases. Include power users and abuse limits.</p></details>
    <details><summary>How does Tokencost get model prices?</summary><p>The main calculator loads community-maintained pricing data and displays a live sync badge. Fallback data is also refreshed through automation.</p></details>
    <details><summary>Can I use this for client quotes?</summary><p>Yes as a planning aid, but include a pricing-change disclaimer and verify official provider terms.</p></details>`;
  return shell({
    title: `${title} | Tokencost Guides`,
    description,
    canonical,
    type: "article",
    schema: [
      { "@context": "https://schema.org", "@type": "Article", headline: title, description, dateModified: today, author: { "@type": "Person", name: "Tokencost Editorial Team" }, mainEntityOfPage: canonical },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${site}/guides/` },
        { "@type": "ListItem", position: 3, name: title, item: canonical }
      ] }
    ],
    body: `${hero(title, description, "Guide")}
      <article class="article glass mt-5 rounded-lg p-5 shadow-glow">${paragraphs}</article>
      ${linkPanel()}`
  });
}

const comparisons = [
  ["gpt-vs-claude", "GPT vs Claude", "Compare GPT and Claude for API cost, quality, context handling, agent workflows, and SaaS use cases.", ["GPT", "Claude"]],
  ["gpt-vs-gemini", "GPT vs Gemini", "Compare GPT and Gemini pricing, context strengths, multimodal use cases, and routing strategy.", ["GPT", "Gemini"]],
  ["claude-vs-gemini", "Claude vs Gemini", "Compare Claude and Gemini for long-context work, writing quality, price sensitivity, and product fit.", ["Claude", "Gemini"]],
  ["gpt-vs-deepseek", "GPT vs DeepSeek", "Compare GPT and DeepSeek for cost-sensitive coding, reasoning, agent, and high-volume inference workflows.", ["GPT", "DeepSeek"]],
  ["gemini-vs-qwen", "Gemini vs Qwen", "Compare Gemini and Qwen for long-context, multilingual, China-facing, and budget-sensitive AI products.", ["Gemini", "Qwen"]],
  ["claude-vs-grok", "Claude vs Grok", "Compare Claude and Grok for writing, reasoning, real-time product ideas, and cost planning.", ["Claude", "Grok"]]
];

function comparisonPage(item) {
  const [slug, title, description, models] = item;
  const canonical = `${site}/compare/${slug}/`;
  const body = `${hero(title, description, "Comparison")}
  <article class="article glass mt-5 rounded-lg p-5 shadow-glow">
    <p>${title} is not a one-size-fits-all decision. The right model depends on the task, acceptable error rate, context size, latency target, and monthly budget. This page gives builders a practical way to compare the two options before they wire a model into production.</p>
    <h2>Pricing comparison</h2>
    <table><thead><tr><th>Area</th><th>${models[0]}</th><th>${models[1]}</th><th>How to decide</th></tr></thead><tbody>
      <tr><td>Input-heavy workflows</td><td>Good when prompt size is controlled.</td><td>Often competitive when context handling is strong.</td><td>Calculate repeated context and cache support.</td></tr>
      <tr><td>Output-heavy workflows</td><td>Watch output pricing and verbosity.</td><td>Watch quality versus answer length.</td><td>Cap response length and test summaries.</td></tr>
      <tr><td>Agent loops</td><td>Can perform well with routing and tool constraints.</td><td>Can perform well when fewer turns are needed.</td><td>Measure turns to success, not only token price.</td></tr>
      <tr><td>SaaS margins</td><td>Useful for premium visible features.</td><td>Useful for complex internal or user-visible work.</td><td>Put API cost into gross margin planning.</td></tr>
    </tbody></table>
    <h2>Feature comparison</h2>
    <p>Compare models by workload. For customer support, evaluate factual accuracy, refusal behavior, response style, and escalation rate. For coding, evaluate patch correctness and whether the model can follow repository conventions. For RAG, test retrieval noise, citation behavior, and whether the model can say when context is insufficient.</p>
    <h2>Speed and reliability</h2>
    <p>Latency can matter more than token price. A model that is slightly cheaper but slower may reduce conversion in interactive products. A model that is expensive but reliable may reduce support cost. Test with your own prompts, at peak hours, and with realistic output length.</p>
    <h2>Use cases</h2>
    <ul><li>Use a premium model when quality failures are expensive.</li><li>Use a cheaper model for classification, routing, extraction, and background jobs.</li><li>Use a mixed routing strategy when simple tasks outnumber hard tasks.</li><li>Keep a fallback provider if downtime would hurt revenue.</li></ul>
    <h2>Cost planning workflow</h2>
    <p>Start by writing down the exact product action. For example, a user asks a support question, uploads a document, requests a coding fix, or generates a report. Then list every model call needed to complete that action. If the workflow uses a classifier, a retrieval step, a final answer, and a quality check, price all four parts instead of only the final answer.</p>
    <p>Next, estimate the token pattern. Long policy documents, chat history, retrieved passages, and examples are input tokens. The final answer, citations, code patches, or JSON output are output tokens. If one model produces shorter answers or requires fewer repair prompts, that may matter more than the public per-million-token price.</p>
    <h2>Quality and failure cost</h2>
    <p>Quality should be measured in money terms. A model that creates more support escalations, broken code, inaccurate summaries, or failed generations creates hidden cost. For internal tools, the hidden cost may be employee time. For customer-facing SaaS, the hidden cost can be churn, refunds, or support tickets. This is why comparison pages should not rank models only by sticker price.</p>
    <h2>Routing recommendation</h2>
    <p>A practical production setup often uses both models. Send simple intent detection, extraction, tagging, and formatting to the cheaper route. Send the final response, complex reasoning, and high-risk customer-visible work to the model that passes your quality bar. Track cost per successful task instead of cost per request; it is the better metric for deciding which model wins.</p>
    <h2>What to test before switching</h2>
    <ol><li>Run at least fifty real examples from your product, not synthetic prompts only.</li><li>Track success, latency, input tokens, output tokens, retries, and user-visible defects.</li><li>Measure the effect of shorter prompts and stricter output caps.</li><li>Test fallback behavior when the primary provider is slow or unavailable.</li><li>Review pricing again after any provider announces a new model or discount.</li></ol>
    <h2>FAQ</h2>
    <details><summary>Which model is cheaper?</summary><p>The cheaper model depends on input length, output length, caching, and retries. Use the calculator with your actual workflow.</p></details>
    <details><summary>Which model is better for agents?</summary><p>The model that completes the task in fewer reliable turns often wins, even if the sticker price is higher.</p></details>
    <details><summary>Should I use both models?</summary><p>Often yes. Routing simple work to one model and complex work to another is a common cost-control pattern.</p></details>
    <details><summary>How should I test?</summary><p>Use a fixed eval set, track success rate, latency, token usage, and user-visible quality.</p></details>
    <details><summary>Can prices change?</summary><p>Yes. Verify official pricing and use Tokencost as a planning estimate.</p></details>
    <details><summary>Should I compare cached pricing?</summary><p>Yes. If repeated context is large, cached input pricing can change the winning model.</p></details>
    <details><summary>Does context length affect cost?</summary><p>Yes. Long context increases input cost and can also affect latency and reliability.</p></details>
    <details><summary>What is the safest migration plan?</summary><p>Run both models in shadow mode, compare outputs, monitor defects, then move traffic gradually.</p></details>
  </article>${linkPanel()}`;
  return shell({ title: `${title} Cost Comparison | Tokencost`, description, canonical, body, schema: [{ "@context": "https://schema.org", "@type": "Article", headline: `${title} Cost Comparison`, dateModified: today, mainEntityOfPage: canonical }] });
}

const tools = [
  ["openai-token-calculator", "OpenAI Token Calculator", "Estimate OpenAI API token cost with input, output, cached prompt, reasoning, and monthly volume assumptions."],
  ["claude-token-calculator", "Claude Token Calculator", "Estimate Claude API spend for long-context prompts, writing workflows, support agents, and reasoning-heavy tasks."],
  ["gemini-token-calculator", "Gemini Token Calculator", "Estimate Gemini API cost for long context, multimodal workflows, and high-volume AI applications."],
  ["deepseek-cost-calculator", "DeepSeek Cost Calculator", "Estimate DeepSeek API cost for coding tools, agents, high-volume inference, and cost-sensitive apps."],
  ["qwen-cost-calculator", "Qwen Cost Calculator", "Estimate Qwen API cost for multilingual, China-facing, and budget-sensitive workflows."],
  ["mistral-cost-calculator", "Mistral Cost Calculator", "Estimate Mistral model costs for European AI apps, enterprise workflows, and routing strategies."],
  ["grok-cost-calculator", "Grok Cost Calculator", "Estimate Grok model cost for AI products and compare it with GPT, Claude, Gemini, and open model routes."],
  ["image-ai-cost-calculator", "Image AI Cost Calculator", "Estimate AI image generation cost by images per month, retries, credits, and finished usable assets."],
  ["speech-ai-cost-calculator", "Speech AI Cost Calculator", "Estimate AI speech, narration, dubbing, and text-to-speech cost by words, characters, or minutes."],
  ["embedding-cost-calculator", "Embedding Cost Calculator", "Estimate embedding costs for RAG, document ingestion, search, and recommendation systems."],
  ["fine-tuning-cost-calculator", "Fine-Tuning Cost Calculator", "Estimate fine-tuning training and inference costs before building custom AI models."],
  ["batch-api-cost-calculator", "Batch API Cost Calculator", "Estimate savings for asynchronous batch inference, offline processing, and bulk data jobs."],
  ["ai-startup-burn-rate-calculator", "AI Startup Burn Rate Calculator", "Estimate AI startup monthly burn from API usage, cloud services, team, marketing, and support."],
  ["gpu-cost-calculator", "GPU Cost Calculator", "Compare GPU rental and managed API costs for inference, batch jobs, and self-hosted models."],
  ["cloud-cost-calculator", "Cloud Cost Calculator", "Estimate hosting, database, storage, logging, queue, and CDN cost for AI products."],
  ["inference-cost-calculator", "Inference Cost Calculator", "Estimate inference cost across tokens, latency, hardware utilization, batch size, and provider pricing."]
];

const legacyModelPages = [
  ["ai-agent-cost-calculator.html", "AI Agent Cost Calculator", "Estimate AI agent costs with live model pricing, multi-turn loops, prompt caching, reasoning tokens, and monthly usage volume.", "general AI agent workflows", ["agent turns", "context growth", "tool calls", "monthly calls"]],
  ["openai-ai-agent-cost-calculator.html", "OpenAI GPT Pricing Calculator", "Estimate OpenAI GPT API cost for agents, SaaS products, support bots, coding tools, and content workflows.", "OpenAI GPT workflows", ["GPT models", "reasoning tokens", "prompt caching", "batch jobs"]],
  ["claude-ai-agent-cost-calculator.html", "Claude Cost Calculator", "Estimate Claude API cost for long-context tasks, writing workflows, support agents, and SaaS products.", "Claude workflows", ["long context", "writing quality", "prompt caching", "agent loops"]],
  ["deepseek-ai-agent-cost-calculator.html", "DeepSeek Cost Calculator", "Estimate DeepSeek API cost for coding agents, reasoning workflows, and high-volume cost-sensitive applications.", "DeepSeek workflows", ["coding tasks", "low-cost inference", "reasoning", "routing"]],
  ["gemini-ai-agent-cost-calculator.html", "Gemini Cost Calculator", "Estimate Gemini API cost for long-context, multimodal, search-like, and high-volume AI workflows.", "Gemini workflows", ["long context", "Flash models", "multimodal input", "routing"]]
];

function toolPage(item) {
  const [slug, title, description] = item;
  const canonical = `${site}/tools/${slug}/`;
  const body = `${hero(title, description, "Calculator")}
  <section class="glass mt-5 rounded-lg p-5 shadow-glow">
    <h2 class="text-xl font-bold text-white">Quick estimate</h2>
    <form class="mt-4 grid gap-3 sm:grid-cols-2" oninput="const i=+input.value||0,o=+output.value||0,ip=+inputPrice.value||0,op=+outputPrice.value||0,c=+calls.value||0; result.textContent='$'+(((i/1000000*ip)+(o/1000000*op))*c).toFixed(2)">
      <label class="block"><span class="text-sm font-semibold text-slate-300">Input tokens per call</span><input name="input" value="8000" type="number" class="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"></label>
      <label class="block"><span class="text-sm font-semibold text-slate-300">Output tokens per call</span><input name="output" value="800" type="number" class="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"></label>
      <label class="block"><span class="text-sm font-semibold text-slate-300">Input price per 1M</span><input name="inputPrice" value="2.50" type="number" step="0.01" class="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"></label>
      <label class="block"><span class="text-sm font-semibold text-slate-300">Output price per 1M</span><input name="outputPrice" value="10.00" type="number" step="0.01" class="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"></label>
      <label class="block sm:col-span-2"><span class="text-sm font-semibold text-slate-300">Monthly calls</span><input name="calls" value="10000" type="number" class="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2"></label>
      <div class="rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 sm:col-span-2"><div class="text-xs font-bold uppercase tracking-wide text-emerald-200">Estimated monthly cost</div><output name="result" class="mt-2 block text-3xl font-extrabold text-white">$105.00</output></div>
    </form>
  </section>
  <article class="article glass mt-5 rounded-lg p-5 shadow-glow">
    <h2>How this calculator works</h2>
    <p>${title} uses a practical planning formula: input tokens divided by one million multiplied by input price, plus output tokens divided by one million multiplied by output price, multiplied by monthly calls. You can change every number because public pricing, enterprise discounts, batch rates, and routing choices vary by team.</p>
    <p>This page is intentionally simple and transparent. It is useful when you need a fast estimate before choosing a model or before building a more detailed forecast in the main Tokencost calculator.</p>
    <h2>Example</h2>
    <p>If a workflow sends 8,000 input tokens and receives 800 output tokens for 10,000 monthly calls, the bill depends heavily on output pricing. A product manager can use this page to test whether shorter answers, cached prompts, routing, or batch processing would protect margin.</p>
    <h2>Step-by-step tutorial</h2>
    <ol><li>Enter the average input size for one request. Include system instructions, examples, retrieved context, and user text.</li><li>Enter average output size. If the feature returns long explanations or code, output cost may dominate.</li><li>Use public pricing, your enterprise pricing, or a conservative manual estimate for each million tokens.</li><li>Enter monthly calls. For SaaS, use active users multiplied by calls per user.</li><li>Compare the result with your subscription price, ad revenue, or customer contract value.</li></ol>
    <h2>When this calculator is useful</h2>
    <p>${title} is useful before you build a detailed analytics dashboard. It helps you size the problem quickly, communicate cost to a client or cofounder, and decide whether a feature needs limits before launch. It is also useful after launch when an invoice looks high and you need to understand whether the problem is volume, output length, or pricing.</p>
    <h2>Real planning example</h2>
    <p>Imagine a small AI product where one active user creates twenty requests per month. If each request sends a long prompt, returns a detailed answer, and sometimes needs a retry, the cost is not simply the published model rate. The real estimate should include average request size, average response size, monthly active users, failed attempts, and the percentage of users who are free versus paid. A free tool can grow quickly and still lose money if the owner only looks at traffic and ignores per-user cost.</p>
    <p>For a client project, use the same method but add a margin buffer. Client work often includes revisions, testing, and edge cases that do not appear in the first demo. If your estimate says a feature costs five dollars per thousand uses, quote with enough room for higher traffic, provider price changes, and support time.</p>
    <h2>How to reduce the estimate</h2>
    <p>Reduce input size first by trimming repeated boilerplate, compressing chat history, and retrieving fewer but better passages. Reduce output size by asking for concise responses, structured JSON, or summaries where appropriate. Use cheaper routes for background tasks, and reserve premium models for steps that directly affect user trust or revenue.</p>
    <h2>What to monitor after launch</h2>
    <p>After launch, compare the estimate with real usage logs. Track cost by feature, by model, and by user tier. Watch for a small number of heavy users, unusually long prompts, high retry rates, and background jobs that run more often than expected. The goal is not to block usage; it is to know which product behavior creates cost so you can price it correctly.</p>
    <p>Review this estimate whenever you change prompts, model versions, context size, output format, retrieval settings, or pricing plans. A prompt that looks like a small copy edit can change token count enough to matter at scale.</p>
    <h2>Operational checklist</h2>
    <ul><li>Add per-user and per-team usage limits before launch.</li><li>Log tokens by feature so one feature cannot hide inside total spend.</li><li>Use alerts when daily spend exceeds the expected run rate.</li><li>Review power users separately from average users.</li><li>Retest cost when changing prompts, models, or retrieval settings.</li></ul>
    <h2>Common mistakes</h2>
    <ul><li>Forgetting output tokens.</li><li>Using launch-week traffic instead of realistic growth.</li><li>Ignoring retries, failed generations, and agent turns.</li><li>Not separating free users from paid users.</li><li>Failing to add cost limits for heavy users.</li></ul>
    <h2>FAQ</h2>
    <details><summary>Is this official pricing?</summary><p>No. Use it as a planning estimate and verify official provider pages.</p></details>
    <details><summary>Can I use it for SaaS pricing?</summary><p>Yes, but also include hosting, database, support, payment fees, and marketing cost.</p></details>
    <details><summary>Why price per one million tokens?</summary><p>Most AI APIs publish rates per million input or output tokens because single-token prices are tiny.</p></details>
    <details><summary>What should I do after estimating?</summary><p>Run the detailed homepage calculator with agent turns, caching, reasoning tokens, and model comparisons.</p></details>
    <details><summary>Should I include retries?</summary><p>Yes. If the workflow often needs correction or regeneration, multiply the cost by the average attempts.</p></details>
    <details><summary>What if I have enterprise pricing?</summary><p>Enter your private rates manually. Public calculators cannot know private discounts.</p></details>
    <details><summary>Can I model free users?</summary><p>Yes. Estimate their monthly calls and compare the cost with ads, upsells, or conversion rate.</p></details>
    <details><summary>How often should I recalculate?</summary><p>Recalculate after model changes, prompt changes, pricing updates, or usage growth.</p></details>
  </article>${linkPanel()}`;
  return shell({ title: `${title} | Tokencost`, description, canonical, body, schema: [{ "@context": "https://schema.org", "@type": "WebApplication", name: title, description, url: canonical, applicationCategory: "BusinessApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] });
}

function legacyModelPage(item) {
  const [file, title, description, workload, terms] = item;
  const canonical = `${site}/${file}`;
  const body = `${hero(title, description, "Calculator guide")}
  <section class="glass mt-5 rounded-lg p-5 shadow-glow">
    <h2 class="text-xl font-bold text-white">Open the interactive calculator</h2>
    <p class="mt-2 text-sm leading-6 text-slate-300">Use this page to understand the pricing model, then open the live calculator to test current rates and monthly usage assumptions.</p>
    <div class="mt-4 flex flex-wrap gap-2"><a href="/#calculator" class="rounded-md bg-emerald-500 px-4 py-2.5 font-bold text-slate-950">Open calculator</a><a href="/guides/how-ai-token-billing-works/" class="rounded-md border border-slate-700 px-4 py-2.5 font-bold text-slate-100">Read token guide</a><a href="/compare/gpt-vs-claude/" class="rounded-md border border-slate-700 px-4 py-2.5 font-bold text-slate-100">Compare models</a></div>
  </section>
  <article class="article glass mt-5 rounded-lg p-5 shadow-glow">
    <h2>What this calculator does</h2>
    <p>${title} helps builders estimate the cost of ${workload}. It focuses on the variables that matter in production: input tokens, output tokens, prompt caching, hidden reasoning work, repeated agent turns, and monthly usage volume.</p>
    <p>Most teams start with a simple question like "which model is cheapest?" The better question is "which model completes this workflow at the lowest acceptable cost?" A model can be cheaper per token but more expensive per successful task if it needs more retries, longer prompts, or extra repair calls.</p>
    <h2>Why the calculation matters</h2>
    <p>AI cost becomes a business issue when free users grow, when a feature becomes popular, or when a workflow uses a premium model for every step. A single request might cost fractions of a cent, but a workflow with ten steps, long context, and one million monthly calls can become a major infrastructure line item.</p>
    <p>For ${workload}, the most important assumptions are ${terms.join(", ")}. Treat those as product decisions, not just technical details. Shorter prompts, stricter output limits, and smarter routing can protect gross margin without making the product feel worse.</p>
    <h2>How the formula works</h2>
    <p>The core formula is input cost plus output cost. Input cost is input tokens divided by one million multiplied by the input price. Output cost is output tokens divided by one million multiplied by the output price. Agent workflows then multiply that cost by turns, retries, and monthly calls. If cached input pricing is available, repeated context can use a lower cached rate for part of the prompt.</p>
    <h2>Real-world example</h2>
    <p>Imagine a support agent that receives a customer question, retrieves documentation, writes an answer, checks the answer, and escalates uncertain cases. That is not one model call. It may be a classifier, a retrieval prompt, a final response, and a quality check. If each step sends context, the monthly cost depends on workflow design as much as model choice.</p>
    <p>A SaaS founder can use the calculator to test a free tier. If free users make five agent calls per month and paid users make fifty, the average user cost is not enough. The pricing model should separate free usage, paid usage, power users, and abuse protection.</p>
    <h2>Step-by-step tutorial</h2>
    <ol><li>Open the main calculator and choose the provider or model family.</li><li>Choose a preset close to your workflow, such as lean agent, RAG support, reasoning heavy, or scale test.</li><li>Adjust input tokens to include system prompts, retrieved passages, examples, and user text.</li><li>Adjust output tokens based on the answer style your product needs.</li><li>Turn reasoning tokens on for complex tasks and use a conservative multiplier.</li><li>Set cache hit rate if static prompt context repeats.</li><li>Enter monthly calls and compare the monthly estimate with your revenue model.</li></ol>
    <h2>Common mistakes</h2>
    <ul><li>Pricing one model call when the workflow actually uses several calls.</li><li>Ignoring hidden reasoning tokens for complex tasks.</li><li>Using ideal prompts instead of production prompts with policy text and retrieved context.</li><li>Forgetting output length and response verbosity.</li><li>Not tracking cost by feature, user segment, or model.</li></ul>
    <h2>Tips to reduce cost</h2>
    <p>Route simple work to cheaper models, use premium models only where quality matters, summarize conversation history, cache repeated context, cap output length, and batch offline jobs. Monitor cost per successful task, not just cost per request.</p>
    <h2>Limitations and disclaimer</h2>
    <p>Tokencost is an educational planning tool. Public pricing can change, private contracts can differ, and provider billing rules may include details not represented in a simplified calculator. Always verify official pricing before making business commitments.</p>
    <h2>FAQ</h2>
    <details><summary>Is this page using live pricing?</summary><p>The interactive homepage loads live pricing where possible. This page explains the workflow and links into the calculator.</p></details>
    <details><summary>Why do agent turns matter?</summary><p>Every extra turn can resend context and generate output, so multi-turn workflows can scale cost quickly.</p></details>
    <details><summary>Should I include system prompts?</summary><p>Yes. System prompts, examples, retrieved context, and previous conversation all count as input tokens.</p></details>
    <details><summary>What is prompt caching?</summary><p>Prompt caching is discounted billing for repeated input context when supported by the provider.</p></details>
    <details><summary>How do I choose a model?</summary><p>Compare cost per successful task, latency, quality, and failure rate, not sticker price alone.</p></details>
    <details><summary>Can this help price SaaS plans?</summary><p>Yes. Combine the monthly model estimate with hosting, storage, support, payment fees, and marketing costs.</p></details>
    <details><summary>How often should I review cost?</summary><p>Review whenever pricing changes, prompts change, volume grows, or you add a new feature.</p></details>
    <details><summary>What is the fastest way to lower cost?</summary><p>Reduce context, cap output, route easy steps to cheaper models, and add usage limits.</p></details>
  </article>${linkPanel()}`;
  return shell({ title: `${title} | Tokencost`, description, canonical, body, schema: [{ "@context": "https://schema.org", "@type": "WebApplication", name: title, description, url: canonical, applicationCategory: "BusinessApplication", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }] });
}

const trustPages = [
  ["about", "About Tokencost", "Tokencost is an educational AI pricing resource for builders, creators, and SaaS founders who need realistic cost estimates before launch.", "Tokencost exists because AI pricing is easy to underestimate. Simple token calculators often ignore agent loops, hidden reasoning tokens, prompt caching, retries, creator-tool credits, SaaS margins, and user behavior. Our goal is to help builders think clearly before they ship, buy credits, or promise margins to customers."],
  ["contact", "Contact Tokencost", "Contact Tokencost for corrections, pricing data feedback, partnership ideas, and questions about AI cost calculators.", "Send feedback, corrections, and partnership requests to hello@tokencost.live. We especially welcome pricing corrections, missing provider suggestions, and examples of real AI workflows that would make the calculators more useful."],
  ["privacy-policy", "Privacy Policy", "Privacy information for Tokencost, including analytics, local storage, advertising, and calculator inputs.", "Tokencost does not require login to use the public calculators. Some calculator settings may be saved in your browser using localStorage so the page remembers your inputs. We use Google Analytics to understand aggregate traffic and Google AdSense scripts for advertising review and serving. Do not enter private customer data, secrets, or confidential prompts into public calculators."],
  ["terms", "Terms of Use", "Terms for using Tokencost calculators, guides, pricing estimates, and educational content.", "Tokencost provides educational estimates, not financial, legal, or procurement advice. You are responsible for verifying official provider pricing, terms, quotas, tax treatment, and enterprise agreements before making business decisions."],
  ["disclaimer", "Disclaimer", "Important limitations for Tokencost AI pricing estimates, model cost data, and business calculators.", "All estimates are approximate. Providers can change prices, tokenization, quotas, caching rules, and product plans. Calculator results may differ from invoices because of taxes, minimum charges, discounts, enterprise terms, failed requests, retries, and provider-specific billing rules."],
  ["editorial-policy", "Editorial Policy", "How Tokencost writes, reviews, updates, and corrects educational AI pricing content.", "Tokencost content is written to be practical for builders. We avoid fake precision, mark uncertain pricing as manual or custom input, and prioritize formulas that users can inspect. When pricing changes, we update calculators and guides as soon as practical."],
  ["methodology", "Methodology", "How Tokencost calculates AI token cost, creator cost, SaaS profit, break-even views, and model comparisons.", "Our methodology starts from explicit formulas: unit cost multiplied by usage volume. For LLMs, that means input tokens, output tokens, cached input where available, hidden reasoning estimates, turns, and monthly calls. For creator tools, we include attempts and usable outputs. For SaaS, we include revenue, API cost, hosting, payment fees, marketing, team cost, and churn."],
  ["pricing-updates", "How Pricing Is Updated", "How Tokencost updates live LLM pricing, fallback data, and manual creator-tool pricing assumptions.", "The main LLM calculator loads pricing data from the community-maintained simonw/llm-prices repository at runtime where possible. A scheduled GitHub workflow also refreshes fallback pricing. Creator tools often change plans or hide pricing behind login, so those pages keep manual inputs instead of inventing numbers."],
  ["sources", "Sources", "Sources and references used by Tokencost for model pricing, methodology, and calculator design.", "Primary sources include official provider pricing pages where public, the simonw/llm-prices open-source dataset for LLM prices, public documentation, and user-verifiable formulas. When exact pricing is unknown, Tokencost prefers manual input over unsupported claims."],
  ["data-accuracy", "Data Accuracy", "How Tokencost handles pricing uncertainty, manual inputs, stale data, and user verification.", "Data accuracy is handled conservatively. Live prices are displayed with a sync badge when loaded. Fallback pricing is automated where possible. Pages clearly warn users to verify official pricing, and custom inputs remain available so users can model their own plans."],
  ["author", "Author and Editorial Team", "Information about the Tokencost editorial approach and the people responsible for the site.", "Tokencost is maintained as an independent educational resource for AI builders. The editorial focus is practical cost planning: clear formulas, visible assumptions, conservative disclaimers, and examples that help users make better product and pricing decisions."]
];

function trustPage(item) {
  const [slug, title, description, intro] = item;
  const canonical = `${site}/${slug}/`;
  const body = `${hero(title, description, "Trust")}
  <article class="article glass mt-5 rounded-lg p-5 shadow-glow">
    <p>${intro}</p>
    <p>Tokencost is built for independent developers, small SaaS teams, and creators who need practical estimates before they commit to a model, credit plan, subscription, or product price. The site is intentionally public, free to use, and readable without an account so visitors can inspect the assumptions instead of trusting a black-box result.</p>
    <h2>What users can expect</h2>
    <p>Every page is designed to be usable without login. Calculators keep formulas visible, provide manual inputs where pricing is uncertain, and link to related guides so users can understand the assumptions behind the numbers.</p>
    <p>Calculator inputs are treated as planning assumptions. Users should avoid entering confidential prompts, private customer records, access tokens, or sensitive financial data. The useful pattern is to model averages: typical tokens per request, expected retries, monthly calls, subscription price, ad revenue, and break-even thresholds.</p>
    <p>The site is organized so visitors can move from problem to answer quickly: homepage for live LLM agent cost, creator pages for music, video, and voice workflows, SaaS pages for margin planning, guide pages for education, and comparison pages for model selection. That structure keeps users from landing on isolated pages with no useful next step.</p>
    <h2>Editorial standards</h2>
    <p>Tokencost prefers practical explanations over inflated claims. Articles should answer what the calculator does, why the calculation matters, how the formula works, common mistakes, and how a user can reduce cost. When a provider does not publish stable pricing, the page uses custom input instead of pretending uncertain numbers are official.</p>
    <p>Pages are updated when pricing changes, when new models become important to builders, or when a calculator needs clearer assumptions. Because AI pricing changes quickly, each page includes a last-updated signal and a disclaimer that users should verify official provider pricing before making business or legal commitments.</p>
    <h2>Data and source policy</h2>
    <p>The main LLM calculator uses live public pricing data where possible and falls back to a small maintained cache if GitHub or a provider source is unavailable. Other calculator pages use transparent manual fields because creator platforms often use subscriptions, credits, region-specific plans, or private limits that cannot be safely hardcoded.</p>
    <p>Sources are chosen in this order: official provider pricing pages, public provider documentation, reputable open-source pricing datasets, and clearly marked manual assumptions. If a reader finds an outdated price or unclear explanation, corrections can be sent with the page URL and source.</p>
    <h2>User experience principles</h2>
    <p>The site should help before it monetizes. During AdSense review, visible ad placements are intentionally minimized so the main experience is calculators, guides, comparisons, and trust pages. Advertising scripts may remain in the document head for review and future serving, but the site should not feel like a page built only around ads.</p>
    <h2>How this supports AdSense quality</h2>
    <p>Tokencost is more than a collection of thin calculators. The site now includes original guides, methodology notes, comparison pages, trust pages, and practical examples. The goal is to help visitors make real decisions about AI pricing and product economics.</p>
    <h2>Limitations</h2>
    <p>Tokencost cannot guarantee that an estimate will match a future invoice. Providers may change model names, tokenization behavior, output limits, taxes, caching policies, enterprise discounts, or available plans. Use the site to understand the cost shape, then verify the official source before purchasing or quoting customers.</p>
    <p>For legal, tax, procurement, and financial commitments, users should consult qualified professionals or the provider's official contract. Tokencost is best used as a decision-support tool: it helps identify expensive variables, compare alternatives, and decide what needs deeper verification.</p>
    <h2>Corrections</h2>
    <p>If a price, provider name, or explanation appears outdated, contact us at hello@tokencost.live with the source and the page URL. Pricing changes quickly, and corrections are part of the editorial process.</p>
  </article>${linkPanel()}`;
  return shell({ title: `${title} | Tokencost`, description, canonical, body, schema: [{ "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical }] });
}

function guidesAliasPage() {
  return shell({
    title: "AI Cost Guides | Tokencost",
    description: "Start here for AI pricing guides, token billing explainers, model comparisons, creator cost planning, and AI SaaS economics.",
    canonical: `${site}/ai-cost-guides/`,
    body: `${hero("AI Cost Guides", "A practical learning hub for AI token pricing, creator tool budgets, model comparison, and SaaS margin planning.", "Guides")}
    <article class="article glass mt-5 rounded-lg p-5 shadow-glow">
      <h2>What this guide hub covers</h2>
      <p>This section helps users move from a raw calculator result to a better business decision. AI cost planning is not only input tokens multiplied by a model rate. It includes output tokens, hidden reasoning, prompt caching, retries, agent loops, video generation attempts, voice minutes, paid-user conversion, ad revenue, and subscription margin.</p>
      <p>If you are new to AI pricing, start with token billing and model pricing. If you are building a product, continue with SaaS profit, API usage estimation, and cost reduction. If you are a creator, compare music, video, voice, and full creator profit before buying a credit-heavy plan.</p>
      <h2>Recommended reading path</h2>
      <ol><li>Learn how AI token billing works.</li><li>Compare GPT, Claude, Gemini, DeepSeek, Qwen, and other model families by workflow.</li><li>Estimate monthly API volume using realistic user behavior.</li><li>Use routing, caching, batching, and prompt compression to reduce cost.</li><li>Check break-even users, views, or customers before scaling spend.</li></ol>
      <h2>Why guides matter</h2>
      <p>A calculator can tell you a number, but the guide explains what can make that number wrong. Most bad estimates come from missing retries, assuming every user behaves like an average user, forgetting output tokens, or ignoring fixed business costs. The articles here are written to make those hidden assumptions visible.</p>
      <p>Tokencost avoids fake precision. When provider pricing is uncertain, users can enter manual rates. When the topic depends on workflow quality, the guide explains how to test with real examples instead of choosing a model only by headline price.</p>
      <h2>Popular guides</h2>
      <div class="mt-3 flex flex-wrap gap-2">${listLinks(coreLinks.guides)}${listLinks([["/guides/openai-pricing-explained/","OpenAI pricing explained"],["/guides/claude-api-pricing-guide/","Claude API pricing"],["/guides/gemini-vs-chatgpt-cost/","Gemini vs ChatGPT cost"],["/guides/how-to-estimate-api-usage/","Estimate API usage"],["/guides/music-video-ai-generation-cost/","Music and video AI cost"]])}</div>
      <h2>How to use these guides with calculators</h2>
      <p>Start by entering a realistic scenario into a calculator, then open the guide that matches the largest cost driver. If the cost is mostly input tokens, read about caching and context reduction. If output tokens dominate, read about concise response design and routing. If creator-tool retries dominate, compare cost per usable asset instead of cost per generation.</p>
      <p>For SaaS planning, do not stop at token cost. Combine API cost with hosting, database, payment fees, marketing, support, and churn. The goal is to know whether a product can stay profitable when usage grows, not only whether one demo looks affordable.</p>
      <h2>Best starting points</h2>
      <p>Beginners should start with the token billing guide, then compare two or three model families using the comparison pages. Developers building an AI tool should read the API usage and cost reduction guides before setting product limits. Creators should start with the creator profit calculator because music, video, voice, image, editing, and promotion costs need to be viewed together.</p>
      <p>After reading a guide, return to the calculator and update the assumptions. Good cost planning is iterative: estimate, test with real prompts or assets, measure attempts, then revise the monthly budget. This is how Tokencost turns general pricing information into decisions a builder can actually use.</p>
      <h2>Common planning mistakes</h2>
      <p>The most common mistake is planning for the average request and ignoring the heavy request. In real products, a small number of users may upload long documents, ask for repeated revisions, or run many agent loops. Creator workflows have the same pattern: a few difficult videos may consume more credits than a week of simple posts.</p>
      <p>Another mistake is comparing only monthly subscriptions. A tool with a higher subscription can be cheaper if it creates usable output faster. A tool with a low entry price can be expensive if exports are limited, watermarked, or require many failed attempts. The guides explain how to normalize these costs before choosing.</p>
    </article>${linkPanel()}`
  });
}

function indexPage({ title, description, canonical, kicker, items, base }) {
  const cards = items.map(([slug, itemTitle, itemDesc]) => `<a href="${base}${slug}/" class="rounded-lg border border-slate-800 bg-slate-950/45 p-4 transition hover:border-emerald-400/40"><h2 class="text-lg font-bold text-white">${itemTitle}</h2><p class="mt-2 text-sm leading-6 text-slate-300">${itemDesc}</p></a>`).join("");
  const overview = `<article class="article glass mt-5 rounded-lg p-5 shadow-glow">
    <h2>How to use this section</h2>
    <p>This directory groups the most useful Tokencost resources by task. Start with a calculator when you need a quick number, then open the related guide or comparison page to understand the assumptions behind that number. AI pricing changes quickly, so a useful estimate should combine current rates, workflow volume, retries, caching, and business context.</p>
    <p>For best results, compare at least three options before making a platform decision. A model or tool that looks cheaper on paper may cost more if it needs longer prompts, more retries, or extra review steps. A premium option may be worth paying for when it reduces failures, support tickets, or editing time.</p>
    <h2>What to check before choosing</h2>
    <ul><li>Whether the workflow is input-heavy, output-heavy, or retry-heavy.</li><li>Whether prompt caching, batch processing, or routing can reduce cost.</li><li>Whether public pricing matches your region, plan, and commercial use case.</li><li>Whether the expected revenue comes from subscriptions, ads, clients, affiliates, or sponsorships.</li></ul>
    <h2>How to compare results</h2>
    <p>Use each page as part of a chain. A calculator estimates one workflow, a guide explains the assumptions, and a comparison page helps decide whether another model or platform may be better. This is especially important for AI products because the lowest unit price is not always the lowest business cost.</p>
    <p>When you compare options, write down the same assumptions for each provider: average input size, output size, attempts, monthly volume, expected revenue, and any fixed subscription cost. Keeping those assumptions consistent makes the comparison fair and helps you update the estimate later when pricing changes.</p>
    <h2>Recommended next step</h2>
    <p>If you are choosing a provider, open one comparison page and one calculator page at the same time. Use the comparison page to decide which options deserve testing, then use the calculator to estimate cost under your own workload. If you are planning a business, also open the SaaS or creator profit calculator so revenue and expenses are considered together.</p>
    <p>Do not treat any single result as permanent. Model providers release new versions, change pricing, add cache discounts, and update context limits. The most useful habit is to keep a short monthly cost review and update the calculator when your product behavior changes.</p>
    <h2>What makes a comparison trustworthy</h2>
    <p>A useful comparison is transparent about uncertainty. It should separate public pricing from private enterprise terms, separate input-heavy tasks from output-heavy tasks, and explain where quality can affect cost. Tokencost comparison pages are designed to push users toward testing their own workflow instead of accepting a generic ranking.</p>
    <p>For high-value decisions, run a small evaluation set before switching providers. Use real prompts, realistic context, expected output length, and the same success criteria for each model. Then compare cost per successful task, not only cost per token.</p>
    <p>Teams should also document why a model was chosen. A short note about quality, latency, fallback needs, and expected monthly cost makes future reviews easier when new model releases or pricing changes appear.</p>
  </article>`;
  return shell({ title, description, canonical, body: `${hero(title.replace(" | Tokencost", ""), description, kicker)}${overview}<section class="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">${cards}</section>${linkPanel()}` });
}

function addStaticCreatorComparisonContent(rel, title, focus) {
  const file = path.join(PUBLIC, rel);
  let html = fs.readFileSync(file, "utf8");
  const markerStart = "<!-- STATIC_GUIDE_CONTENT_START -->";
  const markerEnd = "<!-- STATIC_GUIDE_CONTENT_END -->";
  const block = `${markerStart}
    <section class="mt-5 rounded-lg border border-slate-800 bg-slate-950/60 p-5 shadow-glow">
      <article class="space-y-5 text-sm leading-7 text-slate-300">
        <h2 class="text-2xl font-extrabold text-white">${title}: practical pricing guide</h2>
        <p>${focus} is difficult to compare because many AI creator tools price by credits, subscriptions, duration, resolution, commercial rights, or hidden generation limits. This page keeps the comparison useful by allowing manual pricing inputs and by separating Western and China-based tools where the billing model, currency, and availability may differ.</p>
        <p>The safest way to estimate creator-tool cost is to model finished output instead of one generation. A finished video, song, narration, or campaign asset usually includes drafts, discarded versions, prompt changes, and revisions. If a tool charges credits for every attempt, the cost per usable output can be several times higher than the price shown in a marketing example.</p>
        <h2 class="text-xl font-bold text-white">How this page works</h2>
        <p>The interactive comparison uses provider categories, region filters, and manual cost fields. When exact public pricing is missing or changes frequently, the page avoids inventing fake rates. Users can enter their verified subscription cost, credit bundle, or per-generation assumption, then compare monthly spend across tool types.</p>
        <p>For RMB planning, convert subscription and credit costs into a monthly budget first. Then divide by usable outputs, not generated attempts. For USD or MYR planning, use the currency selector and keep a note of the exchange rate you used. Exchange rates, tax, and platform rules can change the final invoice.</p>
        <h2 class="text-xl font-bold text-white">Real examples</h2>
        <p>A short-form creator using AI video and AI music may create thirty finished videos per month. If each finished video needs four short clips, and each clip needs two attempts, that is two hundred and forty video generations. The creator should compare cost per finished video, not cost per prompt.</p>
        <p>A China-facing brand may compare Kling, Hailuo, Jimeng, Vidu, Tongyi Wanxiang, Tencent Hunyuan Video, NetEase Tianyin, Mureka, and other regional tools. The best choice is not always the cheapest. Availability, language quality, export rights, review speed, and consistent style can matter more than headline pricing.</p>
        <h2 class="text-xl font-bold text-white">Western vs China tool comparison</h2>
        <p>Western tools may be easier for global creators who need English documentation, Stripe billing, YouTube-friendly export workflows, or integrations with existing editing apps. China tools may be more attractive for Chinese-language prompts, RMB billing, local social platforms, or China-facing commercial content. The best workflow can also mix both groups: draft concepts in one tool, generate final clips in another, and finish voice or music in a third.</p>
        <p>When comparing regions, do not only convert currencies. Check whether a plan includes commercial usage, whether outputs can be downloaded without watermark, whether generated assets can be used on YouTube or TikTok, and whether account access works from your country. A tool with lower nominal cost can be less useful if the export process is slow or if the output needs many manual repairs.</p>
        <h2 class="text-xl font-bold text-white">Step-by-step workflow</h2>
        <ol class="list-decimal pl-5"><li>Pick the asset category: music, video, voice, image, or full creator workflow.</li><li>List the tools you are considering and mark each as Western, China, or custom/manual.</li><li>Convert every plan into cost per attempt and cost per usable output.</li><li>Estimate the number of published assets per month and the average attempts per asset.</li><li>Compare the result with expected revenue from ads, sponsorships, clients, subscriptions, or affiliate offers.</li><li>Revisit the estimate after a week of real production because the first workflow is usually too optimistic.</li></ol>
        <h2 class="text-xl font-bold text-white">What makes a tool expensive in practice</h2>
        <p>The biggest cost drivers are long duration, high resolution, premium voices, style consistency, and regeneration. If a creator needs exact character consistency across a series, the cheapest tool may create more rejected outputs. If a marketer needs many short ad variants, speed and batch generation may be more important than cinematic quality. A useful comparison should therefore include production time and rejection rate, not only subscription price.</p>
        <p>For agencies, add revision rounds and client approval. A client may ask for three versions of a video, a new voice tone, or different background music. Those revisions consume credits even when the first draft was technically successful. For solo creators, add the value of time: a tool that saves two hours per video may be worth more than a tool that is slightly cheaper but harder to control.</p>
        <h2 class="text-xl font-bold text-white">Common mistakes</h2>
        <ul class="list-disc pl-5"><li>Comparing one provider's monthly plan with another provider's per-credit price without converting both into cost per usable output.</li><li>Ignoring failed generations, watermarked previews, quality settings, and export limits.</li><li>Assuming a free tier can support commercial production.</li><li>Forgetting voice, music, editing, and thumbnail costs when estimating video profit.</li><li>Using a USD estimate for China tools without checking RMB billing, payment method, and regional availability.</li></ul>
        <h2 class="text-xl font-bold text-white">Tips to reduce creator AI cost</h2>
        <p>Storyboard before generating video, write tighter voice scripts, reuse music beds where licensing allows, and keep prompt templates for repeatable formats. Use lower-cost tools for drafts, then spend premium credits only when the concept is already clear. Track cost per finished asset, cost per published video, and cost per revenue dollar so the workflow can scale.</p>
        <p>Keep a simple monthly log with columns for tool, plan, currency, attempts, usable outputs, and revenue source. That small habit makes it much easier to notice when a provider becomes too expensive, when a new workflow is improving output quality, or when a channel can afford to upgrade to a premium plan.</p>
        <h2 class="text-xl font-bold text-white">FAQ</h2>
        <details><summary class="cursor-pointer font-semibold text-white">Why are some prices manual?</summary><p class="mt-2">Some providers change plans often or do not publish stable API-style pricing. Manual input is more honest than pretending uncertain prices are fixed.</p></details>
        <details><summary class="cursor-pointer font-semibold text-white">Can I compare China and Western tools directly?</summary><p class="mt-2">Yes, but convert currencies and compare finished outputs. Also check availability, language support, and commercial rights.</p></details>
        <details><summary class="cursor-pointer font-semibold text-white">Should I include failed generations?</summary><p class="mt-2">Yes. Failed or discarded generations usually consume credits, so they are part of real production cost.</p></details>
        <details><summary class="cursor-pointer font-semibold text-white">Is this official pricing?</summary><p class="mt-2">No. Tokencost is an educational estimator. Always verify official provider pages before purchasing a plan or quoting a client.</p></details>
        <div class="flex flex-wrap gap-2 pt-2"><a class="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-100" href="/music-cost-calculator/">Music calculator</a><a class="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-100" href="/ai-video-cost-calculator/">Video calculator</a><a class="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-100" href="/ai-voice-cost-calculator/">Voice calculator</a><a class="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-100" href="/creator-profit-calculator/">Creator profit</a><a class="rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-100" href="/guides/music-video-ai-generation-cost/">Creator cost guide</a></div>
      </article>
    </section>
  ${markerEnd}`;
  if (html.includes(markerStart)) {
    html = html.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`), block);
  } else {
    html = html.replace("</main>", `${block}\n  </main>`);
  }
  fs.writeFileSync(file, html);
}

function writePage(rel, html) {
  const file = path.join(PUBLIC, rel);
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, html);
  return file;
}

function suppressPreApprovalAdPlaceholders() {
  for (const file of fs.readdirSync(PUBLIC, { recursive: true })) {
    if (!file.endsWith(".html")) continue;
    const full = path.join(PUBLIC, file);
    let html = fs.readFileSync(full, "utf8");
    const before = html;
    html = html.replace(/<section class="ad-slot my-5[\s\S]*?<\/section>/g, "<!-- Visible ad slot paused during AdSense review. AdSense script remains in head. -->");
    html = html.replace(/<section class="ad-slot my-5 rounded-lg p-4 text-center">[\s\S]*?<\/section>/g, "<!-- Visible ad slot paused during AdSense review. AdSense script remains in head. -->");
    if (html !== before) fs.writeFileSync(full, html);
  }
}

function addRichCalculatorContent(rel, config) {
  const file = path.join(PUBLIC, rel);
  let html = fs.readFileSync(file, "utf8");
  const markerStart = "<!-- AUTHORITY_CONTENT_START -->";
  const markerEnd = "<!-- AUTHORITY_CONTENT_END -->";
  const block = `${markerStart}
    <section class="glass mt-5 rounded-lg p-5 shadow-glow">
      <article class="article">
        <h2>${config.title}: complete guide</h2>
        <p>${config.intro}</p>
        <h2>What this calculator does</h2>
        <p>This page helps you translate tool pricing into business decisions. Instead of looking only at a subscription price or a single generation price, it asks how many outputs you need, how often you retry, how many users or viewers you expect, and what break-even point would make the workflow sustainable.</p>
        <h2>Why this calculation matters</h2>
        <p>AI products and creator workflows often look cheap in a demo and expensive at scale. A small retry rate, a few more agent turns, or a longer output can turn a profitable idea into a thin-margin product. The calculator makes those assumptions visible before you spend money.</p>
        <h2>How the formula works</h2>
        <p>${config.formula}</p>
        <h2>Real-world examples</h2>
        <p>${config.exampleOne}</p>
        <p>${config.exampleTwo}</p>
        <h2>How to choose realistic inputs</h2>
        <p>Use numbers from the way you actually work, not from the most optimistic demo. If you are planning a creator workflow, count every draft that is generated before the final asset is accepted. If you are planning a SaaS workflow, separate free users, paid users, heavy users, and internal admin usage. A small group of power users can consume more budget than hundreds of casual visitors, especially when a feature encourages repeated generation.</p>
        <p>When exact vendor pricing is unclear, use the custom input option and enter a conservative estimate. For subscription tools, divide the monthly plan by the number of usable outputs you realistically expect to finish. For credit-based tools, divide the credit bundle by the number of generations the bundle buys, then multiply by attempts. This keeps the estimate grounded even when providers change plan names or hide details behind login.</p>
        <h2>Decision framework</h2>
        <p>Read the result as a decision aid. If the cost per finished output is low and predictable, the workflow can probably scale with simple usage limits. If the cost is high or very sensitive to retries, add a review step before generation, use lower-cost drafts, or reduce output length. If revenue depends on ads, compare the break-even view count with your real analytics instead of a generic RPM number.</p>
        <p>The healthiest workflow is one where the cost driver is visible. For example, if video cost is dominated by regeneration, better prompts and storyboards will save more than switching platforms. If voice cost is dominated by long scripts, tighter editing helps more than chasing a tiny price difference. If SaaS cost is dominated by a few heavy users, plan limits and paid tiers matter more than average-user math.</p>
        <h2>Step-by-step tutorial</h2>
        <ol><li>Choose the closest tool or pricing mode.</li><li>Enter realistic volume for a month, not a perfect demo day.</li><li>Add attempts, turns, retries, or regeneration rate.</li><li>Enter revenue assumptions such as RPM, subscription price, or paid users.</li><li>Compare the output with related calculators and guides before making a buying decision.</li></ol>
        <h2>Quality checklist before spending money</h2>
        <ul><li>Test at least ten real examples from your niche before buying a larger plan.</li><li>Record how many attempts become usable finished assets.</li><li>Check whether the provider changes limits by resolution, duration, voice, language, or commercial rights.</li><li>Keep one spreadsheet row or note for each assumption so you can update it later.</li><li>Recalculate after a plan change, traffic spike, model switch, or content-format change.</li></ul>
        <h2>Common mistakes</h2>
        <ul><li>Ignoring retries and unusable outputs.</li><li>Forgetting that free users still create cost.</li><li>Using a best-case prompt instead of average production behavior.</li><li>Not checking official pricing before purchasing credits.</li><li>Failing to review costs after the workflow changes.</li></ul>
        <h2>Tips to reduce AI cost</h2>
        <p>Use cheaper models or tools for drafts, classification, preprocessing, and internal checks. Reserve premium tools for final output. Batch work when latency does not matter. Track cost per finished asset or per paid user, not just total monthly spend. Add usage limits before power users or failed retries consume the budget.</p>
        <h2>What to compare next</h2>
        <p>After getting a first estimate, compare the same workflow in at least two related calculators. A creator should compare music, video, voice, and full creator profit because one cheap category can be outweighed by an expensive editing or video generation step. A SaaS founder should compare token cost, API cost per user, and full SaaS profit because model spend is only one part of margin.</p>
        <p>For AdSense and SEO quality, this matters too: the site is designed as an educational resource, not a one-screen widget. The calculator gives the number; the guide explains the decision behind the number.</p>
        <h2>Limitations and disclaimer</h2>
        <p>Prices change often. Some providers use credits, subscriptions, private enterprise plans, or changing output limits. Tokencost is an educational planning tool, not a substitute for official pricing pages, invoices, or legal review.</p>
        <h2>FAQ</h2>
        ${config.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
      </article>
    </section>
    ${linkPanel()}
  ${markerEnd}`;
  if (html.includes(markerStart)) {
    html = html.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`), block);
  } else {
    html = html.replace("</main>", `${block}\n  </main>`);
  }
  fs.writeFileSync(file, html);
}

const calculatorContent = [
  ["music-cost-calculator/index.html", {
    title: "AI Music Cost Calculator",
    intro: "AI music pricing is difficult because the bill is tied to attempts, not only finished songs. A creator may generate several tracks before one is usable for a YouTube intro, TikTok edit, podcast bed, or client project.",
    formula: "Monthly cost is estimated from songs per month multiplied by attempts per song and the selected cost model. Cost per usable song divides monthly cost by finished songs. Cost per video divides the same spend by video volume. Break-even views use RPM to estimate how many views are needed to recover production cost.",
    exampleOne: "A Shorts creator who publishes forty videos may only need forty usable tracks, but if each track takes three attempts the workflow consumes one hundred and twenty generations. The relevant cost is the attempt total, not the final track count.",
    exampleTwo: "An agency producing music beds for clients can use the calculator to decide whether a subscription tier is enough or whether per-credit overages will reduce project margin.",
    faq: [["Is this official Suno or Udio pricing?", "No. Use custom inputs for your verified plan."], ["Why do attempts matter?", "Attempts represent discarded generations and usually drive real cost."], ["Can I use this for YouTube?", "Yes. Use videos per month, views per video, and RPM to estimate break-even."], ["What if a platform uses credits?", "Convert credits into an approximate cost per generation or subscription bundle."], ["Should I include editing time?", "Use the creator profit calculator for full workflow cost."], ["Can China tools be priced here?", "Yes. Use RMB or manual custom input when public pricing is unclear."], ["How often should I update assumptions?", "Review them whenever a provider changes plans or your workflow changes."], ["Can this estimate client margins?", "Yes, but verify official pricing before quoting a client."]]
  }],
  ["ai-video-cost-calculator/index.html", {
    title: "AI Video Cost Calculator",
    intro: "AI video is one of the easiest categories to underprice because every finished clip may require multiple generations, revisions, length changes, and tool-specific credit rules.",
    formula: "The calculator multiplies seconds per clip, clips per video, regeneration attempts, videos per month, and the pricing mode. It then reports cost per finished video, cost per minute, monthly spend, and break-even views.",
    exampleOne: "A creator making twenty videos with four clips each and two attempts per clip is paying for one hundred and sixty clip attempts, not twenty videos.",
    exampleTwo: "A SaaS team using AI video for ad creatives can compare a high-retry workflow with a lower-retry workflow before buying an annual plan.",
    faq: [["Why calculate seconds per clip?", "Many video tools price by generation length or credits tied to clip duration."], ["Do retries count?", "Yes. Failed or discarded generations still use credits."], ["Can I compare Kling, Runway, Pika, and Luma?", "Yes, enter the verified cost model for each provider."], ["What is cost per minute?", "Monthly generation cost divided by total finished generated minutes."], ["Does editing cost count?", "Use the creator profit calculator for editing and other tools."], ["How do I reduce AI video cost?", "Shorten clips, storyboard first, and reduce blind regeneration."], ["Can I use RMB?", "Yes, use the currency selector where available."], ["Are Sora and Veo included?", "Use manual pricing if public API pricing is unavailable."]]
  }],
  ["ai-voice-cost-calculator/index.html", {
    title: "AI Voice and Dubbing Cost Calculator",
    intro: "AI voice cost depends on whether a provider bills by characters, words, minutes, or subscription limits. Dubbing workflows also multiply cost by language count and episode volume.",
    formula: "The calculator converts script size or voice minutes into billable units, multiplies by selected pricing, and divides monthly cost across finished episodes or chapter videos.",
    exampleOne: "A channel publishing twenty narrated chapters per month can estimate the cost per narration and compare it with expected ad revenue.",
    exampleTwo: "A course creator dubbing lessons into three languages can multiply episode volume before buying a voice plan.",
    faq: [["Should I use words or characters?", "Use the unit that matches the provider plan."], ["Does dubbing cost more?", "Usually yes, because each language creates another finished narration."], ["Can I include voice cloning?", "Add it as subscription or manual cost where applicable."], ["What if I edit the audio?", "Include editing cost in the creator profit calculator."], ["Can I compare cloud TTS providers?", "Yes, use manual verified rates."], ["Why estimate minutes?", "Some speech tools bill by generated audio duration."], ["Is this enough for client quotes?", "Use it as a planning step and verify official terms."], ["How do I lower voice cost?", "Shorten scripts, batch production, and reduce repeated renders."]]
  }],
  ["ai-saas-profit-calculator/index.html", {
    title: "AI SaaS Profit Calculator",
    intro: "AI SaaS products need more than token math. A profitable plan must include users, conversion, API cost, hosting, database, payment fees, marketing, support, and churn.",
    formula: "Revenue is paid users multiplied by subscription price plus ad revenue where relevant. Expenses include API cost per user, payment fees, hosting, database, storage, marketing, and team cost. Net profit is revenue minus total expenses.",
    exampleOne: "A founder with twenty thousand users and an eighteen percent paid rate can quickly test whether a nineteen dollar plan survives API burn and churn.",
    exampleTwo: "A free AI tool with AdSense revenue can model whether ads cover infrastructure before pushing for paid subscriptions.",
    faq: [["What is API cost per user?", "Average monthly model and infrastructure cost generated by one active user."], ["Should free users be included?", "Yes. Free users create cost even if they do not pay."], ["What is break-even users?", "The number of paid users required to cover fixed and variable expenses."], ["Does churn affect profit?", "Yes, churn reduces lifetime value and payback window."], ["Are ads included?", "Yes, use ad revenue per thousand visits."], ["Should team cost be included?", "Yes for realistic profit planning."], ["How can I improve margin?", "Use routing, limits, caching, and tiered plans."], ["Is this financial advice?", "No, it is an educational planning model."]]
  }],
  ["creator-profit-calculator/index.html", {
    title: "Creator Profit Calculator",
    intro: "AI creator workflows combine many small costs: images, voice, music, video clips, editing tools, subscriptions, and promotion. Profit depends on revenue per video, not only monthly views.",
    formula: "The calculator adds AI image, voice, music, video, and editing cost per video, multiplies by videos per month, then compares total production cost with RPM, affiliate income, and sponsorship income.",
    exampleOne: "A Shorts channel may publish many videos with low RPM, so production cost must be very tight unless affiliate or sponsorship income exists.",
    exampleTwo: "A documentary-style YouTube channel may publish fewer videos but use more AI voice and video generation per episode.",
    faq: [["What counts as production cost?", "All AI and editing spend required to publish the finished video."], ["Should I include subscriptions?", "Convert monthly subscriptions into cost per video."], ["What is break-even views?", "The views needed to recover production cost at your RPM."], ["Are sponsorships included?", "Yes, enter expected monthly sponsorship income."], ["Can this help price client work?", "Yes, but include labor and revision time too."], ["How do I lower cost?", "Use templates, fewer retries, and reusable assets."], ["Does RPM change by niche?", "Yes, use your channel's real RPM when available."], ["Can TikTok be modeled?", "Yes, use expected revenue per thousand views."]]
  }]
];

function buildAll() {
  writePage("guides/index.html", indexPage({ title: "AI Pricing Guides | Tokencost", description: "Original guides about AI token pricing, API cost optimization, SaaS economics, model comparisons, and creator tool budgets.", canonical: `${site}/guides/`, kicker: "Guides", items: guideTopics.map(([slug, title, desc]) => [slug, title, desc]), base: "/guides/" }));
  writePage("ai-cost-guides/index.html", guidesAliasPage());
  writePage("compare/index.html", indexPage({ title: "AI Model Comparisons | Tokencost", description: "Compare GPT, Claude, Gemini, DeepSeek, Qwen, Grok, and other model families by cost, use case, and workflow fit.", canonical: `${site}/compare/`, kicker: "Comparisons", items: comparisons.map(([slug, title, desc]) => [slug, title, desc]), base: "/compare/" }));
  writePage("tools/index.html", indexPage({ title: "AI Cost Calculators and Tools | Tokencost", description: "Free calculators for token cost, AI creator cost, SaaS profit, GPU cost, cloud cost, embeddings, fine-tuning, and inference planning.", canonical: `${site}/tools/`, kicker: "Tools", items: tools, base: "/tools/" }));
  for (const topic of guideTopics) writePage(`guides/${topic[0]}/index.html`, guideArticle(topic));
  for (const item of comparisons) writePage(`compare/${item[0]}/index.html`, comparisonPage(item));
  for (const item of tools) writePage(`tools/${item[0]}/index.html`, toolPage(item));
  for (const item of legacyModelPages) writePage(item[0], legacyModelPage(item));
  for (const item of trustPages) writePage(`${item[0]}/index.html`, trustPage(item));
  for (const [rel, config] of calculatorContent) addRichCalculatorContent(rel, config);
  addStaticCreatorComparisonContent("china-ai-tools-cost-calculator/index.html", "China AI Tools Cost Calculator", "China AI music, video, voice, and creator-tool pricing");
  addStaticCreatorComparisonContent("ai-tool-cost-comparison/index.html", "AI Tool Cost Comparison", "AI music, video, voice, and creator-tool pricing");
  writePage("404.html", shell({ title: "Page Not Found | Tokencost", description: "The page could not be found. Browse Tokencost calculators, guides, comparisons, and AI pricing resources.", canonical: `${site}/404.html`, body: `${hero("Page not found", "This page is not available, but the calculators and AI pricing guides are ready.", "404")} ${linkPanel("Start here")}` }));

  const urls = [
    ["/", "daily", "1.0"],
    ["/tools/", "weekly", "0.9"],
    ["/guides/", "weekly", "0.9"],
    ["/compare/", "weekly", "0.88"],
    ...trustPages.map(([slug]) => [`/${slug}/`, "monthly", "0.7"]),
    ...guideTopics.map(([slug]) => [`/guides/${slug}/`, "monthly", "0.82"]),
    ...comparisons.map(([slug]) => [`/compare/${slug}/`, "monthly", "0.82"]),
    ...tools.map(([slug]) => [`/tools/${slug}/`, "monthly", "0.78"]),
    ...legacyModelPages.map(([file]) => [`/${file}`, "weekly", file === "ai-agent-cost-calculator.html" ? "0.9" : "0.85"]),
    ["/music-cost-calculator/", "weekly", "0.85"],
    ["/ai-video-cost-calculator/", "weekly", "0.85"],
    ["/ai-voice-cost-calculator/", "weekly", "0.85"],
    ["/ai-saas-profit-calculator/", "weekly", "0.85"],
    ["/creator-profit-calculator/", "weekly", "0.85"],
    ["/china-ai-tools-cost-calculator/", "weekly", "0.82"],
    ["/ai-tool-cost-comparison/", "weekly", "0.82"],
    ["/ai-cost-guides/", "weekly", "0.82"]
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([url, freq, priority]) => `  <url>\n    <loc>${site}${url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);
  fs.writeFileSync(path.join(PUBLIC, "robots.txt"), `User-agent: *\nAllow: /\n\nUser-agent: Mediapartners-Google\nAllow: /\n\nUser-agent: AdsBot-Google\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
  suppressPreApprovalAdPlaceholders();
  const report = {
    generatedAt: today,
    guides: guideTopics.length,
    comparisons: comparisons.length,
    tools: tools.length,
    trustPages: trustPages.length,
    enrichedCalculators: calculatorContent.length,
    sampleWordCounts: {
      guide: words(guideArticle(guideTopics[0])),
      comparison: words(comparisonPage(comparisons[0])),
      tool: words(toolPage(tools[0]))
    }
  };
  fs.writeFileSync(path.join(ROOT, "authority-content-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

buildAll();
