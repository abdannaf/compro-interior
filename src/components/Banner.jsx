import Icon from './Icon';
import heroBg from '../assets/hero.png';

export default function Banner() {
  return (
    <section className="font-poppins relative overflow-hidden py-24 md:py-32 text-white">
      <img
        src={heroBg.src}
        alt="Interior design banner showcase"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text overlay */}
      <div className="relative z-10 px-6 md:px-20 lg:px-24">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight uppercase">
            We pay attention to make interior stylish
          </h2>
          <p className="text-white/80 text-sm md:text-base mt-4 max-w-sm leading-relaxed">
            We are passionate, knowing that people live, work, play and inhabit
            the spaces and places we imagine and envision for our clients.
          </p>
          <div className="flex gap-4 mt-8">
            <a 
              href="/projects" 
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 text-sm font-medium hover:bg-white/30 transition duration-300"
            >
              View Projects
            </a>
            <a 
              href="/#contact" 
              className="bg-amber-400 text-gray-900 px-6 py-3 text-sm font-medium hover:bg-amber-500 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
