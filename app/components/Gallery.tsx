'use client';
import { useState, useEffect } from 'react';

const galleryImages = [
  {
    src: '/images/gallery/image1.JPG',
    title: 'Chamber of Thoughts',
    description: 'A moment of solitude in the urban jungle. Where thoughts echo against concrete walls.',
    date: '2024'
  },
  {
    src: '/images/gallery/9.png',
    title: 'City Reflections',
    description: 'The city mirrors our dreams, each window a story waiting to be told.',
    date: '2024'
  },
  {
    src: '/images/gallery/5.png',
    title: 'Urban Poetry',
    description: 'Streets speak in whispers, telling tales of those who walk them.',
    date: '2023'
  },
  {
    src: '/images/gallery/4.png',
    title: 'Silent Conversations',
    description: 'In the quiet corners of the city, stories unfold in silence.',
    date: '2023'
  }
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  if (!isClient) {
    return (
      <section className="py-32 min-h-screen flex items-center bg-[#111111]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="section-title">Photo Journal</h2>
              <p className="text-gray-400 mt-4">A visual diary of moments and memories</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 min-h-screen flex items-center bg-[#111111]">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Gallery Header */}
          <div className="mb-24 text-center">
            <h2 className="section-title">Photo Journal</h2>
            <p className="text-gray-400 mt-4">A visual diary of moments and memories</p>
          </div>

          {/* Gallery Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].title}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/4"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="date-stamp">{galleryImages[currentIndex].date}</span>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-[#1a1a1a] p-12 relative min-h-[400px] flex flex-col justify-center">
                <h3 className="text-3xl mb-6">{galleryImages[currentIndex].title}</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  {galleryImages[currentIndex].description}
                </p>
                
                {/* Navigation */}
                <div className="flex justify-between items-center mt-auto">
                  <button 
                    onClick={prevSlide}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Previous
                  </button>
                  <div className="flex gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? 'bg-white w-8' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <button 
                    onClick={nextSlide}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery; 