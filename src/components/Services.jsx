import Icon from './Icon';
import room from '../assets/grid-2.png';

export default function Services() {
  const services = [
    {
      icon: "mdi:floor-plan",
      title: "Interior Design",
      desc: "We create beautiful, functional spaces tailored to your lifestyle — from initial concept and 3D visualization through to material selection and final styling.",
      slug: "interior-design"
    },
    {
      icon: "mdi:hammer-wrench",
      title: "Renovation & Remodeling",
      desc: "Transform your existing space with our expert renovation services. We handle structural changes, plumbing, electrical, and finishing with precision and care.",
      slug: "renovation"
    },
    {
      icon: "mdi:sofa-single",
      title: "Furniture & Custom Fitout",
      desc: "Get expert consultation on furniture selection, custom millwork, and built-in solutions designed to maximize your space and match your aesthetic vision.",
      slug: "furniture-consultation"
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20">
      {/* Header */}
      <p className="flex items-center gap-2 text-gray-400 text-sm">
        <Icon name="guidance:left-arrow" size={20} />What We Do
      </p>
      <h2 className="font-semibold text-3xl md:text-4xl pt-3 uppercase">Our Services</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {services.map((service, idx) => (
          <div key={idx} className="border border-[#E9ECEF] rounded-sm p-8 flex flex-col gap-4 hover:shadow-md transition duration-300 group">
            <div className="bg-[#F8F9FA] p-3 rounded-full w-fit">
              <Icon name={service.icon} size={28} />
            </div>

            <div className="overflow-hidden rounded-sm">
              <img
                src={room.src}
                alt={service.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <h3 className="font-semibold text-lg">{service.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>

            <a 
              href={`/services#${service.slug}`} 
              className="flex items-center gap-1 text-sm font-medium text-amber-400 hover:gap-2 transition-all duration-200"
            >
              Learn More <Icon name="mdi:arrow-right" size={18} />
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-8">
        <a
          href="/services"
          className="flex items-center gap-2 border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition duration-300"
        >
          View All Services <Icon name="mdi:arrow-right" size={18} />
        </a>
      </div>
    </section>
  );
}
