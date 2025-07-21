import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursor } from "../../context/CursorContext";

gsap.registerPlugin(ScrollTrigger);

const StoryText = () => {
  const { setCursorProps } = useCursor();

  const handleMouseEnter = () => {
    setCursorProps({ text: "", scale: 512 , color : "transparent" });
  };

  const handleMouseLeave = () => {
    setCursorProps({ text: "", scale: 20 });
  };

  const textRef = useRef();
  useGSAP(() => {
    gsap.to(textRef.current, {
      x: "-175%",
      scrollTrigger: {
        trigger: ".story",
        start: "top 10%",
        end: "top -200%",
        scrub: true,
        pin: ".story",
      },
    });
  }, []);
  return (
    <div
      onMouseOver={handleMouseEnter}
      onMouseOut={handleMouseLeave}
      className="relative story w-[100%] h-screen flex items-center justify-start p-10"
    >
      <h1
        ref={textRef}
        id="bt"
        className="absolute -z-10 whitespace-nowrap text-[40vw] leading-none"
      >
        OUR STORY
      </h1>
    </div>
  );
};

export default StoryText;
