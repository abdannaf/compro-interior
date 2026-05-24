import Icon from './Icon';
import room1 from '../assets/grid-1.png';
import room2 from '../assets/grid-2.png';
import room3 from '../assets/grid-3.png';
import room4 from '../assets/grid-4.png';

export default function Wcu() {
  const rooms = [room1, room2, room3, room4];

  return (
    <section className="bg-[#F8F9FA] py-16 px-6 md:px-0 flex flex-col md:flex-row items-center">
      {/* Left: Text */}
      <div className="w-full md:w-1/2 md:p-16 lg:p-20">
        <p className="flex items-center gap-2 text-gray-600">
          <Icon name="guidance:left-arrow" size={20} />Why Choose Us?
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold pt-4 leading-tight">
          A behind the scenes look at <span className="text-amber-400">our agency</span>
        </h2>
        <p className="pt-4 text-gray-500 leading-relaxed">
          With 25 years of industry experience and a portfolio spanning residential, commercial, and hospitality projects, BuildPRO has earned a reputation for delivering exceptional results on time and within budget.
        </p>

        <div className="pt-10 flex flex-col gap-6">
          <div className="flex items-start gap-5">
            <div className="bg-[#E9ECEF] p-3 rounded-full shrink-0">
              <Icon name="icon-park-outline:tailoring-two" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Tailored Design Solution</h3>
              <p className="text-gray-500 text-sm pt-1">Every project is unique. We craft bespoke designs that reflect your personality, lifestyle, and functional needs — never cookie-cutter templates.</p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-[#E9ECEF] p-3 rounded-full shrink-0">
              <Icon name="ant-design:project-filled" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Seamless Project Management</h3>
              <p className="text-gray-500 text-sm pt-1">From initial consultation through final handover, our dedicated project managers ensure transparent communication and smooth execution at every stage.</p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="bg-[#E9ECEF] p-3 rounded-full shrink-0">
              <Icon name="ic:baseline-chair" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Client-Centered Collaboration</h3>
              <p className="text-gray-500 text-sm pt-1">We listen first, design second. Our collaborative process ensures your vision drives every decision, with regular check-ins and design reviews throughout.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image Grid */}
      <div className="grid grid-cols-2 gap-2 w-full md:w-1/2 mt-10 md:mt-0 md:p-20">
        {rooms.map((room, i) => (
          <div key={i} className="overflow-hidden aspect-square md:aspect-auto">
            <img
              src={room.src}
              alt={`BuildPRO project showcase ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
