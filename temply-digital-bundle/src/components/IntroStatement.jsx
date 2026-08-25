import { siteContent } from "../data/siteContent.js";

export function IntroStatement() {
  const { statement } = siteContent;

  return (
    <section className="intro-statement section-anchor" id="statement" aria-labelledby="statement-title">
      <div className="content-width content-width--narrow">
        <h2 id="statement-title">{statement.title}</h2>
        <p>{statement.body}</p>
      </div>
      <div className="intro-statement__line" aria-hidden="true" />
    </section>
  );
}
