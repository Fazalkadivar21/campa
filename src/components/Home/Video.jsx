import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Video = () => {
  const videoRef = useRef(null);
  const textRefs = useRef([]);
  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/videos/output.mp4";
    video.preload = "auto";
    video.load();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const video = videoRef.current;
    video.load();

    const duration = 19; // seconds

    // Make sure all texts start hidden and positioned
    textRefs.current.forEach((el) => {
      gsap.set(el, { 
        opacity: 0, 
        y: 20,
        scale: 0.9
      });
    });

    const onLoaded = () => {
      // ✅ Scrub video playback with proper pinning
      ScrollTrigger.create({
        trigger: video.parentElement,
        start: "top top",
        end: "+=5000",
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: gsap.to(video, {
          currentTime: duration,
          ease: "none",
        }),
      });

      // ✅ Text timeline synced to scroll - each text appears one by one
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: video.parentElement,
          start: "top top",
          end: "+=5000",
          scrub: true,
        },
      });

      const numTexts = textRefs.current.length;
      const totalScrollTime = 1; // Total timeline duration (0 to 1)
      const textShowDuration = 0.15; // How long each text stays visible
      const textTransitionDuration = 0.08; // How long fade in/out takes
      
      // Calculate spacing between text appearances
      const spacing = (totalScrollTime - textShowDuration) / (numTexts - 1);

      textRefs.current.forEach((el, i) => {
        const startTime = i * spacing;
        const endTime = startTime + textShowDuration;
        
        // Fade in and scale up
        tl.to(el, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: textTransitionDuration, 
          ease: "power2.out" 
        }, startTime);
        
        // Fade out and scale down (except for the last text)
        if (i < numTexts - 1) {
          tl.to(el, { 
            opacity: 0, 
            y: -10, 
            scale: 0.95,
            duration: textTransitionDuration, 
            ease: "power2.in" 
          }, endTime - textTransitionDuration);
        }
      });
    };

    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, []);

  return (
    <div className="relative w-full h-screen">
      <video
      preload="auto"
        ref={videoRef}
        src="/videos/output.mp4"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Dark overlay to dim the video */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>
      
      {/* Text container with responsive padding */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-10">
        <div className="text-white text-center pointer-events-none max-w-7xl w-full">
          {[
            "Timeless Taste.",
            "Born in India, Loved for Generations.",
            "Classic. Refreshing. Bold.",
            "Taste the Original. Taste Campa.",
          ].map((text, i) => (
            <div
              key={i}
              ref={(el) => (textRefs.current[i] = el)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                         text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                         font-bold drop-shadow-lg 
                         leading-tight sm:leading-tight md:leading-tight lg:leading-tight
                         max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]
                         px-2 sm:px-4 md:px-6 lg:px-8
                         text-center"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.3)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;