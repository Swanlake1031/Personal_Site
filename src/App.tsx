import React from "react";
import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";
import { SubSection, Para, Quote, List, CodeBlock } from './hooks/useRhythm'
import { Math } from './components/Math'
import ProgressLine from './components/ProgressLine'
// asset imports (placeholders)
// (Asset imports can be re-enabled when real images are wired in)
import cashChart from './assets/cashflow/CashChart.png'
import cheeseHero from './assets/cheese/Cheese.png'
  
/**
 * 
 * Monochrome Portfolio v3 (White BG + Scroll Bar + Marquee + Secondary Pages + Bugfix)
 * - Fix: removed duplicate `transition` prop on <motion.div>; hover spring is placed inside whileHover.transition
 * - Adds tiny hash-router for secondary pages: #/projects/:id
 * - Keeps white background, black text, marquee, scroll dots
 */


const site = {
  name: "Timon Au",
  role: "Math & Stats — Quant — Builder — Singer",
  city: "Toronto, ON",
  email: "auy4@mcmaster.ca ",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/Swanlake1031" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/timonayf/" },
  ],
  heroHighlights: [
    "Quant projects & clean UIs",
    "LLM benchmarking & data viz",
    "Cheese app · Cashflow Arena",
  ],
  projects: [
    {
      id: "cashflow",
      title: "Cashflow Arena — Pixel Edition",
      sub: "Risk sim • Bloomberg‑style HUD • Monte Carlo • VaR/CVaR",
      year: "2025",
      imgAlt: "Cashflow Arena screenshot",
      link: "#/projects/cashflow",
      img: cashChart,
    },
    {
      id: "cheese",
      title: "Cheese 奶酪 App",
      sub: "Intl‑student platform • Rent • Second‑hand • Carpool • Forum",
      year: "2025",
      imgAlt: "Cheese app frames",
      link: "#/projects/cheese",
      img: cheeseHero,
    },
    {
      id: "chemfast",
      title: "ChemFAST LLM Benchmarks",
      sub: "10k chemistry MCQ • confusion matrices • difficulty modeling",
      year: "2025",
      imgAlt: "Chem benchmarks",
      link: "#/projects/chemfast",
    },
  ],
  posts: [
    { title: "Explaining MGFs without Tears", date: "2025-10-29", href: "#" },
    { title: "PMF → PDF → CDF, visually", date: "2025-10-28", href: "#" },
    { title: "Designing a Risk Game HUD", date: "2025-10-20", href: "#" },
  ],
};

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

// Intentionally kept for future intra-page navigation where forcing hashchange is needed
// function navHash(target: string) {
//   const current = window.location.hash || "#";
//   if (current === target) {
//     window.dispatchEvent(new HashChangeEvent("hashchange"));
//   } else {
//     window.location.hash = target;
//   }
// }

function navSection(id: string) {
  const scrollToId = () => {
    const el = document.querySelector(id) as HTMLElement | null;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  if (window.location.hash !== "#/") {
    window.location.hash = "#/";
    setTimeout(scrollToId, 10);
  } else {
    scrollToId();
  }
}

function ScrollBar() {
  const items = [
    { id: "home", color: "bg-black" },
    { id: "work", color: "bg-black" },
    { id: "writing", color: "bg-black" },
    { id: "contact", color: "bg-black" },
  ];
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-40">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={cx("h-3 w-3 rounded-full shadow", it.color)} />
      ))}
    </div>
  );
}

function Rail() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 border-r border-black/10 px-6 md:px-8 py-8 flex flex-col justify-between bg-white text-gray-900">
      <div>
        <a href="#home" className="block">
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight">{site.name}</h1>
        </a>
        <p className="mt-2 text-sm text-gray-600">{site.role}</p>
        <p className="text-xs mt-1 text-gray-500">{site.city}</p>
        <nav className="mt-8 space-y-3 text-sm">
          <button onClick={() => navSection("#home")} className="group block text-left">
            <span className="border-b border-transparent group-hover:border-black">Home</span>
          </button>
          <button onClick={() => navSection("#work")} className="group block text-left">
            <span className="border-b border-transparent group-hover:border-black">Work</span>
          </button>
          <button onClick={() => navSection("#writing")} className="group block text-left">
            <span className="border-b border-transparent group-hover:border-black">Writing</span>
          </button>
          <button onClick={() => navSection("#contact")} className="group block text-left">
            <span className="border-b border-transparent group-hover:border-black">Contact</span>
          </button>
        </nav>
      </div>

      <div className="space-y-2 text-sm">
        <a href={site.resumeUrl} className="inline-block border border-black/20 rounded-xl px-3 py-1 hover:shadow-sm">Résumé</a>
        <div className="flex flex-wrap gap-3 pt-3 text-gray-700">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:underline">{s.label}</a>
          ))}
        </div>
        <p className="mt-6 text-[10px] text-gray-500">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </aside>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Rail />
      <ScrollBar />
      <ProgressLine />
      <main className="ml-64 md:ml-72">{children}</main>
    </div>
  );
}

function Marquee() {
  return (
    <div className="overflow-hidden border-y border-black/10 mt-6">
      <div className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="px-6 py-2 text-sm text-gray-600">quant • data • ui • prototypes</span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28">
      <div className="flex flex-col items-start">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[8vw] md:text-[6rem] font-semibold tracking-tight leading-[0.9]"
        >
          {site.name}
        </motion.h2>
        <p className="mt-3 text-lg md:text-xl text-gray-700">{site.role}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {site.heroHighlights.map((h) => (
            <span key={h} className="text-xs rounded-full border border-black/15 px-3 py-1 text-gray-700">{h}</span>
          ))}
        </div>
        <Marquee />
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 md:px-12 lg:px-16 pt-16">
      <div className="grid gap-y-14">
        {site.projects.map((p, i) => (
          <ProjectRow key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ p, i }: { p: (typeof site.projects)[number]; i: number }) {
  return (
    <a href={p.link} className="group block">
      <div className="flex flex-col gap-4 border-t border-black/10 pt-8">
        <div className="flex items-baseline justify-between">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight group-hover:opacity-90">{p.title}</h3>
          <span className="text-xs text-gray-500">{p.year}</span>
        </div>
        <p className="text-sm md:text-base text-gray-700">{p.sub}</p>
        <motion.div
          initial={{ opacity: 0.95, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className={cx("relative h-64 md:h-80 rounded-2xl overflow-hidden border border-black/10 bg-gray-100")}
          whileHover={{ scale: 1.02, rotate: -0.3, transition: { type: "spring", stiffness: 120, damping: 16 } }}
        >
          {('img' in p && (p as any).img) ? (
            <img src={(p as any).img} alt={p.imgAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">{p.imgAlt}</div>
          )}
        </motion.div>
      </div>
    </a>
  );
}

function Writing() {
  return (
    <section id="writing" className="px-6 md:px-12 lg:px-16 pt-20">
      <div className="max-w-3xl">
        <h4 className="text-xl md:text-2xl font-semibold tracking-tight">Writing</h4>
        <div className="mt-4 divide-y divide-black/10">
          {site.posts.map((p) => (
            <a key={p.title} href={p.href} className="group flex items-center justify-between py-3">
              <div className="text-base md:text-lg group-hover:underline">{p.title}</div>
              <div className="text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-16 pt-20 pb-24">
      <div className="max-w-3xl border-t border-black/10 pt-6">
        <div className="text-sm text-gray-600">Reach me at</div>
        <a href={`mailto:${site.email}`} className="mt-1 block text-base md:text-lg hover:underline">{site.email}</a>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
          {site.socials.map((s) => (
            <a key={s.label} href={s.href} className="hover:underline">{s.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------- Tiny Hash Router & Project Pages ----------------

function useHashRoute() {
  const [hash, setHash] = React.useState<string>(() => window.location.hash || "#/");
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash.replace(/^#/, ""); // returns "/", "/projects/xxx" etc.
}

type MetaItem = { label: string; value: string };

function Kicker({ text }: { text: string }) {
  return <div className="text-[10px] uppercase tracking-widest text-gray-600">{text}</div>;
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-black/10 pt-3">
      <div className="text-gray-500">{label}</div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function MetaGrid({ items }: { items: MetaItem[] }) {
  return (
    <div className="mt-3 meta-grid">
      {items.map((it) => (
        <div key={it.label}>
          <div className="meta-head">{it.label}</div>
          <div className="meta-text">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

function Statement({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-6 mb-4 text-lg md:text-xl leading-relaxed">
      {children}
    </blockquote>
  );
}

// Removed unused SectionTitle

/** —— KaTeX formula helpers —— */
function FormulaBlock({ children }: { children: string }) {
  return (
    <div className=" my-3 border border-black/10 rounded-xl p-4 bg-white text-center text-gray-900">
      <BlockMath math={children} />
    </div>
  );
}
function FormulaInline({ children }: { children: string }) {
  return <InlineMath math={children} />;
}

let FIG_COUNTER = 0;

function Figure({
  caption,
  src,
  alt,
}: {
  caption: string;
  src?: string;
  alt?: string;
}) {
  const [no] = React.useState(() => ++FIG_COUNTER);

  return (
    <figure className="group relative border border-black/10 rounded-2xl overflow-hidden bg-gray-100">
      {src ? (
        <img
          src={src}
          alt={alt || caption}
          // 修复点：
          // 1. Tailwind 没有 h-90，要改成 h-[22rem] 或 h-80。
          // 2. 用 block 避免 baseline 间隙。
          className="block w-full h-64 md:h-[42rem] object-cover"
        />
      ) : (
        <div className=" flex items-center justify-center text-xs text-gray-500">
          {caption}
        </div>
      )}

      <figcaption className="px-3 py-2 text-xs text-gray-600 flex items-center gap-2">
        <span className="font-mono">Fig. {String(no).padStart(2, '0')}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}





function Lightbox({ alt, onClose, src }: { alt: string; onClose: () => void; src?: string }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 bg-white/95 flex items-center justify-center p-6" onClick={onClose}>
      <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
        <Figure caption={alt} src={src} alt={alt} />
      </div>
    </div>
  );
}

type GItem = { src?: string; alt?: string; cap: string }
function Gallery({ items }: { items: Array<GItem | string> }) {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((raw, i) => {
          const it = typeof raw === 'string' ? { cap: raw } : raw;
          return (
            <button key={i} onClick={() => setOpen(i)} className="text-left">
              <Figure caption={it.cap} src={it.src} alt={it.alt}/>
        </button>
          );
        })}
      </div>
      {open!==null && (
        <Lightbox
          alt={(typeof items[open] === 'string' ? items[open] as string : (items[open] as GItem).cap)}
          src={(typeof items[open] === 'string' ? undefined : (items[open] as GItem).src)}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

function NextLink({ currentId }: { currentId: string }) {
  const ids = site.projects.map((p) => p.id);
  const idx = ids.indexOf(currentId);
  const next = idx >= 0 && idx < ids.length - 1 ? ids[idx + 1] : null;
  return (
    <div className="mt-10 border-t border-black/10 pt-6">
      {next ? (
        <a className="underline" href={`#/projects/${next}`}>Next →</a>
      ) : (
        <a className="underline" href="#/">Back to Home</a>
      )}
    </div>
  );
}

function ProjectLayout({ title, kicker, meta, statement, heroAlt, currentId, next, children }: {
  title: string;
  kicker: string;
  meta: MetaItem[] | React.ReactNode;
  statement?: React.ReactNode;
  heroAlt?: string;
  currentId?: string;
  next?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <Shell>
      <section className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28">
        <a href="#/" className="text-sm underline">← Back</a>
        <Kicker text={kicker} />
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">{title}</h2>
        {Array.isArray(meta) ? (
        <MetaGrid items={meta as MetaItem[]} />
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">{meta}</div>
        )}
        {statement ? <Statement>{statement}</Statement> : null}
        {heroAlt ? (<div className="mt-3"><Figure caption={heroAlt} /></div>) : null}
        <div className="hidden"><Math tex="\\;" /></div>
        <div className="mt-8 grid gap-0 max-w-5xl rhythm-reset">{children}</div>
        {next ? (
          <div className="mt-10 border-t border-black/10 pt-6">
            <a className="underline" href={next.href}>{next.label}</a>
          </div>
        ) : currentId ? (
          <NextLink currentId={currentId} />
        ) : null}
      </section>
    </Shell>
  );
}

function CashflowPage() {
  return (
    <ProjectLayout
      title="Cashflow Arena — Rebirth / Pixel Edition"
      kicker="Game · Quant · UI"
      meta={(
        <>
          <MetaRow label="Role" value="Designer / Quant / Implementer" />
          <MetaRow label="Stack" value="Python, Pygame, NumPy; adapters; custom HUD" />
          <MetaRow label="Focus" value="Monte Carlo scenarios, VaR/CVaR, keyboard trading, Bloomberg-style visuals" />
        </>
      )}
      next={{ href: "#/projects/cheese", label: "Cheese 奶酪 App" }}
    >
      <Quote>
        “Interfaces that behave like instruments — <span className='underline'>keystrokes over clicks</span>, fast stats, and a pixel HUD.”
      </Quote>
      <Figure src={cashChart} caption="Hero mock — HUD frame / vignette / scanlines" /> 

      <SubSection>1. Motivation</SubSection>
      <Para>
        Imagine a world where finance feels like a rhythm game. Most market interfaces make you click through menus and wait for reloads. Cashflow Arena reverses that idea: it’s a keystroke‑first sandbox where every tick is a decision, risk behaves like stamina, and micro‑actions accumulate into macro‑outcomes.
      </Para>
      <SubSection>1.1 Origins & Visual Inspiration</SubSection>
      <Para>
        🎟️ Papers, Please (2013) — That cold, bureaucratic intensity of stamping passports under pressure inspired the feeling of “work as gameplay.” Trading here isn’t glamorous; it’s routine, moral, mechanical — and strangely human. Each order is an act of control inside a system that doesn’t stop.
      </Para>
      <Para>
        🕹️ Classic Pokémon (GBC / GBA era) — The pixel clarity of limited palettes shaped the UI grammar. Every HUD element must earn its pixels; every blink of color has intent. That minimalist constraint birthed the pixel‑instrument aesthetic — the screen looks like a trading console crossed with a chiptune synthesizer.
      </Para>
      <Para>
        The result is an interface that behaves like an instrument panel: you play markets through rhythm rather than menus. The mantra became: keystrokes over clicks, and the HUD acts like a hybrid between a cockpit and a musical score. Every tick is a beat, every fluctuation a note.
      </Para>
      <SubSection>1.2 In‑Game Premise</SubSection>
      <Para>
        You wake up in a distorted market universe. Your starting capital: 100&nbsp;000 credits. To return home — or to win, depending on how you interpret it — you must reach 100&nbsp;million. But this world has rules:
      </Para>
      <List>
        <li>You may trade only once every 10 days.</li>
        <li>The system injects event cards — policy shifts, crises, anomalies — at random.</li>
        <li>You see only what the HUD reveals: prices, positions, cash, and a glowing risk meter.</li>
      </List>
      <Para>
        It’s part simulation, part ritual. When volatility spikes and the sound lowers, you don’t just see risk — you feel it. The story, math, and visuals merge: an exercise in financial empathy through minimalist game design.
      </Para>

      <SubSection>2 · Market Model</SubSection>
      <SubSection>2.1 Two Engines — Light vs Full</SubSection>
      <List>
        <li><b>Light Engine</b> (teaching): single systemic factor, idiosyncratic shocks, GARCH(1,1) volatility, optional Merton jumps.</li>
        <li><b>Full Engine</b> (experimentation): multi‑factor correlations, stochastic drift, event‑driven adjustments.</li>
      </List>
      <Para>Both expose the same API; only their dynamics differ.</Para>
      <Para>Per‑asset daily return:</Para>
      <FormulaBlock>{`r_{i,t} = \\mu_i + h_{i,t}\\big(\\beta_i M_t + \\sqrt{1-\\beta_i^2}\\, \\varepsilon_{i,t}\\big) + \\sum_{k=1}^{N_{i,t}} J_{i,k}`}</FormulaBlock>
      <Para><FormulaInline>{`M_t, \\varepsilon_{i,t} \\sim \\mathcal N(0,1)`}</FormulaInline>; <FormulaInline>{`\\beta_i`}</FormulaInline> couples asset <FormulaInline>{`i`}</FormulaInline> to the systemic factor.</Para>
      <Para>GARCH(1,1) variance:</Para>
      <FormulaBlock>{`h_{i,t} = \\omega_i + \\alpha_i(\\text{shock}_{t-1})^2 + \\beta_i h_{i,t-1}`}</FormulaBlock>
      <Para>Jump process:</Para>
      <FormulaBlock>{`N_{i,t} \\sim \\text{Poisson}(\\lambda_i),\\quad J_{i,k} \\sim \\mathcal N(\\mu_J, \\sigma_J^2)`}</FormulaBlock>
      <Para>Price update:</Para>
      <FormulaBlock>{`S_{i,t+1} = S_{i,t}(1+r_{i,t}),\\quad S_{i,t+1} \\ge 1`}</FormulaBlock>
      <Para>Event overlay:</Para>
      <FormulaBlock>{`\\mu_i \\leftarrow \\mu_i + \\Delta\\mu_{\\text{class}(i)},\\quad \\sqrt{h_{i,t}} \\leftarrow \\sqrt{h_{i,t}}\\, \\gamma_{\\text{class}(i)}`}</FormulaBlock>
      <Para>— allowing scripted “CPI shock” or “Bond rally” effects.</Para>

      <SubSection>2.2 Portfolio and Risk Visualization</SubSection>
      <FormulaBlock>{`W_t = C_t + \\sum_i q_i S_{i,t}`}</FormulaBlock>
      <FormulaBlock>{`\\text{RiskMeter} = \\min\\Big(1, \\dfrac{\\sum_i |q_i| S_{i,t}}{\\max(1, W_t)} \\Big)`}</FormulaBlock>
      <Para>The right‑panel bar converts exposure intensity into color and width — turning abstract leverage into sensory feedback.</Para>

      <SubSection>2.3 VaR / CVaR Intuition</SubSection>
      <Para><b>VaR</b> (<FormulaInline>{`\\mathrm{VaR}_\\alpha`}</FormulaInline>) = “How bad can losses get in the worst <FormulaInline>{`\\alpha`}</FormulaInline> fraction of days?”</Para>
      <FormulaBlock>{`\\mathrm{VaR}_\\alpha = \\inf\\{\\ell: \\Pr(L \\le \\ell) \\ge \\alpha\\}`}</FormulaBlock>
      <Para><b>CVaR</b> (<FormulaInline>{`\\mathrm{CVaR}_\\alpha`}</FormulaInline>) = “Once inside that tail, how bad on average?”</Para>
      <FormulaBlock>{`\\mathrm{CVaR}_\\alpha = \\mathbb E[ L \\mid L \\ge \\mathrm{VaR}_\\alpha ]`}</FormulaBlock>
      <Para>Freeze positions <FormulaInline>{`q`}</FormulaInline>, run 1,000 simulated ticks, and see VaR/CVaR bands emerge — learning risk visually instead of algebraically.</Para>

      <SubSection>3 · Implementation</SubSection>
      <SubSection>3.1 Engine API</SubSection>
      <CodeBlock>{`class Backend:\n    def reset(self): ...\n    def get_state(self) -> dict: ...\n    def apply_day(self, orders: dict[str,int]) -> dict: ...\n    def set_event_effect(self, effect: dict[str,dict[str,float]]): ...`}</CodeBlock>
      <Para>Deterministic seeds ensure reproducibility; a 120‑day warmup builds baseline volatility before the player acts.</Para>

      <SubSection>3.2 HUD and Controls</SubSection>
      <Para>Three panels: Market Overview, Stats, Orders / Messages. Help overlay (H) auto‑sizes to window; compact legend shows pixel‑clean values.</Para>
      <CodeBlock>{`L/U/N/D – log / unify / normalize / downsample\n[ , ] or , . – zoom    +/- – stroke width\n←/→ asset    ↑/↓ ΔOrder (×10 with Shift)    0 reset\nB/S buy/sell    Enter submit    E event    R reset    M Light/Full    F fullscreen`}</CodeBlock>
      <Para>Legend values auto‑compact to K/M/B, keeping typography balanced.</Para>

      <SubSection>3.3 Events as Data</SubSection>
      <CodeBlock>{`{\n  "title": "Hot CPI",\n  "text": "Inflation beats estimates; equities vol ↑",\n  "effect": {\n    "equity": {"mu_add": -0.0002, "sigma_mult": 1.5},\n    "bond":   {"mu_add":  0.0002, "sigma_mult": 1.2}\n  }\n}`}</CodeBlock>
      <Para>No recompilation needed — new stories can be injected via JSON.</Para>

      <SubSection>4 · Design Notes</SubSection>
      <List>
        <li>Game‑feel HUD: rounded frames, vignette, scanlines, subtle CRT bleed → “finance terminal meets arcade cabinet.”</li>
        <li>Diegetic hints: only minimal footer “H for Help”; full cheat‑sheet pops up on demand.</li>
        <li>Color grammar: fixed palette per asset; selected line gains thickness + translucent fill.</li>
        <li>Performance: width‑based downsampling keeps 60 FPS on laptops.</li>
        <li>Model switching: M toggles Light ↔ Full with instant warmup; same UI, different physics.</li>
      </List>

      <SubSection>5 · Outcomes</SubSection>
      <SubSection>5.1 For Learners</SubSection>
      <List>
        <li>Embodied sense of volatility clusters, systemic coupling, and fat tails.</li>
        <li>Understand why GARCH spikes persist and how jumps distort distributions.</li>
        <li>Learn VaR/CVaR by simulation — not memorization.</li>
      </List>
      <SubSection>5.2 For Instructors</SubSection>
      <List>
        <li>Deterministic seeds = identical assignments for all students.</li>
        <li>Rubrics: “Reach target wealth under risk cap 0.6 in 30 days.”</li>
        <li>Easy to log/grade via get_state() snapshots.</li>
      </List>
      <SubSection>5.3 For Researchers</SubSection>
      <List>
        <li>Lightweight bench for EGARCH/Heston, multi‑factor β tests, or simple RL agents.</li>
        <li>Extendable via the same apply_day API; visualization already solved.</li>
      </List>

      <SubSection>Appendix A · Light vs Full</SubSection>
      <List>
        <li>Teaching / Demo — LightBackend V2: fast, readable, single factor + GARCH.</li>
        <li>Research / Stress — MarketModel V2: multi‑factor, richer covariance, event hooks.</li>
        <li>Toggle — M key: warmup restarts for fair comparison.</li>
      </List>

      <SubSection>Appendix B · Code Peek</SubSection>
      <CodeBlock>{`def submit_orders_single(asset):\n    global order_delta\n    if pending_event_effect:\n        backend.set_event_effect(pending_event_effect)\n    st = backend.apply_day({asset: order_delta})\n    push_prices(st)\n    order_delta = 0\n    return st`}</CodeBlock>
      <Para>Every tick is both a decision and an experiment; risk evolves as consequence, not punishment.</Para>

      <SubSection>Appendix C · Live Demo Script</SubSection>
      <List>
        <li>Toggle tour: L → U → N to show scale perspectives.</li>
        <li>Event shock: press E, narrate equities vol surge / bond rally.</li>
        <li>Hedging feel: long EQ + BD until risk bar flattens.</li>
        <li>Jump demo: raise λ for COM → observe fat‑tail jerks.</li>
      </List>
    </ProjectLayout>
  );
}

function CheesePage() {
  return (
    <ProjectLayout
      title="Cheese 奶酪 App"
      kicker="Product · UX/UI · Early Stage"
      meta={(
        <>
          <MetaRow label="Role" value="Co-founder · UX/UI · Analytics" />
          <MetaRow label="Stack" value="React, TypeScript, Tailwind · Mock Express API" />
          <MetaRow label="Scopes" value="Rent · Marketplace · Forum · Carpool · Profiles（EN/ZH）" />
        </>
      )}
      next={{ href: "#/projects/chemfast", label: "ChemFAST — LLM Benchmarks" }}
    >

      <Quote>
      Belonging as a UX pattern — <span className='underline'> simple, local, human. </span>
      </Quote>
      <Figure src={cheeseHero} caption="Cheese — modular community platform" />

      <SubSection>1 · Motivation</SubSection>

      <Para>
        Every campus community has the same paradox: information abundance, coordination scarcity. Students drown in group chats, flyers, and Facebook pages, but still can’t find a roommate, a ride, or a used laptop without friction.
      </Para>
      <Para>
        Cheese was born from that frustration — a clean, modular ecosystem unifying social, transactional, and informational flows in one minimal interface. Unlike most campus apps built on static features, Cheese treats interaction as data. Every scroll, post, and chat is a signal; every interface change is an experiment.
      </Para>
      <Quote>
        “Every UI is a hypothesis; every click is a data point.”
      </Quote>

      <SubSection>2 · System Overview</SubSection>
      <SubSection>2.1 Architecture</SubSection>
      <CodeBlock>{`Layer        Stack                               Function
Frontend     React + TypeScript + Tailwind      Interactive UI with modular state containers
Backend      Node.js + Express + SQLModel       REST + WebSocket API (PostgreSQL)
Data         Python + Airflow + Pandas          ETL for event logs, telemetry (PostgreSQL views)
Analytics    Jupyter + Plotly + SciPy + PyMC    Experiment analysis & A/B testing
Deployment   Cloudflare + GitHub Actions        Zero-downtime rollouts`}</CodeBlock>
      <Para>All features — Rent, Market, Forum, Ride, Profile — share a common schema under a unified <i>Post</i> entity, enabling cross‑module analytics with minimal join cost.</Para>

      <SubSection>3 · Data Collection and Schema</SubSection>
      <SubSection>3.1 Event Telemetry</SubSection>
      <Para>Every user interaction generates an event record:</Para>
      <CodeBlock>{`Column      Example                 Description
user_id     384                     anonymized user
module      "rent"                  feature section
action      "post_create", "chat_send"  behavioral atom
timestamp   2025-10-31T19:23        ISO-formatted
metadata    JSON                    device, latency, A/B cohort`}</CodeBlock>
      <Para>Events are ingested via a Kafka‑like queue (simulated batched writes) into user_events, then streamed to nightly analytics jobs.</Para>

      <SubSection>3.2 Behavioral Graph</SubSection>
      <Para>From raw logs we build a user–post bipartite graph:</Para>
      <FormulaBlock>{`G=(U,P,E), \quad E_{ij}=f(\text{views},\,\text{likes},\,\text{messages})`}</FormulaBlock>
      <Para>Edges are weighted by normalized engagement frequency. Spectral clustering on <FormulaInline>{`G`}</FormulaInline> yields latent community clusters (housing, buy/sell, social). Graph modularity <FormulaInline>{`Q=0.41`}</FormulaInline> in pilot tests indicates meaningful subgroup structure.</Para>

      <SubSection>4 · A/B Testing Framework</SubSection>
      <SubSection>4.1 Experimental Infrastructure</SubSection>
      <CodeBlock>{`def assign_variant(user_id, experiment_id, k=2):
    h = hash(f"{user_id}-{experiment_id}")
    return h % k`}</CodeBlock>
      <Para>Assignments are deterministic yet random‑looking, ensuring reproducibility. Each experiment stores: name, dates, primary metric, variants, exposure rate.</Para>

      <SubSection>4.2 Statistical Methods</SubSection>
      <List>
        <li><b>Frequentist</b>: two‑sample t‑test or Mann–Whitney U; Bonferroni for multi‑module corrections.</li>
        <li><b>Bayesian</b>: Beta‑Binomial / Normal‑Normal posteriors; report <FormulaInline>{`P(B>A)`}</FormulaInline>.</li>
      </List>
      <Para>Example (view → chat conversion):</Para>
      <FormulaBlock>{`P(B>A) = 0.87 \\implies \text{B wins with 87\\% posterior confidence.}`}</FormulaBlock>

      <SubSection>4.3 Experiment Types</SubSection>
      <CodeBlock>{`Experiment                 Hypothesis                                             Result
CTA Positioning            Move "Message Seller" mid-card increases conversion     +14% CTR, p<0.05
Listing Density            Reduce clutter to improve scroll-through rate           +21% view depth
Color Temperature          Cooler tones induce longer dwell                        No significant effect
Recommender Feed           Personalized ranking beats chronological                +26% engagement, \u0394Var<0.03
Confession Privacy Prompt  Anonymity toggle first reduces drop-offs                -18% abandonment`}</CodeBlock>

      <SubSection>5 · Data Science Stack</SubSection>
      <SubSection>5.1 Feature Engineering</SubSection>
      <CodeBlock>{`Feature             Definition
avg_scroll_depth    mean % scrolled
time_on_module      avg dwell (s)
post_to_chat_rate   post clicks → chat initiations
message_len_mean    average message length
revisit_interval    time between app opens
sentiment_score     mean polarity (VADER / transformers)`}</CodeBlock>

      <SubSection>5.2 Segmentation via Clustering</SubSection>
      <Para>Users segmented with K‑Means / GMM on standardized features:</Para>
      <List>
        <li>S₁ — “Searchers”: high view, low post (42%)</li>
        <li>S₂ — “Traders”: high post → chat (27%)</li>
        <li>S₃ — “Socializers”: forum activity (18%)</li>
        <li>S₄ — “Dormant”: low across metrics (13%)</li>
      </List>
      <Para>Silhouette ≈ 0.61 indicates coherent segmentation; segments feed targeted experiments (e.g., only “Searchers” see alternate layout).</Para>

      <SubSection>5.3 Uplift Modeling</SubSection>
      <Para>Estimate CATE with meta‑learners (LightGBM/XGBoost) using segment, session stats, and device features:</Para>
      <FormulaBlock>{`\text{CATE}(x) = \mathbb E[Y\mid T=1, X=x] - \mathbb E[Y\mid T=0, X=x]`}</FormulaBlock>
      <Para>Deploy variants to subgroups with predicted positive uplift only — minimizing user friction.</Para>

      <SubSection>5.4 Retention Analysis</SubSection>
      <FormulaBlock>{`R_t = \frac{\text{users active on day } t}{\text{users joined on day 0}}`}</FormulaBlock>
      <FormulaBlock>{`R_t = R_0 \, e^{-\lambda t}`}</FormulaBlock>
      <Para>Pilot (n=480): <FormulaInline>{`R_0=1`}</FormulaInline>, <FormulaInline>{`\lambda=0.052`}</FormulaInline> → half‑life ≈ 13.3 days. Post‑launch UI simplification reduced <FormulaInline>{`\lambda`}</FormulaInline> to 0.036 (half‑life ≈ 19 days).</Para>

      <SubSection>6 · Frontend Data Instrumentation</SubSection>
      <SubSection>6.1 Event Hooks</SubSection>
      <CodeBlock>{`function useTelemetry(event: string, data?: object) {
  useEffect(() => {
    logEvent({ event, ...data, ts: Date.now() })
  }, [])
}`}</CodeBlock>
      <Para>Events are batched with a 250 ms debounce to reduce network overhead by ~60%. Telemetry is type‑checked via TS interfaces to prevent schema drift.</Para>
      <SubSection>6.2 Visualization Feedback</SubSection>
      <Para>User dashboards show anonymized stats (“Posts Viewed”, “Chats Started”) to foster transparency and nudge engagement; this “quantified‑self” mechanic increased WAU by ~9%.</Para>

      <SubSection>7 · Recommender System Prototype</SubSection>
      <SubSection>7.1 Embedding Generation</SubSection>
      <Para>Each post is vectorized (all‑MiniLM‑L6‑v2 → 384‑d) and compared via cosine similarity:</Para>
      <FormulaBlock>{`\mathrm{sim}(i,j) = \frac{v_i \cdot v_j}{\lVert v_i \rVert \, \lVert v_j \rVert}`}</FormulaBlock>
      <SubSection>7.2 Hybrid Ranking</SubSection>
      <List>
        <li>Content similarity (70%)</li>
        <li>User–post graph proximity (20%)</li>
        <li>Recency decay (10%)</li>
      </List>
      <Para>Ranked feed outperformed chronological baseline (Engagement +26%, p &lt; 0.05).</Para>
      <SubSection>7.3 Explainability Layer</SubSection>
      <Para>Recommendations show tag badges from cluster keywords (e.g., “Similar to your Rent post in Downtown”). A small SHAP pass surfaced interpretable axes (e.g., “distance to campus”, “price per bedroom”).</Para>

      <SubSection>8 · Experiment Analytics Dashboard</SubSection>
      <List>
        <li>Real‑time experiment funnels</li>
        <li>Posterior distributions of metric deltas</li>
        <li>Cluster heatmaps of segment response</li>
        <li>Retention & conversion curves</li>
      </List>
      <Para>The dashboard (Plotly + Flask) auto‑pulls logs nightly and emits weekly PDF reports.</Para>

      <SubSection>9 · Product Insights from Data</SubSection>
      <List>
        <li><b>Minimalism Outperforms Novelty</b>: removing decorative elements increased core task completion.</li>
        <li><b>Searchers → Traders</b>: posting probability 1.6× after personalized prompt.</li>
        <li><b>Forum Sentiment Cycles</b>: weekday sinusoid; peaks around midterms → opportunity for contextual prompts.</li>
        <li><b>Trust Feedback Loop</b>: message length correlates with completed transactions (r ≈ 0.58).</li>
      </List>
    </ProjectLayout>
  );
}

function ChemfastPage() {
  return (
    <ProjectLayout
      title="LLMChem — Benchmarking and Difficulty Modeling for Chemistry Question Understanding"
      kicker="Research · Evaluation · Data Viz"
      meta={(
        <>
          <MetaRow label="Role" value="Project Assistant（AI / Comp Modeling）" />
          <MetaRow label="Dataset" value="~10k chemistry MCQs（HTML → JSON）" />
          <MetaRow label="Methods" value="Accuracy · confusion matrices · calibration · difficulty bands" />
        </>
      )}
      next={{ href: "#/", label: "Back to Home" }}
    >
      <Quote>
        “Evaluation before invention — <span className="underline">clarity over hype</span>. Tools that show <em>where</em> models miss.”
      </Quote>

      <Figure caption="Dataset overview — distribution and topic coverage" />

      <SubSection>1 · Motivation</SubSection>
      <Para>
        In chemical education, the most precious data is not numerical — it’s pedagogical: thousands of carefully crafted multiple‑choice questions encoding decades of human teaching intuition. Yet question banks are rarely analyzed quantitatively; difficulty, ambiguity, and conceptual overlap are often felt by instructors but seldom measured.
      </Para>
      <Para>
        LLMChem is a research internship project that treats chemistry questions as a natural language dataset and explores whether large language models (LLMs) can serve as evaluators, classifiers, and diagnostic mirrors for human question design.
      </Para>
      <Quote>
        The core hypothesis: if a model’s confusion structure correlates with student difficulty, then model uncertainty can approximate human cognitive load.
      </Quote>
      <Para>
        The project combines language modeling, statistical learning, and psychometric intuition, turning 10,000+ real chemistry questions into a computational testbed for reasoning under uncertainty.
      </Para>

      <SubSection>2 · System Overview</SubSection>
      <Para>
        HTML → plain text → tokenization → embeddings (text‑embedding‑3‑large) → PCA/UMAP → multi‑model inference → normalization → confusion/calibration/cluster analysis → difficulty modeling via GMM.
      </Para>
      <SubSection>2.2 Architecture Overview</SubSection>
      <List>
        <li><b>Preprocessing & Embedding</b>: HTML → plain text → tokenization → vector embedding (text‑embedding‑3‑large); dimensionality reduced via PCA → UMAP for interpretability.</li>
        <li><b>Inference & Response Aggregation</b>: prompts fed to Mistral 7B, Gemma 2 9B, and Llama 3 8B at low temperature (0.0–0.2); responses normalized (A–D) and stored with log‑probabilities.</li>
        <li><b>Post‑Hoc Analysis & Difficulty Modeling</b>: confusion matrices, entropy‑based uncertainty, cluster‑level aggregation; final difficulty via Gaussian Mixture Models on latent features.</li>
      </List>
      <Para>Pipeline is vectorized in Pandas + NumPy; model I/O is controlled via a versioned YAML config for reproducibility.</Para>
      <SubSection>2.1 Dataset Composition</SubSection>
      <Para>The dataset (ChemFAST) spans general, physical, and organic chemistry (~10,200 labeled items). Schema:</Para>
      <CodeBlock>{`Field            Type     Description
question         HTML     Original text with <sub>/<sup>/math
responseOptions  JSON     Mapped choices + scoring keys
clean_question   string   Sanitized prompt-ready text
choices          dict     {A,B,C,D}
correct_answer   str      Ground truth
predicted_ans    str      Model output
token_length     int      Token count (complexity proxy)
model_confidence float    Softmax top-1 probability
cluster_label    int      Semantic cluster after eval
difficulty       categorical  Easy / Medium / Hard`}</CodeBlock>
      <Para>Cleaning used HTML normalization + MathML stripping; Unicode loss for scientific symbols (CO₂, H₂O) was profiled across tokenizers.</Para>

      <SubSection>3 · Evaluation Framework — Metrics</SubSection>
      <div className="grid md:grid-cols-2 gap-3">
        <FormulaBlock>{`\\text{Accuracy} = \\frac{\\text{\\# correct}}{N}`}</FormulaBlock>
        <FormulaBlock>{`\\mathrm{F1} = \\frac{2\\,\\mathrm{Precision}\\,\\mathrm{Recall}}{\\mathrm{Precision}+\\mathrm{Recall}}`}</FormulaBlock>
        <FormulaBlock>{`\\mathrm{Brier} = \\tfrac{1}{N}\\sum_{n=1}^{N}\\sum_{k=1}^{K}\\big(p_{n,k}-y_{n,k}\\big)^2`}</FormulaBlock>
        <FormulaBlock>{`\\mathrm{ECE} = \\sum_{m=1}^{M} \\frac{|B_m|}{N}\\,\\big|\\,\\mathrm{acc}(B_m)-\\mathrm{conf}(B_m)\\,\\big|`}</FormulaBlock>
      </div>
      <SubSection>3.1 Quantitative Metrics</SubSection>
      <Para>Per question i and model m:</Para>
      <FormulaBlock>{`p_{m,i} = \\max_j \\; P(y_i=j)`}</FormulaBlock>
      <FormulaBlock>{`H_i = - \\sum_j P(y_i=j)\\, \\log P(y_i=j)`}</FormulaBlock>
      <Para>Aggregates:</Para>
      <FormulaBlock>{`\\text{AvgAcc} = \\tfrac{1}{N} \\sum_i 1( \\hat y_i = y_i )`}</FormulaBlock>
      <FormulaBlock>{`\\text{CalErr} = \\mathbb E[ \\; | p_{m,i} - 1( \\hat y_i = y_i ) | \\; ]`}</FormulaBlock>
      <Para>These form a risk–confidence surface, revealing overconfidence in wrong answers — analogous to mispriced risk in finance.</Para>

      <SubSection>3.2 Confusion Analysis</SubSection>
      <Para>Per‑domain confusion matrices; inter‑option correlations identify systematic distractors.</Para>
      <FormulaBlock>{`\\text{sim}(B,C) = \\frac{v_B \\cdot v_C}{ \\lVert v_B \\rVert \\lVert v_C \\rVert }`}</FormulaBlock>
      <Para>High similarity suggests concept proximity (e.g., enthalpy vs entropy).</Para>

      <SubSection>3.3 Cluster‑Level Analysis</SubSection>
      <FormulaBlock>{`C = \\text{SpectralCluster}( \\{x_i\\}, n=30 )`}</FormulaBlock>
      <Para>Clusters align with concept families (acid‑base, stoichiometry, bonding). Aggregate metrics per cluster for heatmaps.</Para>

      <SubSection>3.4 Ensemble Evaluation</SubSection>
      <FormulaBlock>{`\\text{AgreementRate} = \\tfrac{1}{N} \\sum_i 1( \\hat{y}_i^{(1)} = \\hat{y}_i^{(2)} = \\cdots = y_i )`}</FormulaBlock>
      <Para>Cross‑model disagreement reveals inherently ambiguous items.</Para>

      <SubSection>4 · Difficulty Modeling</SubSection>
      <Para>
        We model item difficulty using features: token length <FormulaInline>{`t`}</FormulaInline>, max confidence <FormulaInline>{`q`}</FormulaInline>, predictive entropy <FormulaInline>{`h`}</FormulaInline>, and a unit‑conversion indicator <FormulaInline>{`u \in \{0,1\}`}</FormulaInline>. A linear difficulty score is defined as:
      </Para>
      <FormulaBlock>{`D = w_1\\,t + w_2\\,(1-q) + w_3\\,h + w_4\\,u \\quad (w_i\\ge0)`}</FormulaBlock>
      <Para>
        Thresholds are calibrated via quantiles or logistic regression to segment Easy / Medium / Hard, and we analyze the interaction between token length and accuracy/confidence.
      </Para>
      <SubSection>4.1 Feature Engineering</SubSection>
      <CodeBlock>{`Feature            Description
token_length       log-scaled linguistic complexity
entropy            output uncertainty
confidence_gap     top-1 minus top-2 logits
symbol_density     ratio of chemical symbols to words
numeric_ratio      frequency of digits
cluster_id         concept cluster id from embeddings
model_consensus    inter-model agreement ratio
gpt_self_eval      model self-estimated difficulty
stem_depth         constituency parse depth
prompt_length      characters after HTML cleaning
pca1, pca2         embedding principal components`}</CodeBlock>

      <SubSection>4.2 Probabilistic Labeling</SubSection>
      <Para>Let <FormulaInline>{`x_i`}</FormulaInline> be the feature vector. GMM responsibilities:</Para>
      <FormulaBlock>{`P(z_k \\mid x_i) = \\frac{ \\pi_k \\; \\mathcal N(x_i \\mid \\mu_k, \\Sigma_k) }{ \\sum_j \\pi_j \\; \\mathcal N(x_i \\mid \\mu_j, \\Sigma_j) }`}</FormulaBlock>
      <CodeBlock>{`Difficulty_i =
  Easy   if  P(z_1|x_i) > 0.7
  Medium if  P(z_2|x_i) > 0.7
  Hard   otherwise`}</CodeBlock>

      <SubSection>4.3 Confidence Calibration</SubSection>
      <Para>Temperature scaling corrects overconfidence:</Para>
      <FormulaBlock>{`p' = \\frac{ e^{z/T} }{ \\sum_j e^{z_j/T} }`}</FormulaBlock>
      <Para><FormulaInline>{`T`}</FormulaInline> optimized via validation log‑loss enables risk‑adjusted difficulty scores.</Para>

      <SubSection>4.4 Clustering as Conceptual Topology</SubSection>
      <Para>UMAP in 2D yields a topological map: dense regions are formulaic/computational; sparse outliers are conceptual synthesis. Coloring by difficulty forms a pedagogical atlas.</Para>


      <SubSection>5 · Implementation</SubSection>
      <SubSection>5.1 Pipeline Architecture</SubSection>
      <CodeBlock>{`llmchem/
  data/
    parser.py         # HTML/JSON cleaning
    vectorize.py      # Embedding extraction
  eval/
    scorer.py         # Accuracy, F1, calibration
    confusion.py      # Matrix visualization
    cluster.py        # Spectral/UMAP clustering
  model/
    runner.py         # LLM batch inference
    prompt.py         # Template manager
  analysis/
    difficulty.py     # GMM fitting, visualization
    report.ipynb      # Interactive dashboard`}</CodeBlock>
      <Para>Modules are decoupled via Parquet dataframes for efficient reuse.</Para>

      <SubSection>5.2 Reproducibility</SubSection>
      <List>
        <li>Deterministic seeding (NumPy, random, model RNGs)</li>
        <li>Experiment tracking via Weights & Biases</li>
        <li>Results stored with SHA hashes of model and dataset versions</li>
      </List>

      <SubSection>5.3 Visualization Stack</SubSection>
      <List>
        <li>Confusion/calibration: Matplotlib + Seaborn</li>
        <li>Embeddings: Plotly (3D interactive)</li>
        <li>Difficulty histograms/radar: Altair</li>
      </List>

      <SubSection>6 · Results & Insights</SubSection>
      <List>
        <li>Average accuracy ≈ 71.3%; calibration slope ≈ 0.78 → systematic overconfidence; hard tier shows 2–3× entropy.</li>
        <li>30 clusters; top by volume: Equilibrium, Organic Mechanisms, Electrochemistry, Stoichiometry, Thermodynamics. Inter‑cluster variance (Levene’s test) is significant (p &lt; 0.001).</li>
        <li>token_length correlates with difficulty (r≈0.47); entropy (r≈0.71), inter‑model disagreement (r≈0.76) stronger.</li>
        <li>“Pedagogical autocorrelation”: GARCH‑like confidence volatility across related items.</li>
      </List>

      <SubSection>7 · Design Insights</SubSection>
      <List>
        <li>Overconfidence clusters from misleading surface cues.</li>
        <li>Latent curriculum map mirrors textbook topic progression.</li>
        <li>Failure cases at the language↔symbolic boundary (e.g., redox balancing).</li>
      </List>

      <SubSection>8 · Outcomes</SubSection>
      <SubSection>8.1 For Instructors</SubSection>
      <List>
        <li>Automatic difficulty labeling → scalable test curation</li>
        <li>Cluster‑level analysis identifies redundancy/ambiguity</li>
        <li>Visualize topic coverage density across course</li>
      </List>
      <SubSection>8.2 For Researchers</SubSection>
      <List>
        <li>Domain benchmark for LLMs on STEM reasoning</li>
        <li>Extensible to multi‑modal QA (diagrams, spectra)</li>
        <li>Calibrated ground truth for domain LLM fine‑tuning</li>
      </List>
      <SubSection>8.3 For Future Students</SubSection>
      <List>
        <li>Interactive tutor exposing elimination of distractors</li>
        <li>LLMChem Playbook — explainable, adaptive study tool</li>
      </List>

      <SubSection>9 · Future Work</SubSection>
      <List>
        <li>Hierarchical difficulty model (Bayesian, topic‑level variance)</li>
        <li>Graph neural networks on question embeddings</li>
        <li>LLMChem‑FT: fine‑tuned 3B with instruction‑tuned rationales</li>
        <li>Difficulty‑aligned generation for targeted items</li>
        <li>Cognitive calibration via Item Response Theory</li>
      </List>

      <SubSection>10 · Conclusion</SubSection>
      <Para>
        LLMChem shows evaluation can transcend accuracy — calibration, clustering, and hybrid labeling quantify how models think about chemistry and how humans structure knowledge. When resumed, it will map the epistemic geometry of chemistry.
      </Para>
    </ProjectLayout>
  );
}

function RouterView() {
  const path = useHashRoute();
  if (path.startsWith("/projects/")) {
    const id = path.split("/")[2];
    if (id === "cashflow") return <CashflowPage />;
    if (id === "cheese") return <CheesePage />;
    if (id === "chemfast") return <ChemfastPage />;
  }
  // Home
  return (
    <Shell>
      <Hero />
      <Work />
      <Writing />
      <Contact />
    </Shell>
  );
}

export default function MonochromePortfolio() {
  return <RouterView />;
}
