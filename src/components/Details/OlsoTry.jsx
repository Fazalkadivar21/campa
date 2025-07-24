import React, { useRef, useCallback } from "react";
import drinkList from "../../constants/drinks";
import { motion } from "motion/react";
import { useCursor } from "../../context/CursorContext";
import { useNavigate } from "react-router-dom";

const Carousel = ({ name }) => {
    const arrow = (
        <img src="/images/arrow.svg" className="h-fit w-fit p-2" />
      );
      const navigate = useNavigate();
    const {setCursorProps} = useCursor();

  const scrollRef = useRef(null);

  // Filter out the current product
  const filteredList = drinkList.filter(
    product => product.name.toLowerCase() !== name.toLowerCase()
  );

  // Stable scroll function
  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = window.innerWidth * 0.5;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="bg-[#f3f1eb] py-16 relative overflow-hidden w-full max-w-screen mx-auto">
      <h2 className="text-center text-[#00194a] text-5xl font-extrabold mb-6 uppercase">
        You Might Want to Try
      </h2>
      <p className="text-center text-[#00194a] font-handwritten mb-8">Explore More</p>

      <div className="relative w-full max-w-screen mx-auto overflow-hidden">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#00194a] rounded-full p-2 hover:bg-[#00194a]/40 focus:outline-none"
        >
          <img src="/images/arrow.svg" alt="Left" className="w-6 -rotate-[135deg]" />
        </button>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-8 px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {filteredList.map((product, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex flex-col items-center snap-center"
              style={{ height: '75vh' }}
            >
              <div
                className="rounded-full flex items-center justify-center mb-4 transition-transform duration-300"
                style={{
                  backgroundColor: product.color,
                  width: '40vh',
                  height: '75vh'
                }}
              >
                <motion.img
                    onHoverStart={() => setCursorProps({ text: arrow, scale: 128 })}
                    onHoverEnd={() => setCursorProps({
                        text: "",
                        scale: 20
                    })}
                    onClick={() => navigate(`/products/${product.name}`)}
                  src={product.image}
                  alt={product.title}
                  className="h-full object-contain"
                />
              </div>
              <p className="text-[#00194a] font-semibold text-center">{product.title}</p>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#00194a] rounded-full p-2 hover:bg-[#00194a]/40 rotate-45 focus:outline-none"
        >
          <img src="/images/arrow.svg" alt="Right" className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
