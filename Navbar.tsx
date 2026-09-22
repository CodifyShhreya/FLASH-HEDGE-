"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "bg-abyss/90 backdrop-blur-md border-b border-white/10" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="text-2xl font-black text-mint">⚡</span>
          <span className="text-xl font-bold tracking-tight text-white">
            Flash<span className="text-mint">Hedger</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-mint">Features</a>
          <a href="#how" className="hover:text-mint">How It Works</a>
          <a href="#app" className="hover:text-mint">Launch App</a>
        </div>
        <a href="#app" className="btn-primary !px-4 !py-2 text-sm">Connect Wallet</a>
      </nav>
    </header>
  );
}
