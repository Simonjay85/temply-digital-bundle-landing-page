import { EditorialArt } from "./EditorialArt.jsx";

const mediaItems = [
  { variant: "planner", label: "Planner", caption: "01 / plan" },
  { variant: "goals", label: "Goal map", caption: "02 / map" },
  { variant: "cv", label: "Academic CV", caption: "03 / present" },
  { variant: "reflection", label: "Reflection", caption: "04 / review" },
  { variant: "plan", label: "Weekly dashboard", caption: "05 / week" },
];

export function MediaStrip() {
  return (
    <section className="media-strip section-anchor" id="media" aria-labelledby="media-title">
      <div className="content-width media-strip__header">
        <span className="section-index section-index--light">09 / MEDIA STRIP</span>
        <p id="media-title">Một vài trang để bắt đầu một nhịp mới.</p>
      </div>
      <div className="media-strip__track">
        {mediaItems.map((item, index) => (
          <figure className={`media-strip__item media-strip__item--${index + 1}`} key={item.variant}>
            <EditorialArt variant={item.variant} alt={`${item.label} trong Study Success Bundle`} loading="lazy" sizes="(max-width: 760px) 43vw, 18vw" />
            <figcaption><span>{item.caption}</span><strong>{item.label}</strong></figcaption>
          </figure>
        ))}
      </div>
      <div className="media-strip__ticker" aria-hidden="true">
        <span>Plan / Track / Present / Review / Plan / Track / Present / Review /</span>
      </div>
    </section>
  );
}
