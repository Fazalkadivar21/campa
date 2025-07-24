import React, { useEffect, useRef, useState } from "react";

const Socials = () => {
  const socials = [1, 2, 3, 4, 5];
  const containerRef = useRef(null);
  const [powers, setPowers] = useState(Array(socials.length).fill(0));

  const config = {
    threshold: 150,
    distance: 40,
    rotation: -8,
  };

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const mapRange = (value, inMin, inMax, outMin, outMax) =>
    ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  const syncWave = (event) => {
    if (!containerRef.current) return;
    const pointer = event.clientX || event.touches?.[0]?.clientX || 0;
    const container = containerRef.current;
    const children = container.children;

    const newPowers = [];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const { left, width } = child.getBoundingClientRect();
      const centerX = left + width * 0.5;
      const distance = pointer - centerX;

      const normalizedDistance = distance / width;
      const clamped = clamp(normalizedDistance, -2, 2);
      const mapped = mapRange(Math.abs(clamped), 0, 2, 1, 0);
      const easedPower = easeOut(mapped);
      newPowers[i] = Math.max(0, easedPower);
    }

    setPowers(newPowers);
  };

  const settleWave = () => {
    setPowers(Array(socials.length).fill(0));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle both mouse and touch
    container.addEventListener("mousemove", syncWave);
    container.addEventListener("touchmove", syncWave);
    container.addEventListener("mouseleave", settleWave);
    container.addEventListener("touchend", settleWave);

    return () => {
      container.removeEventListener("mousemove", syncWave);
      container.removeEventListener("touchmove", syncWave);
      container.removeEventListener("mouseleave", settleWave);
      container.removeEventListener("touchend", settleWave);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-5">
      <h1 className="text-3xl md:text-6xl lg:text-8xl font-bold mb-2 text-center tracking-tight">
        We are everywhere
      </h1>

      <div
        ref={containerRef}
        className="
          flex flex-col md:flex-row items-center justify-center
          gap-4 md:gap-0
          md:-space-x-3 lg:-space-x-5 xl:-space-x-8
          max-w-full
        "
        style={{ touchAction: "none" }}
      >
        {socials.map((social, index) => {
          const power = powers[index] || 0;
          const clampedPower = clamp(power, 0, 1);
          const translateY = clampedPower * (config.distance * -1);
          const rotate = power * config.rotation;
          const scale = 1 + clampedPower * 0.05;

          return (
            <div
              key={index}
              className="relative flex-shrink-0 transition-all duration-200 ease-out cursor-pointer w-full md:w-auto"
              style={{
                transform: `translateY(${translateY}%) rotate(${rotate}deg) scale(${scale})`,
                zIndex: Math.round(clampedPower * 10),
              }}
            >
              <div className="
                flex items-center justify-center 
                rounded-lg md:rounded-xl
                overflow-hidden shadow-md hover:shadow-xl 
                transition-all duration-300 
              ">
                <img
                  className="
                    w-full h-60 sm:h-72
                    md:w-32 md:h-48 
                    lg:w-44 lg:h-64 
                    xl:w-[13rem] xl:h-[20rem]
                    2xl:w-[16rem] 2xl:h-[24rem]
                    object-cover
                  "
                  src={`/images/socials/social${index + 1}.png`}
                  alt={`social${index + 1}`}
                  draggable={false}
                />
              </div>

              {/* Subtle glow effect */}
              <div
                className="absolute inset-0 rounded-lg md:rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: clampedPower * 0.25,
                  background: `radial-gradient(circle at center, rgba(59, 130, 246, 0.12) 0%, transparent 70%)`,
                  filter: "blur(6px)",
                  transform: "scale(1.05)",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
