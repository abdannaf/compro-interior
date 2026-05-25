import { useState } from 'react';
import Icon from './Icon';
import ArrowIcon from './ui/ArrowIcon';
import { useReveal } from '../hooks/useReveal';
import contactImg from '../assets/hero.png';

export default function Contact() {
  const [focused, setFocused] = useState(null);
  const { ref, revealClass } = useReveal(0.08);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (formData.phone && !/^[\d\s+\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormMessage({ type: 'success', text: 'Message sent successfully. We will get back to you soon.' });
      setFormData({ fullName: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormMessage(null), 5000);
    }, 1400);
  };

  const inputClass = (name) => {
    const hasError = Boolean(errors[name]);
    const isFocused = focused === name;
    return [
      'w-full rounded-2xl border bg-white/80 px-5 py-4 text-sm outline-none backdrop-blur-sm transition-all duration-300',
      hasError ? 'border-red-300 ring-4 ring-red-50' : 'border-gray-200 hover:border-amber-300',
      isFocused && !hasError ? 'border-amber-400 ring-4 ring-amber-100 shadow-lg' : '',
    ].join(' ');
  };

  const messageLength = formData.message.length;

  return (
    <section id="contact" className="relative overflow-hidden bg-[#F8F9FA] section-pad">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" aria-hidden="true" />

      <div ref={ref} className={`container-site relative z-10 ${revealClass}`}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="section-label mx-auto">
            <Icon name="mdi:message-processing-outline" size={18} className="text-amber-400" />
            Contact Us
          </div>
          <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Let's build something <span className="highlight-text">amazing</span> together
          </h2>
          <p className="mt-6 leading-relaxed text-gray-500">
            Whether you're planning a residential transformation or a large-scale commercial project, our team is ready to help bring your vision to life.
          </p>
        </div>

        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-2">
          <div className="group relative min-h-[520px] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-gray-200/60 lg:min-h-[650px]">
            <img
              src={contactImg.src}
              alt="Contact BuildPRO"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white sm:p-10">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                  <Icon name="mdi:star-four-points" size={18} />
                  Trusted Interior Agency
                </div>
                <h3 className="mt-6 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
                  We create beautiful spaces that inspire people.
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  ['mdi:email-outline', 'Email Address', 'hello@buildpro.com', 'mailto:hello@buildpro.com'],
                  ['mdi:phone-outline', 'Phone Number', '+62 812-3456-789', 'tel:+628123456789'],
                  ['mdi:map-marker-outline', 'Office Address', 'SCBD, Jakarta Selatan', null],
                ].map(([icon, label, value, href]) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20"
                  >
                    <div className="rounded-xl bg-amber-400 p-3 text-black">
                      <Icon name={icon} size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-white/70">{label}</p>
                      {href ? (
                        <a href={href} className="font-semibold transition hover:text-amber-300">
                          {value}
                        </a>
                      ) : (
                        <p className="font-semibold">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-2xl sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-medium text-amber-500">Start a Conversation</p>
                <h3 className="mt-1 text-3xl font-bold text-gray-900">Send a Message</h3>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 sm:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" aria-hidden="true" />
                Usually replies in 1 hour
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-gray-500">
              Fill out the form below and our team will contact you shortly.
            </p>

            {formMessage && (
              <div
                role="status"
                aria-live="polite"
                className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700"
              >
                {formMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocused('fullName')}
                  onBlur={() => setFocused(null)}
                  className={inputClass('fullName')}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-2 text-xs text-red-500" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="hello@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className={inputClass('email')}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="+62 812..."
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocused('phone')}
                    onBlur={() => setFocused(null)}
                    className={inputClass('phone')}
                  />
                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <span className={`text-xs tabular-nums ${messageLength < 10 ? 'text-gray-400' : 'text-green-600'}`}>
                    {messageLength} chars
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className={`${inputClass('message')} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-500" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-dark group w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowIcon direction="right" size={20} tone="light" className="transition group-hover:translate-x-0.5 group-hover:text-black" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
