import { motion } from "motion/react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useRef, useState, useEffect } from "react";

const anim = {
  initial: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: { opacity: 0 },
};

const itemAnim = {
  initial: { opacity: 0, y: -50 },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: { opacity: 0, y: -50 },
};

const letterAnim = {
  initial: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: { opacity: 0, y: 20 },
};

const Navbar = ({ open }) => {
  const navList = ["HOME","LOGIN", "ABOUT US", "PRODUCTS", "TRUSTED BY"];
  const refs = useRef([]);
  const [hoveringIndex, setHoveringIndex] = useState(null);

  useEffect(() => {
    if (hoveringIndex === null) return;

    const el = refs.current[hoveringIndex];
    if (!el) return;

    const { chars } = splitText(el);

    const staggerDelay = 0.12; // slight stagger for ripple effect

    const controls = animate(
      chars,
      { y: [-10, 10] },
      {
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        duration: 0.6,
        delay: stagger(staggerDelay, {
          startDelay: -staggerDelay * chars.length,
        }),
      }
    );

    return () => {
      controls.cancel();
      // Smooth return to neutral position
      animate(chars, { y: 0 }, { duration: 0.6, easing: "easeOut" });
    };
  }, [hoveringIndex]);

  return (
    open && (
      <motion.div
        variants={anim}
        initial="initial"
        animate="open"
        exit="exit"
        className="text-block fixed z-[51] top-5 left-0 h-[95vh] w-[90vw] flex items-center justify-center mx-5 rounded-xl 
          md:w-[95vw] 
          lg:top-0 lg:left-0 lg:m-0 lg:rounded-none lg:w-screen lg:h-screen"
      >
        <ul className="text-block flex flex-col items-center justify-center gap-10">
          {navList.map((item, index) => (
            <motion.li
              key={item}
              variants={itemAnim}
              onHoverStart={() => setHoveringIndex(index)}
              onHoverEnd={() => setHoveringIndex(null)}
              className="litext text-4xl cursor-pointer"
              ref={(el) => (refs.current[index] = el)}
            >
              <motion.span
                variants={anim}
                initial="initial"
                animate="open"
                exit="exit"
                className="inline-flex"
              >
                {item.split("").map((char, idx) => (
                  <motion.span
                    key={idx}
                    variants={letterAnim}
                    className="split-char inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.li>
          ))}
        </ul>
        <Stylesheet />
      </motion.div>
    )
  );
};

function Stylesheet() {
  return (
    <style>{`
      .split-char {
        will-change: transform, opacity;
      }
    `}</style>
  );
}

export default Navbar;
