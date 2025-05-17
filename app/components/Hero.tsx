'use client';

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        
        {/* Vignette Effect */}
        <div className="absolute inset-0 vignette-effect"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 h-screen flex flex-col px-4 sm:px-6 lg:px-8">
        {/* Top Navigation - Hidden since we have the main Navbar */}
        <div className="hidden">
          <nav className="minimal-menu">
            <a href="#home">Home</a>
            <a href="#profile">Profile</a>
            <a href="#social">Social Media</a>
            <a href="#about">About</a>
          </nav>
        </div>

        {/* Hero Text */}
        <div className="flex-1 flex items-center">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Chamber of Vividhata
            </h1>
            <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
              <span className="block text-lg sm:text-xl md:text-2xl font-medium mb-2 text-[var(--accent2)]">
                न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।
              </span>
              There is nothing in this world as purifying as knowledge.
            </p>
            <div className="mt-6 md:mt-8">
              <span className="date-stamp text-sm sm:text-base">— Bhagwad Gita</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-xs sm:text-sm text-gray-400 block mb-3 md:mb-4">Scroll to explore</span>
          <div className="w-px h-12 md:h-16 bg-gray-700 mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Mobile Gradient Enhancement */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent md:hidden"></div>
    </section>
  );
};

export default Hero; 