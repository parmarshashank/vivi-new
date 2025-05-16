'use client';
import { useState, useRef, useEffect } from 'react';

const teamMembers = [
  {
    name: 'Faculty Member 1',
    role: 'Associate Professor',
    image: '/images/team/fac1.jpg',
    date: '2023 — Present',
    quote: 'Education is not the filling of a pail, but the lighting of a fire.'
  },
  {
    name: 'Faculty Member 2',
    role: 'Assistant Professor',
    image: '/images/team/fac2.jpg',
    date: '2022 — Present',
    quote: 'The function of education is to teach one to think intensively and to think critically.'
  },
  {
    name: 'James Wilson',
    role: 'Technical Lead',
    image: '/images/team/3.jpg',
    date: '2021 — Present',
    quote: 'Simplicity is the ultimate sophistication.'
  },
  {
    name: 'Nina Patel',
    role: 'Event Coordinator',
    image: '/images/team/rudra.enc',
    date: '2023 — Present',
    quote: 'Details make perfection, and perfection is not a detail.'
  },
  {
    name: 'David Kim',
    role: 'Visual Designer',
    image: '/images/team/pratiksha.enc',
    date: '2023 — Present',
    quote: 'Everything has beauty, but not everyone sees it.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Content Strategist',
    image: '/images/team/6.jpg',
    date: '2022 — Present',
    quote: 'Words are, in my not so humble opinion, our most inexhaustible source of magic.'
  }
];

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
    }
  };

  if (!isClient) {
    return (
      <section className="min-h-screen bg-[#111111] relative overflow-hidden">
        <div className="absolute top-32 left-0 right-0 z-10">
          <div className="container">
            <h2 className="section-title">The Team</h2>
            <p className="text-gray-400 max-w-xl mt-4 font-light">
              A collective of visionaries and creators, each bringing their unique perspective 
              to shape the future of design.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#111111] relative overflow-hidden">
      {/* Fixed Header */}
      <div className="absolute top-32 left-0 right-0 z-10">
        <div className="container">
          <h2 className="section-title">The Team</h2>
          <p className="text-gray-400 max-w-xl mt-4 font-light">
            A collective of visionaries and creators, each bringing their unique perspective 
            to shape the future of design.
          </p>
        </div>
      </div>

      {/* Team Members Scroll */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-screen flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="min-w-full h-full flex items-center snap-center"
          >
            <div className="container">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8">
                    <span className="date-stamp">{member.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl mb-2">{member.name}</h3>
                    <span className="text-gray-400 text-lg">{member.role}</span>
                  </div>
                  
                  <p className="text-2xl font-light text-gray-300 italic">
                    "{member.quote}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-8' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Team; 