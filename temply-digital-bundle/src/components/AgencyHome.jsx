import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../motion/gsap.js";
import { runtimeConfig } from "../data/siteContent.js";

const navItems = [
  { label: "Works", href: "/work/" },
  { label: "Services", href: "/services/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

const projects = [
  {
    number: "01",
    title: "Editorial commerce",
    type: "Brand / Web / Commerce",
    visual: "editorial",
    note: "Studio study",
    href: "/work/editorial-commerce/",
  },
  {
    number: "02",
    title: "Campaign architecture",
    type: "Landing / CRO / Motion",
    visual: "campaign",
    note: "Studio study",
    href: "/work/campaign-architecture/",
  },
  {
    number: "03",
    title: "Study Success Lab",
    type: "Digital product / Landing",
    visual: "study",
    note: "Live internal experiment",
    href: "/etsy/",
  },
  {
    number: "04",
    title: "Product ecosystems",
    type: "Interface / Systems / Build",
    visual: "product",
    note: "Studio study",
    href: "/work/product-ecosystems/",
  },
];

const services = [
  {
    number: "01",
    title: "Innovative design",
    tags: ["UI/UX", "Web design", "Applications", "Art direction", "Motion", "Design systems"],
    visual: "design",
    href: "/services/innovative-design/",
  },
  {
    number: "02",
    title: "Creative development",
    tags: ["Frontend", "Interactions", "Responsive build", "E-commerce", "Performance", "Maintenance"],
    visual: "development",
    href: "/services/creative-development/",
  },
  {
    number: "03",
    title: "Brand identity",
    tags: ["Positioning", "Verbal direction", "Visual identity", "Guidelines", "Rebranding", "Creative systems"],
    visual: "brand",
    href: "/services/brand-identity/",
  },
  {
    number: "04",
    title: "Campaign systems",
    tags: ["Landing pages", "CRO", "Paid traffic", "SEO foundations", "Attribution", "Creative testing"],
    visual: "campaigns",
    href: "/services/campaign-systems/",
  },
];

const notes = [
  {
    label: "Direction / 01",
    title: "Make the first decision obvious.",
    body: "The strongest page is not the one with the most effects. It is the one where hierarchy, motion and copy all point in the same direction.",
  },
  {
    label: "Systems / 02",
    title: "Design the rules, not just the screen.",
    body: "A visual idea becomes useful when it can survive real content, mobile constraints and the next campaign without losing its character.",
  },
  {
    label: "Motion / 03",
    title: "Movement should reveal structure.",
    body: "Animation earns its place when it explains relationship, pace or priority — not when it simply delays the next thing a visitor needs.",
  },
];

const galleryLabels = [
  "Art direction", "Creative code", "Editorial", "Identity", "Motion", "Commerce", "Typography", "Interfaces",
  "Campaign", "Systems", "Digital products", "Experiments",
];

function Arrow({ diagonal = false }) {
  return (
    <svg className="az-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? "M5 19 19 5M9 5h10v10" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

function Mark() {
  return (
    <span className="az-mark" aria-hidden="true">
      <i />
      <b>D</b>
    </span>
  );
}

function ProjectVisual({ type }) {
  if (type === "editorial") {
    return (
      <div className="az-project-visual az-project-visual--editorial" aria-hidden="true">
        <div className="az-editorial-poster"><small>DaisyLexi / Direction</small><strong>FORM<br /><em>MEETS</em><br />FUNCTION</strong><span>↗</span></div>
        <div className="az-editorial-disc"><i /><span>DL</span></div>
        <div className="az-editorial-ticket">SYSTEM / 01</div>
      </div>
    );
  }
  if (type === "campaign") {
    return (
      <div className="az-project-visual az-project-visual--campaign" aria-hidden="true">
        <div className="az-campaign-grid" />
        <div className="az-campaign-word">ATTENTION</div>
        <div className="az-campaign-orbit"><i /><i /><i /><span>→ ACTION</span></div>
        <div className="az-campaign-note">Hook / Proof / Action</div>
      </div>
    );
  }
  if (type === "study") {
    return (
      <div className="az-project-visual az-project-visual--study" aria-hidden="true">
        <div className="az-study-sheet az-study-sheet--one"><span>WEEK / 04</span><b>FOCUS</b><i /></div>
        <div className="az-study-sheet az-study-sheet--two"><span>GOAL MAP</span><b>01—06</b><i /></div>
        <div className="az-study-pill">LIVE / ETSY</div>
      </div>
    );
  }
  return (
    <div className="az-project-visual az-project-visual--product" aria-hidden="true">
      <div className="az-product-window">
        <div className="az-product-window__bar"><i /><i /><i /></div>
        <div className="az-product-window__body"><small>NEXT SYSTEM</small><strong>DESIGN<br />THAT<br /><em>HOLDS.</em></strong></div>
      </div>
      <div className="az-product-cursor">↗</div>
    </div>
  );
}

export function AgencyHome() {
  const rootRef = useRef(null);
  const trailRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "day";
    return window.localStorage.getItem("daisylexi-theme") === "night" ? "night" : "day";
  });
  const year = useMemo(() => new Date().getFullYear(), []);
  const contactHref = runtimeConfig.contactEmail
    ? `mailto:${runtimeConfig.contactEmail}?subject=${encodeURIComponent("DaisyLexi project inquiry")}`
    : "#contact";

  useEffect(() => {
    const description = "DaisyLexi is an independent creative studio for brand systems, creative websites, landing pages and digital experiences.";
    const canonical = runtimeConfig.siteUrl ? `${runtimeConfig.siteUrl}/` : `${window.location.origin}/`;
    const socialImage = new URL("agency-social.jpg", canonical).toString();
    document.body.classList.add("az-body");
    document.documentElement.lang = "en";
    document.documentElement.dataset.agencyTheme = theme;
    document.title = "DaisyLexi — Independent Creative Studio";
    window.localStorage.setItem("daisylexi-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "night" ? "#111111" : "#efede8");

    const meta = (selector, attrs, content) => {
      let node = document.head.querySelector(selector);
      if (!node) {
        node = document.createElement("meta");
        document.head.appendChild(node);
      }
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      node.setAttribute("content", content);
    };
    meta('meta[name="description"]', { name: "description" }, description);
    meta('meta[property="og:title"]', { property: "og:title" }, "DaisyLexi — Independent Creative Studio");
    meta('meta[property="og:description"]', { property: "og:description" }, description);
    meta('meta[property="og:type"]', { property: "og:type" }, "website");
    meta('meta[property="og:url"]', { property: "og:url" }, canonical);
    meta('meta[property="og:image"]', { property: "og:image" }, socialImage);
    meta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    meta('meta[name="twitter:title"]', { name: "twitter:title" }, "DaisyLexi — Independent Creative Studio");
    meta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    meta('meta[name="twitter:image"]', { name: "twitter:image" }, socialImage);

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

    return () => document.body.classList.remove("az-body");
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    const context = gsap.context(() => {
      if (!reduced) {
        gsap.from(".az-hero__title span", {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.1,
        });
        gsap.from(".az-hero__meta, .az-hero__aside, .az-hero__scroll", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.46,
        });
        gsap.utils.toArray(".az-reveal").forEach((element) => {
          gsap.from(element, {
            y: 48,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });
        gsap.utils.toArray(".az-project").forEach((element, index) => {
          gsap.from(element, {
            y: 70 + index * 10,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        gsap.to(".az-scroll-progress i", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom bottom", scrub: 0.2 },
        });
      }
    }, rootRef);

    let cleanupTrail = () => {};
    if (!reduced && finePointer) {
      const setters = trailRefs.current.map((node) => ({
        x: gsap.quickTo(node, "x", { duration: 0.35, ease: "power3" }),
        y: gsap.quickTo(node, "y", { duration: 0.35, ease: "power3" }),
        opacity: gsap.quickTo(node, "opacity", { duration: 0.2 }),
      }));
      let last = 0;
      const move = (event) => {
        const hero = rootRef.current?.querySelector(".az-hero");
        if (!hero) return;
        const bounds = hero.getBoundingClientRect();
        if (event.clientY < bounds.top || event.clientY > bounds.bottom) return;
        last += 1;
        setters.forEach((set, index) => {
          const lag = index * 18;
          window.setTimeout(() => {
            set.x(event.clientX - 46);
            set.y(event.clientY - 58);
            set.opacity(index < Math.min(6, Math.ceil(last / 2)) ? 1 : 0);
          }, lag);
        });
      };
      window.addEventListener("pointermove", move, { passive: true });
      cleanupTrail = () => window.removeEventListener("pointermove", move);
    }

    return () => {
      cleanupTrail();
      context.revert();
    };
  }, []);

  const toggleTheme = () => setTheme((value) => (value === "day" ? "night" : "day"));

  return (
    <div className="az-page" ref={rootRef}>
      <a className="az-skip" href="#main">Skip to content</a>
      <div className="az-scroll-progress" aria-hidden="true"><i /></div>

      <header className="az-header">
        <a className="az-logo" href="/" aria-label="DaisyLexi home"><Mark /><span>DaisyLexi</span></a>
        <div className="az-header__actions">
          <a className="az-hello" href="/contact/">Say Hello</a>
          <button className="az-theme" onClick={toggleTheme} aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}>
            {theme === "day" ? "Night" : "Day"}
          </button>
          <button className="az-menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><span>Menu</span><i /><i /></button>
        </div>
      </header>

      <main id="main">
        <section className="az-hero" id="top">
          <div className="az-trail" aria-hidden="true">
            {["a", "b", "c", "d", "e", "f"].map((item, index) => <i className={`az-trail__item az-trail__item--${item}`} ref={(node) => { trailRefs.current[index] = node; }} key={item} />)}
          </div>
          <div className="az-hero__meta">
            <span>DaisyLexi / Independent creative studio</span>
            <span>Brand · Digital · Campaign</span>
          </div>
          <h1 className="az-hero__title" aria-label="Unlock your brand's personality">
            <span><b>Unlock your brand&apos;s</b></span>
            <span className="az-hero__title-indent"><b>personality</b></span>
          </h1>
          <div className="az-hero__bottom">
            <div className="az-hero__social">@daisylexi <Arrow diagonal /></div>
            <div className="az-hero__aside">
              <span>Creative Development Studio</span>
              <p>Distinctive digital systems for internet-native ideas — directed, designed and built as one experience.</p>
            </div>
            <a className="az-hero__scroll" href="#studio"><span>Scroll to explore</span><i>↓</i></a>
          </div>
        </section>

        <section className="az-about az-section" id="studio">
          <div className="az-section-no az-reveal">/ 01</div>
          <a className="az-about__label az-reveal" href="/about/">A few words <Arrow diagonal /></a>
          <p className="az-about__statement az-reveal">Digital design keeps moving. DaisyLexi builds clear, character-rich systems that stay useful when the screen size, campaign or product changes.</p>
          <div className="az-about__art az-reveal" aria-hidden="true">
            <div className="az-about__art-main"><span>IDEA</span><i>→</i><strong>SYSTEM</strong></div>
            <div className="az-about__art-card"><small>DL / 2026</small><b>creative<br />direction</b></div>
            <div className="az-about__art-dot" />
          </div>
        </section>

        <section className="az-works az-section" id="works">
          <div className="az-section-no az-reveal">/ 02</div>
          <div className="az-works__head az-reveal">
            <h2>Selected<br />works</h2>
            <p>Live internal experiments and self-initiated studio studies. No invented clients or performance claims.</p>
          </div>
          <div className="az-projects">
            {projects.map((project, index) => {
              const Wrapper = project.href ? "a" : "article";
              const props = project.href ? { href: project.href } : {};
              return (
                <Wrapper className={`az-project az-project--${index + 1}`} key={project.number} {...props}>
                  <div className="az-project__media"><ProjectVisual type={project.visual} /></div>
                  <div className="az-project__info">
                    <span>{project.number} / {project.note}</span>
                    <h3>{project.title}</h3>
                    <p>{project.type}</p>
                    {project.href ? <Arrow diagonal /> : <span className="az-project__study">Concept study</span>}
                  </div>
                </Wrapper>
              );
            })}
          </div>
          <a className="az-text-link az-reveal" href="/work/">All work <Arrow /></a>
        </section>

        <section className="az-marquee" aria-label="Creative disciplines">
          <div className="az-marquee__track">
            {[0, 1].map((copy) => (
              <div className="az-marquee__set" aria-hidden={copy === 1} key={copy}>
                {['Design', 'Development', 'Branding', 'Commerce', 'Campaign'].map((item) => <span key={`${copy}-${item}`}>{item}<b>/</b></span>)}
              </div>
            ))}
          </div>
        </section>

        <section className="az-services az-section" id="services">
          <div className="az-services__intro az-reveal">
            <div className="az-section-no">/ 03</div>
            <h2>What we<br />can shape</h2>
            <p>One visual idea, carried through strategy, interface and production.</p>
          </div>
          <div className="az-service-list">
            {services.map((service) => (
              <a className="az-service az-reveal" href={service.href} key={service.number}>
                <span className="az-service__number">{service.number}</span>
                <div className={`az-service__visual az-service__visual--${service.visual}`} aria-hidden="true"><i /><b>{service.number}</b><span>DL</span></div>
                <div className="az-service__content">
                  <h3>{service.title}</h3>
                  <div className="az-service__tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <Arrow diagonal />
              </a>
            ))}
          </div>
          <a className="az-text-link az-reveal" href="/services/">Explore all services <Arrow /></a>
        </section>

        <section className="az-notes az-section" id="notes">
          <div className="az-section-no az-reveal">/ 04</div>
          <div className="az-notes__head az-reveal"><h2>Few words<br />from the studio</h2><p>Working principles — not customer testimonials.</p></div>
          <div className="az-note-grid">
            {notes.map((note) => (
              <article className="az-note az-reveal" key={note.label}>
                <span>{note.label}</span>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
                <i>✳</i>
              </article>
            ))}
          </div>
        </section>

        <section className="az-featured az-section">
          <div className="az-featured__head az-reveal">
            <div><span>/ 05</span><h2>Featured<br />notes</h2></div>
            <p>Short thinking around creative systems, campaign pages and the details that make digital work feel intentional.</p>
          </div>
          <div className="az-featured__grid">
            <article className="az-feature az-feature--large az-reveal"><span>Creative systems · 5 min</span><h3>Why a strong website needs rules after the hero.</h3><p>Consistency is not repetition. It is a set of decisions that lets every new section belong to the same world.</p><Arrow diagonal /></article>
            <article className="az-feature az-feature--small az-reveal"><span>Landing pages · 4 min</span><h3>Art direction and conversion are not opposites.</h3><p>Hierarchy can carry personality and still make the next action unmistakable.</p><Arrow diagonal /></article>
          </div>
        </section>

        <section className="az-contact az-section" id="contact">
          <span className="az-contact__small az-reveal">Write a line</span>
          <a className="az-contact__title az-reveal" href="/contact/">Let&apos;s talk about<br />your project <Arrow diagonal /></a>
          <div className="az-contact__meta az-reveal">
            <span>Brand systems</span><span>Creative websites</span><span>Landing pages</span><span>Digital experiments</span>
          </div>
        </section>

        <section className="az-gallery" aria-label="DaisyLexi creative disciplines">
          <div className="az-gallery__track">
            {[...galleryLabels, ...galleryLabels].map((label, index) => <div className={`az-gallery__tile az-gallery__tile--${(index % 6) + 1}`} key={`${label}-${index}`}><span>{label}</span><i>{String((index % 12) + 1).padStart(2, '0')}</i></div>)}
          </div>
        </section>
      </main>

      <footer className="az-footer">
        <div className="az-footer__columns">
          <div><span>/ Discover</span><a href="/">Home</a><a href="/about/">About</a><a href="/work/">Works</a><a href="/services/">Services</a></div>
          <div><span>/ Contact</span>{runtimeConfig.contactEmail ? <a href={contactHref}>{runtimeConfig.contactEmail}</a> : <p>Project inbox available on request.</p>}<a href="/etsy/">Lab / Etsy</a></div>
          <div><span>/ Info</span><a href="#notes">Studio notes</a><a href="/contact/">Start a project</a></div>
          <div><span>/ Ecosystem</span><a href="/work/">[01] Work</a><a href="/services/">[02] Capabilities</a><a href="/etsy/">[03] Lab</a></div>
        </div>
        <a className="az-footer__top" href="#top">Back to Top ↑</a>
        <div className="az-footer__word">DaisyLexi</div>
        <div className="az-footer__base"><span>Independent creative studio</span><span>© {year} DaisyLexi</span></div>
      </footer>

      <div className={`az-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="az-menu__top"><a className="az-logo" href="/" onClick={() => setMenuOpen(false)}><Mark /><span>DaisyLexi</span></a><button onClick={() => setMenuOpen(false)}>Close ×</button></div>
        <div className="az-menu__tagline">Innovative design<br />and creative development</div>
        <nav className="az-menu__nav">
          {navItems.map((item, index) => <a href={item.href} onClick={() => setMenuOpen(false)} key={item.href}><span>/ 0{index + 1}</span><b>{item.label}</b><Arrow diagonal /></a>)}
        </nav>
        <div className="az-menu__foot"><span>DaisyLexi / Creative Development Studio</span><a href="/etsy/">Lab 001 ↗</a></div>
      </div>
    </div>
  );
}
