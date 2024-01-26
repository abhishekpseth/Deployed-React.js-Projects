import React from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const themeMode = useSelector((state) => state.dijsktra.themeMode);
  return (
    <footer className="absolute w-full text-center bg-transparent border-none outline-none bottom-2 outline bg-slate-900 h-fit">
      <span
        className={`flex items-center justify-center gap-2 ${
          themeMode === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Made with <FaHeart className="text-pink-600" /> by{" "}
        <a
          href="https://abhishekpseth.github.io/Portfolio/"
          className="hover:text-pink-600 hover:underline"
        >
          Abhishek
        </a>
      </span>
    </footer>
  );
};

export default Footer;
