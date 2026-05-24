import { useState } from 'react';
import Icon from './Icon';

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "John Doe",
      location: "Jakarta",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "Drill's innovative approach and commitment to quality have made them our go-to partner for all construction needs."
    },
    {
      name: "John Doe",
      location: "Bandung",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "Working with Drill has been a delight. Their team's collaboration and expertise brought our designs to life flawlessly."
    },
    {
      name: "John Doe",
      location: "Semarang",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "Drill collaborative approach ensured designs were implemented with impeccable attention to detail. A pleasure to work with!"
    },
    {
      name: "John Doe",
      location: "Surabaya",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "The team exceeded all expectations with professionalism and creativity. I would speak highly of them to anyone."
    },
    {
      name: "John Doe",
      location: "Surabaya",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "The team exceeded all expectations with professionalism and creativity. I would speak highly of them to anyone."
    },
    {
      name: "John Doe",
      location: "Surabaya",
      avatar: "https://img.magnific.com/vektor-premium/ikon-profil-avatar-default-gambar-pengguna-media-sosial-ikon-avatar-abu-abu-siluet-profil-kosong-ilustrasi-vektor_561158-3407.jpg?semt=ais_hybrid&w=740&q=80",
      review: "The team exceeded all expectations with professionalism and creativity. I would speak highly of them to anyone."
    },
  ];

  const cardWidth = 320 + 24; // min-w + gap
  const maxSlides = Math.max(0, testimonials.length - 3);

  const handleNext = () => {
    if (currentSlide < maxSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section className="font-poppins bg-black text-white py-16 px-6 md:px-20">
      {/* Header */}
      <p className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
        <Icon name="mdi:dots-horizontal" size={20} />Testimonials
      </p>
      <div className="flex justify-between items-center pt-2 pb-10">
        <h2 className="font-bold text-3xl md:text-4xl uppercase">Clients Review</h2>

        {/* Nav Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="border border-white/30 p-2 hover:bg-white hover:text-black transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <Icon name="mdi:chevron-left" size={20} />
          </button>
          <button 
            onClick={handleNext}
            disabled={currentSlide >= maxSlides}
            className="border border-white/30 p-2 hover:bg-white hover:text-black transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <Icon name="mdi:chevron-right" size={20} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * cardWidth}px)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={idx} className="min-w-[280px] md:min-w-[320px] flex flex-col gap-4">
              {/* Avatar + Name */}
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-sm">{t.location}</p>
                </div>
              </div>
              {/* Review */}
              <p className="text-gray-300 text-sm leading-relaxed">{t.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
