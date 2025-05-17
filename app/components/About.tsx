const About = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 min-h-screen bg-[#111111] relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 relative z-10">
            <div>
              <h2 className="section-title text-2xl md:text-3xl lg:text-4xl">About Vividhata</h2>
              <span className="date-stamp text-sm md:text-base">Est. 2020</span>
            </div>
            
            <div className="space-y-4 md:space-y-6 text-gray-300 font-light">
              <p className="text-lg md:text-xl leading-relaxed">
                In the realm between imagination and reality, we craft experiences 
                that challenge perceptions and push boundaries.
              </p>
              
              <p className="text-base md:text-lg">
                Vividhata was born from a simple idea: that creativity knows no bounds. 
                We are a collective of artists, designers, and dreamers who believe in 
                the power of unique perspectives.
              </p>

              <p className="text-base md:text-lg">
                Our journey began in the quiet corners of innovation, where ideas 
                take shape in the shadows before emerging into the light. Each project 
                is a story waiting to be told, each design a window into possibility.
              </p>
            </div>

            <div className="pt-6 md:pt-8">
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <span className="text-gray-400 text-sm md:text-base">Explore</span>
                <a href="#work" className="text-white hover:text-gray-300 transition-colors text-sm md:text-base">Our Work</a>
                <a href="#process" className="text-white hover:text-gray-300 transition-colors text-sm md:text-base">Process</a>
                <a href="#vision" className="text-white hover:text-gray-300 transition-colors text-sm md:text-base">Vision</a>
              </div>
            </div>
          </div>

          {/* Overlapping Images */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
            {/* Image 1 - Back */}
            <div className="absolute top-4 right-4 w-3/5 h-3/5 overflow-hidden">
              <img
                src="/images/a1.jpeg"
                alt="Creative Process"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Image 2 - Middle */}
            <div className="absolute top-24 left-4 w-2/5 h-2/5 z-10 overflow-hidden">
              <img
                src="/images/a2.jpeg"
                alt="Design Thinking"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Image 3 - Front */}
            <div className="absolute bottom-8 right-16 w-2/5 h-2/5 z-20 overflow-hidden">
              <img
                src="/images/a3.jpeg"
                alt="Team Collaboration"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 border border-gray-800"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gray-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 