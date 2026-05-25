import Icon from '../Icon';
import ArrowIcon from '../ui/ArrowIcon';

const navLinks = [
  ['Home', '/'],
  ['Projects', '/projects'],
  ['Services', '/services'],
  ['Blog', '/blog'],
  ['Contact', '/#contact'],
];

const socials = [
  ['Instagram', 'https://instagram.com/', 'mdi:instagram'],
  ['Facebook', 'https://facebook.com/', 'mdi:facebook'],
  ['YouTube', 'https://youtube.com/', 'mdi:youtube'],
  ['WhatsApp', 'https://wa.me/', 'mdi:whatsapp'],
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 font-poppins text-white">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <a href="/" className="inline-flex text-2xl font-bold transition hover:opacity-90">
              Build<span className="text-amber-400">PRO</span>
            </a>
            <h2 className="mt-6 max-w-xl text-3xl font-semibold leading-tight md:text-4xl">
              Ready to discuss your next interior or construction project?
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/#contact" className="btn-primary px-6 py-3">
                Collaborate Now
                <ArrowIcon direction="right" size={18} tone="dark" />
              </a>
              <a
                href="mailto:hello@buildpro.com"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:-translate-y-0.5 hover:border-white hover:text-white"
              >
                Email Us
                <Icon name="mdi:email-outline" size={18} />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Navigation</h3>
              <ul className="mt-5 grid gap-3 text-sm text-white/70">
                {navLinks.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="inline-block transition hover:translate-x-0.5 hover:text-amber-400">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">Contact</h3>
              <ul className="mt-5 grid gap-4 text-sm text-white/70">
                <li>
                  <span className="block text-white/40">Email</span>
                  <a href="mailto:hello@buildpro.com" className="font-semibold text-white transition hover:text-amber-400">
                    hello@buildpro.com
                  </a>
                </li>
                <li>
                  <span className="block text-white/40">Phone</span>
                  <a href="tel:+628123456789" className="font-semibold text-white transition hover:text-amber-400">
                    +62 812-3456-789
                  </a>
                </li>
                <li>
                  <span className="block text-white/40">Office</span>
                  SCBD, Jakarta Selatan
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">&copy; {currentYear} BuildPRO. All rights reserved.</p>
          <div className="flex gap-2">
            {socials.map(([label, href, icon]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-white/65 transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-gray-950"
              >
                <Icon name={icon} size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
