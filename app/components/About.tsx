const About = () => {
  return (
    <section className="py-32 min-h-screen bg-[#111111] relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 relative z-10">
            <div>
              <h2 className="section-title">About Vividhata</h2>
              <span className="date-stamp">Est. 2020</span>
            </div>
            
            <div className="space-y-6 text-gray-300 font-light">
              <p className="text-xl leading-relaxed">
                In the realm between imagination and reality, we craft experiences 
                that challenge perceptions and push boundaries.
              </p>
              
              <p>
                Vividhata was born from a simple idea: that creativity knows no bounds. 
                We are a collective of artists, designers, and dreamers who believe in 
                the power of unique perspectives.
              </p>

              <p>
                Our journey began in the quiet corners of innovation, where ideas 
                take shape in the shadows before emerging into the light. Each project 
                is a story waiting to be told, each design a window into possibility.
              </p>
            </div>

            <div className="pt-8">
              <div className="inline-flex items-center gap-6">
                <span className="text-gray-400">Explore</span>
                <a href="#work" className="text-white hover:text-gray-300 transition-colors">Our Work</a>
                <a href="#process" className="text-white hover:text-gray-300 transition-colors">Process</a>
                <a href="#vision" className="text-white hover:text-gray-300 transition-colors">Vision</a>
              </div>
            </div>
          </div>

          {/* Overlapping Images */}
          <div className="relative h-[600px]">
            {/* Image 1 - Back */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5">
              <img
                src="/images/about/1.jpg"
                alt="Creative Process"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Image 2 - Middle */}
            <div className="absolute bottom-20 -left-8 w-2/3 h-2/3 z-10">
              <img
                src="/images/about/2.jpg"
                alt="Design Thinking"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Image 3 - Front */}
            <div className="absolute bottom-0 right-12 w-1/2 h-1/2 z-20">
              <img
                src="/images/about/3.jpg"
                alt="Team Collaboration"
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-gray-800"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gray-800"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 