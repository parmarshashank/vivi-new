'use client';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#111111]">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">Let&apos;s Connect</h2>
          <p className="text-gray-400 mt-3 md:mt-4 font-light text-base md:text-lg">
            Share your thoughts, ideas, or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Contact Form */}
          <div className="space-y-6 md:space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-gray-800 py-3 md:py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none text-base md:text-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-gray-800 py-3 md:py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none text-base md:text-lg"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message"
                  className="w-full bg-transparent border-b border-gray-800 py-3 md:py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none resize-none text-base md:text-lg"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-3 md:py-4 hover:bg-gray-100 transition-colors font-light text-base md:text-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12 md:space-y-16 lg:space-y-16 mt-8 lg:mt-0">
            <div className="space-y-6 md:space-y-8 text-left lg:text-right">
              <div>
                <h3 className="text-base md:text-lg mb-2 font-medium">Visit</h3>
                <p className="text-gray-400 font-light text-sm md:text-base">
                  123 Creative Avenue<br />
                  Design District<br />
                  Mumbai, India
                </p>
              </div>

              <div>
                <h3 className="text-base md:text-lg mb-2 font-medium">Contact</h3>
                <p className="text-gray-400 font-light text-sm md:text-base">
                  contact@vividhata.com<br />
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 md:pt-12 lg:pt-16">
              <div className="flex flex-row lg:flex-col items-start lg:items-end gap-6 md:gap-8">
                <h3 className="text-base md:text-lg mb-0 lg:mb-2 font-medium">Follow</h3>
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-6 md:gap-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Instagram</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">Twitter</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm md:text-base">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 