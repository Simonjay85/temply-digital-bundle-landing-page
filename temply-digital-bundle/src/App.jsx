import { lazy, Suspense } from "react";
import { AgencyHome } from "./components/AgencyHome.jsx";
import "./styles/agency.css";

const AgencyRouter = lazy(() => import("./components/AgencyPages.jsx").then((module) => ({ default: module.AgencyRouter })));
const EtsyLanding = lazy(() => import("./components/EtsyLanding.jsx").then((module) => ({ default: module.EtsyLanding })));
const pageVariant = String(import.meta.env.VITE_PAGE_VARIANT || "agency").trim().toLowerCase();

function RouteFallback() {
  return <div role="status" aria-live="polite" style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "#f2f0eb", color: "#101310", fontFamily: "Manrope, Arial, sans-serif" }}>Loading DaisyLexi…</div>;
}

export function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  if (pathname === "/etsy" || pageVariant === "etsy") {
    return <Suspense fallback={<RouteFallback />}><EtsyLanding /></Suspense>;
  }
  return pathname === "/" ? <AgencyHome /> : <Suspense fallback={<RouteFallback />}><AgencyRouter /></Suspense>;
}
