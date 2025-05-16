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
    <section className="py-32 bg-[#111111]">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="section-title">Let's Connect</h2>
          <p className="text-gray-400 mt-4 font-light">
            Share your thoughts, ideas, or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          {/* Contact Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message"
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-500 focus:border-gray-400 transition-colors focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 hover:bg-gray-100 transition-colors font-light"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-16">
            <div className="space-y-8 text-right">
              <div>
                <h3 className="text-lg mb-2">Visit</h3>
                <p className="text-gray-400 font-light">
                  123 Creative Avenue<br />
                  Design District<br />
                  Mumbai, India
                </p>
              </div>

              <div>
                <h3 className="text-lg mb-2">Contact</h3>
                <p className="text-gray-400 font-light">
                  contact@vividhata.com<br />
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-16">
              <div className="flex flex-col items-end gap-4">
                <h3 className="text-lg mb-2">Follow</h3>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 