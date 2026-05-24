import Icon from './Icon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white font-poppins">
      {/* Top Section */}
      <div className="px-6 md:px-20 pt-16 pb-10 flex flex-col md:flex-row justify-between gap-10">
        {/* Left: CTA */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-sm">
            Contact us today to discuss your next project
          </h2>
          <a
            href="/#contact"
            className="mt-8 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 transition duration-300 text-white px-6 py-3 text-sm font-medium"
          >
            Collaborate Now <Icon name="mdi:arrow-right" size={18} />
          </a>
        </div>

        <div className="hidden md:flex items-start pt-4">
          <ul className="flex flex-col md:flex-row gap-6 text-gray-400 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition">
              <Icon name="mdi:home-outline" size={16} /><a href="/">Home</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <Icon name="mdi:earth" size={16} /><a href="/projects">Projects</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <Icon name="mdi:lightning-bolt-circle" size={16} /><a href="/services">Services</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <Icon name="mdi:file-document-outline" size={16} /><a href="/blog">Blog</a>
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <Icon name="mdi:star-circle-outline" size={16} /><a href="/#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 md:mx-20"></div>

      {/* Bottom Section */}
      <div className="px-6 md:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Follow us */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Follow us</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
            <li><a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Facebook</a></li>
            <li><a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">YouTube</a></li>
            <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-sm mb-4">Resources</h4>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li><a href="/services" className="hover:text-white transition">Our Services</a></li>
            <li><a href="/projects" className="hover:text-white transition">Portfolio</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog & Insights</a></li>
            <li><a href="/#contact" className="hover:text-white transition">Get a Quote</a></li>
          </ul>
        </div>

        {/* Email */}
        <div>
          <p className="text-gray-400 text-sm mb-2">Send us an email</p>
          <a href="mailto:hello@buildpro.com" className="text-xl font-semibold hover:text-amber-400 transition duration-300">
            hello@buildpro.com
          </a>
        </div>

        {/* Phone */}
        <div>
          <p className="text-gray-400 text-sm mb-2">Give us a call</p>
          <a href="tel:+628123456789" className="text-xl font-semibold hover:text-amber-400 transition duration-300">
            +62 812-3456-789
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mx-6 md:mx-20"></div>
      <div className="px-6 md:px-20 py-6 text-center text-gray-500 text-xs">
        <p>&copy; {currentYear} BuildPRO. All rights reserved.</p>
      </div>
    </footer>
  );
}
