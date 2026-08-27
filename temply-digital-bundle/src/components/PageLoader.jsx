import { useEffect, useState } from "react";

export function PageLoader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setComplete(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`page-loader${complete ? " is-complete" : ""}`} aria-hidden="true">
      <span className="page-loader__mark">T</span>
      <span className="page-loader__line" />
    </div>
  );
}
