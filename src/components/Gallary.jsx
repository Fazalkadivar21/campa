import { useState, useEffect, useRef } from "react";
import drinks from "../constants/drinks";
import { useCursor } from "../context/CursorContext";

const Gallery = () => {
  const [rotationY, setRotationY] = useState(180);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const xPos = useRef(0);
  const startX = useRef(0);
  const { isDesktop } = useCursor();

  const baseImages = drinks.map((drink) => drink.can);
  const images = [...baseImages, ...baseImages].slice(0, 12);
  const total = images.length;

  const step = 360 / total;
  const translateZ = -680;

  const dragStart = (e) => {
    if (!isDesktop) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    xPos.current = Math.round(clientX);
    setIsDragging(true);
  };

  const drag = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = Math.round(clientX) - xPos.current;
    setRotationY((prev) => prev - deltaX * 0.06);
    xPos.current = Math.round(clientX);
  };

  const dragEnd = () => {
    if (!isDesktop) return;
    setIsDragging(false);
    setRotationY((prev) => {
      const snapped = Math.round(prev / step) * step;
      return snapped;
    });
  };

  useEffect(() => {
    if (isDragging && isDesktop) {
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag);
      window.addEventListener("mouseup", dragEnd);
      window.addEventListener("touchend", dragEnd);
      return () => {
        window.removeEventListener("mousemove", drag);
        window.removeEventListener("touchmove", drag);
        window.removeEventListener("mouseup", dragEnd);
        window.removeEventListener("touchend", dragEnd);
      };
    }
  }, [isDragging, isDesktop]);

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="text-[14vw] lg:text-[25vh] h-fit flex items-center justify-center">
        Now Serving
      </div>
      {/* Left arrow */}

      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: "2000px",
          width: "80vw",
          maxWidth: "600px",
          height: "70vh",
          maxHeight: "80vh",
        }}
      >
        {!isDesktop&&<div
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white cursor-pointer text-3xl select-none"
          onClick={() => setRotationY((prev) => prev - step)}
        >
          &#10094;
        </div>}
        <div
          className={`relative w-full h-full ${
            isDesktop && isDragging
              ? "cursor-grabbing"
              : isDesktop
              ? "cursor-grab"
              : "cursor-default"
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotationY}deg)`,
          }}
          onMouseDown={dragStart}
          onTouchStart={dragStart}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="absolute w-full h-full flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${
                  i * -step
                }deg) translateZ(${translateZ}px)`,
                backfaceVisibility: "hidden",
                opacity:
                  isDesktop && hoveredIndex !== -1 && hoveredIndex !== i
                    ? 0.7
                    : 1,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={() => isDesktop && setHoveredIndex(i)}
              onMouseLeave={() => isDesktop && setHoveredIndex(-1)}
            >
              <img
                src={src}
                alt={`${i}`}
                className="object-cover h-[80vh] md:h-[80vh] lg:h-[70vh] lg:w-[20vw] rounded-xl border-2 border-amber-300"
              />
            </div>
          ))}
        </div>

        {!isDesktop && <div
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white cursor-pointer text-3xl select-none"
          onClick={() => setRotationY((prev) => prev + step)}
        >
          &#10095;
        </div>}
      </div>
    </div>
  );
};

export default Gallery;
