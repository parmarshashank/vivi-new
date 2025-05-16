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
          className="video-background"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Vignette Effect */}
        <div className="absolute inset-0 vignette-effect"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 h-screen flex flex-col">
        {/* Top Navigation */}
        <div className="pt-8">
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
            <h1 className="text-5xl mb-6">Chamber of Vividhata</h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
           <b> न हि ज्ञानेन सदृशं पवित्रमिह विद्यते। </b><br />
            There is nothing in this world as purifying as knowledge.
            </p>
            <div className="mt-8">
              <span className="date-stamp">— Bhagwad Gita</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-sm text-gray-400 block mb-4">Scroll to explore</span>
          <div className="w-px h-16 bg-gray-700 mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 