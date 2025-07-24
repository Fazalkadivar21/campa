import React from "react";
import navList from "../constants/pages";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  //set bg color based on current page
  return (
    <footer className={`bg-gold text-[#f3f1eb] py-16`}>
      {/* Top navigation links */}
      <div className="flex items-center justify-around gap-6 font-mono uppercase text-xs sm:text-sm md:text-base tracking-widest">
        {navList.map(({name,path},index) => (
          <p key={index} onClick={()=>navigate(path)} className="hover:underline transition-colors">
            {name}
          </p>
        ))}
      </div>

      {/* Logo / Branding */}
      <div className="text-center overflow-hidden pt-24 px-0 pb-0">
        <h1 className="text-[20vw] leading-none select-none">CAMPA</h1>
      </div>
    </footer>
  );
};

export default Footer;
