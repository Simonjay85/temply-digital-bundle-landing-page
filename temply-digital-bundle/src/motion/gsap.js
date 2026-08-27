import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// One shared motion engine keeps scroll-linked work and component timelines
// from competing for the same properties.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
