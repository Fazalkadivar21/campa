import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "motion/react";

const Slider = () => {
  const [scrollDir, setScrollDir] = useState("down");
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const speed = useRef(75); // px per second

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDir("down");
        speed.current = 75;
      } else if (currentScrollY < lastScrollY) {
        setScrollDir("up");
        speed.current = -75;
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useAnimationFrame((t, delta) => {
    const moveBy = (speed.current * delta) / 1000;
    const currentX = x.get();

    if (contentRef.current) {
      const contentWidth = contentRef.current.offsetWidth / 3; // width of one copy

      let newX = currentX + moveBy;

      if (speed.current > 0 && newX >= 0) {
        newX = -contentWidth;
      } else if (speed.current < 0 && newX <= -contentWidth) {
        newX = 0;
      }

      x.set(newX);
    }
  });

  const arrow = (
    <motion.img
      src="/images/arrow.svg"
      alt="arrow"
      className="h-[70px] w-[70px] p-6 mx-4 bg-white rounded-full"
      animate={{ rotate: scrollDir === "up" ? -90 : 0 }}
      transition={{ duration: 0.6 }}
    />
  );

  const items = (
    <>
      <div className="mx-4 pt-5">Nostalgic taste</div>
      <div className="mr-6">{arrow}</div>
      <div className="mx-4 pt-5">Now refreshing India</div>
      <div className="mr-6">{arrow}</div>
    </>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap w-full mt-20 mb-10">
      <motion.div
        ref={containerRef}
        className="flex items-center justify-center text-6xl uppercase"
        style={{ x }}
      >
        <div ref={contentRef} className="flex">
          {items}
          {items}
          {items}
        </div>
      </motion.div>
    </div>
  );
};

export default Slider;
