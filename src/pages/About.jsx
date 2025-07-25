import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const story = [
  {
    heading: "Origins",
    text: "Born in a newly independent India, Campa Beverages embodied a nation's spirit. A drink crafted for the people — not by the market, but by heritage and heart.",
    img: "/images/origins.png",
  },
  {
    heading: "Ascent",
    text: "Decades of quiet confidence turned Campa into an icon. No neon slogans, just authentic taste shared at movie nights and family tables across generations.",
    img: "/images/ascent.png",
  },
  {
    heading: "Eclipse",
    text: "Then came the multinationals. Armed with glitter and budgets, they overtook shelves Campa once owned. A beloved legacy slipped quietly into memory.",
    img: "/images/eclips.png",
  },
  {
    heading: "Re-rise",
    text: "Now, Campa returns. Honoring the original recipe, refined for today. Rooted in heritage, reborn for a new generation. Taste, unchanged by time.",
    img: "/images/rerise.png",
  },
];

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const preloadImages = () => {
      story.forEach((item) => {
        const img = new Image();
        img.src = item.img;
      });
    };
    preloadImages();
  }, []);
  

  useGSAP(() => {
    gsap.utils.toArray(".story-section").forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });
    });
  }, []);

  return (
    <div data-barba="container" data-barba-namespace="about">
    <section className="bg-[#f3f1eb] text-[#00194a] font-sans mx-5 md:mx-10 lg:mx-20">
      {/* Hero */}
      <div className="relative flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4 sm:px-5 overflow-hidden">
        <h1 className="text-4xl sm:text-5xl lg:text-8xl font-serif font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 z-10">
          Campa Beverages
        </h1>
        <p className="max-w-xl sm:max-w-2xl text-base sm:text-lg lg:text-2xl font-light italic text-[#00194a]/80 z-10">
          Legacy reborn in every sip.
        </p>
      </div>

      {/* Story sections */}
      {story.map((section, index) => (
        <article
          key={index}
          className={`story-section flex flex-col lg:flex-row ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          } max-w-6xl xl:max-w-7xl mx-auto mb-16 sm:mb-24 overflow-hidden rounded-lg shadow-2xl`}
        >
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-[240px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              src={section.img}
              alt={section.heading}
              className="object-cover w-full h-full filter brightness-75 hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16 bg-[#00194a]">
            <h2 className="text-3xl sm:text-4xl text-[#f3f1eb] lg:text-6xl font-serif font-bold uppercase tracking-widest mb-4 sm:mb-6">
              {section.heading}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-[#f3f1eb]/90">
              {section.text}
            </p>
          </div>
        </article>
      ))}

      {/* Mission, Vision, Position */}
      <section className="text-center px-4 sm:px-6 py-12 md:py-20 lg:py-24">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold my-8 sm:my-12">
          <span className="block">CRAFTING JOY AND FLAVOR</span>
          <span className="block">FOR GENERATIONS TO COME</span>
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-8 sm:gap-12 max-w-5xl lg:max-w-6xl mx-auto">
          {["MISSION", "VISION", "POSITION"].map((title, idx) => (
            <div className="flex-1" key={idx}>
              <div className="inline-block mb-3 sm:mb-4 border border-[#00194a] rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
                <h4 className="font-semibold text-base sm:text-lg tracking-wide">
                  {title}
                </h4>
              </div>
              <p className="mt-2 leading-relaxed font-[helvetica] text-sm sm:text-base md:text-lg text-[#00194a]/90">
                {title === "MISSION"
                  ? "To create iconic, delicious beverages that bring people together — blending tradition, fun, and a splash of nostalgia."
                  : title === "VISION"
                  ? "To be the most loved and recognized beverage brand, inspiring smiles across every corner of the country and beyond."
                  : "A proudly homegrown brand that delivers authentic, refreshing taste — celebrating culture, heritage, and everyday moments."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Outro */}
      <div className="flex flex-col items-center text-center py-16 sm:py-24 px-4 sm:px-5">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-serif font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
          Discover the Rebirth
        </h2>
        <p className="max-w-lg sm:max-w-2xl text-sm sm:text-lg lg:text-xl font-light mb-6 sm:mb-8 text-[#00194a]/80">
          Timeless taste. Crafted for now.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#00194a] text-[#f3f1eb] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold uppercase tracking-wide hover:bg-[#00194a]/80 transition"
        >
          Taste the Legacy
        </button>
      </div>
    </section>
    </div>
  );
};

export default About;
