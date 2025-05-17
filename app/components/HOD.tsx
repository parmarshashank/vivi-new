const HOD = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src="images/team/hodSirPfp.jpeg"
              alt="Head of Department"
              className="w-full h-full object-cover transition-all duration-500 filter grayscale hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="date-stamp">— HOD CSE-AI</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl mb-3">Head of Department</h2>
              <span className="text-gray-400 text-lg">Dr. Sanjeev Pippal</span>
            </div>
            
            <div className="space-y-4 text-gray-300 font-light">
              <p>
                "In the quiet moments between chaos and clarity, we find our true direction. 
                Leading this department has been a journey of constant reflection and growth."
              </p>
              <p>
                Every student here carries a unique perspective, a distinct voice waiting 
                to be heard. Our role is to amplify these voices, to create a space where 
                creativity knows no bounds.
              </p>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-6 text-sm">
                <span className="text-gray-400">Connect</span>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HOD; 