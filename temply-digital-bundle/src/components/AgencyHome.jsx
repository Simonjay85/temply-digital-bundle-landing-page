import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../motion/gsap.js";
import { runtimeConfig } from "../data/siteContent.js";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Lab", href: "#lab" },
];

const capabilities = [
  {
    index: "01",
    eyebrow: "Position",
    title: "Brand systems",
    text: "Strategy, verbal direction, identity logic and visual rules that make a brand recognizable before a logo needs to explain it.",
    tags: ["Direction", "Identity", "Systems"],
  },
  {
    index: "02",
    eyebrow: "Experience",
    title: "Digital worlds",
    text: "Web experiences shaped around hierarchy, rhythm, interaction and a clear reason for every screen to exist.",
    tags: ["Web", "UX/UI", "Motion"],
  },
  {
    index: "03",
    eyebrow: "Performance",
    title: "Landing systems",
    text: "Campaign pages that connect creative direction with message clarity, conversion paths and the technical details needed for paid traffic.",
    tags: ["Landing", "CRO", "Campaign"],
  },
  {
    index: "04",
    eyebrow: "Scale",
    title: "Creative operations",
    text: "Reusable components, design rules and production patterns that keep a growing digital presence coherent instead of fragile.",
    tags: ["Design ops", "Content", "Build"],
  },
];

const process = [
  ["01", "Frame", "Define the tension, audience, decision and visual territory before making screens."],
  ["02", "Direct", "Build a distinctive language for type, space, image, motion and interaction."],
  ["03", "Build", "Turn the direction into a responsive system with production-grade behavior."],
  ["04", "Refine", "Remove noise, sharpen the moments that matter and keep the experience fast."],
];

const principles = [
  "Clarity before novelty.",
  "Motion earns its place.",
  "Systems beat isolated screens.",
  "A strong idea should survive mobile.",
];

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="agency-arrow">
      <path d={diagonal ? "M5 19 19 5M8 5h11v11" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="agency-brandmark" aria-hidden="true">
      <span>D</span><i />
    </span>
  );
}

export function AgencyHome() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.body.classList.add("agency-body");
    document.documentElement.dataset.theme = "dark";
    document.documentElement.lang = "en";
    document.title = "DaisyLexi — Independent Creative Studio";

    const description = "DaisyLexi is an independent creative studio shaping brand systems, digital experiences, landing pages and creative operations for internet businesses.";
    const canonical = runtimeConfig.siteUrl ? `${runtimeConfig.siteUrl}/` : `${window.location.origin}/`;
    const socialImage = new URL("agency-social.jpg", canonical).toString();
    const upsertMeta = (selector, attribute, value) => {
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement("meta");
        document.head.appendChild(node);
      }
      Object.entries(attribute).forEach(([key, entry]) => node.setAttribute(key, entry));
      node.setAttribute("content", value);
    };
    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, "DaisyLexi — Independent Creative Studio");
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, socialImage);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, "DaisyLexi — Independent Creative Studio");
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
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
      "@type": "WebPage",
      name: "DaisyLexi — Independent Creative Studio",
      description,
      url: canonical,
    });
    document.head.appendChild(schema);

    const pointer = (event) => {
      document.documentElement.style.setProperty("--agency-pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--agency-pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", pointer, { passive: true });

    return () => {
      document.body.classList.remove("agency-body");
      window.removeEventListener("pointermove", pointer);
    };
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const context = gsap.context(() => {
      gsap.from(".agency-hero__line > span", {
        yPercent: 120,
        rotate: 2,
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
        delay: 0.12,
      });
      gsap.from(".agency-hero__meta, .agency-hero__actions, .agency-hero__rail", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.48,
      });

      gsap.utils.toArray(".agency-reveal").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 42 }, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });

      gsap.to(".agency-orbit--one", {
        rotate: 38,
        yPercent: -16,
        ease: "none",
        scrollTrigger: { trigger: ".agency-hero", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".agency-orbit--two", {
        rotate: -26,
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".agency-hero", start: "top top", end: "bottom top", scrub: 1.2 },
      });

      gsap.utils.toArray(".agency-work-card").forEach((card, index) => {
        gsap.from(card, {
          y: 70 + index * 12,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });

      gsap.to(".agency-progress__bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: 0.25 },
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || briefOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, briefOpen]);

  const closeAndNavigate = () => setMenuOpen(false);

  const copyBrief = async () => {
    const brief = "DaisyLexi project brief\n\nWhat are we building?\nWho is it for?\nWhat should change after launch?\nWhat already exists?\nWhat is the ideal launch window?";
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="agency-page" ref={rootRef}>
      <a className="agency-skip" href="#agency-main">Skip to content</a>
      <div className="agency-progress" aria-hidden="true"><i className="agency-progress__bar" /></div>
      <div className="agency-pointer" aria-hidden="true" />

      <header className="agency-header">
        <a href="#top" className="agency-logo" aria-label="DaisyLexi home">
          <BrandMark />
          <span>DaisyLexi</span>
        </a>
        <div className="agency-header__center">Independent creative studio <span>↗</span> Digital first</div>
        <nav className="agency-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <button className="agency-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">Menu</button>
      </header>

      <main id="agency-main">
        <section className="agency-hero" id="top">
          <div className="agency-orbit agency-orbit--one" aria-hidden="true"><span>Direction</span><i /></div>
          <div className="agency-orbit agency-orbit--two" aria-hidden="true"><span>Experience</span><i /></div>
          <div className="agency-hero__meta">
            <span>DAISYLEXI® / 2026</span>
            <span>Brand · Web · Commerce · Campaign</span>
          </div>
          <h1 className="agency-hero__title" aria-label="We make the internet feel less ordinary">
            <span className="agency-hero__line"><span>We make the</span></span>
            <span className="agency-hero__line agency-hero__line--indent"><span>internet feel</span></span>
            <span className="agency-hero__line agency-hero__line--accent"><span>less ordinary.</span></span>
          </h1>
          <div className="agency-hero__lower">
            <p className="agency-hero__dek">DaisyLexi shapes brand systems, digital experiences and conversion-minded creative for businesses built on the internet.</p>
            <div className="agency-hero__actions">
              <a href="#work" className="agency-pill agency-pill--light">Explore the work <Arrow /></a>
              <button onClick={() => setBriefOpen(true)} className="agency-pill agency-pill--ghost">Project brief <Arrow diagonal /></button>
            </div>
          </div>
          <div className="agency-hero__rail" aria-hidden="true">
            <span>Strategy</span><i />
            <span>Art direction</span><i />
            <span>Creative technology</span><i />
            <span>Conversion systems</span>
          </div>
        </section>

        <section className="agency-manifesto agency-section" id="studio">
          <div className="agency-section__label agency-reveal">01 / Point of view</div>
          <div className="agency-manifesto__copy agency-reveal">
            <p className="agency-kicker">Not decoration. Direction.</p>
            <h2>Good creative should make the next decision feel <em>obvious.</em></h2>
          </div>
          <div className="agency-manifesto__note agency-reveal">
            <span>Our working belief</span>
            <p>Distinctive enough to remember. Clear enough to use. Flexible enough to become a system instead of a one-off screen.</p>
          </div>
        </section>

        <section className="agency-work agency-section" id="work">
          <div className="agency-section__head agency-reveal">
            <div className="agency-section__label">02 / Selected systems</div>
            <h2>Work that behaves like a <span>world.</span></h2>
            <p>Three territories we keep returning to: positioning, conversion and product experience.</p>
          </div>

          <div className="agency-work-grid">
            <article className="agency-work-card agency-work-card--a">
              <div className="agency-work-card__top"><span>01 / Editorial commerce</span><span>Brand + Web</span></div>
              <div className="agency-work-card__visual agency-visual agency-visual--editorial" aria-hidden="true">
                <div className="agency-visual__poster"><small>FORM / FUNCTION</small><strong>Make the<br />choice clear.</strong><i>↗</i></div>
                <div className="agency-visual__disc"><span>DaisyLexi</span></div>
              </div>
              <div className="agency-work-card__foot"><h3>Editorial systems for products that need more than a grid.</h3><Arrow diagonal /></div>
            </article>

            <article className="agency-work-card agency-work-card--b">
              <div className="agency-work-card__top"><span>02 / Campaign architecture</span><span>Landing + CRO</span></div>
              <div className="agency-work-card__visual agency-visual agency-visual--campaign" aria-hidden="true">
                <div className="agency-visual__signal"><span>Attention</span><span>Clarity</span><span>Action</span></div>
                <div className="agency-visual__target"><i /><i /><i /></div>
              </div>
              <div className="agency-work-card__foot"><h3>Campaign pages where art direction and conversion share the same brief.</h3><Arrow diagonal /></div>
            </article>

            <article className="agency-work-card agency-work-card--c">
              <div className="agency-work-card__top"><span>03 / Product ecosystems</span><span>Interface + Motion</span></div>
              <div className="agency-work-card__visual agency-visual agency-visual--interface" aria-hidden="true">
                <div className="agency-visual__window"><div className="agency-visual__windowbar"><i /><i /><i /></div><div className="agency-visual__type">YOUR<br /><span>NEXT</span><br />SYSTEM</div></div>
                <div className="agency-visual__cursor">↗</div>
              </div>
              <div className="agency-work-card__foot"><h3>Interfaces that keep their character after the hero section ends.</h3><Arrow diagonal /></div>
            </article>
          </div>
        </section>

        <section className="agency-capabilities agency-section" id="capabilities">
          <div className="agency-capabilities__intro agency-reveal">
            <div className="agency-section__label">03 / Capabilities</div>
            <p>One studio, fewer handoffs.</p>
            <h2>From the first sentence to the final hover state.</h2>
          </div>
          <div className="agency-capability-list">
            {capabilities.map((item) => (
              <article className="agency-capability agency-reveal" key={item.index}>
                <div className="agency-capability__index">{item.index}</div>
                <div className="agency-capability__title"><small>{item.eyebrow}</small><h3>{item.title}</h3></div>
                <p>{item.text}</p>
                <div className="agency-capability__tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="agency-marquee" aria-label="Studio disciplines">
          <div className="agency-marquee__track">
            {[0, 1].map((copy) => (
              <div className="agency-marquee__set" aria-hidden={copy === 1} key={copy}>
                <span>Strategy</span><b>✳</b><span>Identity</span><b>✳</b><span>Experience</span><b>✳</b><span>Motion</span><b>✳</b><span>Conversion</span><b>✳</b>
              </div>
            ))}
          </div>
        </section>

        <section className="agency-process agency-section" id="process">
          <div className="agency-process__sticky agency-reveal">
            <div className="agency-section__label">04 / How we work</div>
            <h2>Small loop.<br />High signal.</h2>
            <p>Enough structure to move decisively, enough room to find the unexpected idea.</p>
          </div>
          <div className="agency-process__steps">
            {process.map(([index, title, text]) => (
              <article className="agency-process-step agency-reveal" key={index}>
                <span>{index}</span><h3>{title}</h3><p>{text}</p><i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="agency-principles agency-section">
          <div className="agency-section__label agency-reveal">05 / Studio rules</div>
          <div className="agency-principles__list">
            {principles.map((principle, index) => (
              <div className="agency-principle agency-reveal" key={principle}>
                <span>0{index + 1}</span><h3>{principle}</h3><b>↗</b>
              </div>
            ))}
          </div>
        </section>

        <section className="agency-lab agency-section" id="lab">
          <a className="agency-lab__card agency-reveal" href="/etsy/">
            <div className="agency-lab__meta"><span>DAISYLEXI LAB / 001</span><span>Live experiment ↗</span></div>
            <div className="agency-lab__content">
              <div>
                <p>Campaign system</p>
                <h2>Study Success<br />Landing Lab</h2>
              </div>
              <div className="agency-lab__orb" aria-hidden="true"><span>OPEN</span></div>
            </div>
            <div className="agency-lab__foot"><span>Editorial landing · Motion · Conversion-ready structure</span><span>Enter /etsy/</span></div>
          </a>
        </section>

        <section className="agency-closing">
          <div className="agency-closing__eyebrow agency-reveal">06 / The next thing</div>
          <h2 className="agency-reveal">Make it hard<br />to <span>ignore.</span></h2>
          <div className="agency-closing__bottom agency-reveal">
            <p>Start with the question. Build the world around the answer.</p>
            <button className="agency-pill agency-pill--light agency-pill--large" onClick={() => setBriefOpen(true)}>Open a project brief <Arrow diagonal /></button>
          </div>
        </section>
      </main>

      <footer className="agency-footer">
        <div className="agency-footer__brand"><BrandMark /><span>DaisyLexi</span></div>
        <div className="agency-footer__meta"><span>Independent creative studio</span><span>Digital first / Worldwide interface</span></div>
        <nav aria-label="Footer navigation">{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
        <div className="agency-footer__base"><span>© {year} DaisyLexi</span><a href="#top">Back to top ↑</a></div>
      </footer>

      <div className={`agency-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="agency-overlay__top"><span>DaisyLexi / Navigation</span><button onClick={() => setMenuOpen(false)}>Close ×</button></div>
        <nav>{navItems.map((item, index) => <a href={item.href} onClick={closeAndNavigate} key={item.href}><span>0{index + 1}</span>{item.label}<Arrow diagonal /></a>)}</nav>
        <a href="/etsy/" className="agency-overlay__lab">Lab 001 / Etsy experiment <Arrow /></a>
      </div>

      <div className={`agency-brief ${briefOpen ? "is-open" : ""}`} aria-hidden={!briefOpen}>
        <button className="agency-brief__backdrop" aria-label="Close project brief" onClick={() => setBriefOpen(false)} />
        <aside className="agency-brief__panel" role="dialog" aria-modal="true" aria-label="Project brief starter">
          <div className="agency-brief__top"><span>Project brief / starter</span><button onClick={() => setBriefOpen(false)}>Close ×</button></div>
          <div className="agency-brief__body">
            <p className="agency-brief__eyebrow">Five useful questions</p>
            <h2>Start with the problem, not the deliverable.</h2>
            <ol>
              <li><span>01</span>What are we building?</li>
              <li><span>02</span>Who is it for?</li>
              <li><span>03</span>What should change after launch?</li>
              <li><span>04</span>What already exists?</li>
              <li><span>05</span>What is the ideal launch window?</li>
            </ol>
            <p className="agency-brief__note">The public contact route can be connected once the preferred inbox or form endpoint is configured.</p>
            <button className="agency-pill agency-pill--light agency-pill--wide" onClick={copyBrief}>{copied ? "Brief copied ✓" : "Copy brief template"}<Arrow /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}
