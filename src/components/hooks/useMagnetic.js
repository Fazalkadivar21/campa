// hooks/useMagnetic.js
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useMagnetic(strength = 0.2) {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const resetPosition = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("pointermove", handleMouseMove);
    el.addEventListener("pointerleave", resetPosition);

    return () => {
      el.removeEventListener("pointermove", handleMouseMove);
      el.removeEventListener("pointerleave", resetPosition);
    };
  }, [strength]);

  return magneticRef;
}
