// src/components/Contact.jsx
import { useState } from "react";
import contactImg from "../assets/hero.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null); // { type: 'success' | 'error', text: string }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email))
      newErrors.email = "Valid email is required";

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone))
      newErrors.phone = "Invalid phone format";

    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormMessage({
      type: "success",
      text: "✓ Message sent successfully! We will contact you soon.",
    });
    setFormData({ fullName: "", email: "", phone: "", message: "" });
    setErrors({});

    setTimeout(() => setFormMessage(null), 5000);
  };

  const inputClass =
    "w-full border border-gray-200 rounded-sm px-5 py-4 text-sm outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition";

  return (
    <section id="contact" className="font-poppins py-16 px-6 md:px-20">

      {/* Header */}
      <p className="flex items-center gap-2 text-gray-400 text-sm uppercase tracking-widest">
        ··· Contact Us
      </p>
      <h2 className="font-bold text-3xl md:text-4xl uppercase pt-2 pb-10">
        Let's Connect
      </h2>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Left Card */}
        <div className="border border-gray-200 rounded-sm p-6 flex flex-col gap-6 w-full md:w-2/5">

          <div className="overflow-hidden rounded-sm">
            <img src={contactImg.src} alt="Contact" className="w-full h-48 object-cover" />
          </div>

          <div className="border-b border-gray-200 pb-6">
            <p className="text-gray-400 text-sm">Send us an email</p>
            <a href="mailto:hello@buildpro.com" className="text-lg font-semibold hover:text-amber-400 transition">
              hello@buildpro.com
            </a>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <p className="text-gray-400 text-sm">Give us a call</p>
            <a href="tel:+628123456789" className="text-lg font-semibold hover:text-amber-400 transition">
              +62 812-3456-789
            </a>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Address</p>
            <p className="text-lg font-semibold">
              Sudirman Central Business District, Jl. Jend. Sudirman No.Kav 52-53, Jakarta Selatan
            </p>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-3/5">
          <h3 className="text-2xl font-semibold mb-3">Send a message</h3>
          <p className="text-gray-500 text-sm mb-8">
            Send us a message, and our team will get back to you promptly. We're here to provide guidance, answer your queries, and help bring your vision to life.
          </p>

          {/* Status Message */}
          {formMessage && (
            <div className={`p-4 rounded-sm text-sm font-medium mb-4 ${
              formMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {formMessage.text}
            </div>
          )}

          <div className="flex flex-col gap-4">

            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email + Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Write your message here*"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-y`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 border border-black px-7 py-3 text-sm font-medium hover:bg-black hover:text-white transition duration-300 cursor-pointer"
              >
                Submit Now →
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}