(() => {
  const FX_FALLBACK = {
    updatedAt: "2026-06-24",
    baseCurrency: "USD",
    rates: { USD: 1, RMB: 7.22, MYR: 4.73 },
    symbols: { USD: "$", RMB: "¥", MYR: "RM" }
  };

  const PAGE_DEFS = {
    music: {
      title: "AI Music Cost Calculator",
      subtitle: "Estimate Suno, Udio, Stable Audio, and China music tool economics with manual pricing and break-even views.",
      valueLabel: "per finished song",
      outputLabel: "usable songs",
      unitLabel: "song generation attempts",
      defaultInputs: {
        mode: "custom",
        songsPerMonth: 40,
        attemptsPerSong: 3,
        videosPerMonth: 40,
        viewsPerVideo: 15000,
        rpm: 4,
        monthlySubscriptionPrice: 0,
        includedUnits: 0,
        perUnitPrice: 0,
        customCostPerOutput: 0
      },
      inputs: [
        ["songsPerMonth", "Songs per month", 1, 500, 40],
        ["attemptsPerSong", "Average generation attempts per song", 1, 20, 3],
        ["videosPerMonth", "YouTube/TikTok videos per month", 1, 500, 40],
        ["viewsPerVideo", "Views per video", 0, 10000000, 15000],
        ["rpm", "RPM / revenue per 1,000 views", 0, 1000, 4]
      ],
      presets: [
        { label: "Solo creator", description: "Low-volume music plan", values: { songsPerMonth: 12, attemptsPerSong: 2, videosPerMonth: 12, viewsPerVideo: 10000, rpm: 4, mode: "custom", customCostPerOutput: 2.5 } },
        { label: "Shorts channel", description: "Higher output workflow", values: { songsPerMonth: 40, attemptsPerSong: 3, videosPerMonth: 40, viewsPerVideo: 20000, rpm: 5, mode: "custom", customCostPerOutput: 1.75 } },
        { label: "Agency", description: "Batch production planning", values: { songsPerMonth: 100, attemptsPerSong: 4, videosPerMonth: 100, viewsPerVideo: 25000, rpm: 4.5, mode: "custom", customCostPerOutput: 1.5 } }
      ],
      faq: [
        ["How do I price a music tool?", "Use the billing mode that matches your plan: subscription, usage, or custom per finished song."],
        ["Why do attempts matter?", "Repeated regeneration attempts are the real cost driver for AI music, so the calculator multiplies them explicitly."],
        ["Can I use this for profit planning?", "Yes. Enter RPM and views per video to estimate break-even views and monthly profit."]
      ]
    },
    video: {
      title: "AI Video Cost Calculator",
      subtitle: "Estimate clip generation costs for Western and China video tools, then calculate cost per finished video and per minute.",
      valueLabel: "per finished video",
      outputLabel: "finished videos",
      unitLabel: "generation units",
      defaultInputs: {
        mode: "usage",
        secondsPerClip: 10,
        clipsPerVideo: 4,
        regenerationAttempts: 2,
        videosPerMonth: 20,
        viewsPerVideo: 25000,
        rpm: 5,
        monthlySubscriptionPrice: 0,
        includedUnits: 0,
        perUnitPrice: 0,
        customCostPerOutput: 0
      },
      inputs: [
        ["secondsPerClip", "Seconds per clip", 1, 600, 10],
        ["clipsPerVideo", "Clips per video", 1, 100, 4],
        ["regenerationAttempts", "Regeneration attempts", 1, 20, 2],
        ["videosPerMonth", "Videos per month", 1, 1000, 20],
        ["viewsPerVideo", "Views per video", 0, 100000000, 25000],
        ["rpm", "RPM / revenue per 1,000 views", 0, 1000, 5]
      ],
      presets: [
        { label: "Short clip", description: "Quick social asset", values: { secondsPerClip: 8, clipsPerVideo: 3, regenerationAttempts: 1, videosPerMonth: 20, viewsPerVideo: 15000, rpm: 5, mode: "usage" } },
        { label: "Explain video", description: "Longer edit", values: { secondsPerClip: 12, clipsPerVideo: 6, regenerationAttempts: 2, videosPerMonth: 12, viewsPerVideo: 25000, rpm: 6, mode: "usage" } },
        { label: "Ad creative", description: "High iteration", values: { secondsPerClip: 10, clipsPerVideo: 8, regenerationAttempts: 4, videosPerMonth: 30, viewsPerVideo: 30000, rpm: 7, mode: "usage" } }
      ],
      faq: [
        ["How do I compare video tools?", "The comparison table shows Western and China options side by side, with pricing left as manual input when the official rate is not stable."],
        ["What does regeneration mean?", "Every extra attempt to fix a clip multiplies the billable generation volume."],
        ["How do I find break-even views?", "The calculator uses your RPM and finished-video cost to estimate how many views you need to cover production."]
      ]
    },
    voice: {
      title: "AI Voice / Dubbing Cost Calculator",
      subtitle: "Price voice scripts by words, characters, or minutes, then compare narration cost across global and China providers.",
      valueLabel: "per finished narration",
      outputLabel: "episodes",
      unitLabel: "voice units",
      defaultInputs: {
        mode: "usage",
        scriptMode: "characters",
        wordsPerScript: 1000,
        charactersPerScript: 6000,
        minutesPerEpisode: 6,
        episodesPerMonth: 20,
        viewsPerVideo: 20000,
        rpm: 4,
        monthlySubscriptionPrice: 0,
        includedUnits: 0,
        perUnitPrice: 0,
        customCostPerOutput: 0
      },
      inputs: [
        ["wordsPerScript", "Words per script", 0, 20000, 1000],
        ["charactersPerScript", "Characters per script", 0, 200000, 6000],
        ["minutesPerEpisode", "Minutes of voice", 0, 240, 6],
        ["episodesPerMonth", "Number of episodes", 1, 500, 20],
        ["viewsPerVideo", "Views per chapter video", 0, 100000000, 20000],
        ["rpm", "RPM / revenue per 1,000 views", 0, 1000, 4]
      ],
      presets: [
        { label: "Podcast chapter", description: "Words-based script", values: { scriptMode: "words", wordsPerScript: 1500, charactersPerScript: 9000, minutesPerEpisode: 10, episodesPerMonth: 8, viewsPerVideo: 18000, rpm: 4.5, mode: "usage" } },
        { label: "YouTube narration", description: "Characters-based", values: { scriptMode: "characters", wordsPerScript: 1000, charactersPerScript: 6000, minutesPerEpisode: 6, episodesPerMonth: 20, viewsPerVideo: 22000, rpm: 4.5, mode: "usage" } },
        { label: "Multilingual dub", description: "Long-form episode", values: { scriptMode: "minutes", wordsPerScript: 2000, charactersPerScript: 12000, minutesPerEpisode: 18, episodesPerMonth: 12, viewsPerVideo: 25000, rpm: 5, mode: "usage" } }
      ],
      faq: [
        ["Should I price by characters or minutes?", "Use the unit that matches the platform billing model or the contract you want to quote."],
        ["Can I use this for dubbing?", "Yes. Treat each episode or chapter as one finished narration output."],
        ["What if the plan is monthly?", "Switch to subscription mode and enter the monthly fee, then the calculator handles the rest."]
      ]
    },
    saas: {
      title: "AI SaaS Profit Calculator",
      subtitle: "Forecast revenue, API burn, margins, churn impact, and break-even users for AI tools and subscription products.",
      valueLabel: "per paid user",
      outputLabel: "monthly users",
      defaultInputs: {
        monthlyUsers: 20000,
        freeUserPct: 82,
        paidUserPct: 18,
        subscriptionPrice: 19,
        apiCostPerUser: 0.22,
        hostingCost: 180,
        databaseCost: 120,
        storageCost: 60,
        paymentFeePct: 4,
        visitsPerUser: 5,
        adRevenuePer1000Visits: 2.5,
        marketingCost: 1500,
        teamCost: 4500,
        churnPct: 6
      },
      inputs: [
        ["monthlyUsers", "Monthly users", 1, 100000000, 20000],
        ["freeUserPct", "Free users %", 0, 100, 82],
        ["paidUserPct", "Paid users %", 0, 100, 18],
        ["subscriptionPrice", "Subscription price", 0, 100000, 19],
        ["apiCostPerUser", "API cost per user", 0, 100000, 0.22],
        ["hostingCost", "Hosting cost", 0, 1000000, 180],
        ["databaseCost", "Database cost", 0, 1000000, 120],
        ["storageCost", "Storage cost", 0, 1000000, 60],
        ["paymentFeePct", "Payment fee %", 0, 100, 4],
        ["visitsPerUser", "Visits per user", 0, 1000, 5],
        ["adRevenuePer1000Visits", "Ad revenue / 1,000 visits", 0, 1000, 2.5],
        ["marketingCost", "Marketing cost", 0, 1000000, 1500],
        ["teamCost", "Team cost", 0, 10000000, 4500],
        ["churnPct", "Monthly churn %", 0, 100, 6]
      ],
      presets: [
        { label: "Starter SaaS", description: "Low-cost launch", values: { monthlyUsers: 5000, freeUserPct: 90, paidUserPct: 10, subscriptionPrice: 12, apiCostPerUser: 0.12, hostingCost: 80, databaseCost: 45, storageCost: 25, paymentFeePct: 4, visitsPerUser: 4, adRevenuePer1000Visits: 2.2, marketingCost: 800, teamCost: 1500, churnPct: 8 } },
        { label: "Growth SaaS", description: "Balanced plan", values: { monthlyUsers: 25000, freeUserPct: 82, paidUserPct: 18, subscriptionPrice: 19, apiCostPerUser: 0.22, hostingCost: 180, databaseCost: 120, storageCost: 60, paymentFeePct: 4, visitsPerUser: 5, adRevenuePer1000Visits: 2.5, marketingCost: 1500, teamCost: 4500, churnPct: 6 } },
        { label: "Pro SaaS", description: "Higher ACV", values: { monthlyUsers: 60000, freeUserPct: 75, paidUserPct: 25, subscriptionPrice: 39, apiCostPerUser: 0.35, hostingCost: 400, databaseCost: 260, storageCost: 120, paymentFeePct: 3.5, visitsPerUser: 6, adRevenuePer1000Visits: 2.9, marketingCost: 4000, teamCost: 12000, churnPct: 4 } }
      ],
      faq: [
        ["What should I count as API cost?", "Include model calls, embeddings, tools, storage, and any per-request infrastructure you directly pay for."],
        ["Why does churn matter?", "It changes lifetime value and tells you how long a paid user pays back acquisition cost."],
        ["How do I set pricing?", "Use the suggested pricing table as a starting point, then compare it against your retention and API burn."]
      ]
    },
    creator: {
      title: "Creator Profit Calculator",
      subtitle: "Estimate whether your AI-assisted YouTube, TikTok, or Shorts workflow actually earns more than it spends.",
      valueLabel: "per video",
      outputLabel: "videos",
      defaultInputs: {
        videosPerMonth: 20,
        aiImageCostPerVideo: 1.2,
        aiVoiceCostPerVideo: 1.8,
        aiMusicCostPerVideo: 1.0,
        aiVideoCostPerVideo: 6.5,
        editingToolCostPerVideo: 0.8,
        viewsPerVideo: 25000,
        rpm: 4.5,
        affiliateIncomeMonthly: 400,
        sponsorshipIncomeMonthly: 1200
      },
      inputs: [
        ["videosPerMonth", "Videos per month", 1, 1000, 20],
        ["aiImageCostPerVideo", "AI image cost / video", 0, 100000, 1.2],
        ["aiVoiceCostPerVideo", "AI voice cost / video", 0, 100000, 1.8],
        ["aiMusicCostPerVideo", "AI music cost / video", 0, 100000, 1.0],
        ["aiVideoCostPerVideo", "AI video cost / video", 0, 100000, 6.5],
        ["editingToolCostPerVideo", "Editing/tool cost / video", 0, 100000, 0.8],
        ["viewsPerVideo", "Views per video", 0, 100000000, 25000],
        ["rpm", "RPM / revenue per 1,000 views", 0, 1000, 4.5],
        ["affiliateIncomeMonthly", "Affiliate income", 0, 1000000, 400],
        ["sponsorshipIncomeMonthly", "Sponsorship income", 0, 10000000, 1200]
      ],
      presets: [
        { label: "Shorts stack", description: "Low budget social", values: { videosPerMonth: 20, aiImageCostPerVideo: 0.8, aiVoiceCostPerVideo: 1.2, aiMusicCostPerVideo: 0.8, aiVideoCostPerVideo: 4.5, editingToolCostPerVideo: 0.5, viewsPerVideo: 18000, rpm: 4, affiliateIncomeMonthly: 250, sponsorshipIncomeMonthly: 500 } },
        { label: "Creator business", description: "Balanced channel", values: { videosPerMonth: 20, aiImageCostPerVideo: 1.2, aiVoiceCostPerVideo: 1.8, aiMusicCostPerVideo: 1.0, aiVideoCostPerVideo: 6.5, editingToolCostPerVideo: 0.8, viewsPerVideo: 25000, rpm: 4.5, affiliateIncomeMonthly: 400, sponsorshipIncomeMonthly: 1200 } },
        { label: "Scaling channel", description: "Higher spend", values: { videosPerMonth: 40, aiImageCostPerVideo: 1.5, aiVoiceCostPerVideo: 2.2, aiMusicCostPerVideo: 1.2, aiVideoCostPerVideo: 8.5, editingToolCostPerVideo: 1.0, viewsPerVideo: 35000, rpm: 5, affiliateIncomeMonthly: 800, sponsorshipIncomeMonthly: 3000 } }
      ],
      faq: [
        ["What counts as production cost?", "Include all AI tool spend plus editing tools, because the real profit question is net of the whole workflow."],
        ["How do I estimate revenue?", "Use your average RPM and any affiliate or sponsorship income you actually expect."],
        ["Can I use this for planning shorts?", "Yes. Short-form creators can change the views and RPM assumptions to compare niches."]
      ]
    },
    comparison: {
      title: "AI Tool Cost Comparison",
      subtitle: "A searchable comparison layer across the music, video, and voice datasets with Western vs China grouping.",
      valueLabel: "comparison",
      outputLabel: "tools",
      defaultInputs: {},
      inputs: [],
      faq: [
        ["Why use a comparison page?", "It gives search engines a durable indexable entry point for each category and region."],
        ["Why are prices manual?", "Many creator tools change plans often or gate pricing behind login, so the calculator lets you enter verified numbers."],
        ["Can I switch currencies?", "Yes. All pages support USD, RMB, and MYR for your planning workflow."]
      ]
    },
    china: {
      title: "China AI Tools Cost Calculator",
      subtitle: "Focus on Chinese creator tools and local pricing assumptions for music, video, and voice workflows.",
      valueLabel: "per finished output",
      outputLabel: "outputs",
      defaultInputs: {},
      inputs: [],
      faq: [
        ["What is included here?", "Music, video, and voice tools from China that matter for creators and SaaS builders."],
        ["Why separate a China page?", "It helps users compare regional pricing and gives the site a stronger SEO footprint."],
        ["Do I need exact public prices?", "No. The calculator supports custom input when the official price is private or changes quickly."]
      ]
    }
  };

  const SELECTED_TOOL_KEYS = {
    music: "music",
    video: "video",
    voice: "voice"
  };

  const moneyFields = new Set([
    "monthlySubscriptionPrice",
    "includedUnits",
    "perUnitPrice",
    "customCostPerOutput",
    "subscriptionPrice",
    "apiCostPerUser",
    "hostingCost",
    "databaseCost",
    "storageCost",
    "adRevenuePer1000Visits",
    "marketingCost",
    "teamCost",
    "aiImageCostPerVideo",
    "aiVoiceCostPerVideo",
    "aiMusicCostPerVideo",
    "aiVideoCostPerVideo",
    "editingToolCostPerVideo",
    "affiliateIncomeMonthly",
    "sponsorshipIncomeMonthly"
  ]);

  const state = {};
  let pageConfig = null;
  let data = null;
  let fx = FX_FALLBACK;

  function moneySymbol(currency) {
    return fx.symbols?.[currency] || "$";
  }

  function rate(currency) {
    return Number(fx.rates?.[currency] || 1);
  }

  function toUSD(value, currency) {
    return Number(value || 0) / rate(currency);
  }

  function fromUSD(valueUSD, currency) {
    return Number(valueUSD || 0) * rate(currency);
  }

  function fmtMoney(amountUSD, currency, digits = 2) {
    const amount = fromUSD(amountUSD, currency);
    return `${moneySymbol(currency)}${amount.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
  }

  function fmtNumber(value, digits = 0) {
    const num = Number(value || 0);
    return num.toLocaleString(undefined, { maximumFractionDigits: digits });
  }

  function upsertSchema(pageUrl) {
    const existing = document.getElementById("page-schema");
    if (existing) existing.remove();
    const tool = selectedTool();
    const jsonLd = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: pageConfig.title,
        description: pageConfig.subtitle,
        url: pageUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        featureList: [
          "Live currency selector",
          "Manual pricing inputs",
          "Comparison tables",
          "LocalStorage saved inputs"
        ],
        about: {
          "@type": "Thing",
          name: tool?.name || pageConfig.title
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (pageConfig.faq || []).map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer
          }
        }))
      }
    ];
    const script = document.createElement("script");
    script.id = "page-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  function loadJSON(url) {
    return fetch(url, { cache: "no-store" }).then(res => {
      if (!res.ok) throw new Error(`${url} returned ${res.status}`);
      return res.json();
    });
  }

  function pageKey() {
    return `creator-hub:${pageConfig.id}`;
  }

  function loadState() {
    const defaults = { currency: "USD", selectedToolId: data?.tools?.[0]?.id || "", ...pageConfig.defaultInputs };
    try {
      const saved = JSON.parse(localStorage.getItem(pageKey()) || localStorage.getItem("creator-hub:undefined") || "{}");
      Object.assign(state, defaults, saved);
    } catch {
      Object.assign(state, defaults);
    }
    if (!state.selectedToolId && data?.tools?.length) state.selectedToolId = data.tools[0].id;
  }

  function persistState() {
    localStorage.setItem(pageKey(), JSON.stringify(state));
  }

  function selectedTool() {
    return data.tools.find(tool => tool.id === state.selectedToolId) || data.tools[0];
  }

  function priceModeForTool(tool) {
    return state.mode || tool.recommendedMode || tool.pricingMode || "custom";
  }

  function applyPreset(preset) {
    if (!preset?.values) return;
    Object.entries(preset.values).forEach(([key, value]) => {
      state[key] = value;
    });
    if (preset.values.mode) state.mode = preset.values.mode;
    if (preset.values.selectedToolId) state.selectedToolId = preset.values.selectedToolId;
    persistState();
    renderShell();
  }

  function billableUnits() {
    const mode = pageConfig.id;
    if (mode === "music") return Number(state.songsPerMonth || 0) * Number(state.attemptsPerSong || 0);
    if (mode === "video") return Number(state.videosPerMonth || 0) * Number(state.clipsPerVideo || 0) * Number(state.regenerationAttempts || 0) * (Number(state.secondsPerClip || 0) / 10);
    if (mode === "voice") {
      const scriptMode = state.scriptMode || "characters";
      if (scriptMode === "words") return Number(state.wordsPerScript || 0) / 1000;
      if (scriptMode === "minutes") return Number(state.minutesPerEpisode || 0) * Number(state.episodesPerMonth || 0);
      return Number(state.charactersPerScript || 0) / 1000;
    }
    return 0;
  }

  function outputCount() {
    if (pageConfig.id === "music") return Number(state.songsPerMonth || 0);
    if (pageConfig.id === "video") return Number(state.videosPerMonth || 0);
    if (pageConfig.id === "voice") return Number(state.episodesPerMonth || 0);
    return 0;
  }

  function monthlyCostUSD() {
    const tool = selectedTool();
    const mode = priceModeForTool(tool);
    const units = billableUnits();
    const subscription = Number(state.monthlySubscriptionPrice || 0);
    const included = Number(state.includedUnits || 0);
    const perUnit = Number(state.perUnitPrice || 0);
    const custom = Number(state.customCostPerOutput || 0);
    if (mode === "subscription") return subscription + Math.max(0, units - included) * perUnit;
    if (mode === "usage") return subscription + Math.max(0, units - included) * perUnit;
    return custom * units;
  }

  function resultForCurrentPage() {
    const currency = state.currency || "USD";
    const monthlyUSD = monthlyCostUSD();
    if (pageConfig.id === "music") {
      const songs = Number(state.songsPerMonth || 0);
      const videos = Number(state.videosPerMonth || 0);
      const views = Number(state.viewsPerVideo || 0);
      const rpm = Number(state.rpm || 0);
      const perSong = songs > 0 ? monthlyUSD / songs : 0;
      const perVideo = videos > 0 ? monthlyUSD / videos : 0;
      const revPerVideo = views * rpm / 1000;
      return {
        monthlyUSD,
        costPerOutputUSD: perSong,
        costPerVideoUSD: perVideo,
        breakEvenViews: rpm > 0 && perVideo > 0 ? (perVideo / rpm) * 1000 : null,
        revenueUSD: revPerVideo * videos,
        profitUSD: revPerVideo * videos - monthlyUSD
      };
    }
    if (pageConfig.id === "video") {
      const videos = Number(state.videosPerMonth || 0);
      const totalMinutes = videos * Number(state.clipsPerVideo || 0) * Number(state.secondsPerClip || 0) / 60;
      const perVideo = videos > 0 ? monthlyUSD / videos : 0;
      const perMinute = totalMinutes > 0 ? monthlyUSD / totalMinutes : 0;
      const rpm = Number(state.rpm || 0);
      const views = Number(state.viewsPerVideo || 0);
      const revPerVideo = views * rpm / 1000;
      return {
        monthlyUSD,
        costPerOutputUSD: perVideo,
        costPerMinuteUSD: perMinute,
        breakEvenViews: rpm > 0 && perVideo > 0 ? (perVideo / rpm) * 1000 : null,
        revenueUSD: revPerVideo * videos,
        profitUSD: revPerVideo * videos - monthlyUSD
      };
    }
    if (pageConfig.id === "voice") {
      const episodes = Number(state.episodesPerMonth || 0);
      const perNarration = episodes > 0 ? monthlyUSD / episodes : 0;
      const rpm = Number(state.rpm || 0);
      const views = Number(state.viewsPerVideo || 0);
      const revPerEpisode = views * rpm / 1000;
      return {
        monthlyUSD,
        costPerOutputUSD: perNarration,
        breakEvenViews: rpm > 0 && perNarration > 0 ? (perNarration / rpm) * 1000 : null,
        revenueUSD: revPerEpisode * episodes,
        profitUSD: revPerEpisode * episodes - monthlyUSD
      };
    }
    if (pageConfig.id === "saas") {
      const monthlyUsers = Number(state.monthlyUsers || 0);
      const freePct = Number(state.freeUserPct || 0) / 100;
      const paidPct = Number(state.paidUserPct || 0) / 100;
      const paidUsers = monthlyUsers * paidPct;
      const freeUsers = monthlyUsers * freePct;
      const subPrice = fromUSD(Number(state.subscriptionPrice || 0), state.currency);
      const apiCost = fromUSD(Number(state.apiCostPerUser || 0), state.currency) * monthlyUsers;
      const hosting = fromUSD(Number(state.hostingCost || 0), state.currency);
      const db = fromUSD(Number(state.databaseCost || 0), state.currency);
      const storage = fromUSD(Number(state.storageCost || 0), state.currency);
      const marketing = fromUSD(Number(state.marketingCost || 0), state.currency);
      const team = fromUSD(Number(state.teamCost || 0), state.currency);
      const visits = monthlyUsers * Number(state.visitsPerUser || 0);
      const adRev = visits / 1000 * fromUSD(Number(state.adRevenuePer1000Visits || 0), state.currency);
      const revenue = paidUsers * subPrice + adRev;
      const paymentFee = revenue * (Number(state.paymentFeePct || 0) / 100);
      const fixed = hosting + db + storage + marketing + team;
      const totalExpenses = apiCost + paymentFee + fixed;
      const grossProfit = revenue - apiCost - paymentFee;
      const netProfit = revenue - totalExpenses;
      const churn = Number(state.churnPct || 0) / 100;
      const ltv = churn > 0 ? ((subPrice * (1 - Number(state.paymentFeePct || 0) / 100)) - (fromUSD(Number(state.apiCostPerUser || 0), state.currency))) / churn : null;
      const perPaidContribution = (subPrice * (1 - Number(state.paymentFeePct || 0) / 100)) - fromUSD(Number(state.apiCostPerUser || 0), state.currency);
      const breakEvenUsers = perPaidContribution > 0 ? fixed / perPaidContribution : null;
      const retainedUsers12m = monthlyUsers * Math.pow(1 - churn, 12);
      const priceSuggestions = [1.4, 1.9, 2.8].map(multiplier => ({
        tier: multiplier < 1.6 ? "Starter" : multiplier < 2.3 ? "Growth" : "Pro",
        price: subPrice * multiplier,
        margin: Math.max(0, 1 - (apiCost / Math.max(1, revenue))),
      }));
      return { monthlyUsers, freeUsers, paidUsers, revenueUSD: revenue, apiCost, totalExpenses, grossProfit, netProfit, ltv, breakEvenUsers, retainedUsers12m, priceSuggestions, paymentFee, adRev };
    }
    if (pageConfig.id === "creator") {
      const videos = Number(state.videosPerMonth || 0);
      const perVideo = fromUSD(Number(state.aiImageCostPerVideo || 0), state.currency) +
        fromUSD(Number(state.aiVoiceCostPerVideo || 0), state.currency) +
        fromUSD(Number(state.aiMusicCostPerVideo || 0), state.currency) +
        fromUSD(Number(state.aiVideoCostPerVideo || 0), state.currency) +
        fromUSD(Number(state.editingToolCostPerVideo || 0), state.currency);
      const monthlyCost = perVideo * videos;
      const viewsPerVideo = Number(state.viewsPerVideo || 0);
      const rpm = Number(state.rpm || 0);
      const affiliate = fromUSD(Number(state.affiliateIncomeMonthly || 0), state.currency);
      const sponsorship = fromUSD(Number(state.sponsorshipIncomeMonthly || 0), state.currency);
      const rev = (viewsPerVideo * videos * rpm / 1000) + affiliate + sponsorship;
      const breakEvenViews = rpm > 0 && perVideo > 0 ? (perVideo / rpm) * 1000 : null;
      const best = (viewsPerVideo * 1.2 * videos * rpm * 1.2 / 1000) + affiliate * 1.1 + sponsorship * 1.2 - monthlyCost;
      const avg = rev - monthlyCost;
      const worst = (viewsPerVideo * 0.7 * videos * rpm * 0.75 / 1000) + affiliate * 0.8 + sponsorship * 0.75 - monthlyCost;
      return { monthlyCostUSD: monthlyCost, perVideoUSD: perVideo, revenueUSD: rev, breakEvenViews, best, avg, worst };
    }
    return {};
  }

  function currencyOptionsHtml() {
    return Object.keys(fx.rates).map(code => `<option value="${code}">${code}</option>`).join("");
  }

  function toolOptionsHtml() {
    return data.tools.map(tool => `<option value="${tool.id}">${tool.name} (${tool.region})</option>`).join("");
  }

  function renderShell() {
    const root = document.getElementById("app");
    if (!root) return;
    if (pageConfig.id === "comparison" || pageConfig.id === "china") {
      renderDirectoryPage(root);
      return;
    }
    const tool = selectedTool();
    const pageTitle = pageConfig.title;
    const mode = priceModeForTool(tool);
    const presetMarkup = (pageConfig.presets || []).length ? `
      <div class="mt-4 rounded-lg border border-slate-800 bg-slate-950/45 p-4">
        <div class="text-xs font-bold uppercase tracking-wide text-slate-500">Quick start</div>
        <div class="mt-1 text-sm text-slate-400">Tap a preset to load a realistic setup.</div>
        <div class="mt-3 grid gap-2 sm:grid-cols-3">
          ${(pageConfig.presets || []).map((preset, idx) => `
            <button type="button" class="preset-btn rounded-lg border border-slate-700 bg-slate-900/80 p-3 text-left transition hover:border-emerald-400/40 hover:bg-slate-900" data-preset="${idx}">
              <div class="text-sm font-bold text-white">${preset.label}</div>
              <div class="mt-1 text-xs leading-5 text-slate-400">${preset.description}</div>
            </button>
          `).join("")}
        </div>
      </div>
    ` : "";
    const inputRows = pageConfig.inputs.map(([key, label, min, max, step]) => {
      const value = moneyFields.has(key) ? fromUSD(state[key] || 0, state.currency || "USD") : Number(state[key] || 0);
      return `
        <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3">
          <div class="mb-2 text-sm font-semibold text-slate-200">${label}</div>
          <input data-key="${key}" data-kind="${moneyFields.has(key) ? "money" : "number"}" type="number" min="${min}" max="${max}" step="${step}" value="${value}" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400/40">
        </label>
      `;
    }).join("");

    root.innerHTML = `
      <section class="grid gap-5 xl:grid-cols-[1.12fr_.88fr]">
        <div class="glass rounded-lg p-5 shadow-glow order-first xl:order-2">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 class="text-xl font-bold text-white">${pageTitle}</h2>
              <p class="mt-1 text-sm text-slate-400">${pageConfig.subtitle}</p>
            </div>
            <div class="grid gap-2 sm:grid-cols-2">
              <label class="block">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Currency</span>
                <select id="currencySelect" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">${currencyOptionsHtml()}</select>
              </label>
              <label class="block">
                <span class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Tool</span>
                <select id="toolSelect" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">${toolOptionsHtml()}</select>
              </label>
            </div>
          </div>
          <div class="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4">
            <div class="text-xs font-bold uppercase tracking-wide text-emerald-200">Selected tool</div>
            <div class="mt-1 text-lg font-bold text-white" id="toolName"></div>
            <p class="mt-1 text-sm text-slate-300" id="toolNotes"></p>
          </div>
          ${presetMarkup}
          <div class="mt-4 grid gap-3 sm:grid-cols-2">${inputRows}</div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3">
              <div class="mb-2 text-sm font-semibold text-slate-200">Billing mode</div>
              <select id="modeSelect" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                <option value="subscription">Subscription / bundle</option>
                <option value="usage">Usage-based</option>
                <option value="custom">Custom cost per output</option>
              </select>
            </label>
            <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3">
              <div class="mb-2 text-sm font-semibold text-slate-200">Monthly subscription price</div>
              <input id="monthlySubscriptionPrice" type="number" min="0" step="0.01" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            </label>
            <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3">
              <div class="mb-2 text-sm font-semibold text-slate-200">Included units</div>
              <input id="includedUnits" type="number" min="0" step="0.01" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            </label>
            <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3">
              <div class="mb-2 text-sm font-semibold text-slate-200">Extra price per unit</div>
              <input id="perUnitPrice" type="number" min="0" step="0.01" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            </label>
            <label class="block rounded-lg border border-slate-800 bg-slate-950/45 p-3 sm:col-span-2">
              <div class="mb-2 text-sm font-semibold text-slate-200">Custom cost per output</div>
              <input id="customCostPerOutput" type="number" min="0" step="0.01" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            </label>
          </div>
          ${pageConfig.id === "voice" ? `
            <div class="mt-4 rounded-lg border border-slate-800 bg-slate-950/45 p-4">
              <div class="mb-2 text-sm font-semibold text-slate-200">Voice input mode</div>
              <select id="scriptMode" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
                <option value="characters">Characters</option>
                <option value="words">Words</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          ` : ""}
        </div>
        <div class="glass rounded-lg p-5 shadow-glow order-last xl:order-1">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-lg font-bold text-white">Live Result</h3>
              <p class="mt-1 text-sm text-slate-400">${pageConfig.valueLabel} cost, margins, and break-even logic.</p>
            </div>
            <div class="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-right">
              <div class="text-[10px] font-bold uppercase tracking-wide text-emerald-200">Monthly total</div>
              <div id="monthlyTotal" class="text-2xl font-extrabold text-white">$0.00</div>
            </div>
          </div>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="metric rounded-lg p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-400">Cost / ${pageConfig.outputLabel}</div><div id="costPerOutput" class="mt-2 text-2xl font-bold text-white">$0.00</div></div>
            <div class="metric rounded-lg p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-400">Revenue</div><div id="revenueValue" class="mt-2 text-2xl font-bold text-emerald-200">$0.00</div></div>
            <div class="metric rounded-lg p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-400">Profit</div><div id="profitValue" class="mt-2 text-2xl font-bold text-indigo-200">$0.00</div></div>
            <div class="metric rounded-lg p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-400">Break-even views</div><div id="breakEvenViews" class="mt-2 text-2xl font-bold text-amber-200">n/a</div></div>
          </div>
          ${pageConfig.id === "music" ? `<div class="mt-4 rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost per video</div><div id="musicCostPerVideo" class="mt-2 text-2xl font-bold text-emerald-200">$0.00</div></div>` : ""}
          ${pageConfig.id === "video" ? `<div class="mt-4 rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost per minute</div><div id="videoCostPerMinute" class="mt-2 text-2xl font-bold text-emerald-200">$0.00</div></div>` : ""}
          ${pageConfig.id === "voice" ? `<div class="mt-4 grid gap-3 sm:grid-cols-2"><div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost per narration</div><div id="voiceCostPerNarration" class="mt-2 text-2xl font-bold text-emerald-200">$0.00</div></div><div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost per chapter video</div><div id="voiceCostPerChapter" class="mt-2 text-2xl font-bold text-indigo-200">$0.00</div></div></div>` : ""}
          <div class="mt-4 rounded-lg border border-slate-800 bg-slate-950/45 p-4">
            <div class="text-xs font-bold uppercase tracking-wide text-slate-500">Tool status</div>
            <div id="toolStatus" class="mt-1 text-sm text-slate-300"></div>
          </div>
          ${pageConfig.id === "saas" ? `
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Gross profit</div><div id="grossProfit" class="mt-2 text-2xl font-bold text-white">$0.00</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Net profit margin</div><div id="netMargin" class="mt-2 text-2xl font-bold text-emerald-200">0%</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Break-even users</div><div id="breakEvenUsers" class="mt-2 text-2xl font-bold text-amber-200">n/a</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">LTV estimate</div><div id="ltvValue" class="mt-2 text-2xl font-bold text-indigo-200">$0.00</div></div>
            </div>
          ` : ""}
          ${pageConfig.id === "creator" ? `
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Cost / video</div><div id="creatorCostPerVideo" class="mt-2 text-2xl font-bold text-white">$0.00</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly production cost</div><div id="creatorMonthlyCost" class="mt-2 text-2xl font-bold text-amber-200">$0.00</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Best case</div><div id="creatorBest" class="mt-2 text-2xl font-bold text-emerald-200">$0.00</div></div>
              <div class="rounded-lg border border-slate-800 bg-slate-950/45 p-4"><div class="text-xs font-semibold uppercase tracking-wide text-slate-500">Worst case</div><div id="creatorWorst" class="mt-2 text-2xl font-bold text-rose-200">$0.00</div></div>
            </div>
          ` : ""}
        </div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 class="text-lg font-bold text-white">Western vs China Comparison</h3>
            <p class="mt-1 text-sm text-slate-400">Manual pricing stays visible, so users can verify and compare before buying credits or subscriptions.</p>
          </div>
          <div class="text-xs font-semibold uppercase tracking-wide text-slate-500">${data.disclaimer}</div>
        </div>
        <div id="comparisonTable" class="mt-4 overflow-x-auto"></div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <h3 class="text-lg font-bold text-white">FAQ</h3>
        <div id="faqList" class="mt-4 grid gap-3"></div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <h3 class="text-lg font-bold text-white">Internal Links</h3>
        <div id="internalLinks" class="mt-4 flex flex-wrap gap-2"></div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <div class="text-xs font-bold uppercase tracking-wide text-slate-500">Last updated</div>
        <div class="mt-2 text-sm text-slate-300">${data.updatedAt}</div>
      </section>
    `;

    document.getElementById("currencySelect").value = state.currency || "USD";
    document.getElementById("toolSelect").value = state.selectedToolId;
    document.getElementById("modeSelect").value = mode;
    if (pageConfig.id === "voice") document.getElementById("scriptMode").value = state.scriptMode || "characters";
    for (const [key] of pageConfig.inputs) {
      const el = root.querySelector(`[data-key="${key}"]`);
      if (el) el.value = moneyFields.has(key) ? fromUSD(state[key] || 0, state.currency || "USD") : state[key];
    }
    document.getElementById("monthlySubscriptionPrice").value = fmtNumber(fromUSD(state.monthlySubscriptionPrice || 0, state.currency), 2);
    document.getElementById("includedUnits").value = fmtNumber(state.includedUnits || 0, 0);
    document.getElementById("perUnitPrice").value = fmtNumber(fromUSD(state.perUnitPrice || 0, state.currency), 2);
    document.getElementById("customCostPerOutput").value = fmtNumber(fromUSD(state.customCostPerOutput || 0, state.currency), 2);

    document.getElementById("toolName").textContent = tool.name;
    document.getElementById("toolNotes").textContent = `${tool.region} • ${tool.unitLabel} • ${tool.notes}`;
    document.getElementById("toolStatus").textContent = `${tool.pricingMode === "custom" ? "Custom pricing required." : "Pricing configured."} ${data.disclaimer}`;

    const result = resultForCurrentPage();
    renderOutputs(result);
    renderComparison();
    renderFAQ();
    renderLinks();
    upsertSchema(window.location.href);
    bindEvents();
  }

  function renderDirectoryPage(root) {
    const tables = pageConfig.id === "china"
      ? [
          { title: "China tools", region: "China" },
          { title: "Western tools", region: "Western" }
        ]
      : [
          { title: "Western tools", region: "Western" },
          { title: "China tools", region: "China" }
        ];
    const filtered = region => data.tools.filter(tool => tool.region === region);
    root.innerHTML = `
      <section class="glass rounded-lg p-5 shadow-glow">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 class="text-xl font-bold text-white">${pageConfig.title}</h2>
            <p class="mt-1 text-sm text-slate-400">${pageConfig.subtitle}</p>
          </div>
          <div class="grid gap-2 sm:grid-cols-2">
            <label class="block">
              <span class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Currency</span>
              <select id="currencySelect" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">${currencyOptionsHtml()}</select>
            </label>
            <label class="block">
              <span class="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
              <input id="searchInput" type="text" placeholder="Search tools" class="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm">
            </label>
          </div>
        </div>
        <div class="mt-4 rounded-lg border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-50">${data.disclaimer}</div>
        <div id="dirTables" class="mt-4 grid gap-4"></div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <h3 class="text-lg font-bold text-white">FAQ</h3>
        <div id="faqList" class="mt-4 grid gap-3"></div>
      </section>

      <section class="glass mt-5 rounded-lg p-5 shadow-glow">
        <h3 class="text-lg font-bold text-white">Internal Links</h3>
        <div id="internalLinks" class="mt-4 flex flex-wrap gap-2"></div>
      </section>
    `;
    document.getElementById("currencySelect").value = state.currency || "USD";
    renderFAQ();
    renderLinks();
    upsertSchema(window.location.href);
    const searchInput = document.getElementById("searchInput");
    const drawTables = () => {
      const query = String(searchInput.value || "").toLowerCase();
      const sections = tables.map(({ title, region }) => {
        const rows = filtered(region).filter(tool => !query || `${tool.name} ${tool.notes} ${tool.unitLabel} ${tool.category || ""}`.toLowerCase().includes(query)).map(tool => `
          <tr class="border-t border-slate-800">
            <td class="px-3 py-3 font-semibold text-white">${tool.name}</td>
            <td class="px-3 py-3 text-slate-300">${tool.category || "General"}</td>
            <td class="px-3 py-3 text-slate-300">${tool.pricingMode}</td>
            <td class="px-3 py-3 text-slate-400">${tool.unitLabel}</td>
            <td class="px-3 py-3 text-slate-400">${tool.notes}</td>
          </tr>
        `).join("");
        return `
          <div class="overflow-hidden rounded-lg border border-slate-800 bg-slate-950/45">
            <div class="border-b border-slate-800 px-4 py-3">
              <h4 class="font-bold text-white">${title}</h4>
            </div>
            <table class="min-w-full text-left text-sm">
              <thead>
                <tr class="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
                  <th class="px-3 py-2">Tool</th>
                  <th class="px-3 py-2">Category</th>
                  <th class="px-3 py-2">Pricing</th>
                  <th class="px-3 py-2">Unit</th>
                  <th class="px-3 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>${rows || `<tr><td class="px-3 py-4 text-slate-400" colspan="4">No tools match this search.</td></tr>`}</tbody>
            </table>
          </div>
        `;
      }).join("");
      document.getElementById("dirTables").innerHTML = sections;
    };
    searchInput.addEventListener("input", drawTables);
    drawTables();
    const currencySelect = document.getElementById("currencySelect");
    currencySelect.addEventListener("change", event => {
      state.currency = event.target.value;
      persistState();
    });
  }

  function renderOutputs(result) {
    const currency = state.currency || "USD";
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };
    setText("monthlyTotal", fmtMoney(result.monthlyUSD || 0, currency));
    setText("costPerOutput", fmtMoney(result.costPerOutputUSD || 0, currency));
    setText("revenueValue", fmtMoney(result.revenueUSD || 0, currency));
    setText("profitValue", fmtMoney(result.profitUSD || 0, currency));
    setText("breakEvenViews", result.breakEvenViews ? fmtNumber(result.breakEvenViews, 0) : "n/a");
    if (pageConfig.id === "music") setText("musicCostPerVideo", fmtMoney(result.costPerVideoUSD || 0, currency));
    if (pageConfig.id === "video") setText("videoCostPerMinute", fmtMoney(result.costPerMinuteUSD || 0, currency));
    if (pageConfig.id === "voice") {
      setText("voiceCostPerNarration", fmtMoney(result.costPerOutputUSD || 0, currency));
      setText("voiceCostPerChapter", fmtMoney(result.costPerOutputUSD || 0, currency));
    }
    if (pageConfig.id === "saas") {
      setText("grossProfit", fmtMoney(result.grossProfit || 0, currency));
      setText("netMargin", `${result.revenueUSD ? fmtNumber((result.netProfit / result.revenueUSD) * 100, 1) : 0}%`);
      setText("breakEvenUsers", result.breakEvenUsers ? fmtNumber(result.breakEvenUsers, 0) : "n/a");
      setText("ltvValue", result.ltv ? fmtMoney(result.ltv, currency) : "n/a");
      const suggestionEl = document.getElementById("toolStatus");
      if (suggestionEl) {
        suggestionEl.textContent = `Retained users after 12 months: ${fmtNumber(result.retainedUsers12m, 0)}. Ad revenue input contributes ${fmtMoney(result.adRev || 0, currency)} monthly.`;
      }
    }
    if (pageConfig.id === "creator") {
      setText("creatorCostPerVideo", fmtMoney(result.perVideoUSD || 0, currency));
      setText("creatorMonthlyCost", fmtMoney(result.monthlyCostUSD || 0, currency));
      setText("creatorBest", fmtMoney(result.best || 0, currency));
      setText("creatorWorst", fmtMoney(result.worst || 0, currency));
    }
  }

  function renderComparison() {
    const container = document.getElementById("comparisonTable");
    const rows = data.tools.map(tool => `
      <tr class="border-t border-slate-800">
        <td class="px-3 py-3 font-semibold text-white">${tool.name}</td>
        <td class="px-3 py-3 text-slate-300">${tool.region}</td>
        <td class="px-3 py-3 text-slate-300">${tool.pricingMode}</td>
        <td class="px-3 py-3 text-slate-400">${tool.unitLabel}</td>
        <td class="px-3 py-3 text-slate-400">${tool.notes}</td>
      </tr>
    `).join("");
    container.innerHTML = `
      <table class="min-w-full text-left text-sm">
        <thead>
          <tr class="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-500">
            <th class="px-3 py-2">Tool</th>
            <th class="px-3 py-2">Region</th>
            <th class="px-3 py-2">Pricing</th>
            <th class="px-3 py-2">Unit</th>
            <th class="px-3 py-2">Notes</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderFAQ() {
    const container = document.getElementById("faqList");
    container.innerHTML = pageConfig.faq.map(([question, answer]) => `
      <details class="rounded-lg border border-slate-800 bg-slate-950/45 p-4">
        <summary class="cursor-pointer text-sm font-semibold text-white">${question}</summary>
        <p class="mt-2 text-sm leading-6 text-slate-300">${answer}</p>
      </details>
    `).join("");
  }

  function renderLinks() {
    const links = [
      ["/music-cost-calculator", "Music calculator"],
      ["/ai-video-cost-calculator", "Video calculator"],
      ["/ai-voice-cost-calculator", "Voice calculator"],
      ["/ai-saas-profit-calculator", "SaaS profit"],
      ["/creator-profit-calculator", "Creator profit"],
      ["/china-ai-tools-cost-calculator", "China tools"],
      ["/ai-tool-cost-comparison", "Comparison"],
      ["/ai-cost-guides/", "SEO guides"]
    ];
    document.getElementById("internalLinks").innerHTML = links.map(([href, label]) => `
      <a href="${href}" class="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-emerald-400/40 hover:text-emerald-100">${label}</a>
    `).join("");
  }

  function bindEvents() {
    const currencySelect = document.getElementById("currencySelect");
    const toolSelect = document.getElementById("toolSelect");
    const modeSelect = document.getElementById("modeSelect");
    const scriptMode = document.getElementById("scriptMode");

    const onMoneyInput = event => {
      const key = event.target.dataset.key;
      const value = Number(event.target.value || 0);
      state[key] = toUSD(value, state.currency || "USD");
      persistState();
      renderShell();
    };
    const onNumberInput = event => {
      const key = event.target.dataset.key;
      state[key] = Number(event.target.value || 0);
      persistState();
      renderShell();
    };

    document.querySelectorAll("[data-kind='money']").forEach(el => {
      el.addEventListener("input", onMoneyInput);
    });
    document.querySelectorAll("[data-kind='number']").forEach(el => {
      el.addEventListener("input", onNumberInput);
    });
    currencySelect.addEventListener("change", event => {
      state.currency = event.target.value;
      persistState();
      renderShell();
    });
    toolSelect.addEventListener("change", event => {
      state.selectedToolId = event.target.value;
      const tool = selectedTool();
      state.mode = tool.recommendedMode || tool.pricingMode || "custom";
      persistState();
      renderShell();
    });
    modeSelect.addEventListener("change", event => {
      state.mode = event.target.value;
      persistState();
      renderShell();
    });
    if (scriptMode) {
      scriptMode.addEventListener("change", event => {
        state.scriptMode = event.target.value;
        persistState();
        renderShell();
      });
    }
    document.querySelectorAll(".preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const presetIndex = Number(btn.dataset.preset || 0);
        const preset = pageConfig.presets?.[presetIndex];
        applyPreset(preset);
      });
    });
    document.getElementById("monthlySubscriptionPrice").addEventListener("input", event => {
      state.monthlySubscriptionPrice = toUSD(Number(event.target.value || 0), state.currency || "USD");
      persistState();
      renderShell();
    });
    document.getElementById("includedUnits").addEventListener("input", event => {
      state.includedUnits = Number(event.target.value || 0);
      persistState();
      renderShell();
    });
    document.getElementById("perUnitPrice").addEventListener("input", event => {
      state.perUnitPrice = toUSD(Number(event.target.value || 0), state.currency || "USD");
      persistState();
      renderShell();
    });
    document.getElementById("customCostPerOutput").addEventListener("input", event => {
      state.customCostPerOutput = toUSD(Number(event.target.value || 0), state.currency || "USD");
      persistState();
      renderShell();
    });
  }

  async function init() {
    const config = window.CALC_PAGE_CONFIG;
    if (!config) return;
    pageConfig = { id: config.pageId, ...(PAGE_DEFS[config.pageId] || {}) };
    if (!pageConfig) return;
    data = await loadJSON(config.dataUrl);
    try {
      fx = await loadJSON(config.fxUrl || "/data/fxDefaults.json");
    } catch {
      fx = FX_FALLBACK;
    }
    loadState();
    renderShell();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
