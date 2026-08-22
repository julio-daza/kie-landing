export type Lang = "en" | "es";

export const LANGS: Record<Lang, string> = { en: "English", es: "Español" };
export const REPO = "https://github.com/julio-daza/kie-cli";

const en = {
  meta: {
    title: "kie — KIE.ai media generation CLI for agents",
    description:
      "Generate images and video on KIE.ai from the terminal or from an AI agent. Zero dependencies, key in the OS keychain, no callbacks, hard spend guards.",
  },
  nav: { features: "Why", install: "Install", tutorials: "Tutorials", docs: "Docs", skill: "Agent skill", github: "GitHub", lang: "ES" },
  hero: {
    eyebrow: "Open source · MIT · 0 runtime dependencies",
    headline: "Generate media. Keep your keys.",
    sub: "A command-line tool that lets AI agents create images and video on KIE.ai — without ever handing them the API key, and with a hard ceiling on what a single run can spend.",
    ctaPrimary: "Get started",
    ctaSecondary: "Read the docs",
    copy: "Copy",
    copied: "Copied",
    terminalTitle: "kie help",
  },
  agents: {
    label: "Works with",
    items: [
      { name: "Codex", icon: "openai", hint: "$kie-media" },
      { name: "Claude Code", icon: "claude", hint: "/kie-media" },
      { name: "Cursor", icon: "cursor", hint: "/ in Agent chat" },
      { name: "Gemini CLI", icon: "gemini", hint: "auto-activated" },
    ],
  },
  why: {
    eyebrow: "Why another CLI",
    title: "Built for the one thing other wrappers get wrong: the key is paid.",
    lead: "Media APIs are the most expensive credentials to leak. Most integrations read the key from an env var, pull in hundreds of packages and ship a default webhook. kie does none of that.",
    cards: [
      {
        t: "Key in the keychain",
        d: "Stored in macOS Keychain (0600 file elsewhere). Env vars need an explicit opt-in. Every byte of output goes through a redactor.",
      },
      {
        t: "No third-party egress",
        d: "Talks only to api.kie.ai and KIE's upload host. Never sends a callBackUrl — results are polled, nothing about your generations is pushed anywhere.",
      },
      {
        t: "Spend guard, before the request",
        d: "Per-task cap, a daily budget computed from the real credits KIE reports, and a balance check. Blocked means nothing left your machine.",
      },
      {
        t: "Agent-native contract",
        d: "JSON on stdout, messages on stderr, exit codes you can branch on. Pretty tables when a human runs it in a terminal.",
      },
      {
        t: "Zero dependencies",
        d: "Node ≥ 20 built-ins only. The code that touches your key is ~700 lines you can read before trusting it.",
      },
      {
        t: "Always downloads",
        d: "KIE result URLs expire in 24 hours. kie writes files to disk and hands back paths, never links.",
      },
    ],
  },
  install: {
    eyebrow: "Install",
    title: "Two minutes, done right.",
    steps: [
      {
        t: "Install from npm",
        d: "Node ≥ 20. Published from GitHub Actions with provenance — `npm audit signatures` verifies the tarball came from the repo.",
        code: "npm i -g @uxdata-co/kie\nkie version",
      },
      {
        t: "Create a dedicated key",
        d: "At kie.ai/api-key, make a key just for agents and set hourly/daily caps plus an IP whitelist. KIE enforces those even if this CLI is bypassed.",
        code: "# https://kie.ai/api-key → new key → caps + IP whitelist",
      },
      {
        t: "Store it, verify it",
        d: "Input is hidden. The key goes to the Keychain and never appears in output again.",
        code: "kie key set\nkie key check",
      },
    ],
  },
  usage: {
    eyebrow: "Usage",
    title: "One command per job.",
    tabs: { image: "Image", video: "Video", edit: "Edit with a reference", raw: "Any model" },
    image: `kie image nano-banana-2 \\
  --prompt "isometric coffee shop, warm light" \\
  --aspect 16:9 --resolution 2K --out ./assets`,
    video: `kie video kling-3.0 \\
  --prompt "drone shot over a fjord at dawn" \\
  --duration 5 --sound --max-credits 80`,
    edit: `kie upload ./sketch.png          # → temporary URL
kie image nano-banana-2 \\
  --prompt "same scene at night" \\
  --ref https://…/sketch.png`,
    raw: `kie run some-vendor/some-model \\
  --input '{"prompt":"…"}' --max-credits 30`,
    resultTitle: "What comes back",
  },
  tutorials: {
    eyebrow: "Tutorials",
    title: "Generate images from chat.",
    lead: "This is the whole point: your coding agent makes the media, you keep the key. One install, one skill, then you just ask.",
    common: {
      title: "Once, for any agent",
      steps: [
        { t: "Install the CLI", code: "npm i -g @uxdata-co/kie" },
        { t: "Store the key — it never reaches the agent", code: "kie key set" },
        { t: "Install the kie-media skill", code: "kie skill install                 # Claude Code, Codex, Cursor, Gemini CLI\nkie skill install --agent cursor  # just one" },
      ],
      note: "Prefer the skills CLI? `npx skills add julio-daza/kie-cli` does the same for any supported agent.",
    },
    tabs: {
      claude: {
        label: "Claude Code",
        steps: [
          "Start a new session — skills are discovered at startup. CLI, desktop app and IDE extension all read ~/.claude/skills/.",
          "Ask in plain language. The description triggers the skill; /kie-media invokes it explicitly.",
          "Claude checks the budget, generates, downloads, and answers with the file path and credits spent.",
        ],
        prompt: "Generate a 16:9 hero image of an isometric coffee shop with warm light, for the landing page.",
        reply: "Done — 8 credits. Saved to assets/hero-coffee.png (1920×1080). Want a night version with the same composition?",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"isometric coffee shop, warm light\" --aspect 16:9 --out ./assets --name hero-coffee --json"],
      },
      codex: {
        label: "Codex",
        steps: [
          "Start a new session — CLI, IDE extension and desktop app all read ~/.agents/skills/. /skills lists what is installed.",
          "Ask naturally, or call it with $kie-media. For video, say the cap out loud.",
          "Codex runs the CLI with --json and reports the file path; a blocked request (exit 3) comes back with the reason.",
        ],
        prompt: "$kie-media make a 5-second clip of the barista sliding a cup across the counter, soft dolly-in. Cap it at 80 credits.",
        reply: "Kling 3.0, 5 s with sound — 64 credits. Saved to assets/barista-slide.mp4. Exit 0; 120 credits left today.",
        cmds: ["kie upload ./assets/hero-coffee.png --json", "kie video kling-3.0 --prompt \"barista slides a cup across the counter, soft dolly-in\" --image <url> --duration 5 --sound --max-credits 80 --json"],
      },
      cursor: {
        label: "Cursor",
        steps: [
          "Open a new Agent chat (Cursor 2.4+). Skills load from ~/.cursor/skills/ and ~/.agents/skills/.",
          "Type / and pick kie-media to attach it to the message — or just ask; the description matches on its own.",
          "Cursor runs the CLI in its terminal and replies with the file path; review the image in the editor.",
        ],
        prompt: "/kie-media I need three 1:1 product shots of a ceramic mug on linen, soft daylight, for the shop grid.",
        reply: "Three images, 8 credits each — 24 total. Saved to public/shop/mug-1.png, mug-2.png, mug-3.png. Want a darker variant?",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"ceramic mug on linen, soft daylight\" --aspect 1:1 --out ./public/shop --name mug-1 --json"],
      },
      gemini: {
        label: "Gemini CLI",
        steps: [
          "Start gemini in your project. /skills list shows kie-media (from ~/.gemini/skills/ or ~/.agents/skills/).",
          "Ask naturally — there is no slash command. When the request matches, Gemini calls activate_skill and asks for consent the first time.",
          "Gemini runs the CLI with --json, reports the path and credits; a blocked request (exit 3) comes back with the reason.",
        ],
        prompt: "Make a 9:16 teaser image of a night market street with neon signs for our Instagram story.",
        reply: "Generated with nano-banana-2 (12 credits, 2K). Saved to assets/stories/night-market.png. 164 credits left today.",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"night market street, neon signs\" --aspect 9:16 --resolution 2K --out ./assets/stories --name night-market --json"],
      },
    },
    rules: {
      title: "What the agent will and won't do",
      items: [
        "Images first; video only after you approve the look, always with --max-credits.",
        "A spend-guard block (exit 3) is reported with its reason — it never raises the cap by itself.",
        "It never asks for, prints or sets the API key. Missing key → it tells you to run kie key set.",
        "You get a file path, never a KIE URL (they expire in 24 h).",
      ],
      budget: "Daily ceiling for everything the agent does: kie config set dailyBudget 300",
    },
  },
  guard: {
    eyebrow: "Spend guard",
    title: "Blocked means nothing was sent.",
    lead: "KIE doesn't publish per-model prices in its API docs, so kie doesn't guess. It layers three independent checks and refuses with exit code 3 if any fails.",
    checks: [
      { n: "01", t: "Per-task cap", d: "Models with a verified price are compared against maxCreditsPerTask. Everything else requires an explicit --max-credits — the agent has to say out loud how much it accepts to spend." },
      { n: "02", t: "Daily budget", d: "A local ledger records every task; when it completes, the real creditsConsumed is written back. Pending tasks count at their cap, so a burst can't overshoot." },
      { n: "03", t: "Balance", d: "If the estimate exceeds what's left on the account, the request never leaves." },
    ],
    exit: "Exit codes",
    codes: [
      ["0", "success"],
      ["1", "task failed on KIE's side"],
      ["2", "usage error"],
      ["3", "blocked by the spend guard"],
      ["4", "timed out — task still running, resume with kie wait"],
      ["5", "API / auth error"],
    ],
  },
  docs: {
    eyebrow: "Documentation",
    title: "Commands",
    commands: [
      ["kie key set|check|delete", "Store the API key (Keychain / 0600 file), verify it, remove it."],
      ["kie credits", "Balance plus today's spend against the daily budget."],
      ["kie models [--kind image|video]", "Curated catalog with the flags each model supports."],
      ["kie image <model> --prompt … [opts]", "Generate an image, wait, download."],
      ["kie video <model> --prompt … [opts]", "Generate a video, wait, download."],
      ["kie run <model-id> --input '{…}' --max-credits N", "Escape hatch for any KIE Market model."],
      ["kie status <taskId>", "One poll, no download."],
      ["kie wait <taskId> [--out dir]", "Poll until done, download, settle the ledger."],
      ["kie upload <file>", "Local file → temporary URL for --ref / --image (KIE deletes it after ~3 days)."],
      ["kie ledger [--limit 20]", "Local spend log with real creditsConsumed."],
      ["kie config set <key> <value>", "dailyBudget · maxCreditsPerTask · outDir · pollSeconds · waitTimeoutSeconds"],
      ["kie skill install [--agent claude|codex|cursor|gemini|all]", "Install the kie-media agent skill (--project for the current repo)."],
    ],
    flagsTitle: "Generation flags",
    flags: [
      ["--prompt <text>", "The prompt."],
      ["--ref <url>", "Reference image, repeatable (edit / style / multimodal reference)."],
      ["--image <url> / --end-image <url>", "First and last frame for video."],
      ["--aspect, --resolution, --duration", "16:9 · 1K|2K|4K|720p · seconds"],
      ["--sound, --fast, --format", "Native audio · cheaper variant · png|jpg"],
      ["--set key=value", "Raw model field, repeatable. callBackUrl is rejected."],
      ["--max-credits <n>", "Accept spending up to n credits on this task."],
      ["--dry-run", "Print the exact request, send nothing."],
      ["--out <dir>, --name <base>, --no-wait", "Where files go · base filename · submit and return."],
      ["--json, --pretty, --no-color, --quiet", "Output control. JSON is automatic when piped."],
    ],
    catalogTitle: "Catalog",
    catalog: [
      ["nano-banana-2", "image", "Google Nano Banana 2 — generate + edit with up to 14 refs. Est. 1K=8 · 2K=12 · 4K=18 credits."],
      ["seedream-v4", "image", "ByteDance Seedream V4 — text-to-image, switches to edit with --ref."],
      ["kling-3.0", "video", "Kling 3.0 — 3–15 s, native audio, --set mode=pro."],
      ["seedance-2.5", "video", "ByteDance Seedance 2.5 — frames or multimodal refs, 4–30 s."],
      ["minimax-h3", "video", "MiniMax H3 — sub-model chosen from your flags (text / image / reference)."],
      ["veo3", "video", "Google Veo 3 — own endpoint, --fast for veo3_fast."],
    ],
    more: "Full reference in the README",
    teaser: "Install, key storage, every command and flag, the model catalog, spend guard and exit codes, configuration, the agent skill for four agents, security notes.",
    cta: "Read the documentation",
  },
  skill: {
    eyebrow: "Agent skill",
    title: "Teach your agent the etiquette.",
    lead: "The package ships an agent skill (Agent Skills spec) for Claude Code, Codex, Cursor and Gemini CLI. It tells the agent when to generate, which model to pick, to check the budget first, to always pass --max-credits on video, and to return file paths — never URLs.",
    code: "kie skill install                    # Claude Code, Codex, Cursor, Gemini CLI\nnpx skills add julio-daza/kie-cli    # alternative",
    rules: [
      "Check kie credits before the first generation.",
      "Images first, video only after the user approves the look.",
      "Exit 3 → report the reason, never retry with a bigger cap on its own.",
      "Never ask for, echo or set the API key.",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    items: [
      { q: "Is this affiliated with KIE.ai?", a: "No. It's an independent, community project. KIE and its logo are trademarks of their owner, used only to identify the service." },
      { q: "Does it work on Linux or Windows?", a: "Yes. Without a Keychain the key is stored in ~/.config/kie/key with 0600 permissions. Everything else is identical." },
      { q: "How is the npm package built?", a: "Every release is published by GitHub Actions from a git tag, with npm provenance: the tarball is cryptographically linked to the commit and workflow that produced it. Zero runtime dependencies, so what you audit is what runs." },
      { q: "What if a model isn't in the catalog?", a: "kie run <model-id> --input '{…}' --max-credits N sends any KIE Market model. Check the schema on docs.kie.ai first, or use --dry-run." },
      { q: "Can I use it without an agent?", a: "Of course. In a terminal it renders tables, panels and a live spinner; pipe it and you get JSON." },
    ],
  },
  cta: {
    title: "Give your agents a camera, not your wallet.",
    button: "View on GitHub",
    sub: "MIT licensed. Read the source before you trust it with a key — that's the point.",
  },
  footer: { built: "Built by Julio Daza. Not affiliated with KIE.ai.", license: "MIT License" },
};

const es: typeof en = {
  meta: {
    title: "kie — CLI de generación de medios en KIE.ai para agentes",
    description:
      "Genera imágenes y video en KIE.ai desde la terminal o desde un agente de IA. Cero dependencias, key en el llavero del sistema, sin callbacks, límites de gasto estrictos.",
  },
  nav: { features: "Por qué", install: "Instalar", tutorials: "Tutoriales", docs: "Docs", skill: "Skill de agente", github: "GitHub", lang: "EN" },
  hero: {
    eyebrow: "Open source · MIT · 0 dependencias en runtime",
    headline: "Genera medios. Conserva tus llaves.",
    sub: "Una herramienta de línea de comandos para que los agentes de IA creen imágenes y video en KIE.ai — sin entregarles nunca la API key, y con un techo duro a lo que puede gastar una sola ejecución.",
    ctaPrimary: "Empezar",
    ctaSecondary: "Leer la documentación",
    copy: "Copiar",
    copied: "Copiado",
    terminalTitle: "kie help",
  },
  agents: {
    label: "Funciona con",
    items: [
      { name: "Codex", icon: "openai", hint: "$kie-media" },
      { name: "Claude Code", icon: "claude", hint: "/kie-media" },
      { name: "Cursor", icon: "cursor", hint: "/ en el chat del Agente" },
      { name: "Gemini CLI", icon: "gemini", hint: "se activa sola" },
    ],
  },
  why: {
    eyebrow: "Por qué otra CLI",
    title: "Construida para lo único que otros wrappers hacen mal: la llave cuesta dinero.",
    lead: "Las APIs de medios son las credenciales más caras de perder. La mayoría de integraciones leen la key de una variable de entorno, arrastran cientos de paquetes y traen un webhook por defecto. kie no hace nada de eso.",
    cards: [
      {
        t: "Key en el llavero",
        d: "Se guarda en el Keychain de macOS (archivo 0600 en otros sistemas). Las variables de entorno requieren opt-in explícito. Toda la salida pasa por un redactor.",
      },
      {
        t: "Sin salidas a terceros",
        d: "Solo habla con api.kie.ai y el host de subida de KIE. Nunca envía callBackUrl — los resultados se consultan por polling, nada de tus generaciones se empuja a ningún lado.",
      },
      {
        t: "Guardia de gasto, antes del request",
        d: "Tope por tarea, presupuesto diario calculado con los créditos reales que reporta KIE y chequeo de saldo. Bloqueado significa que nada salió de tu máquina.",
      },
      {
        t: "Contrato nativo para agentes",
        d: "JSON en stdout, mensajes en stderr, códigos de salida para bifurcar. Tablas legibles cuando lo ejecuta un humano en la terminal.",
      },
      {
        t: "Cero dependencias",
        d: "Solo built-ins de Node ≥ 20. El código que toca tu key son ~700 líneas que puedes leer antes de confiarle nada.",
      },
      {
        t: "Siempre descarga",
        d: "Las URLs de resultado de KIE expiran en 24 horas. kie escribe archivos a disco y devuelve rutas, nunca enlaces.",
      },
    ],
  },
  install: {
    eyebrow: "Instalación",
    title: "Dos minutos, bien hechos.",
    steps: [
      {
        t: "Instala desde npm",
        d: "Node ≥ 20. Publicado desde GitHub Actions con provenance — `npm audit signatures` verifica que el tarball salió del repo.",
        code: "npm i -g @uxdata-co/kie\nkie version",
      },
      {
        t: "Crea una key dedicada",
        d: "En kie.ai/api-key crea una key solo para agentes y ponle topes por hora/día más una lista blanca de IPs. KIE los aplica aunque alguien se salte esta CLI.",
        code: "# https://kie.ai/api-key → nueva key → topes + IP whitelist",
      },
      {
        t: "Guárdala y verifícala",
        d: "La entrada está oculta. La key va al llavero y no vuelve a aparecer en ninguna salida.",
        code: "kie key set\nkie key check",
      },
    ],
  },
  usage: {
    eyebrow: "Uso",
    title: "Un comando por trabajo.",
    tabs: { image: "Imagen", video: "Video", edit: "Editar con referencia", raw: "Cualquier modelo" },
    image: `kie image nano-banana-2 \\
  --prompt "cafetería isométrica, luz cálida" \\
  --aspect 16:9 --resolution 2K --out ./assets`,
    video: `kie video kling-3.0 \\
  --prompt "toma de dron sobre un fiordo al amanecer" \\
  --duration 5 --sound --max-credits 80`,
    edit: `kie upload ./boceto.png          # → URL temporal
kie image nano-banana-2 \\
  --prompt "la misma escena de noche" \\
  --ref https://…/boceto.png`,
    raw: `kie run algun-vendor/algun-modelo \\
  --input '{"prompt":"…"}' --max-credits 30`,
    resultTitle: "Lo que vuelve",
  },
  tutorials: {
    eyebrow: "Tutoriales",
    title: "Genera imágenes desde el chat.",
    lead: "De esto se trata: tu agente de código produce los medios, tú conservas la llave. Una instalación, un skill, y después solo pides.",
    common: {
      title: "Una vez, para cualquier agente",
      steps: [
        { t: "Instala la CLI", code: "npm i -g @uxdata-co/kie" },
        { t: "Guarda la key — nunca llega al agente", code: "kie key set" },
        { t: "Instala el skill kie-media", code: "kie skill install                 # Claude Code, Codex, Cursor, Gemini CLI\nkie skill install --agent cursor  # solo uno" },
      ],
      note: "¿Prefieres la CLI de skills? `npx skills add julio-daza/kie-cli` hace lo mismo para cualquier agente soportado.",
    },
    tabs: {
      claude: {
        label: "Claude Code",
        steps: [
          "Abre una sesión nueva — los skills se detectan al arrancar. CLI, app de escritorio y extensión de IDE leen ~/.claude/skills/.",
          "Pide en lenguaje natural. La descripción activa el skill; /kie-media lo invoca explícitamente.",
          "Claude revisa el presupuesto, genera, descarga y responde con la ruta del archivo y los créditos gastados.",
        ],
        prompt: "Genera una imagen hero 16:9 de una cafetería isométrica con luz cálida, para la landing.",
        reply: "Listo — 8 créditos. Guardada en assets/hero-coffee.png (1920×1080). ¿Quieres una versión nocturna con la misma composición?",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"cafetería isométrica, luz cálida\" --aspect 16:9 --out ./assets --name hero-coffee --json"],
      },
      codex: {
        label: "Codex",
        steps: [
          "Abre una sesión nueva — CLI, extensión de IDE y app de escritorio leen ~/.agents/skills/. /skills lista lo instalado.",
          "Pide con naturalidad o invócalo con $kie-media. Para video, di el tope en voz alta.",
          "Codex corre la CLI con --json y reporta la ruta del archivo; un request bloqueado (exit 3) vuelve con la razón.",
        ],
        prompt: "$kie-media haz un clip de 5 segundos del barista deslizando una taza por la barra, dolly-in suave. Tope de 80 créditos.",
        reply: "Kling 3.0, 5 s con sonido — 64 créditos. Guardado en assets/barista-slide.mp4. Exit 0; quedan 120 créditos hoy.",
        cmds: ["kie upload ./assets/hero-coffee.png --json", "kie video kling-3.0 --prompt \"el barista desliza una taza por la barra, dolly-in suave\" --image <url> --duration 5 --sound --max-credits 80 --json"],
      },
      cursor: {
        label: "Cursor",
        steps: [
          "Abre un chat nuevo del Agente (Cursor 2.4+). Los skills se cargan de ~/.cursor/skills/ y ~/.agents/skills/.",
          "Escribe / y elige kie-media para adjuntarlo al mensaje — o solo pide; la descripción lo activa sola.",
          "Cursor corre la CLI en su terminal y responde con la ruta del archivo; revisa la imagen en el editor.",
        ],
        prompt: "/kie-media necesito tres fotos de producto 1:1 de una taza de cerámica sobre lino, luz de día suave, para la grilla de la tienda.",
        reply: "Tres imágenes, 8 créditos cada una — 24 en total. Guardadas en public/shop/mug-1.png, mug-2.png, mug-3.png. ¿Quieres una variante más oscura?",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"taza de cerámica sobre lino, luz de día suave\" --aspect 1:1 --out ./public/shop --name mug-1 --json"],
      },
      gemini: {
        label: "Gemini CLI",
        steps: [
          "Inicia gemini en tu proyecto. /skills list muestra kie-media (desde ~/.gemini/skills/ o ~/.agents/skills/).",
          "Pide con naturalidad — no hay comando con barra. Cuando el pedido coincide, Gemini llama a activate_skill y pide consentimiento la primera vez.",
          "Gemini corre la CLI con --json, reporta la ruta y los créditos; un request bloqueado (exit 3) vuelve con la razón.",
        ],
        prompt: "Haz una imagen teaser 9:16 de una calle de mercado nocturno con letreros de neón para nuestra historia de Instagram.",
        reply: "Generada con nano-banana-2 (12 créditos, 2K). Guardada en assets/stories/night-market.png. Quedan 164 créditos hoy.",
        cmds: ["kie credits --json", "kie image nano-banana-2 --prompt \"calle de mercado nocturno, letreros de neón\" --aspect 9:16 --resolution 2K --out ./assets/stories --name night-market --json"],
      },
    },
    rules: {
      title: "Qué hará y qué no hará el agente",
      items: [
        "Primero imágenes; video solo cuando apruebas el look, siempre con --max-credits.",
        "Un bloqueo de la guardia (exit 3) se reporta con su razón — nunca sube el tope por su cuenta.",
        "Nunca pide, muestra ni configura la API key. Si falta → te dice que corras kie key set.",
        "Recibes una ruta de archivo, nunca una URL de KIE (expiran en 24 h).",
      ],
      budget: "Techo diario para todo lo que haga el agente: kie config set dailyBudget 300",
    },
  },
  guard: {
    eyebrow: "Guardia de gasto",
    title: "Bloqueado significa que no se envió nada.",
    lead: "KIE no publica precios por modelo en su documentación de API, así que kie no adivina. Apila tres chequeos independientes y rechaza con código de salida 3 si alguno falla.",
    checks: [
      { n: "01", t: "Tope por tarea", d: "Los modelos con precio verificado se comparan contra maxCreditsPerTask. Todo lo demás exige un --max-credits explícito — el agente tiene que decir en voz alta cuánto acepta gastar." },
      { n: "02", t: "Presupuesto diario", d: "Un ledger local registra cada tarea; al completarse se escribe el creditsConsumed real. Las tareas pendientes cuentan por su tope, así una ráfaga no se pasa." },
      { n: "03", t: "Saldo", d: "Si la estimación supera lo que queda en la cuenta, el request nunca sale." },
    ],
    exit: "Códigos de salida",
    codes: [
      ["0", "éxito"],
      ["1", "la tarea falló del lado de KIE"],
      ["2", "error de uso"],
      ["3", "bloqueado por la guardia de gasto"],
      ["4", "tiempo agotado — la tarea sigue corriendo, retoma con kie wait"],
      ["5", "error de API / autenticación"],
    ],
  },
  docs: {
    eyebrow: "Documentación",
    title: "Comandos",
    commands: [
      ["kie key set|check|delete", "Guardar la API key (Keychain / archivo 0600), verificarla, eliminarla."],
      ["kie credits", "Saldo más el gasto de hoy contra el presupuesto diario."],
      ["kie models [--kind image|video]", "Catálogo curado con los flags que soporta cada modelo."],
      ["kie image <modelo> --prompt … [opts]", "Generar una imagen, esperar, descargar."],
      ["kie video <modelo> --prompt … [opts]", "Generar un video, esperar, descargar."],
      ["kie run <model-id> --input '{…}' --max-credits N", "Vía de escape para cualquier modelo del Market de KIE."],
      ["kie status <taskId>", "Una consulta, sin descarga."],
      ["kie wait <taskId> [--out dir]", "Consultar hasta terminar, descargar, cerrar el ledger."],
      ["kie upload <archivo>", "Archivo local → URL temporal para --ref / --image (KIE lo borra a los ~3 días)."],
      ["kie ledger [--limit 20]", "Registro local de gasto con creditsConsumed reales."],
      ["kie config set <clave> <valor>", "dailyBudget · maxCreditsPerTask · outDir · pollSeconds · waitTimeoutSeconds"],
      ["kie skill install [--agent claude|codex|cursor|gemini|all]", "Instalar el skill kie-media (--project para el repo actual)."],
    ],
    flagsTitle: "Flags de generación",
    flags: [
      ["--prompt <texto>", "El prompt."],
      ["--ref <url>", "Imagen de referencia, repetible (edición / estilo / referencia multimodal)."],
      ["--image <url> / --end-image <url>", "Primer y último frame para video."],
      ["--aspect, --resolution, --duration", "16:9 · 1K|2K|4K|720p · segundos"],
      ["--sound, --fast, --format", "Audio nativo · variante barata · png|jpg"],
      ["--set clave=valor", "Campo crudo del modelo, repetible. callBackUrl se rechaza."],
      ["--max-credits <n>", "Aceptar gastar hasta n créditos en esta tarea."],
      ["--dry-run", "Imprime el request exacto, no envía nada."],
      ["--out <dir>, --name <base>, --no-wait", "Dónde van los archivos · nombre base · enviar y volver."],
      ["--json, --pretty, --no-color, --quiet", "Control de salida. JSON es automático al hacer pipe."],
    ],
    catalogTitle: "Catálogo",
    catalog: [
      ["nano-banana-2", "imagen", "Google Nano Banana 2 — genera + edita con hasta 14 referencias. Est. 1K=8 · 2K=12 · 4K=18 créditos."],
      ["seedream-v4", "imagen", "ByteDance Seedream V4 — texto a imagen, pasa a edición con --ref."],
      ["kling-3.0", "video", "Kling 3.0 — 3–15 s, audio nativo, --set mode=pro."],
      ["seedance-2.5", "video", "ByteDance Seedance 2.5 — frames o referencias multimodales, 4–30 s."],
      ["minimax-h3", "video", "MiniMax H3 — elige el submodelo según tus flags (texto / imagen / referencia)."],
      ["veo3", "video", "Google Veo 3 — endpoint propio, --fast para veo3_fast."],
    ],
    more: "Referencia completa en el README",
    teaser: "Instalación, almacenamiento de la key, todos los comandos y flags, catálogo de modelos, guardia de gasto y códigos de salida, configuración, el skill para cuatro agentes, notas de seguridad.",
    cta: "Leer la documentación",
  },
  skill: {
    eyebrow: "Skill de agente",
    title: "Enséñale la etiqueta a tu agente.",
    lead: "El paquete incluye un skill de agente (spec Agent Skills) para Claude Code, Codex, Cursor y Gemini CLI. Le dice al agente cuándo generar, qué modelo elegir, que revise el presupuesto primero, que siempre pase --max-credits en video y que devuelva rutas de archivo — nunca URLs.",
    code: "kie skill install                    # Claude Code, Codex, Cursor, Gemini CLI\nnpx skills add julio-daza/kie-cli    # alternativa",
    rules: [
      "Revisar kie credits antes de la primera generación.",
      "Primero imágenes; video solo cuando el usuario aprueba el look.",
      "Exit 3 → reportar la razón, nunca reintentar con un tope mayor por su cuenta.",
      "Nunca pedir, mostrar ni configurar la API key.",
    ],
  },
  faq: {
    eyebrow: "Preguntas frecuentes",
    items: [
      { q: "¿Está afiliado a KIE.ai?", a: "No. Es un proyecto independiente de la comunidad. KIE y su logo son marcas de su propietario, usadas solo para identificar el servicio." },
      { q: "¿Funciona en Linux o Windows?", a: "Sí. Sin Keychain, la key se guarda en ~/.config/kie/key con permisos 0600. Todo lo demás es idéntico." },
      { q: "¿Cómo se construye el paquete de npm?", a: "Cada release la publica GitHub Actions desde un tag de git, con provenance de npm: el tarball queda vinculado criptográficamente al commit y al workflow que lo produjo. Cero dependencias en runtime: lo que auditas es lo que corre." },
      { q: "¿Y si un modelo no está en el catálogo?", a: "kie run <model-id> --input '{…}' --max-credits N envía cualquier modelo del Market de KIE. Revisa el schema en docs.kie.ai primero, o usa --dry-run." },
      { q: "¿Puedo usarlo sin un agente?", a: "Claro. En la terminal muestra tablas, paneles y un spinner en vivo; si haces pipe obtienes JSON." },
    ],
  },
  cta: {
    title: "Dale a tus agentes una cámara, no tu billetera.",
    button: "Ver en GitHub",
    sub: "Licencia MIT. Lee el código antes de confiarle una key — de eso se trata.",
  },
  footer: { built: "Hecho por Julio Daza. Sin afiliación con KIE.ai.", license: "Licencia MIT" },
};

export const ui: Record<Lang, typeof en> = { en, es };

export function t(lang: Lang) {
  return ui[lang];
}

export function localePath(lang: Lang, path = "/"): string {
  return lang === "en" ? path : `/es${path === "/" ? "/" : path}`;
}
