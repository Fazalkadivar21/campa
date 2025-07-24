import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useMagnetic from "../hooks/useMagnetic";
import drinks from "../../constants/drinks";

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ name }) => {
  useEffect(() => {
    drinks.forEach((drink) => {
      const img = new Image();
      img.src = drink.image;
    });
  }, []);

  const marqueeRef = useRef(null);
  const magneticRef = useMagnetic(1);

  const descriptions = [
    {
      name: "cola",
      text: "A non-alcoholic, refreshing drink, Campa Cola first hit the scene in India back in the 1970s. Known for its bold, nostalgic cola flavor, it’s made to bring back the classic taste generations grew up loving. Best served ice-cold!",
    },
    {
      name: "orange",
      text: "A non-alcoholic, refreshing drink, Campa Orange first lit up taste buds in India back in the 1970s. Loved for its bold, zesty orange flavor that sparks instant nostalgia! Best served chilled!",
    },
    {
      name: "cricket",
      text: "A non-alcoholic, refreshing drink, Campa Cricket is made for fans who live and breathe the game! Bursting with bold cola flavor and that extra spark to keep you cheering till the last over. Best served ice-cold!",
    },
    {
      name: "lemon",
      text: "A non-alcoholic, refreshing drink, Campa Lemon brings a burst of tangy lemon flavor that wakes up your taste buds! Launched to capture that classic, cool citrus kick generations love. Best served chilled to feel the zing!",
    },
    {
      name: "jeera",
      text: "A non-alcoholic, refreshing drink, Campa Jeera brings the authentic taste of India’s favorite spice blend to life! Bold, tangy, and unmistakably desi — it’s perfect for those who love a twist with every sip. Best served chilled!",
    },
    {
      name: "powerup",
      text: "A non-alcoholic, refreshing drink, Campa PowerUp is made to fuel your hustle! Packed with bold cola flavor and an energizing kick that keeps you going, whether it’s game time, grind time, or chill time. Best served ice-cold!",
    },
  ];

  const product = descriptions.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  const descriptionText = product
    ? product.text
    : "A classic, refreshing Campa drink! Best served chilled.";

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50, // move left by half its width
        repeat: -1, // infinite loop
        ease: "linear",
        duration: 20, // adjust speed (lower = faster)
      });
    }
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#f3f1eb] min-h-screen overflow-hidden">
      {/* Hero section */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <h1 className="absolute text-[18vw] lg:text-[12vw] font-extrabold opacity-80 tracking-tight uppercase leading-none select-none text-center text-[#00194a]">
          Campa <br /> {name}
        </h1>
        <img
          ref={magneticRef}
          src={`/images/${name}.png`}
          alt={`${name} Can`}
          className="relative z-10 w-[250px] md:w-[350px] lg:w-[400px] drop-shadow-2xl"
        />
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
          <img
            src="/images/logo-emblem.png"
            alt="Campa Logo"
            className="w-28 mb-2"
          />
        </div>
      </div>

      {/* Info section */}
      <div className="flex flex-col lg:flex-row justify-between items-start w-full max-w-7xl px-10 py-16">
        <div className="flex-1 mb-10 lg:mb-0">
          <h2 className="text-xl font-handwritten text-[#00194a] mb-2">
            Product
          </h2>
          <h1 className="text-5xl font-extrabold text-[#00194a] mb-4 capitalize">
            {name}
          </h1>
          <p className="text-[#00194a] max-w-xl leading-relaxed font-mono">
            {descriptionText}
          </p>
        </div>
        <div className="flex-1 border-4 border-[#00194a] p-6 max-w-md w-full">
          <div className="flex justify-between items-center border-b-2 border-[#00194a] pb-2 mb-2">
            <h3 className="text-2xl font-extrabold text-[#00194a]">
              Nutritional Values
            </h3>
            <span className="text-xl font-extrabold text-[#00194a]">
              For 100ml
            </span>
          </div>
          <div className="flex justify-between border-b border-[#00194a] py-2">
            <span className="font-semibold text-[#00194a]">Energy value</span>
            <span className="font-semibold text-[#00194a]">40kcal</span>
          </div>
          <div className="flex justify-between border-b border-[#00194a] py-2">
            <span className="font-semibold text-[#00194a]">Total fat</span>
            <span className="font-semibold text-[#00194a]">0g</span>
          </div>
          <div className="flex justify-between border-b border-[#00194a] py-2">
            <span className="font-semibold text-[#00194a]">Carbohydrates</span>
            <span className="font-semibold text-[#00194a]">10g</span>
          </div>
          <div className="flex justify-between border-b border-[#00194a] py-2">
            <span className="font-semibold text-[#00194a]">Protein</span>
            <span className="font-semibold text-[#00194a]">0g</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-semibold text-[#00194a]">Salt</span>
            <span className="font-semibold text-[#00194a]">0.1g</span>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden bg-[#00194a]">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-[#f3f1eb] py-4 font-extrabold text-xl uppercase tracking-widest"
        >
          <span className="mr-16">
            Grab yours now from the nearest convenience store! •{" "}
          </span>
          <span className="mr-16">
            Grab yours now from the nearest convenience store! •{" "}
          </span>
          <span className="mr-16">
            Grab yours now from the nearest convenience store! •{" "}
          </span>
          <span className="mr-16">
            Grab yours now from the nearest convenience store! •{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
