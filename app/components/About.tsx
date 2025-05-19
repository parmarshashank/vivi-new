import Image from 'next/image';

const About = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 min-h-screen bg-[#111111] relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Images Section - Now First on Mobile */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] order-first lg:order-last">
            {/* Image 1 - Back */}
            <div className="absolute top-4 right-4 w-3/5 h-3/5 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/a1.jpeg"
                  alt="Creative Process"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Image 2 - Middle */}
            <div className="absolute top-24 left-4 w-2/5 h-2/5 z-10 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/a2.jpeg"
                  alt="Design Thinking"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Image 3 - Front */}
            <div className="absolute bottom-8 right-16 w-2/5 h-2/5 z-20 overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/images/a3.jpeg"
                  alt="Team Collaboration"
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border border-gray-800"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gray-800"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 relative z-10 order-last lg:order-first">
            <div>
              <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">About Vividhata</h2>
              <span className="date-stamp text-sm md:text-base">Est. 2020</span>
            </div>
            
            <div className="space-y-4 md:space-y-6 text-gray-300 font-light">
              <p className="text-lg md:text-xl leading-relaxed">
                Vividhata is more than just a club - it's a celebration of diversity and creativity. 
                Founded with the vision to bring together passionate individuals, we create a space 
                where cultural boundaries dissolve and artistic expression flourishes.
              </p>
              
              <p className="text-base md:text-lg">
                Our community thrives on the exchange of ideas, the fusion of different art forms, 
                and the celebration of unique perspectives. Through various events, workshops, and 
                collaborative projects, we provide a platform for members to showcase their talents 
                and grow together.
              </p>
            </div>

            <div className="pt-6 md:pt-8">
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span className="text-gray-400 text-sm md:text-base">Our Goals</span>
                <span className="text-white text-sm md:text-base">#Creativity</span>
                <span className="text-white text-sm md:text-base">#Diversity</span>
                <span className="text-white text-sm md:text-base">#Innovation</span>
                <span className="text-white text-sm md:text-base">#Community</span>
                <span className="text-white text-sm md:text-base">#Art</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 