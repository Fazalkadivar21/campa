import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [cursorScaledDown, setCursorScaledDown] = useState(false); // local state
  const cursorRef = useRef();

  const products = [
    {
      image: "/images/cola.png",
      name: "cola",
      taste: "Cola",
      color: "#4B2C5E",
    },
    {
      image: "/images/jeera.png",
      name: "jeera",
      taste: "Jeera",
      color: "#7BAE7F",
    },
    {
      image: "/images/orange.png",
      name: "orange",
      taste: "Orange",
      color: "#C75B12",
    },
    {
      image: "/images/cricket.png",
      name: "cricket",
      taste: "Lemony",
      color: "#66A85E",
    },
    {
      image: "/images/lemon.png",
      name: "lemon",
      taste: "Lemon",
      color: "#D6B647",
    },
    {
      image: "/images/powerup.png",
      name: "powerup",
      taste: "Strong Cola",
      color: "#2E4A7D",
    },
  ];

  const changeProduct = () => {
    setCursorScaledDown(true);
    setTimeout(() => setCursorScaledDown(false), 200); // quick scale down on click
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const followMouse = ({ clientX: x, clientY: y }) => {
    gsap.to(cursorRef.current, {
      x: x - 55,
      y: y - 55,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    gsap.fromTo(
      ".product-image",
      { y: -550, rotate: 12, opacity: 0.8, scale: 0.8 },
      { y: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      ".taste-text",
      { opacity: 0, y: 20, rotate: 12 },
      { opacity: 1, y: 0, rotate: 0, duration: 0.5, ease: "power2.out", delay: 0.1 }
    );

    const newColor = products[index].color

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

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const handleFirstMove = (e) => {
        gsap.set(cursorRef.current, { x: e.clientX - 55, y: e.clientY - 55 });
        window.removeEventListener("mousemove", handleFirstMove);
        window.addEventListener("mousemove", followMouse);
      };

      window.addEventListener("mousemove", handleFirstMove);

      return () => {
        window.removeEventListener("mousemove", handleFirstMove);
        window.removeEventListener("mousemove", followMouse);
      };
    }
  }, []);

  return (
    <>
      <div
        id="hero"
        className={`relative overflow-hidden h-[95vh] flex flex-col items-center justify-center text-center m-5 rounded-2xl ${products[index].color}`}
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
        <div key={products[index].name} className="product-image md:h-[90%] lg:h-[90%] z-[1]">
        <img
          src={products[index].image}
          alt={products[index].name}
          className="  md:h-[90%] lg:h-[90%] object-contain mb-4 transition-transform duration-300 ease-in-out
          hover:-rotate-12"
          />
          </div>

        {/* Taste info */}
        <div className="taste-text text-xl md:text-2xl text-black">
          <span className="mr-2">Flavour:</span>
          <span>{products[index].taste}</span>
        </div>
      </div>

      <div
        ref={cursorRef}
        className={`cursor fixed top-2/3 left-2/3 lg:top-2.5 lg:left-2.5 z-50 ${cursorScaledDown ? "h-0 w-0 text-[0px]" : "h-32 w-32 text-3xl"}  rounded-full bg-[#F7E676] text-emerald-600 flex items-center justify-center`}
        onClick={changeProduct}
      >
        <p className="m-0 leading-none">TAP</p>
      </div>
    </>
  );
};

export default Hero;
