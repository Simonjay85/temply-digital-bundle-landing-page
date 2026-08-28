import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../motion/gsap.js";
import { runtimeConfig } from "../data/siteContent.js";
import { agencyProjects, agencyRouteMeta, agencyServices } from "../data/agencyPages.js";

const primaryNav = [
  ["Works", "/work/"],
  ["Services", "/services/"],
  ["About", "/about/"],
  ["Contact", "/contact/"],
];

function Arrow({ diagonal = false }) {
  return <svg className="az-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M9 5h10v10" : "M4 12h16M14 6l6 6-6 6"} /></svg>;
}

function Mark() {
  return <span className="az-mark" aria-hidden="true"><i /><b>D</b></span>;
}

function normalizePath(pathname) {
  const clean = pathname.replace(/\/+/g, "/");
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
  schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: meta.title, description: meta.description, url: canonical });
  document.head.appendChild(schema);
}

function PageVisual({ mode = "editorial", label = "DaisyLexi" }) {
  return (
    <div className={`az-page-visual az-page-visual--${mode}`} aria-hidden="true">
      <div className="az-page-visual__grid" />
      <span className="az-page-visual__index">DL / {label}</span>
      <strong>{label}</strong>
      <i>↗</i>
      <b />
    </div>
  );
}

function AgencyFrame({ children, meta, path }) {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => (typeof window !== "undefined" && window.localStorage.getItem("daisylexi-theme") === "night" ? "night" : "day"));
  const year = useMemo(() => new Date().getFullYear(), []);
  const emailHref = runtimeConfig.contactEmail ? `mailto:${runtimeConfig.contactEmail}?subject=${encodeURIComponent("DaisyLexi project inquiry")}` : "/contact/";

  useEffect(() => {
    document.body.classList.add("az-body");
    document.documentElement.dataset.agencyTheme = theme;
    window.localStorage.setItem("daisylexi-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "night" ? "#111111" : "#efede8");
    applyPageMeta(meta, path);
    return () => document.body.classList.remove("az-body");
  }, [meta, path, theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!rootRef.current || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from(".az-subhero__title span", { yPercent: 115, duration: 1.05, stagger: 0.08, ease: "power4.out" });
      gsap.utils.toArray(".az-reveal").forEach((node) => gsap.from(node, { y: 44, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: node, start: "top 91%", once: true } }));
      gsap.to(".az-scroll-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: 0.2 } });
    }, rootRef);
    return () => context.revert();
  }, [path]);

  return (
    <div className="az-page az-page--internal" ref={rootRef}>
      <a className="az-skip" href="#main">Skip to content</a>
      <div className="az-scroll-progress" aria-hidden="true"><i /></div>
      <header className="az-header">
        <a className="az-logo" href="/" aria-label="DaisyLexi home"><Mark /><span>DaisyLexi</span></a>
        <div className="az-header__actions">
          <a className="az-hello" href="/contact/">Say Hello</a>
          <button className="az-theme" onClick={() => setTheme((value) => value === "day" ? "night" : "day")}>{theme === "day" ? "Night" : "Day"}</button>
          <button className="az-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><span>Menu</span><i /><i /></button>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="az-footer az-footer--internal">
        <div className="az-footer__columns">
          <div><span>/ Discover</span><a href="/">Home</a><a href="/about/">About</a><a href="/work/">Works</a><a href="/services/">Services</a></div>
          <div><span>/ Contact</span>{runtimeConfig.contactEmail ? <a href={emailHref}>{runtimeConfig.contactEmail}</a> : <a href="/contact/">Project inquiry</a>}<a href="/etsy/">Lab / Etsy</a></div>
          <div><span>/ Start</span><a href="/contact/">Project brief</a><a href="/services/">Capabilities</a></div>
          <div><span>/ Status</span><span>Independent studio</span><span>Digital first</span></div>
        </div>
        <a className="az-footer__top" href="#top">Back to Top ↑</a>
        <div className="az-footer__word">DaisyLexi</div>
        <div className="az-footer__base"><span>Independent creative studio</span><span>© {year} DaisyLexi</span></div>
      </footer>
      <div className={`az-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="az-menu__top"><a className="az-logo" href="/"><Mark /><span>DaisyLexi</span></a><button onClick={() => setMenuOpen(false)}>Close ×</button></div>
        <div className="az-menu__tagline">Innovative design<br />and creative development</div>
        <nav className="az-menu__nav">{primaryNav.map(([label, href], index) => <a href={href} key={href}><span>/ 0{index + 1}</span><b>{label}</b><Arrow diagonal /></a>)}</nav>
        <div className="az-menu__foot"><span>DaisyLexi / Creative Development Studio</span><a href="/etsy/">Lab 001 ↗</a></div>
      </div>
    </div>
  );
}

function SubHero({ index, eyebrow, title, description }) {
  return (
    <section className="az-subhero" id="top">
      <div className="az-subhero__meta"><span>/ {index}</span><span>{eyebrow}</span></div>
      <h1 className="az-subhero__title">{title.split("\n").map((line) => <span key={line}><b>{line}</b></span>)}</h1>
      <p className="az-subhero__dek">{description}</p>
      <a className="az-subhero__scroll" href="#page-body">Scroll to explore <i>↓</i></a>
    </section>
  );
}

function WorkIndex() {
  return (
    <>
      <SubHero index="01" eyebrow="Selected work" title={"Ideas become\nsystems"} description="Self-initiated studio studies and live internal experiments. Every project is labeled honestly; no invented clients, awards or performance results." />
      <section className="az-index-grid az-section" id="page-body">
        {agencyProjects.map((project) => (
          <a className="az-index-card az-reveal" href={`/work/${project.slug}/`} key={project.slug}>
            <PageVisual mode={project.palette} label={project.number} />
            <div className="az-index-card__meta"><span>{project.number} / {project.status}</span><span>{project.type}</span></div>
            <h2>{project.title}</h2><p>{project.summary}</p><span className="az-index-card__link">Open study <Arrow diagonal /></span>
          </a>
        ))}
        <a className="az-index-card az-index-card--live az-reveal" href="/etsy/">
          <PageVisual mode="study" label="LAB 001" />
          <div className="az-index-card__meta"><span>04 / Live internal experiment</span><span>Landing / Digital product</span></div>
          <h2>Study Success Lab</h2><p>A live DaisyLexi landing-page experiment. The public page remains separate at /etsy/.</p><span className="az-index-card__link">Enter live lab <Arrow diagonal /></span>
        </a>
      </section>
      <PageCTA title="Need a system of your own?" href="/contact/" label="Start a project" />
    </>
  );
}

function CaseStudy({ project }) {
  const meta = { title: `${project.title} — DaisyLexi Studio Study`, description: project.summary };
  return (
    <AgencyFrame meta={meta} path={`/work/${project.slug}/`}>
      <SubHero index={project.number} eyebrow={`${project.status} / ${project.type}`} title={`${project.title}\nby DaisyLexi`} description={project.summary} />
      <section className="az-case-media az-section" id="page-body"><PageVisual mode={project.palette} label={project.title.toUpperCase()} /></section>
      <section className="az-case-story az-section">
        <div className="az-case-story__lead az-reveal"><span>/ The question</span><h2>{project.question}</h2></div>
        <div className="az-case-story__body az-reveal"><span>/ Direction</span><p>{project.direction}</p></div>
      </section>
      <section className="az-case-system az-section">
        <div className="az-section-no az-reveal">/ System</div><h2 className="az-reveal">What the study is designed to hold.</h2>
        <div className="az-case-system__grid">{project.system.map((item, index) => <div className="az-case-system__item az-reveal" key={item}><span>0{index + 1}</span><h3>{item}</h3></div>)}</div>
      </section>
      <section className="az-boundary az-section az-reveal"><span>/ Evidence boundary</span><p>{project.boundary}</p></section>
      <PageCTA title="Turn a direction into a working system." href="/contact/" label="Start a project" />
    </AgencyFrame>
  );
}

function ServicesIndex() {
  return (
    <>
      <SubHero index="02" eyebrow="Capabilities" title={"One idea.\nCarried through."} description="DaisyLexi works across direction, design, development and campaign systems so the visual idea does not disappear between handoffs." />
      <section className="az-service-index az-section" id="page-body">
        {agencyServices.map((service) => <a href={`/services/${service.slug}/`} className="az-service-index__row az-reveal" key={service.slug}><span>{service.number}</span><div><small>{service.eyebrow}</small><h2>{service.title}</h2><p>{service.summary}</p></div><Arrow diagonal /></a>)}
      </section>
      <PageCTA title="Not sure where the brief belongs?" href="/contact/" label="Tell us the problem" />
    </>
  );
}

function ServiceDetail({ service }) {
  const meta = { title: `${service.title} — DaisyLexi`, description: service.summary };
  return (
    <AgencyFrame meta={meta} path={`/services/${service.slug}/`}>
      <SubHero index={service.number} eyebrow={service.eyebrow} title={`${service.title}\nfor digital work`} description={service.summary} />
      <section className="az-service-detail az-section" id="page-body">
        <div className="az-service-detail__intro az-reveal"><span>/ Approach</span><h2>{service.intro}</h2></div>
        <PageVisual mode={service.slug.includes("campaign") ? "campaign" : service.slug.includes("brand") ? "editorial" : "product"} label={service.number} />
      </section>
      <section className="az-deliverables az-section">
        <div className="az-deliverables__column az-reveal"><span>/ Typical outputs</span>{service.outputs.map((item, index) => <div key={item}><b>0{index + 1}</b><h3>{item}</h3></div>)}</div>
        <div className="az-deliverables__column az-reveal"><span>/ Good fit when</span>{service.fit.map((item, index) => <div key={item}><b>0{index + 1}</b><p>{item}</p></div>)}</div>
      </section>
      <PageCTA title="Build the next version with intention." href="/contact/" label="Start a project" />
    </AgencyFrame>
  );
}

function AboutPage() {
  const meta = agencyRouteMeta["/about/"];
  const principles = ["Clarity before novelty.", "Motion earns its place.", "Systems beat isolated screens.", "A strong idea should survive mobile."];
  return (
    <AgencyFrame meta={meta} path="/about/">
      <SubHero index="03" eyebrow="About the studio" title={"Small studio.\nWide lens."} description="DaisyLexi is an independent creative studio working across brand systems, digital experiences, campaign pages and creative development." />
      <section className="az-about-page az-section" id="page-body">
        <div className="az-about-page__statement az-reveal"><span>/ Point of view</span><h2>Design is most useful when it gives the next decision a shape.</h2></div>
        <div className="az-about-page__copy az-reveal"><p>We approach a project as a connected system: the sentence that frames it, the visual language that makes it recognizable, the interface that makes it usable and the production rules that keep it coherent.</p><p>DaisyLexi does not claim a fictional team size, headquarters, award list or client roster. Public work is labeled as studio study or live internal experiment until verified client work is approved for publication.</p></div>
      </section>
      <section className="az-principle-page az-section"><div className="az-section-no az-reveal">/ Working rules</div>{principles.map((item, index) => <div className="az-principle-page__row az-reveal" key={item}><span>0{index + 1}</span><h2>{item}</h2><i>↗</i></div>)}</section>
      <section className="az-about-process az-section"><div className="az-reveal"><span>/ 01</span><h3>Frame</h3><p>Define the audience, tension, decision and useful constraint.</p></div><div className="az-reveal"><span>/ 02</span><h3>Direct</h3><p>Choose the visual, verbal and interaction territory.</p></div><div className="az-reveal"><span>/ 03</span><h3>Build</h3><p>Turn the direction into responsive production behavior.</p></div><div className="az-reveal"><span>/ 04</span><h3>Refine</h3><p>Remove noise and strengthen the moments that carry the idea.</p></div></section>
      <PageCTA title="Have a problem worth shaping?" href="/contact/" label="Open a project brief" />
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
    const subject = `DaisyLexi project inquiry — ${data.get("projectType") || "New project"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Company / project: ${data.get("company") || ""}`,
      `Project type: ${data.get("projectType") || ""}`,
      `Ideal launch window: ${data.get("timeline") || ""}`,
      "",
      "What are we building / what should change?",
      `${data.get("brief") || ""}`,
    ].join("\n");
    setSent(true);
    window.location.href = `mailto:${runtimeConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  return (
    <AgencyFrame meta={meta} path="/contact/">
      <SubHero index="04" eyebrow="Project inquiry" title={"Tell us what\nshould change."} description="A useful brief can be short. Start with what you are building, who it is for, what already exists and what should be different after launch." />
      <section className="az-contact-page az-section" id="page-body">
        <div className="az-contact-page__aside az-reveal"><span>/ Project inbox</span>{runtimeConfig.contactEmail ? <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail}</a> : <p>No public form endpoint is configured yet.</p>}<p>The form opens your email app with the brief prefilled. It does not silently store or submit personal information to a hidden backend.</p></div>
        <form className="az-inquiry az-reveal" onSubmit={handleSubmit}>
          <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
          <label><span>Company / project</span><input name="company" autoComplete="organization" /></label>
          <label><span>Project type</span><select name="projectType" defaultValue=""><option value="" disabled>Select one</option><option>Creative website</option><option>Brand identity</option><option>Landing / campaign system</option><option>Creative development</option><option>Digital product experience</option><option>Not sure yet</option></select></label>
          <label><span>Ideal launch window</span><input name="timeline" placeholder="e.g. October / flexible" /></label>
          <label className="az-inquiry__wide"><span>What are we building, and what should change after launch?</span><textarea name="brief" rows="7" required /></label>
          <button className="az-inquiry__submit" type="submit" disabled={!runtimeConfig.contactEmail}>{sent ? "Opening your email app…" : "Prepare project email"}<Arrow diagonal /></button>
        </form>
      </section>
    </AgencyFrame>
  );
}

function PageCTA({ title, href, label }) {
  return <section className="az-page-cta az-section"><span className="az-reveal">/ Next step</span><a className="az-reveal" href={href}>{title}<Arrow diagonal /></a><p className="az-reveal">{label}</p></section>;
}

function NotFound() {
  const meta = { title: "Page Not Found — DaisyLexi", description: "The requested DaisyLexi page could not be found." };
  return <AgencyFrame meta={meta} path={window.location.pathname}><SubHero index="404" eyebrow="Not found" title={"Wrong turn.\nGood internet."} description="This route does not exist in the DaisyLexi studio site." /><PageCTA title="Back to the studio." href="/" label="Return home" /></AgencyFrame>;
}

export function AgencyRouter() {
  const path = normalizePath(window.location.pathname);
  if (path === "/") return null;
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

