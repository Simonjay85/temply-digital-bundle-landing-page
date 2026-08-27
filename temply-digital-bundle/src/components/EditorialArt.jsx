import { EditorialImage, editorialAssets } from "./ProductMedia.jsx";

const sourceMap = {
  overview: editorialAssets.hero,
  planner: editorialAssets.hero,
  goals: editorialAssets.goalMap,
  cv: editorialAssets.academicStack,
  reflection: editorialAssets.systemWide,
  route: editorialAssets.goalMap,
  plan: editorialAssets.hero,
  rhythm: editorialAssets.systemWide,
  profile: editorialAssets.academicStack,
  "principle-route": editorialAssets.goalMap,
  "principle-plan": editorialAssets.systemWide,
  "principle-profile": editorialAssets.academicStack,
};

const defaultAlt = {
  overview: "Toàn cảnh Study Success Bundle trên bàn học",
  planner: "Các trang semester planner và weekly dashboard",
  goals: "Goal map và habit tracker của Study Success Bundle",
  cv: "Các trang academic CV và template học tập",
  reflection: "Các trang reflection và weekly review",
  route: "Bản đồ mục tiêu và các mốc học tập",
  plan: "Planner và lịch tuần trong Study Success Bundle",
  rhythm: "Trang review và các dấu mốc theo dõi",
  profile: "Bố cục academic CV và hồ sơ học tập",
  "principle-route": "Bản đồ mục tiêu trong bộ template số",
  "principle-plan": "Các trang planner và review xếp lớp",
  "principle-profile": "Trang academic CV trong Study Success Bundle",
};

function PaperOverlay({ variant }) {
  if (variant === "goals" || variant === "route" || variant === "principle-route") {
    return (
      <div className="editorial-art__overlay editorial-art__overlay--goal" aria-hidden="true">
        <span className="art-label">GOAL MAP</span>
        <svg viewBox="0 0 240 180" role="presentation">
          <path d="M24 142C64 130 63 78 111 87s44 47 103-28" />
          <circle cx="24" cy="142" r="7" />
          <circle cx="111" cy="87" r="11" />
          <circle cx="214" cy="59" r="15" />
          <path d="M214 39v40M194 59h40" />
        </svg>
        <strong>one next step</strong>
      </div>
    );
  }

  if (variant === "cv" || variant === "profile" || variant === "principle-profile") {
    return (
      <div className="editorial-art__overlay editorial-art__overlay--cv" aria-hidden="true">
        <span className="art-label">ACADEMIC CV</span>
        <strong>CV</strong>
        <div className="art-lines"><i /><i /><i /><i /><i /></div>
        <span className="art-corner">03 / PRESENT</span>
      </div>
    );
  }

  if (variant === "reflection" || variant === "rhythm" || variant === "principle-plan") {
    return (
      <div className="editorial-art__overlay editorial-art__overlay--reflection" aria-hidden="true">
        <span className="art-label">WEEKLY REVIEW</span>
        <strong>What<br />stays?</strong>
        <div className="art-checks"><i /><i /><i /></div>
        <span className="art-corner">KEEP / CHANGE / NEXT</span>
      </div>
    );
  }

  return (
    <div className="editorial-art__overlay editorial-art__overlay--planner" aria-hidden="true">
      <span className="art-label">SEMESTER / WEEK 04</span>
      <div className="art-calendar">
        {Array.from({ length: 12 }, (_, index) => <i key={index} />)}
      </div>
      <strong>make room<br />for the next</strong>
      <span className="art-corner">TEMPLY / 01</span>
    </div>
  );
}

export function EditorialArt({
  variant = "overview",
  alt,
  caption,
  className = "",
  loading = "lazy",
  sizes = "(max-width: 760px) 92vw, 48vw",
}) {
  const source = sourceMap[variant] || sourceMap.overview;

  return (
    <div className={`editorial-art editorial-art--${variant} ${className}`.trim()}>
      <EditorialImage
        src={source}
        alt={alt ?? defaultAlt[variant] ?? defaultAlt.overview}
        loading={loading}
        sizes={sizes}
      />
      <span className="editorial-art__wash" aria-hidden="true" />
      <PaperOverlay variant={variant} />
      {caption ? <span className="editorial-art__caption">{caption}</span> : null}
    </div>
  );
}
