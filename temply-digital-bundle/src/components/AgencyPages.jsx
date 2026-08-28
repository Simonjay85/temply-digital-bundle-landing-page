import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../motion/gsap.js";
import { runtimeConfig } from "../data/siteContent.js";
import { agencyLegacyAliases, agencyProjects, agencyRouteMeta, agencyServices } from "../data/agencyPages.js";
import { AgencyFooter, AgencyHeader, AgencyMenu, Arrow, CapabilityRail } from "./AgencyChrome.jsx";
import "../styles/agency-pages.css";

function normalizePath(pathname) {
  const clean = String(pathname || "/").replace(/\/+/g, "/");
  return clean === "/" ? "/" : `${clean.replace(/\/+$/, "")}/`;
}

function applyPageMeta(meta, path) {
  const base = runtimeConfig.siteUrl || window.location.origin;
  const canonical = new URL(path, `${base}/`).toString();
  const socialImage = new URL("/agency-social.jpg", `${base}/`).toString();
  document.title = meta.title;
  document.documentElement.lang = "en";

  const upsertMeta = (selector, attrs, content) => {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      document.head.appendChild(node);
    }
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    node.setAttribute("content", content);
  };

  upsertMeta('meta[name="description"]', { name: "description" }, meta.description);
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, meta.title);
  upsertMeta('meta[property="og:description"]', { property: "og:description" }, meta.description);
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, socialImage);
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, meta.title);
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, meta.description);
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, socialImage);

  let canonicalNode = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalNode) {
    canonicalNode = document.createElement("link");
    canonicalNode.rel = "canonical";
    document.head.appendChild(canonicalNode);
  }
  canonicalNode.href = canonical;

  document.getElementById("temply-product-schema")?.remove();
  document.getElementById("daisylexi-webpage-schema")?.remove();
  const schema = document.createElement("script");
  schema.id = "daisylexi-webpage-schema";
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": meta.schemaType || "WebPage",
    name: meta.title,
    description: meta.description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "DaisyLexi", url: new URL("/", `${base}/`).toString() },
  });
  document.head.appendChild(schema);
}

function SystemPanel({ mode = "performance", label = "Connected system", compact = false }) {
  const className = `dli-system-panel dli-system-panel--${mode} ${compact ? "is-compact" : ""}`;
  const ariaLabel = `${label}. Illustrative DaisyLexi ${mode} system interface, not verified client data.`;

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <div className="dli-system-panel__chrome"><span>DaisyLexi / {label}</span><i>Illustrative model</i></div>
      {mode === "performance" && (
        <div className="dli-performance-ui">
          <aside>
            <span>Decision layer</span>
            <div className="is-active"><b>01</b>Acquire</div><div><b>02</b>Convert</div><div><b>03</b>Measure</div><div><b>04</b>Learn</div>
          </aside>
          <main>
            <div className="dli-panel-kicker"><span>Signal quality / model</span><small>28-day view</small></div>
            <div className="dli-performance-score"><strong>84.6</strong><span>System health<em>↑ learning velocity</em></span></div>
            <svg viewBox="0 0 760 250" preserveAspectRatio="none" aria-hidden="true">
              <path className="grid" d="M0 40H760M0 100H760M0 160H760M0 220H760" />
              <path className="ghost" d="M0 190 C70 181 120 165 175 170 S270 126 332 140 S448 101 512 112 S640 70 760 82" />
              <path className="signal" d="M0 220 C65 215 112 180 162 190 S250 137 314 150 S420 95 480 113 S602 58 658 78 S720 45 760 38" />
            </svg>
            <div className="dli-performance-metrics"><span><b>Creative</b>Scale signal</span><span><b>Media</b>Reallocate</span><span><b>Page</b>Message win</span></div>
          </main>
        </div>
      )}

      {mode === "seo" && (
        <div className="dli-seo-ui">
          <div className="dli-panel-kicker"><span>Search architecture / topic map</span><small>Connected coverage</small></div>
          <svg viewBox="0 0 800 460" preserveAspectRatio="none" aria-hidden="true"><path d="M400 230L150 92M400 230L650 90M400 230L145 365M400 230L655 366" /><path className="soft" d="M150 92L650 90M145 365L655 366" /></svg>
          <div className="dli-seo-core">Growth<strong>System</strong><span>Primary hub</span></div>
          <div className="dli-seo-node node-a"><b>Demand</b><span>Intent map</span></div>
          <div className="dli-seo-node node-b"><b>Architecture</b><span>Topic graph</span></div>
          <div className="dli-seo-node node-c"><b>Publishing</b><span>Content ops</span></div>
          <div className="dli-seo-node node-d"><b>Measurement</b><span>Search signals</span></div>
          <div className="dli-panel-dots" aria-hidden="true">{Array.from({ length: 56 }, (_, index) => <i key={index} />)}</div>
        </div>
      )}

      {mode === "conversion" && (
        <div className="dli-conversion-ui">
          <div className="dli-browser-ui">
            <div className="dli-browser-ui__bar"><i /><i /><i /><span>daisylexi.com/system</span></div>
            <div className="dli-browser-ui__body">
              <div className="dli-browser-ui__copy"><small>CONNECTED GROWTH SYSTEM</small><strong>Turn attention<br />into action.</strong><p>Message clarity, useful proof and a conversion path designed to learn.</p><b>Start a project <Arrow /></b></div>
              <div className="dli-browser-ui__signals"><span>Message match<strong>92</strong></span><span>Friction score<strong>18</strong></span><span>Mobile clarity<strong>A</strong></span></div>
            </div>
          </div>
          <div className="dli-conversion-note"><span>/ Experiment seam</span><strong>Variant B</strong><i>Signal captured</i></div>
        </div>
      )}

      {mode === "analytics" && (
        <div className="dli-analytics-ui">
          <div className="dli-panel-kicker"><span>Measurement control room</span><small>Decision-ready model</small></div>
          <div className="dli-analytics-score"><span>Event quality</span><strong>96.2</strong><i>Validated</i></div>
          <div className="dli-analytics-grid">
            {["Acquisition", "Search", "Landing", "Revenue", "Retention", "Operations"].map((item, index) => <div className={index === 3 ? "is-active" : ""} key={item}><span>0{index + 1}</span><b>{item}</b><i /></div>)}
          </div>
          <div className="dli-analytics-footer"><span>Question → Event → Quality → Decision</span><strong>One source of operating truth</strong></div>
        </div>
      )}

      {mode === "ai" && (
        <div className="dli-ai-ui">
          <div className="dli-panel-kicker"><span>Growth operations / workflow</span><small>Human in the loop</small></div>
          <div className="dli-ai-line" aria-hidden="true" />
          {[["01", "Research", "Brief + evidence"], ["02", "Enrich", "Context + signals"], ["03", "Review", "Human decision"], ["04", "Operate", "Publish + report"]].map(([number, title, meta], index) => <div className={`dli-ai-node node-${index + 1}`} key={title}><span>{number}</span><b>{title}</b><small>{meta}</small></div>)}
          <div className="dli-ai-status"><i />Workflow observable / fallback ready</div>
          <div className="dli-panel-dots" aria-hidden="true">{Array.from({ length: 64 }, (_, index) => <i key={index} />)}</div>
        </div>
      )}
    </div>
  );
}

function AgencyFrame({ children, meta, path }) {
  const rootRef = useRef(null);
  const menuTriggerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("dl-body");
    document.documentElement.dataset.theme = "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f2f0eb");
    applyPageMeta(meta, path);
    return () => document.body.classList.remove("dl-body");
  }, [meta, path]);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const context = gsap.context(() => {
      gsap.from(".dli-hero__line > span", { yPercent: 112, duration: 1.05, stagger: 0.08, ease: "power4.out" });
      gsap.from(".dli-hero__description, .dli-hero__meta, .dli-hero__loop", { opacity: 0, y: 24, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.2 });
      gsap.utils.toArray(".dli-reveal").forEach((node) => gsap.from(node, { y: 38, opacity: 0, duration: 0.88, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 90%", once: true } }));
    }, rootRef);
    return () => context.revert();
  }, [path]);

  return (
    <div className="dl-page dli-page" ref={rootRef}>
      <a className="dli-skip" href="#main-content">Skip to content</a>
      <AgencyHeader currentPath={path} menuOpen={menuOpen} onMenuOpen={() => setMenuOpen(true)} triggerRef={menuTriggerRef} />
      <CapabilityRail currentPath={path} />
      <main id="main-content">{children}</main>
      <AgencyFooter />
      <AgencyMenu open={menuOpen} onClose={() => setMenuOpen(false)} currentPath={path} triggerRef={menuTriggerRef} />
    </div>
  );
}

function SubHero({ index, eyebrow, title, description, note = "One strategy · One measurement layer · One operating rhythm", tone = "paper" }) {
  return (
    <section className={`dli-hero dli-hero--${tone}`} id="top">
      <div className="dli-hero__meta"><span>/ {index}</span><span>{eyebrow}</span><span>Independent growth systems studio</span></div>
      <h1 className="dli-hero__title">{title.split("\n").map((line) => <span className="dli-hero__line" key={line}><span>{line}</span></span>)}</h1>
      <div className="dli-hero__lower">
        <p className="dli-hero__description">{description}</p>
        <p className="dli-hero__note"><span>/ Operating model</span>{note}</p>
      </div>
      <div className="dli-hero__loop" aria-label="DaisyLexi operating loop">{["Strategy", "Signal", "Decision", "Action", "Learning"].map((item, itemIndex) => <div key={item}><span>0{itemIndex + 1}</span><strong>{item}</strong><i /></div>)}</div>
    </section>
  );
}

function PageCTA({ eyebrow = "Next step", title, href, label }) {
  return (
    <section className="dli-page-cta">
      <div className="dli-page-cta__signal" aria-hidden="true"><i /><i /><i /><i /></div>
      <span className="dli-reveal">/ {eyebrow}</span>
      <a className="dli-reveal" href={href}>{title}<Arrow /></a>
      <p className="dli-reveal">{label}</p>
    </section>
  );
}

function WorkIndex() {
  return (
    <>
      <SubHero index="01" eyebrow="System studies" title={"Work designed\nto keep learning."} description="DaisyLexi studies growth as a connected operating system. Every public project below is labeled honestly and uses illustrative interface data rather than invented client results." tone="work" />
      <section className="dli-index-intro dli-section" id="page-body">
        <div className="dli-kicker dli-reveal"><span>/ Selected systems</span><p>Five connected capabilities</p></div>
        <h2 className="dli-reveal">Not a gallery of isolated screens. A set of operating models for how growth should work.</h2>
      </section>
      <section className="dli-work-grid dli-section">
        {agencyProjects.map((project, index) => (
          <a className={`dli-work-card dli-work-card--${project.palette} ${index === 0 || index === 3 ? "is-wide" : ""} dli-reveal`} href={`/work/${project.slug}/`} key={project.slug}>
            <SystemPanel mode={project.palette} label={project.title} compact />
            <div className="dli-work-card__meta"><span>{project.number} / {project.status}</span><span>{project.type}</span></div>
            <h2>{project.title}</h2><p>{project.summary}</p><span className="dli-text-link">Open system study <Arrow /></span>
          </a>
        ))}
      </section>
      <section className="dli-evidence dli-section dli-reveal"><span>/ Evidence boundary</span><h2>Strong presentation should never require fictional proof.</h2><p>Studio studies explain the system, assumptions and decision logic. Verified client outcomes will only be published when the work and evidence are approved for public use.</p></section>
      <PageCTA title="Bring the bottleneck. Build the system." href="/contact/" label="Start a growth systems project" />
    </>
  );
}

function CaseStudy({ project }) {
  const meta = { title: `${project.title} — DaisyLexi System Study`, description: project.summary };
  return (
    <AgencyFrame meta={meta} path={`/work/${project.slug}/`}>
      <SubHero index={project.number} eyebrow={`${project.status} / ${project.type}`} title={`${project.title}\nsystem study.`} description={project.summary} tone={project.palette} note={project.flow.join(" → ")} />
      <section className="dli-case-visual dli-section" id="page-body"><SystemPanel mode={project.palette} label={project.title} /></section>
      <section className="dli-case-story dli-section">
        <div className="dli-case-story__question dli-reveal"><span>/ The operating question</span><h2>{project.question}</h2></div>
        <div className="dli-case-story__direction dli-reveal"><span>/ System direction</span><p>{project.direction}</p><a href={`/services/${project.serviceSlug}/`}>Related capability <Arrow /></a></div>
      </section>
      <section className="dli-architecture dli-section">
        <div className="dli-section-head dli-reveal"><span>/ System architecture</span><h2>What the operating model needs to hold.</h2></div>
        <div className="dli-architecture__grid">{project.system.map((item, index) => <div className="dli-architecture__item dli-reveal" key={item}><span>0{index + 1}</span><h3>{item}</h3><i /></div>)}</div>
      </section>
      <section className="dli-flow-band dli-section dli-reveal"><span>/ Decision loop</span><div>{project.flow.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < project.flow.length - 1 && <i>→</i>}</div>)}</div></section>
      <section className="dli-boundary dli-section dli-reveal"><span>/ Evidence boundary</span><p>{project.boundary}</p></section>
      <PageCTA title="Turn the direction into an operating system." href="/contact/" label="Start a project" />
    </AgencyFrame>
  );
}

function ServicesIndex() {
  return (
    <>
      <SubHero index="02" eyebrow="Capabilities" title={"Five systems.\nOne growth model."} description="Each capability can solve a focused problem. The stronger advantage appears when performance, search, conversion, measurement and operations share one strategy and one learning loop." tone="services" />
      <section className="dli-index-intro dli-section" id="page-body">
        <div className="dli-kicker dli-reveal"><span>/ Connected service stack</span><p>Specialist depth, system-level view</p></div>
        <h2 className="dli-reveal">Choose the entry point. Keep the connections that make the work compound.</h2>
      </section>
      <section className="dli-service-index dli-section">
        {agencyServices.map((service) => (
          <a href={`/services/${service.slug}/`} className={`dli-service-row dli-service-row--${service.visual} dli-reveal`} key={service.slug}>
            <div className="dli-service-row__copy"><span>{service.number}</span><small>{service.eyebrow}</small><h2>{service.title}</h2><p>{service.summary}</p><b>Explore capability <Arrow /></b></div>
            <SystemPanel mode={service.visual} label={service.title} compact />
          </a>
        ))}
      </section>
      <section className="dli-operating-model dli-section">
        <div className="dli-section-head dli-reveal"><span>/ Shared operating layer</span><h2>Every engagement connects four things.</h2></div>
        <div className="dli-operating-model__grid">{[["01", "A decision", "What should become clearer after the work?"], ["02", "A signal", "What evidence will support the decision?"], ["03", "An action", "What changes in the channel, page or workflow?"], ["04", "A learning rhythm", "How does the system improve after launch?"]].map(([index, title, body]) => <div className="dli-reveal" key={index}><span>{index}</span><h3>{title}</h3><p>{body}</p></div>)}</div>
      </section>
      <PageCTA title="Not sure which system is the entry point?" href="/contact/" label="Describe the bottleneck" />
    </>
  );
}

function ServiceDetail({ service }) {
  const meta = { title: `${service.title} — DaisyLexi`, description: service.summary, schemaType: "Service" };
  return (
    <AgencyFrame meta={meta} path={`/services/${service.slug}/`}>
      <SubHero index={service.number} eyebrow={service.eyebrow} title={`${service.title}\nas a system.`} description={service.summary} tone={service.visual} note="Strategy → Signal → Decision → Operation → Learning" />
      <section className="dli-service-visual dli-section" id="page-body"><SystemPanel mode={service.visual} label={service.title} /></section>
      <section className="dli-service-intro dli-section">
        <div className="dli-kicker dli-reveal"><span>/ Approach</span><p>Built for operation, not presentation only</p></div>
        <h2 className="dli-reveal">{service.intro}</h2>
      </section>
      <section className="dli-deliverables dli-section">
        <div className="dli-deliverables__column dli-reveal"><span>/ Typical outputs</span>{service.outputs.map((item, index) => <div key={item}><b>0{index + 1}</b><h3>{item}</h3></div>)}</div>
        <div className="dli-deliverables__column dli-reveal"><span>/ Good fit when</span>{service.fit.map((item, index) => <div key={item}><b>0{index + 1}</b><p>{item}</p></div>)}</div>
      </section>
      <section className="dli-connections dli-section">
        <div className="dli-section-head dli-reveal"><span>/ What it connects to</span><h2>The capability becomes stronger when its signals move.</h2></div>
        <div className="dli-connections__grid">{service.connects.map((item, index) => <div className="dli-reveal" key={item}><span>0{index + 1}</span><h3>{item}</h3><i /></div>)}</div>
      </section>
      <section className="dli-process dli-section">{[["01", "Frame", "Define the business question, audience, current system and constraint."], ["02", "Map", "Connect traffic, experience, data, ownership and decision points."], ["03", "Build", "Design the assets, rules, instrumentation and operating workflow."], ["04", "Learn", "Launch with a review rhythm so the system improves after delivery."]].map(([index, title, body]) => <div className="dli-reveal" key={index}><span>/ {index}</span><h3>{title}</h3><p>{body}</p></div>)}</section>
      <PageCTA title="Build the next version with a clearer operating model." href="/contact/" label="Start a project" />
    </AgencyFrame>
  );
}

function AboutPage() {
  const meta = agencyRouteMeta["/about/"];
  const principles = [
    ["01", "Measure decisions, not just activity.", "A metric is useful when it changes what the team does next."],
    ["02", "Design the whole conversion loop.", "Traffic, message, experience and measurement should reinforce one another."],
    ["03", "Build for compounding returns.", "Architecture and operations matter because isolated wins decay."],
    ["04", "Automate friction, not judgment.", "AI should remove repetitive work while keeping important decisions visible."],
  ];
  return (
    <AgencyFrame meta={meta} path="/about/">
      <SubHero index="03" eyebrow="About the studio" title={"Built around\nthe system."} description="DaisyLexi is an independent growth systems studio connecting performance marketing, SEO, web conversion, analytics and AI operations." tone="about" />
      <section className="dli-about-statement dli-section" id="page-body">
        <div className="dli-kicker dli-reveal"><span>/ Point of view</span><p>Channels are not the operating model</p></div>
        <h2 className="dli-reveal">Growth works better when every specialist can see how their signal changes the next decision.</h2>
        <div className="dli-about-statement__copy dli-reveal"><p>Most teams do not need more disconnected tactics. They need a clearer system for how strategy becomes traffic, how traffic becomes experience, how experience becomes data and how data becomes the next action.</p><p>DaisyLexi works from that system-level view while keeping each discipline concrete enough to implement, operate and improve.</p></div>
      </section>
      <section className="dli-about-systems dli-section">
        <div className="dli-section-head dli-reveal"><span>/ The capability stack</span><h2>Five specialist systems. One shared learning layer.</h2></div>
        <div className="dli-about-systems__grid">{agencyServices.map((service) => <a className="dli-reveal" href={`/services/${service.slug}/`} key={service.slug}><span>{service.number}</span><h3>{service.title}</h3><p>{service.eyebrow}</p><Arrow /></a>)}</div>
      </section>
      <section className="dli-principles dli-section">{principles.map(([index, title, body], itemIndex) => <div className={`${itemIndex === 0 ? "is-featured" : ""} dli-reveal`} key={index}><span>{index}</span><h2>{title}</h2><p>{body}</p><i>↗</i></div>)}</section>
      <section className="dli-process dli-section">{[["01", "Frame", "Name the bottleneck and the decision the work should improve."], ["02", "Connect", "Map the channels, signals, handoffs and ownership around it."], ["03", "Build", "Create the experience, instrumentation and operating rules together."], ["04", "Refine", "Use real signals to remove noise and strengthen the system over time."]].map(([index, title, body]) => <div className="dli-reveal" key={index}><span>/ {index}</span><h3>{title}</h3><p>{body}</p></div>)}</section>
      <section className="dli-evidence dli-section dli-reveal"><span>/ Public proof standard</span><h2>No fictional team size, client roster, awards or performance claims.</h2><p>Public studies are labeled as studio work until a verified client engagement is approved for publication. Illustrative interface data is identified as such.</p></section>
      <PageCTA title="Have a growth problem worth connecting?" href="/contact/" label="Open a project brief" />
    </AgencyFrame>
  );
}

function ContactPage() {
  const meta = agencyRouteMeta["/contact/"];
  const [sent, setSent] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!runtimeConfig.contactEmail) return;
    const data = new FormData(event.currentTarget);
    const subject = `DaisyLexi project inquiry — ${data.get("projectType") || "Growth systems project"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Company / project: ${data.get("company") || ""}`,
      `Primary system: ${data.get("projectType") || ""}`,
      `Ideal launch window: ${data.get("timeline") || ""}`,
      "",
      "Current bottleneck / what should become clearer:",
      `${data.get("brief") || ""}`,
      "",
      "Current stack, traffic or measurement context:",
      `${data.get("context") || ""}`,
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:${runtimeConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AgencyFrame meta={meta} path="/contact/">
      <SubHero index="04" eyebrow="Project inquiry" title={"Bring the bottleneck.\nMap the system."} description="A useful brief does not need to be polished. Start with what is not connecting, what decision feels difficult and what should work differently after the project." tone="contact" note="Problem → Context → Signal → System → Next decision" />
      <section className="dli-contact dli-section" id="page-body">
        <aside className="dli-contact__aside dli-reveal">
          <span>/ A useful starting brief</span>
          <h2>Tell us what should become easier to decide.</h2>
          <div><b>01</b><p>What is the current growth bottleneck?</p></div><div><b>02</b><p>Which channels, pages or tools are involved?</p></div><div><b>03</b><p>What evidence exists today, and what is missing?</p></div><div><b>04</b><p>What should the team be able to do differently after launch?</p></div>
          {runtimeConfig.contactEmail ? <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail} <Arrow /></a> : <p>No public inbox is configured yet.</p>}
        </aside>
        <form className="dli-inquiry dli-reveal" onSubmit={handleSubmit}>
          <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <label><span>Company / project</span><input name="company" autoComplete="organization" /></label>
          <label><span>Primary system</span><select name="projectType" defaultValue=""><option value="" disabled>Select one</option>{agencyServices.map((service) => <option key={service.slug}>{service.title}</option>)}<option>Connected multi-system project</option><option>Not sure yet</option></select></label>
          <label><span>Ideal launch window</span><input name="timeline" placeholder="e.g. October / flexible" /></label>
          <label className="dli-inquiry__wide"><span>What is the bottleneck, and what should become clearer?</span><textarea name="brief" rows="7" required /></label>
          <label className="dli-inquiry__wide"><span>Current stack, traffic or measurement context (optional)</span><textarea name="context" rows="5" /></label>
          <p className="dli-inquiry__privacy">This form prepares an email in your own mail app. It does not silently send or store personal data through a hidden form backend.</p>
          <button className="dli-inquiry__submit" type="submit" disabled={!runtimeConfig.contactEmail}>{sent ? "Opening your email app…" : "Prepare project email"}<Arrow /></button>
        </form>
      </section>
    </AgencyFrame>
  );
}

function NotFound() {
  const meta = { title: "Page Not Found — DaisyLexi", description: "The requested DaisyLexi page could not be found." };
  return <AgencyFrame meta={meta} path={window.location.pathname}><SubHero index="404" eyebrow="Not found" title={"Signal lost.\nSystem intact."} description="This route does not exist in the DaisyLexi growth systems site." tone="contact" /><PageCTA title="Return to the growth system." href="/" label="Back home" /></AgencyFrame>;
}

export function AgencyRouter() {
  const requestedPath = normalizePath(window.location.pathname);
  if (requestedPath === "/") return null;
  const path = agencyLegacyAliases[requestedPath] || requestedPath;

  if (path === "/work/") return <AgencyFrame meta={agencyRouteMeta["/work/"]} path={path}><WorkIndex /></AgencyFrame>;
  if (path === "/services/") return <AgencyFrame meta={agencyRouteMeta["/services/"]} path={path}><ServicesIndex /></AgencyFrame>;
  if (path === "/about/") return <AboutPage />;
  if (path === "/contact/") return <ContactPage />;

  const project = agencyProjects.find((item) => path === `/work/${item.slug}/`);
  if (project) return <CaseStudy project={project} />;
  const service = agencyServices.find((item) => path === `/services/${item.slug}/`);
  if (service) return <ServiceDetail service={service} />;
  return <NotFound />;
}
