"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { FaLinkedin, FaTwitter } from "react-icons/fa"

interface TeamMember {
  name: string
  role: string
  image: string
  location: string
  quote: string
  socials: {
    linkedin: string
    twitter: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Faculty Member 1",
    role: "Associate Professor",
    image: "/images/team/fac1.jpg",
    location: "Stockholm",
    quote: "Education is not the filling of a pail, but the lighting of a fire.",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Faculty Member 2",
    role: "Assistant Professor",
    image: "/images/team/fac2.jpg",
    location: "New York",
    quote: "The function of education is to teach one to think intensively and to think critically.",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "James Wilson",
    role: "Technical Lead",
    image: "/images/team/3.jpg",
    location: "Stockholm",
    quote:
      "If you&apos;d asked the kid version of me what I wanted to be when I grew up, I would&apos;ve definitely told you \"teddy bear surgeon\". Looking back, I guess I wasn&apos;t far off!",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Nina Patel",
    role: "Event Coordinator",
    image: "/images/team/rudra.enc",
    location: "Stockholm",
    quote: "Details make perfection, and perfection is not a detail.",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "David Kim",
    role: "Visual Designer",
    image: "/images/team/pratiksha.enc",
    location: "New York",
    quote: "Everything has beauty, but not everyone sees it.",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    name: "Sarah Johnson",
    role: "Content Strategist",
    image: "/images/team/6.jpg",
    location: "Stockholm",
    quote: "Words are, in my not so humble opinion, our most inexhaustible source of magic.",
    socials: {
      
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
]

const Team = () => {
  const [isClient, setIsClient] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (!isClient) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-sans">In the Spotlight</h2>
          <p className="text-xl mt-2 font-light">Meet the humans who shape our future</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900">In the Spotlight</h2>
            <p className="text-lg md:text-xl mt-2 font-light text-gray-700">Meet the humans who shape our future</p>
          </div>
          <div className="flex gap-4 self-end">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar gap-6 md:gap-12 lg:gap-24 px-4 md:px-8 lg:px-12 pb-8 md:pb-10 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {teamMembers.map((member, index) => (
          <div 
            key={index}
            className="relative flex-shrink-0 snap-start"
            style={{ width: "280px", maxWidth: "100vw - 2rem" }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="relative">
              {/* Pink blob decoration that appears on hover */}
              {activeIndex === index && (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.7 }}
                    transition={{ 
                      duration: 0.7,
                      ease: [0.32, 0, 0.67, 0]
                    }}
                    className="absolute -left-1/2 top-0 w-full mt-10 h-full z-[1]"
                    style={{ 
                      background: "radial-gradient(circle at center, #FF69B4 0%, transparent 70%)",
                      filter: "blur(40px)",
                      transform: "translate(-20%, 20%)",
                      pointerEvents: "none"
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 0.5 }}
                    transition={{ 
                      duration: 0.8,
                      ease: [0.32, 0, 0.67, 0],
                      delay: 0.1
                    }}
                    className="absolute -right-1/2 top-1/4 w-full h-full z-[1]"
                    style={{ 
                      background: "radial-gradient(circle at center, #FF69B4 0%, transparent 70%)",
                      filter: "blur(45px)",
                      transform: "translate(20%, 20%)",
                      pointerEvents: "none"
                    }}
                  />
                </>
              )}

              {/* Location and Social Links */}
              <div className="absolute -right-2 md:-right-6 top-0 z-[3] h-full flex flex-col items-center justify-start pt-4 gap-3">
                {/* Location dot and text */}
                <div className="flex items-center gap-2 transform -rotate-90 origin-left translate-y-12 translate-x-4 md:translate-x-6">
                  <div className="h-1 w-1 bg-gray-900 rounded-full"></div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-light text-gray-900 whitespace-nowrap">
                    {member.location}
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-4 mt-16 md:mt-20">
                  <a 
                    href={member.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaLinkedin className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                  <a 
                    href={member.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                </div>
              </div>

              {/* Main image container */}
              <div className="relative z-[2] aspect-[3/4] overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Black overlay with quote on hover */}
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-0 w-[90%] h-full bg-black p-4 md:p-8 flex items-center z-[2]"
                >
                  <p className="text-base md:text-lg font-light leading-relaxed text-white">&ldquo;{member.quote}&rdquo;</p>
                </motion.div>
              )}
            </div>

            {/* Member info */}
            <div className="mt-4 md:mt-6 relative z-[2]">
              <h3 className="text-lg md:text-xl font-bold font-sans text-gray-900">{member.name}</h3>
              <p className="text-sm md:text-base text-gray-700 font-light mt-1">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 md:mt-12">
        <a href="#" className="inline-flex items-center text-xs md:text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity">
          VIEW ALL IN THE SPOTLIGHTS
          <svg className="ml-2 w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default Team
