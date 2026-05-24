import Icon from './Icon';
import HeroBg from '../assets/hero.png';

export default function Hero() {
  return (
    <section className="h-dvh relative text-white">
      <img 
        src={HeroBg.src} 
        alt="BuildPRO interior design showcase" 
        className="absolute inset-0 w-full h-full object-cover rounded-bl-[80px] sm:rounded-bl-[120px] lg:rounded-bl-[200px]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/30 rounded-bl-[80px] sm:rounded-bl-[120px] lg:rounded-bl-[200px]"></div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-28">
        <div className="max-w-3xl">
          <p className="text-amber-400 text-sm uppercase tracking-[0.2em] mb-4 font-medium">
            Interior Design & Construction
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
            Designing your dream spaces, one room at a time
          </h1>
          <p className="pt-4 text-sm sm:text-base text-white/80 max-w-xl leading-relaxed">
            We specialize in creating personalized, functional, and stylish interiors that reflect your unique vision. From concept to completion, BuildPRO delivers excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-8">
            <a 
              href="/#about" 
              className="flex justify-center items-center gap-2 py-3 px-6 bg-white/20 backdrop-blur-sm rounded-sm cursor-pointer hover:bg-white/30 transition duration-300 text-sm font-medium"
            >
              Explore More
              <Icon name="mdi:arrow-right" size={20} />
            </a>
            <a 
              href="/projects" 
              className="flex justify-center items-center gap-2 py-3 px-6 bg-amber-400 text-white rounded-sm cursor-pointer hover:bg-amber-500 transition duration-300 text-sm font-medium"
            >
              View Projects
              <Icon name="mdi:arrow-right" size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Icon name="mdi:chevron-down" size={28} className="text-white/60" />
      </div>
    </section>
  );
}
