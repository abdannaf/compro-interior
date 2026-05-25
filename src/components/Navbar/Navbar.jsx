import { useState, useEffect } from 'react';
import Icon from '../Icon';
import ArrowIcon from '../ui/ArrowIcon';

const navLinks = [
  { href: '/', label: 'Home', icon: 'mdi:home-outline' },
  { href: '/projects', label: 'Projects', icon: 'mdi:briefcase-outline' },
  { href: '/services', label: 'Services', icon: 'mdi:lightning-bolt-outline' },
  { href: '/blog', label: 'Blog', icon: 'mdi:newspaper-variant-outline' },
  { href: '/#contact', label: 'Contact', icon: 'mdi:email-outline' },
];

const socials = [
  { href: 'https://wa.me/', icon: 'mdi:whatsapp', label: 'WhatsApp', color: 'hover:bg-green-500' },
  { href: 'https://instagram.com/', icon: 'mdi:instagram', label: 'Instagram', color: 'hover:bg-pink-500' },
  { href: 'https://facebook.com/', icon: 'mdi:facebook', label: 'Facebook', color: 'hover:bg-blue-600' },
];

export default function Navbar({ variant = 'transparent' }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState('');

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isDarkNav = scrolled || variant === 'transparent';

  useEffect(() => {
    const update = () => {
      const h = new Date().getHours();
      setGreeting(h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening');
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const isActive = (href) => {
    if (href.includes('#')) return false;
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  const navbarStyle = scrolled
    ? 'bg-black/65 backdrop-blur-2xl shadow-2xl border-b border-white/10 py-3'
    : variant === 'transparent'
      ? 'bg-transparent py-6'
      : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 py-4';

  const textColor = isDarkNav ? 'text-white' : 'text-gray-900';
  const mutedText = isDarkNav ? 'text-white/50' : 'text-gray-500';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-950"
      >
        Skip to content
      </a>

      <div className="fixed top-0 left-0 z-[60] h-[3px] w-full bg-transparent" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${navbarStyle}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 md:px-12 lg:px-24">
          <a href="/" className="group flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-amber-400 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 transition-all duration-300 group-hover:from-amber-400 group-hover:to-yellow-300" />
              <Icon
                name="mdi:shape-outline"
                size={24}
                className="relative text-black transition-transform duration-300 group-hover:rotate-12"
              />
            </div>
            <div>
              <p className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${textColor}`}>
                Build<span className="text-amber-400">PRO</span>
              </p>
              <p className={`text-[10px] uppercase tracking-[0.3em] ${mutedText}`}>Interior Studio</p>
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-1">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(null)}
                >
                  <a
                    href={link.href}
                    className={`relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                      isActive(link.href)
                        ? 'bg-amber-400/15 text-amber-400'
                        : `${textColor} hover:bg-white/10 hover:text-amber-300`
                    }`}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {isActive(link.href) && (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" aria-hidden="true" />
                    )}
                    {link.label}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 ${
                        activeHover === index ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className={`h-6 w-px ${isDarkNav ? 'bg-white/20' : 'bg-gray-200'}`} aria-hidden="true" />

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <div key={s.href} className="relative">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setTooltip(s.label)}
                    onMouseLeave={() => setTooltip(null)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white ${s.color} ${
                      isDarkNav
                        ? 'border-white/10 bg-white/10 text-white'
                        : 'border-gray-200 bg-gray-50 text-gray-700'
                    }`}
                    aria-label={s.label}
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                  {tooltip === s.label && (
                    <div className="absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      {s.label}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <a href="/#contact" className="btn-primary group px-6 py-3 text-sm">
              Let's Talk
              <ArrowIcon direction="right" size={18} tone="dark" className="transition group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md transition duration-300 lg:hidden ${
              isDarkNav
                ? 'border-white/10 bg-white/10 text-white hover:bg-white/20'
                : 'border-gray-200 bg-gray-50 text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 ${isDarkNav ? 'bg-white' : 'bg-gray-900'}`} />
              <span className={`absolute left-0 top-2 h-0.5 w-5 ${isDarkNav ? 'bg-white' : 'bg-gray-900'}`} />
              <span className={`absolute left-0 top-4 h-0.5 w-5 ${isDarkNav ? 'bg-white' : 'bg-gray-900'}`} />
            </div>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[55] lg:hidden transition-all duration-500 ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

        <div
          className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-[#0a0a0a] transition-transform duration-500 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-60 w-60 rounded-full bg-amber-400/10 blur-3xl" aria-hidden="true" />

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <a href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 shadow-lg">
                <Icon name="mdi:shape-outline" size={24} className="text-black" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  Build<span className="text-amber-400">PRO</span>
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Interior Studio</p>
              </div>
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-white transition hover:border-red-500/50 hover:bg-red-500/80"
              aria-label="Close menu"
            >
              <Icon name="mdi:close" size={22} />
            </button>
          </div>

          <div className="border-b border-white/5 bg-amber-400/5 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">{greeting}</p>
            <p className="mt-0.5 text-xs text-white/40">Jakarta time · {time}</p>
          </div>

          <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-amber-400/15 text-amber-400'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                        isActive(link.href) ? 'bg-amber-400/20 text-amber-400' : 'bg-white/5 text-white/50'
                      }`}
                    >
                      <Icon name={link.icon} size={18} />
                    </span>
                    {link.label}
                  </span>
                  <Icon
                    name="mdi:chevron-right"
                    size={18}
                    className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-amber-400"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/10 p-6">
            <div className="mb-5 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-amber-400/5 p-5">
              <p className="text-xs uppercase tracking-widest text-white/50">Ready to start?</p>
              <h3 className="mt-1 text-lg font-bold leading-tight text-white">Let's create something amazing.</h3>
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary mt-4 px-5 py-2.5 text-sm"
              >
                Contact Us
                <ArrowIcon direction="right" size={16} tone="dark" />
              </a>
            </div>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-11 flex-1 items-center justify-center rounded-2xl border border-white/10 text-white/60 transition ${s.color} hover:border-transparent hover:text-white`}
                  aria-label={s.label}
                >
                  <Icon name={s.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
