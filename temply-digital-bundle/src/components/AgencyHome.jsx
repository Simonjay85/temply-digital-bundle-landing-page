import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../motion/gsap.js";

const projects = [
  ["Growth operating system", "Paid media · Analytics · CRO", "project-a"],
  ["Conversion landing system", "Strategy · Creative · Web", "project-b"],
  ["SEO content engine", "Search · Content · Measurement", "project-c"],
  ["AI workflow stack", "Automation · Ops · Intelligence", "project-d"],
];

const services = [
  ["Performance marketing", "Paid social · Paid search · Native · Creative testing", "Measurement · Attribution · Budget systems · Reporting"],
  ["SEO growth systems", "Technical SEO · Content strategy · Topic clusters · Search UX", "Internal linking · Content ops · Measurement · Iteration"],
  ["Web & conversion", "Landing pages · UX/UI · Message hierarchy · Experimentation", "CRO · Analytics · Speed · E-Commerce journeys"],
  ["AI growth operations", "Research · Automation · Workflow design · Data enrichment", "Content ops · Lead systems · Reporting · AI assistants"],
];

const principles = [
  ["Every channel should connect to a measurable business decision, not just a dashboard metric.", "01 / Measure", "Signal before scale"],
  ["Creative, landing pages and media buying perform better when they are designed as one conversion system.", "02 / Connect", "One growth loop"],
  ["SEO compounds when content architecture, internal linking and publishing operations are built to work together.", "03 / Compound", "Search as a system"],
  ["Automation should remove repetitive work while keeping the important decisions visible and controllable.", "04 / Automate", "Human-led AI ops"],
  ["The strongest growth stack is the one a team can understand, maintain and improve every week.", "05 / Operate", "Clarity over complexity"],
];

const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || "hello@daisylexi.com").trim();
const contactHref = `mailto:${contactEmail}`;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function AgencyHome() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("az-body");
    document.documentElement.dataset.theme = "light";
    document.documentElement.lang = "en";
    document.title = "DaisyLexi — Performance Marketing, SEO & AI Growth Systems";

    const description = "DaisyLexi builds performance marketing, SEO, conversion, e-commerce and AI automation systems for digital businesses.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "website");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#eeeae8");

    return () => document.body.classList.remove("az-body");
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.from(".az-hero__title > span, .az-hero__title > small", { yPercent: 110, duration: 1, stagger: 0.05, ease: "power4.out" });
      gsap.from(".az-fade", { opacity: 0, y: 22, duration: 0.8, stagger: 0.05, ease: "power3.out", delay: 0.25 });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="az-page" ref={rootRef}>
      <header className="az-header">
        <a href="#top" className="az-logo">DaisyLexi®</a>
        <div className="az-header__actions">
          <a href="#contact">Say Hello</a>
          <span>Growth systems</span>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu">Menu</button>
        </div>
      </header>

      <main>
        <section className="az-hero" id="top">
          <div className="az-hero__side az-fade">
            <a href="#works">@daisylexi</a>
            <span>Performance · SEO · Web · AI</span>
          </div>
          <h1 className="az-hero__title" aria-label="Build growth that compounds">
            <span>Build</span>
            <small>growth that compounds</small>
          </h1>
          <div className="az-hero__bottom az-fade">
            <span>Scroll to explore</span>
            <div className="az-scrollline"><i /></div>
          </div>
        </section>

        <div className="az-hero-media" aria-hidden="true">
          <div className="az-hero-media__stone az-hero-media__stone--one" />
          <div className="az-hero-media__stone az-hero-media__stone--two" />
          <div className="az-hero-media__ring" />
        </div>

        <section className="az-intro" id="about">
          <a className="az-label" href="#about">A few words</a>
          <p>Growth works better when media, search, creative, websites, data and automation operate as one system instead of six disconnected tactics.</p>
        </section>

        <section className="az-works" id="works">
          <div className="az-project-grid">
            {projects.map(([title, tags, cls], index) => (
              <article className={`az-project ${cls}`} key={title + index}>
                <div className="az-project__media">
                  <div className="az-art-shape" />
                  <div className="az-art-card"><small>DAISYLEXI®</small><strong>{String(index + 1).padStart(2, "0")}</strong></div>
                </div>
                <div className="az-project__meta"><h3>{title}</h3><span>{tags}</span></div>
              </article>
            ))}
          </div>
          <a className="az-allworks" href="#services">All Works <Arrow /></a>
        </section>

        <section className="az-proof" aria-label="Creative showcase">
          <div className="az-proof__grid">
            {["Paid media","Measurement","CRO systems","SEO architecture","AI operations","E-commerce growth"].map((label,index)=><article key={label} className={`az-proof__item az-proof__item--${index+1}`}><div className="az-proof__shape"/><span>{label}</span><i>{String(index+1).padStart(2,"0")}</i></article>)}
          </div>
        </section>

        <section className="az-marquee" aria-hidden="true">
          <div className="az-marquee__track">
            {[0,1].map(copy => <div className="az-marquee__set" key={copy}>
              {['Performance/','SEO/','Conversion/','eCommerce/','Automation/'].map(item => <span key={item}>{item}</span>)}
            </div>)}
          </div>
        </section>

        <section className="az-services" id="services">
          {services.map(([title, line1, line2], index) => (
            <article className="az-service" key={title}>
              <div className="az-service__index">0{index + 1}</div>
              <div className="az-service__copy"><div>{line1}</div><div>{line2}</div></div>
              <h2>{title}</h2>
              <div className={`az-service__visual az-service__visual--${index + 1}`}><span>{index + 1}</span></div>
            </article>
          ))}
        </section>

        <section className="az-testimonials">
          <div className="az-section-title"><span>How growth</span><span>should work</span></div>
          <div className="az-testimonial-grid">
            {principles.map(([quote, name, role], index) => (
              <article className="az-quote" key={name}>
                <div className="az-quote__thumb">{String(index + 1).padStart(2, '0')}</div>
                <p>{quote}</p>
                <div><strong>{name}</strong><span>{role}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="az-news">
          <div className="az-section-title"><span>Growth</span><span>notes</span></div>
          <a className="az-news__overview" href="#contact">Discuss a system <Arrow /></a>
          <div className="az-news-grid">
            <article><span>Measurement · CRO · 6 mins</span><h3>Build landing pages that learn from paid traffic</h3><div>DaisyLexi · Growth systems</div><p>A landing page should do more than convert one campaign. The best ones make message-market fit visible, create reusable creative insights and improve the next media decision.</p></article>
            <article><span>SEO · AI Ops · 5 mins</span><h3>Turn SEO content into an operating system</h3><div>DaisyLexi · Search systems</div><p>Topic architecture, internal links, publishing cadence and AI-assisted research become much more valuable when they are designed as one repeatable workflow.</p></article>
          </div>
        </section>

        <section className="az-contact" id="contact">
          <span>Write a line</span>
          <a href={contactHref}>Let's build your growth system <Arrow /></a>
        </section>

        <section className="az-strip" aria-hidden="true">
          <div className="az-strip__track">
            {['Paid Media','Analytics','SEO','CRO','Landing Pages','Automation','E-Commerce','Email','Experimentation'].map((item,index)=><div key={item}><span>{item}</span><i>{String(index+1).padStart(2,'0')}</i></div>)}
          </div>
        </section>
      </main>

      <footer className="az-footer">
        <div><span>/ Discover</span><a href="#top">Home</a><a href="#about">About us</a><a href="#works">Case studies</a><a href="#services">Services</a><a href="#contact">Contact</a></div>
        <div><span>/ Contact</span><a href={contactHref}>{contactEmail}</a><a href="#contact">Start a project ↗</a></div>
        <div><span>/ Focus</span><a href="#services">Performance</a><a href="#services">SEO</a><a href="#services">AI systems</a></div>
        <div><span>/ Explore</span><a href="#works">[01] Systems</a><a href="#services">[02] Capabilities</a><a href="#about">[03] Approach</a><a href="#contact">[04] Contact</a></div>
        <div className="az-footer__bottom"><a href="#top">Back to Top</a><strong>DaisyLexi</strong><span>Independent growth systems studio ©2026</span></div>
      </footer>

      <div className={`az-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <div className="az-menu__top"><span>DaisyLexi®</span><button onClick={() => setMenuOpen(false)}>Close</button></div>
        <nav>
          {['Home','Systems','Services','Approach','Contact'].map((item,index)=><a key={item} href={item==='Home'?'#top':item==='Systems'?'#works':item==='Services'?'#services':item==='Contact'?'#contact':'#about'} onClick={()=>setMenuOpen(false)}><span>/ 0{index+1}</span>{item}<Arrow /></a>)}
        </nav>
        <div className="az-menu__foot"><span>{contactEmail}</span><span>Performance · SEO · Web · AI</span></div>
      </div>
    </div>
  );
}
