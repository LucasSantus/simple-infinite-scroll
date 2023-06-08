"use client";

import clsx from "clsx";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export const FloatingButton: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsShow(scrollTop > 400);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={clsx(
        "fixed bottom-4 right-4 rounded-md bg-slate-600 p-1.5 text-white transition-opacity duration-300",
        isShow ? "opacity-100" : "opacity-0"
      )}
      onClick={scrollToTop}
    >
      <ChevronUp />
    </button>
  );
};
