"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus, Save, X } from "lucide-react"
import { motion } from "framer-motion"
import { FaLinkedin, FaTwitter } from "react-icons/fa"
import Image from 'next/image'
import { useAdmin } from '../../context/AdminContext'

interface TeamMember {
  id: string
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

const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
    name: "James Wilson",
    role: "Technical Lead",
    image: "/images/team/sarthak.enc",
    location: "Stockholm",
    quote:
      "If you'd asked the kid version of me what I wanted to be when I grew up, I would've definitely told you \"teddy bear surgeon\". Looking back, I guess I wasn't far off!",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
  {
    id: "4",
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
    id: "5",
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
    id: "6",
    name: "Sarah Johnson",
    role: "Content Strategist",
    image: "/images/team/sneha.enc",
    location: "Stockholm",
    quote: "Words are, in my not so humble opinion, our most inexhaustible source of magic.",
    socials: {
      linkedin: "https://linkedin.com/",
      twitter: "https://twitter.com/",
    },
  },
]

const Team = () => {
  const { isAdmin } = useAdmin()
  const [isClient, setIsClient] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
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

  const handleEdit = (member: TeamMember) => {
    setEditingId(member.id)
    setEditingMember({ ...member })
  }

  const handleSave = () => {
    if (editingMember) {
      setTeamMembers(prev => 
        prev.map(member => 
          member.id === editingMember.id ? editingMember : member
        )
      )
      setEditingId(null)
      setEditingMember(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditingMember(null)
  }

  const handleDelete = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id))
  }

  const handleAdd = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "New Member",
      role: "Role",
      image: "/images/team/fac1.jpg",
      location: "Location",
      quote: "Quote",
      socials: {
        linkedin: "https://linkedin.com/",
        twitter: "https://twitter.com/",
      },
    }
    setTeamMembers(prev => [...prev, newMember])
    setEditingId(newMember.id)
    setEditingMember({ ...newMember })
  }

  if (!isClient) {
    return (
      <section className="bg-[#111111] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-sans text-white">In the Spotlight</h2>
          <p className="text-xl mt-2 font-light text-gray-400">Meet the humans who shape our future</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#111111] py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 mb-8 md:mb-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-white">In the Spotlight</h2>
            <p className="text-lg md:text-xl mt-2 font-light text-gray-400">Meet the humans who shape our future</p>
          </div>
          <div className="flex gap-4 self-end">
            {isAdmin && (
              <button
                onClick={handleAdd}
                className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors text-gray-300"
                aria-label="Add member"
              >
                <Plus className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors text-gray-300"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full border border-gray-600 hover:bg-gray-800 transition-colors text-gray-300"
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
            key={member.id}
            className="relative flex-shrink-0 snap-start"
            style={{ width: "280px", maxWidth: "100vw - 2rem" }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {/* Admin Controls */}
            {isAdmin && (
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                {editingId === member.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            )}

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
                  <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                  <span className="text-[10px] md:text-xs uppercase tracking-widest font-light text-gray-300 whitespace-nowrap">
                    {editingId === member.id ? (
                      <input
                        type="text"
                        value={editingMember?.location || ''}
                        onChange={(e) => setEditingMember(prev => prev ? {...prev, location: e.target.value} : null)}
                        className="bg-transparent border-b border-gray-500 text-gray-300 text-[10px] md:text-xs uppercase tracking-widest font-light"
                      />
                    ) : (
                      member.location
                    )}
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-4 mt-16 md:mt-20">
                  <a 
                    href={member.socials.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                  <a 
                    href={member.socials.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
                  </a>
                </div>
              </div>

              {/* Main image container */}
              <div className="relative z-[2] aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover filter grayscale hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
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
                  {editingId === member.id ? (
                    <textarea
                      value={editingMember?.quote || ''}
                      onChange={(e) => setEditingMember(prev => prev ? {...prev, quote: e.target.value} : null)}
                      className="bg-transparent text-white text-base md:text-lg font-light leading-relaxed w-full resize-none border-none outline-none"
                      rows={4}
                    />
                  ) : (
                    <p className="text-base md:text-lg font-light leading-relaxed text-white">&ldquo;{member.quote}&rdquo;</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Member info */}
            <div className="mt-4 md:mt-6 relative z-[2]">
              {editingId === member.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editingMember?.name || ''}
                    onChange={(e) => setEditingMember(prev => prev ? {...prev, name: e.target.value} : null)}
                    className="text-lg md:text-xl font-bold font-sans text-white bg-transparent border-b border-gray-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={editingMember?.role || ''}
                    onChange={(e) => setEditingMember(prev => prev ? {...prev, role: e.target.value} : null)}
                    className="text-sm md:text-base text-gray-400 font-light bg-transparent border-b border-gray-500 focus:outline-none"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-lg md:text-xl font-bold font-sans text-white">{member.name}</h3>
                  <p className="text-sm md:text-base text-gray-400 font-light mt-1">{member.role}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-8 md:mt-12">
        <a href="#" className="inline-flex items-center text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors">
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
