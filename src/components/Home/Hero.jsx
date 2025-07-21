import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "../../context/CursorContext";
import drinkList from "../../constants/drinks";
import { motion } from "motion/react";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const { setCursorProps, isDesktop } = useCursor();
  const heroRef = useRef(null);


  const drinks = drinkList;

  const changeProduct = () => {
    setIndex((prev) => (prev === drinks.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setCursorProps({ text: "", scale: 20 });
          }
          else{
            setCursorProps({ text: "TAP", scale: 128 })
          }
        });
      },
      {
        threshold: 0, // Trigger as soon as *any* part is out of view
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [setCursorProps]);

  useEffect(() => {
    gsap.fromTo(
      ".product-image",
      { y: -550, rotate: 12, opacity: 0.8, scale: 0.8 },
      {
        y: 0,
        rotate: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".taste-text",
      { opacity: 0, y: 20, rotate: 12 },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.1,
      }
    );

    const newColor = drinks[index].color;

    gsap.set("#color-overlay", { backgroundColor: newColor });

    gsap.fromTo(
      "#color-overlay",
      { scale: 0 },
      {
        scale: 1.2,
        duration: 1.5,
        ease: "power2.out",
        onComplete: () => {
          gsap.set("#hero", { backgroundColor: newColor });
          gsap.set("#color-overlay", { scale: 0 });
        },
      }
    );
  }, [index]);

  return (
    <>
      <motion.div
      ref={heroRef}
        id="hero"
        onClick={changeProduct}
        onHoverStart={() => setCursorProps({ text: "TAP", scale: 128 })}
        onHoverEnd={() => setCursorProps({ text: "", scale: 20 })}
        className={`relative overflow-hidden h-[95vh] w-[96vw] flex flex-col items-center justify-center text-center m-4 rounded-2xl ${drinks[index].color}`}
      >
        <div
          id="color-overlay"
          className="absolute top-1/2 left-1/2 w-[200%] h-[200%] rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0"
        ></div>

        {/* Big brand title */}
        <h1 className="absolute z-0 -rotate-[15deg] text-[5.4rem] md:text-9xl lg:text-9xl font-bold text-white mb-4">
          DRINK
          <br />
          CAMPA
        </h1>

        {/* Product image */}
        <div
          key={drinks[index].name}
          className="product-image md:h-[90%] lg:h-[90%] z-[1]"
        >
          <img
            src={drinks[index].image}
            alt={drinks[index].name}
            className="  md:h-[90%] lg:h-[90%] object-contain mb-4 transition-transform duration-300 ease-in-out
          hover:-rotate-12"
          />
        </div>

        {/* Taste info */}
        <div className="taste-text text-xl md:text-2xl text-black">
          <span className="mr-2">Flavour:</span>
          <span>{drinks[index].taste}</span>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
