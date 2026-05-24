// src/components/Navbar.jsx
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ variant = "solid" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href) => {
    if (!currentPath) return false;
    
    if (href.includes("#")) return false;
    
    if (href === "/") return currentPath === "/";
    return currentPath.startsWith(href);
  };

  const navBg = scrolled
    ? "bg-black/90 text-white shadow-lg backdrop-blur-sm py-4"
    : variant === "transparent"
    ? "bg-transparent text-white py-4"
    : "bg-white text-black shadow-sm py-4";

  return (
    <>
      <nav
        className={`flex justify-between font-poppins px-8 md:px-20 items-center fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
      >
        {/* Logo */}
        <a href="/">
          <h1 className="font-bold text-2xl">
            Build<span className="text-amber-400">PRO</span>
          </h1>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 uppercase font-medium text-sm tracking-wide">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className={`transition duration-300 ${
                isActive(link.href)
                  ? "text-amber-400"
                  : "hover:text-amber-400"
              }`}
            >
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex gap-4 text-xl">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition duration-300"
            aria-label="WhatsApp"
          >
            {/* WhatsApp Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.79L2 22l5.46-1.43a9.82 9.82 0 0 0 4.57 1.14h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.93 13.44c-.21.59-1.22 1.14-1.67 1.18-.44.05-.86.21-2.88-.6-2.44-.97-4-3.45-4.12-3.61-.12-.16-.97-1.29-.97-2.46s.61-1.75.83-1.99c.22-.24.48-.3.64-.3h.46c.15 0 .35-.06.54.41.21.5.72 1.74.78 1.87.06.12.1.27.02.43-.08.16-.12.26-.24.4l-.36.42c-.12.12-.24.25-.1.49.14.24.61.99 1.31 1.6.9.79 1.65 1.03 1.89 1.15.24.12.38.1.52-.06.14-.16.59-.69.75-.93.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.09.06.52-.15 1.06z"/>
            </svg>
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition duration-300"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition duration-300"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
            </svg>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-black/95 z-40 px-8 py-6 flex flex-col gap-4 text-white font-poppins md:hidden">
          <ul className="flex flex-col gap-5 uppercase font-medium">
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={`transition ${
                  isActive(link.href) ? "text-amber-400" : "hover:text-amber-400"
                }`}
              >
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-4 pt-4 border-t border-white/20 mt-2">
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">WA</a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">FB</a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition">IG</a>
          </div>
        </div>
      )}
    </>
  );
}