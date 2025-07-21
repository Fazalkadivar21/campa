import React from "react";

const Footer = () => {
  return (
    <footer className="font-mono bg-gold text-black py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* Quick Links */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl mb-4 font-[kugile]">Quick Links</h2>
          <ul className="space-y-2 text-lg md:text-xl">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Login</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Trusted By</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl mb-4 font-[kugile]">Contact Us</h2>
          <p className="text-base md:text-lg">business@campabeveragesfranchise.com</p>
          <p className="text-base md:text-lg">Whatsapp: 1800274874304</p>
          <div className="mt-8 text-sm md:text-base">
        © 2025. All Rights Reserved
      </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
