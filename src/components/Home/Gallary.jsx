import { useState, useEffect, useRef } from "react";
import drinks from "../../constants/drinks";
import { useCursor } from "../../context/CursorContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate();
  const arrow = (
    <img src="/images/arrow.svg" className="h-fit w-fit p-2" />
  );
  const [rotationY, setRotationY] = useState(180);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const xPos = useRef(0);
  const startX = useRef(0);
  const { isDesktop, setCursorProps } = useCursor();

  const baseImages = drinks.map((drink) => drink.can);
  const images = [...baseImages, ...baseImages].slice(0, 12);
  const total = images.length;

  const step = 360 / total;
  const translateZ = -680;

  const centeredIndex = Math.round((rotationY % 360) / step) % total;
  const normalizedCenteredIndex = (centeredIndex + total) % total;

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

  const handleRedirect = (src) => {
    const name = src.split("/")[src.split("/").length - 1].split(".")[0];
    const path = name.substring(0, name.length - 3);
    navigate(`/products/${path}`);
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
    <div className="relative h-fit w-screen flex flex-col items-center justify-center overflow-hidden select-none">
      <div className="text-[14vw] md:text-[12vw] lg:text-[25vh] h-fit flex items-center justify-center text-center">
        Timeless Taste
      </div>
      {/* Left arrow */}

      <div
        className="relative flex items-center justify-center pb-[20vh]"
        style={{
          perspective: "2000px",
          width: "80vw",
          maxWidth: "600px",
          height: "70vh",
          maxHeight: "80vh",
        }}
      >
        {!isDesktop && (
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#00194a] rounded-full -rotate-[135deg] p-2 cursor-pointer text-3xl select-none"
            onClick={() => setRotationY((prev) => prev - step)}
          >
            {arrow}
          </div>
        )}
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
              <motion.img
                src={src}
                alt={`${i}`}
                onHoverStart={() => {
                  if (i === normalizedCenteredIndex)
                    setCursorProps({ text: arrow, scale: 128 });
                }}
                onClick={()=> {setCursorProps({ text: "", scale: 20 });handleRedirect(src)}}
                onHoverEnd={() => setCursorProps({ text: "", scale: 20 })}
                className={`object-cover ${i === normalizedCenteredIndex ? "cursor-none" : ""} h-[80vh] md:w-[40vw] lg:h-[70vh] lg:w-[20vw] rounded-xl shadow-[0_0_10px_#00194a]`}
              />
            </div>
          ))}
        </div>

        {!isDesktop && (
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#00194a] rounded-full rotate-45 p-2 cursor-pointer text-3xl select-none"
            onClick={() => setRotationY((prev) => prev + step)}
          >
            {arrow}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
