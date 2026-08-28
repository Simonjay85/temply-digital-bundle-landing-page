import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../motion/gsap.js";

const projects = [
  {
    index: "01",
    title: "Performance Growth System",
    tags: ["Paid media", "Analytics", "CRO"],
    summary: "A connected acquisition loop that turns campaign signals into faster creative, budget and landing-page decisions.",
    visual: "performance",
    size: "wide",
  },
  {
    index: "02",
    title: "SEO Content Engine",
    tags: ["SEO", "Content ops", "Internal linking"],
    summary: "A search architecture designed to compound through topic systems, publishing operations and measurable demand capture.",
    visual: "seo",
    size: "tall",
  },
  {
    index: "03",
    title: "Landing Page Conversion System",
    tags: ["Strategy", "UX/UI", "Messaging"],
    summary: "A modular conversion experience that learns from paid traffic and makes message-market fit easier to see.",
    visual: "conversion",
    size: "tall",
  },
  {
    index: "04",
    title: "AI Operations Stack",
    tags: ["Automation", "Research", "Workflow design"],
    summary: "A human-led operating layer that connects research, enrichment, reporting and repetitive execution without hiding decisions.",
    visual: "ai",
    size: "wide",
  },
];

const services = [
  {
    index: "01",
    title: "Performance Marketing",
    description: "Campaign systems built for testing, learning and scaling — with media, creative, landing pages and measurement working as one loop.",
    tags: ["Paid Social", "Paid Search", "Native Ads", "Creative Testing", "Funnel Strategy", "Budget Systems"],
    visual: "performance",
  },
  {
    index: "02",
    title: "SEO Growth Systems",
    description: "SEO built as a compounding operating system, not isolated content — from technical foundations to architecture and publishing workflows.",
    tags: ["Technical SEO", "Topic Clusters", "Content Strategy", "Internal Linking", "Search UX", "Measurement"],
    visual: "seo",
  },
  {
    index: "03",
    title: "Web & Conversion",
    description: "Web experiences designed to turn attention into action, then feed what we learn back into messaging, creative and acquisition.",
    tags: ["Landing Pages", "UX/UI", "Messaging", "CRO", "Speed", "E-commerce Journeys"],
    visual: "conversion",
  },
  {
    index: "04",
    title: "AI Growth Operations",
    description: "Automation and AI systems that remove repetitive work, improve research velocity and make growth operations easier to run every week.",
    tags: ["Workflow Design", "Automation", "Research Systems", "Reporting", "Data Enrichment", "AI Assistants"],
    visual: "ai",
  },
];

const principles = [
  ["01", "Measure decisions, not just activity.", "Every channel should connect to a measurable business decision."],
  ["02", "Design the whole conversion loop.", "Creative, media and landing pages should work as one system."],
  ["03", "Build for compounding returns.", "SEO compounds when architecture and operations are designed together."],
  ["04", "Automate friction, not judgment.", "Automation should remove repetitive work, not hide important decisions."],
  ["05", "Make the system operable.", "The best growth stack is the one a team can actually run and improve."],
];

const insights = [
  {
    eyebrow: "Measurement · CRO",
    title: "Build landing pages that learn from paid traffic",
    summary: "Treat the page as a learning surface: capture message signals, creative patterns and friction — not only conversion rate.",
    visual: "conversion",
  },
  {
    eyebrow: "SEO · Content Ops",
    title: "Turn SEO content into an operating system",
    summary: "Architecture, internal links and publishing cadence become more valuable when they are managed as one repeatable workflow.",
    visual: "seo",
  },
  {
    eyebrow: "AI · Growth Ops",
    title: "Use AI without adding operational chaos",
    summary: "The useful AI layer is the one that makes research and execution faster while keeping critical decisions visible to the team.",
    visual: "ai",
  },
];

const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || "hello@daisylexi.com").trim();
const contactHref = `mailto:${contactEmail}`;

function Arrow() {
  return <span className="dl-arrow" aria-hidden="true">↗</span>;
}

function DotGrid({ count = 24 }) {
  return (
    <div className="dl-dot-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => <i key={index} />)}
    </div>
  );
}

function PerformanceVisual({ compact = false }) {
  return (
    <div className={`dl-visual dl-visual--performance ${compact ? "is-compact" : ""}`} role="img" aria-label="Performance marketing dashboard showing channel signals, conversion trend and budget allocation">
      <div className="dl-panel-chrome"><span>Acquisition / live model</span><i>Synced</i></div>
      <div className="dl-performance-grid">
        <div className="dl-kpi-stack">
          <div><span>MER</span><strong>4.82</strong><em>+12.4%</em></div>
          <div><span>CAC</span><strong>$38</strong><em>−8.1%</em></div>
          <div><span>CVR</span><strong>6.7%</strong><em>+1.3%</em></div>
        </div>
        <div className="dl-chart-card">
          <div className="dl-chart-card__head"><span>Signal quality</span><small>28 day view</small></div>
          <svg viewBox="0 0 520 220" preserveAspectRatio="none" aria-hidden="true">
            <path className="dl-chart-grid-line" d="M0 45H520M0 105H520M0 165H520" />
            <path className="dl-chart-line dl-chart-line--ghost" d="M0 170 C70 150,95 156,145 130 S245 126,300 100 S400 102,520 64" />
            <path className="dl-chart-line" d="M0 190 C52 185,83 155,125 162 S203 116,255 130 S339 79,390 92 S469 55,520 36" />
          </svg>
          <div className="dl-channel-bars">
            <span style={{ "--bar": "88%" }}>Paid social</span>
            <span style={{ "--bar": "72%" }}>Search</span>
            <span style={{ "--bar": "54%" }}>Native</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoVisual({ compact = false }) {
  return (
    <div className={`dl-visual dl-visual--seo ${compact ? "is-compact" : ""}`} role="img" aria-label="SEO content architecture showing topic clusters, internal links and search demand coverage">
      <div className="dl-panel-chrome"><span>Search architecture / topic map</span><i>124 nodes</i></div>
      <div className="dl-seo-canvas">
        <div className="dl-seo-axis"><span>Demand</span><span>Coverage</span></div>
        <div className="dl-seo-core">Growth<br />System<small>Primary hub</small></div>
        <div className="dl-seo-node node-a"><strong>Paid + SEO</strong><span>18 pages</span></div>
        <div className="dl-seo-node node-b"><strong>Analytics</strong><span>12 pages</span></div>
        <div className="dl-seo-node node-c"><strong>Landing Pages</strong><span>24 pages</span></div>
        <div className="dl-seo-node node-d"><strong>AI Ops</strong><span>16 pages</span></div>
        <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
          <path d="M300 198L132 84M300 198L480 78M300 198L122 320M300 198L492 314" />
          <path d="M132 84L480 78M122 320L492 314" className="is-soft" />
        </svg>
        <DotGrid count={30} />
      </div>
    </div>
  );
}

function ConversionVisual({ compact = false }) {
  return (
    <div className={`dl-visual dl-visual--conversion ${compact ? "is-compact" : ""}`} role="img" aria-label="Landing page conversion interface with message testing and conversion diagnostics">
      <div className="dl-panel-chrome"><span>Conversion page / variant B</span><i>6.7% CVR</i></div>
      <div className="dl-browser">
        <div className="dl-browser__bar"><span /><span /><span /><i>daisylexi.com/system</i></div>
        <div className="dl-browser__body">
          <div className="dl-browser__copy">
            <small>CONNECTED GROWTH SYSTEM</small>
            <strong>Turn attention<br />into action.</strong>
            <p>Media intelligence, message clarity and conversion design — built to learn together.</p>
            <span className="dl-browser__button">Start a project <Arrow /></span>
          </div>
          <div className="dl-browser__side">
            <div><span>Message match</span><strong>92</strong><i /></div>
            <div><span>Friction score</span><strong>18</strong><i /></div>
            <div><span>Mobile clarity</span><strong>A</strong><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiVisual({ compact = false }) {
  return (
    <div className={`dl-visual dl-visual--ai ${compact ? "is-compact" : ""}`} role="img" aria-label="AI growth operations workflow connecting research, enrichment, human review and reporting">
      <div className="dl-panel-chrome"><span>Growth operations / workflow</span><i>Human in loop</i></div>
      <div className="dl-ai-canvas">
        <div className="dl-ai-flow-line" aria-hidden="true" />
        {[
          ["01", "Research", "Brief + evidence"],
          ["02", "Enrich", "Context + signals"],
          ["03", "Review", "Human decision"],
          ["04", "Operate", "Publish + report"],
        ].map(([number, label, meta], index) => (
          <div className={`dl-ai-node node-${index + 1}`} key={label}>
            <span>{number}</span><strong>{label}</strong><small>{meta}</small>
          </div>
        ))}
        <div className="dl-ai-status"><i /> 12 workflows active</div>
        <DotGrid count={36} />
      </div>
    </div>
  );
}

function SystemVisual({ type, compact = false }) {
  if (type === "seo") return <SeoVisual compact={compact} />;
  if (type === "conversion") return <ConversionVisual compact={compact} />;
  if (type === "ai") return <AiVisual compact={compact} />;
  return <PerformanceVisual compact={compact} />;
}

function HeroSystem() {
  return (
    <div className="dl-hero-system" role="img" aria-label="DaisyLexi connected growth system combining acquisition, search, conversion, analytics and AI operations">
      <div className="dl-hero-system__chrome">
        <span>DaisyLexi / Growth OS</span>
        <div><i /> Live system</div>
      </div>
      <div className="dl-hero-system__layout">
        <aside className="dl-hero-system__rail">
          {[
            ["01", "Acquire"],
            ["02", "Convert"],
            ["03", "Measure"],
            ["04", "Compound"],
          ].map(([number, label], index) => <div className={index === 0 ? "is-active" : ""} key={label}><span>{number}</span>{label}</div>)}
        </aside>
        <div className="dl-hero-system__main">
          <div className="dl-hero-system__eyebrow"><span>Connected signal model</span><small>Last 28 days</small></div>
          <div className="dl-hero-system__score"><strong>84.6</strong><span>System health<br /><em>+9.8%</em></span></div>
          <div className="dl-hero-system__chart">
            <svg viewBox="0 0 760 260" preserveAspectRatio="none" aria-hidden="true">
              <path className="grid" d="M0 45H760M0 105H760M0 165H760M0 225H760" />
              <path className="ghost" d="M0 200 C75 190,120 165,175 170 S275 128,330 139 S455 102,515 111 S640 70,760 83" />
              <path className="signal" d="M0 220 C70 218,112 180,160 190 S250 135,314 150 S420 95,480 113 S602 58,658 78 S720 45,760 38" />
            </svg>
            <div className="dl-hero-system__marker"><span>Scale signal</span><strong>↑</strong></div>
          </div>
          <div className="dl-hero-system__metrics">
            <div><span>Acquisition</span><strong>4.82 MER</strong></div>
            <div><span>Search demand</span><strong>+38%</strong></div>
            <div><span>Conversion</span><strong>6.7%</strong></div>
          </div>
        </div>
        <aside className="dl-hero-system__signals">
          <span>Signal feed</span>
          <div><i className="is-good" />Creative / Variant 08<strong>Scale</strong></div>
          <div><i />SEO / Cluster 04<strong>Build</strong></div>
          <div><i className="is-good" />LP / Message B<strong>Win</strong></div>
          <div><i />AI Ops / Research<strong>Review</strong></div>
        </aside>
      </div>
      <div className="dl-hero-system__footer"><span>Media</span><span>Search</span><span>Web</span><span>Analytics</span><span>AI Ops</span></div>
    </div>
  );
}

export function AgencyHome() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("dl-body");
    document.documentElement.dataset.theme = "light";
    document.documentElement.lang = "en";
    document.title = "DaisyLexi — Performance Marketing, SEO & AI Growth Systems";

    const description = "DaisyLexi designs connected growth systems for performance marketing, SEO, landing pages, conversion, analytics and AI-driven operations.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "website");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f2f0eb");

    return () => document.body.classList.remove("dl-body");
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(".dl-hero__line > span", { yPercent: 110, duration: 1.08, stagger: 0.08, ease: "power4.out" });
      gsap.from(".dl-hero__eyebrow, .dl-hero__copy, .dl-hero__actions", { opacity: 0, y: 20, duration: 0.75, stagger: 0.07, ease: "power3.out", delay: 0.2 });
      gsap.from(".dl-hero-system", { opacity: 0, y: 44, scale: 0.985, duration: 1.1, ease: "power3.out", delay: 0.38 });

      gsap.utils.toArray(".dl-reveal").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 36,
          duration: 0.88,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="dl-page" ref={rootRef}>
      <header className="dl-header">
        <a href="#top" className="dl-logo" aria-label="DaisyLexi home">DaisyLexi<span>®</span></a>
        <nav className="dl-header__nav" aria-label="Primary navigation">
          <a href="/work/">Work</a>
          <a href="/services/">Services</a>
          <a href="/about/">About</a>
        </nav>
        <div className="dl-header__actions">
          <a className="dl-header__contact" href="/contact/">Start a Project <Arrow /></a>
          <button className="dl-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>Menu</button>
        </div>
      </header>

      <main>
        <section className="dl-hero" id="top">
          <div className="dl-hero__eyebrow"><span>Performance · SEO · Web · AI</span><i>Independent growth systems studio</i></div>
          <h1 className="dl-hero__title" aria-label="Build growth systems that compound">
            <span className="dl-hero__line"><span>Build growth systems</span></span>
            <span className="dl-hero__line dl-hero__line--indent"><span>that compound.</span></span>
          </h1>
          <div className="dl-hero__lower">
            <p className="dl-hero__copy">DaisyLexi designs and builds connected systems for performance marketing, SEO, landing pages, conversion, analytics and AI-driven operations.</p>
            <div className="dl-hero__actions">
              <a className="dl-button dl-button--dark" href="/contact/">Start a Project <Arrow /></a>
              <a className="dl-button dl-button--line" href="#services">Explore Services <Arrow /></a>
            </div>
          </div>
          <HeroSystem />
        </section>

        <section className="dl-positioning" id="about">
          <div className="dl-kicker dl-reveal"><span>01</span><p>Connected growth</p></div>
          <div className="dl-positioning__content dl-reveal">
            <h2>Growth works better when everything connects.</h2>
            <p>Most brands treat media, search, websites, analytics and automation as separate channels. DaisyLexi builds them as one connected growth system — so strategy, creative, traffic, data and execution work together.</p>
          </div>
          <div className="dl-positioning__loop dl-reveal" aria-label="DaisyLexi connected growth loop">
            {['Strategy', 'Traffic', 'Experience', 'Data', 'Operations'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
          </div>
        </section>

        <section className="dl-work" id="works">
          <div className="dl-section-head dl-reveal">
            <div className="dl-kicker"><span>02</span><p>Selected systems</p></div>
            <h2>Work built to perform,<br />learn and compound.</h2>
            <a href="/work/">View all work <Arrow /></a>
          </div>

          <div className="dl-work-grid">
            {projects.map((project) => (
              <article className={`dl-work-card dl-work-card--${project.size} dl-reveal`} key={project.title}>
                <div className="dl-work-card__visual"><SystemVisual type={project.visual} compact /></div>
                <div className="dl-work-card__meta">
                  <span>{project.index}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <div className="dl-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="dl-system-band dl-reveal" aria-label="DaisyLexi growth system model">
          <div className="dl-system-band__top"><span>/ One operating model</span><span>Signal → Decision → Action → Learning</span></div>
          <div className="dl-system-band__marquee" aria-hidden="true">
            <div className="dl-system-band__track">
              {[0, 1].map((copy) => <div key={copy}>{['Performance', 'SEO', 'Conversion', 'Analytics', 'AI Operations'].map((item) => <span key={`${copy}-${item}`}>{item}<i>↗</i></span>)}</div>)}
            </div>
          </div>
        </section>

        <section className="dl-services" id="services">
          <div className="dl-section-head dl-section-head--services dl-reveal">
            <div className="dl-kicker"><span>03</span><p>Capabilities</p></div>
            <h2>A connected service stack for modern growth.</h2>
            <p>Each capability can stand alone. The advantage comes when they share one strategy, one measurement layer and one operating rhythm.</p>
          </div>

          <div className="dl-service-list">
            {services.map((service) => (
              <article className="dl-service dl-reveal" key={service.title}>
                <div className="dl-service__copy">
                  <span className="dl-service__index">{service.index}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="dl-tags dl-tags--service">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a href="/services/">Explore capability <Arrow /></a>
                </div>
                <div className="dl-service__visual"><SystemVisual type={service.visual} /></div>
              </article>
            ))}
          </div>
        </section>

        <section className="dl-principles">
          <div className="dl-section-head dl-section-head--principles dl-reveal">
            <div className="dl-kicker"><span>04</span><p>Operating principles</p></div>
            <h2>How growth<br />should work.</h2>
          </div>
          <div className="dl-principles-grid">
            {principles.map(([index, title, body], itemIndex) => (
              <article className={`dl-principle ${itemIndex === 0 ? "is-featured" : ""} dl-reveal`} key={index}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{body}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </section>

        <section className="dl-insights">
          <div className="dl-section-head dl-section-head--insights dl-reveal">
            <div className="dl-kicker"><span>05</span><p>Growth notes</p></div>
            <h2>Ideas for running<br />a better growth system.</h2>
          </div>
          <div className="dl-insight-grid">
            {insights.map((insight, index) => (
              <article className="dl-insight dl-reveal" key={insight.title}>
                <div className="dl-insight__visual"><SystemVisual type={insight.visual} compact /></div>
                <span>{insight.eyebrow} · 0{index + 1}</span>
                <h3>{insight.title}</h3>
                <p>{insight.summary}</p>
                <a href="/work/">Read the note <Arrow /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="dl-final-cta" id="contact">
          <div className="dl-final-cta__grid" aria-hidden="true"><DotGrid count={60} /></div>
          <div className="dl-final-cta__signal" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="dl-final-cta__content dl-reveal">
            <span>/ Build the system</span>
            <h2>Let’s build your<br />growth system.</h2>
            <p>If your media, website, search and operations feel disconnected, DaisyLexi can help turn them into one working system.</p>
            <div>
              <a className="dl-button dl-button--light" href="/contact/">Start a Project <Arrow /></a>
              <a className="dl-button dl-button--ghost" href={contactHref}>Email DaisyLexi <Arrow /></a>
            </div>
          </div>
          <div className="dl-final-cta__model dl-reveal">
            {['Strategy', 'Media', 'Search', 'Web', 'Data', 'AI Ops'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><i /></div>)}
          </div>
        </section>
      </main>

      <footer className="dl-footer">
        <div className="dl-footer__brand"><a href="#top">DaisyLexi®</a><p>Independent growth systems studio for performance, search, conversion, analytics and AI operations.</p></div>
        <div className="dl-footer__links"><span>Explore</span><a href="/work/">Work</a><a href="/services/">Services</a><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/etsy/">Etsy</a></div>
        <div className="dl-footer__links"><span>Connect</span><a href={contactHref}>{contactEmail}</a><a href="/contact/">Start a project ↗</a></div>
        <div className="dl-footer__bottom"><span>© 2026 DaisyLexi</span><span>Performance · SEO · Web · Analytics · AI</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <div className={`dl-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="dl-menu__top"><a href="#top" onClick={() => setMenuOpen(false)}>DaisyLexi®</a><button onClick={() => setMenuOpen(false)}>Close</button></div>
        <nav aria-label="Mobile navigation">
          {[
            ["01", "Home", "#top"],
            ["02", "Work", "/work/"],
            ["03", "Services", "/services/"],
            ["04", "About", "/about/"],
            ["05", "Contact", "/contact/"],
          ].map(([index, item, href]) => <a key={item} href={href} onClick={() => setMenuOpen(false)}><span>/ {index}</span><strong>{item}</strong><Arrow /></a>)}
        </nav>
        <div className="dl-menu__foot"><a href={contactHref}>{contactEmail}</a><span>Performance · SEO · Web · AI</span></div>
      </div>
    </div>
  );
}
