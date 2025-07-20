import { useEffect, useRef } from "react";
import { useCursor } from "../context/CursorContext";
import gsap from "gsap";

export default function GlobalCursor() {
  const { cursorProps, isDesktop } = useCursor();
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    const followMouse = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", followMouse);
    return () => window.removeEventListener("mousemove", followMouse);
  }, [isDesktop]);

  if (!isDesktop) return null;

  const { text, scale, color } = cursorProps;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-50 pointer-events-none"
    >
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full text-emerald-600 flex items-center justify-center"
        style={{
          width: `${scale}px`,
          height: `${scale}px`,
          backgroundColor: color || "white",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
        }}
      >
        <p className="m-0 leading-none">{text}</p>
      </div>
    </div>
  );
}