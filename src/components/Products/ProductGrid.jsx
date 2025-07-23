import React, { useEffect } from "react";
import { useState } from "react";
import GooeyNav from "../ReactBits/GooeyNav";
import drinks from "../../constants/drinks";
import { motion } from "motion/react";
import { useCursor } from "../../context/CursorContext";
import { useNavigate } from "react-router-dom";
import { Suspense } from "react";

const items = [{ label: "CANS" }, { label: "BOTTLES" }];

const ProductGrid = () => {
  const navigate = useNavigate();
  const [isCan, setCan] = useState(true);
  const { setCursorProps } = useCursor();

  const toggleCan = () => {
    setCan((prev) => !prev);
  };

  useEffect(() => {
    drinks.forEach(({ can, bottle }) => {
      const imgCan = new Image();
      imgCan.src = can;
      const imgBottle = new Image();
      imgBottle.src = bottle;
    });
  }, []);

  return (
    <div className="relative pt-[5%] h-fit">
      <div className="flex flex-col items-center justify-center md:mr-2 font-mono">
        <GooeyNav
          items={items}
          particleCount={15}
          particleDistances={[90, 10]}
          particleR={100}
          initialActiveIndex={0}
          animationTime={600}
          timeVariance={300}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onClick={toggleCan}
        />
      </div>
      <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 mt-10 mx-5">
        {drinks.map(({ name, description, can, bottle }) => (
          <div key={name} className="relative">
            <Suspense fallback={<div className="w-[400px] h-[600px] object-cover rounded-2xl animate-pulse hover:cursor-none"></div>}>
            <motion.img
              onHoverStart={() => setCursorProps({ text: "VIEW", scale: 85 })}
              onHoverEnd={() => setCursorProps({ text: "", scale: 20 })}
              onClick={()=>navigate(`/products/${name}`)}
              className="w-[400px] h-[600px] object-cover rounded-2xl hover:cursor-none"
              src={isCan ? can : bottle}
              alt={name}
            />
            <div className="absolute z-10 bottom-0 p-3 bg-white text-black h-[15%] rounded-b-2xl w-full">
              <h1 className="text-4xl capitalize">{name}</h1>
              <p className="text-xl mt-1">{description}</p>
            </div>
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
