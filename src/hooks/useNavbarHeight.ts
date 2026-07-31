"use client";

import { useEffect } from "react";

export function useNavbarHeight() {
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    const setVar = () => {
      document.documentElement.style.setProperty("--navbar-height", `${nav.getBoundingClientRect().height}px`);
    };

    setVar();
    const observer = new ResizeObserver(setVar);
    observer.observe(nav);

    return () => observer.disconnect();
  }, []);
}