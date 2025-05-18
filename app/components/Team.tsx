"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa"
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'

interface TeamMember {
  _id: string
  name: string
  role: string
  description: string
  order: number
  socialLinks: {
    linkedin: string
    twitter: string
    github: string
  }
  createdAt: string
}

const Team = () => {
  const [isClient, setIsClient] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated, token } = useAuth()

  // Form states for adding/editing
  const [isEditing, setIsEditing] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    image: null as File | null,
    linkedin: '',
    twitter: '',
    github: '',
  })

  useEffect(() => {
    setIsClient(true)
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (!response.ok) throw new Error('Failed to fetch team members')
      const data = await response.json()
      setTeamMembers(data)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to load team members')
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', formData.name)
    form.append('role', formData.role)
    form.append('description', formData.description)
    form.append('linkedin', formData.linkedin)
    form.append('twitter', formData.twitter)
    form.append('github', formData.github)
    if (formData.image) {
      form.append('image', formData.image)
    }

    try {
      const url = editingMember ? '/api/team' : '/api/team'
      const method = editingMember ? 'PUT' : 'POST'
      if (editingMember) {
        form.append('id', editingMember._id)
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      })

      if (!response.ok) throw new Error('Failed to save member')
      
      await fetchTeamMembers()
      setIsEditing(false)
      setEditingMember(null)
      setFormData({
        name: '',
        role: '',
        description: '',
        image: null,
        linkedin: '',
        twitter: '',
        github: '',
      })
    } catch (err) {
      setError('Failed to save member')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const response = await fetch(`/api/team`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete member')
      
      await fetchTeamMembers()
    } catch (err) {
      setError('Failed to delete member')
    }
  }

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

  if (!isClient || isLoading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-sans">In the Spotlight</h2>
          <p className="text-xl mt-2 font-light">Loading...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-sans">In the Spotlight</h2>
          <p className="text-xl mt-2 font-light text-red-500">{error}</p>
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

        {/* Admin Controls */}
        {isAuthenticated && (
          <div className="mt-8">
            <button
              onClick={() => {
                setIsEditing(true)
                setEditingMember(null)
                setFormData({
                  name: '',
                  role: '',
                  description: '',
                  image: null,
                  linkedin: '',
                  twitter: '',
                  github: '',
                })
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add New Member
            </button>
          </div>
        )}

        {/* Edit Form */}
        {isAuthenticated && isEditing && (
          <div className="mt-8 bg-gray-100 p-6 rounded">
            <h3 className="text-xl mb-4">{editingMember ? 'Edit Member' : 'Add New Member'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                  className="w-full bg-white p-2 rounded border"
                  required={!editingMember}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Twitter URL</label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full bg-white p-2 rounded border"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  {editingMember ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setEditingMember(null)
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
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
            key={member._id}
            className="relative flex-shrink-0 snap-start"
            style={{ width: "280px", maxWidth: "100vw - 2rem" }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className="relative">
              {/* Pink blob decoration that appears on hover */}
              {activeIndex === index &&
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
              }

              {/* Location and Social Links */}
              <div className="absolute -right-2 md:-right-6 top-0 z-[3] h-full flex flex-col items-center justify-start pt-4 gap-3">
                {/* Social Links */}
                <div className="flex flex-col gap-4 mt-16 md:mt-20">
                  {member.socialLinks.linkedin && (
                    <a 
                      href={member.socialLinks.linkedin}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <FaLinkedin className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a 
                      href={member.socialLinks.twitter}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <FaTwitter className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a 
                      href={member.socialLinks.github}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <FaGithub className="w-3 h-3 md:w-4 md:h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Main image container */}
              <div className="relative z-[2] aspect-[3/4] overflow-hidden">
                <Image
                  src={`/api/team/${member._id}/image`}
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
                  <p className="text-base md:text-lg font-light leading-relaxed text-white">&ldquo;{member.description}&rdquo;</p>
                </motion.div>
              )}

              {/* Admin Controls */}
              {isAuthenticated && activeIndex === index && (
                <div className="absolute top-4 left-4 z-[3] flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setEditingMember(member)
                      setFormData({
                        name: member.name,
                        role: member.role,
                        description: member.description,
                        image: null,
                        linkedin: member.socialLinks.linkedin,
                        twitter: member.socialLinks.twitter,
                        github: member.socialLinks.github,
                      })
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
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
    </section>
  )
}

export default Team
