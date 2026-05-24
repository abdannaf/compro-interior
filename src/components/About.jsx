import Icon from './Icon';
import AboutUs from '../assets/about-us.png';

export default function About() {
  return (
    <section id="about" className="py-16 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row gap-10 md:gap-20 items-center">
      {/* Image */}
      <div className="w-full md:w-1/2">
        <img src={AboutUs.src} alt="BuildPRO team at work" className="w-full rounded-sm object-cover" />
      </div>

      {/* Text */}
      <div className="w-full md:w-1/2">
        <p className="flex items-center text-gray-700 font-medium gap-1">
          <Icon name="guidance:left-arrow" size={20} />About Us
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold pt-4 leading-tight">
          Our passion for design, your <span className="text-amber-400">vision realized</span>
        </h2>
        <p className="pt-4 text-gray-500 leading-relaxed">
          Founded in 2008, BuildPRO has grown from a small renovation firm into one of Indonesia's most trusted interior design and construction companies. With over 320 completed projects, our team of architects, designers, and craftsmen brings decades of combined experience to every project.
        </p>
        <p className="pt-3 text-gray-500 leading-relaxed">
          We believe that great design transforms not just spaces, but the lives of the people who inhabit them. Every project begins with understanding your unique needs and ends with delivering a space that exceeds expectations.
        </p>

        <div className="pt-8 flex flex-col gap-3">
          <p className="flex items-center gap-2 text-gray-700">
            <Icon name="mdi:checkbox-marked-circle" size={22} className="text-amber-400 shrink-0" />
            Creative Expertise — Award-winning design team
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Icon name="mdi:checkbox-marked-circle" size={22} className="text-amber-400 shrink-0" />
            Client-Centered Approach — Your vision drives every decision
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <Icon name="mdi:checkbox-marked-circle" size={22} className="text-amber-400 shrink-0" />
            End-to-End Service — From concept to completion
          </p>

          <div className="pt-4">
            <a href="/services" className="inline-flex items-center gap-2 px-7 py-3 bg-amber-400 hover:bg-amber-500 transition rounded-sm text-white cursor-pointer text-sm font-medium">
              Our Services
              <Icon name="mdi:arrow-right" size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
