import Icon from './Icon';
import achieveImg from '../assets/grid-4.png';

export default function Achievements() {
  const stats = [
    { icon: "mdi:file-document-outline", number: "320", label: "Projects Completed" },
    { icon: "mdi:account-group-outline", number: "180", label: "Clients Worldwide" },
    { icon: "mdi:trophy-outline", number: "30", label: "Awards Won" },
  ];

  return (
    <section className="bg-[#F8F9FA] py-16 px-6 md:px-20 flex flex-col md:flex-row gap-12 items-center">
      {/* Left: Text */}
      <div className="w-full md:w-1/2">
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
          Achievements
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
          We are passionate about creating spaces where people thrive
        </h2>
        <p className="text-gray-500 text-sm mt-4 max-w-md leading-relaxed">
          At BuildPRO, we measure success by the impact our designs have on people's daily lives. Every space we create is designed to inspire, comfort, and empower the people who use it.
        </p>

        {/* Stats */}
        <div className="flex gap-10 mt-10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <Icon name={stat.icon} size={32} className="text-gray-700" />
              <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <a 
          href="/projects" 
          className="inline-block mt-10 bg-gray-900 text-white px-7 py-3 text-sm font-medium hover:bg-gray-700 transition duration-300"
        >
          View Projects
        </a>
      </div>

      {/* Right: Image with badge */}
      <div className="w-full md:w-1/2 relative">
        {/* Main Image */}
        <div className="overflow-hidden rounded-sm">
          <img
            src={achieveImg.src}
            alt="BuildPRO award-winning interior design"
            className="w-full h-80 md:h-[420px] object-cover"
          />
        </div>

        {/* Play Button */}
        <button 
          className="absolute inset-0 flex items-center justify-center cursor-pointer group" 
          aria-label="Play video"
        >
          <div className="bg-white rounded-full p-4 shadow-lg group-hover:scale-110 transition duration-300">
            <Icon name="mdi:play" size={28} className="text-amber-400 ml-1" />
          </div>
        </button>

        {/* Years Experience Badge */}
        <div className="absolute bottom-0 left-0 bg-amber-400 text-gray-900 p-6 w-36">
          <p className="text-sm font-medium leading-tight">Years<br />Experience</p>
          <p className="text-5xl font-bold mt-1">25</p>
        </div>
      </div>
    </section>
  );
}
