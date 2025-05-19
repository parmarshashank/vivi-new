"use client"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa"
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'
import Modal from './Modal'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      setIsModalOpen(false)
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
      <section className="bg-white py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900">In the Spotlight</h2>
            <p className="text-lg md:text-xl mt-2 font-light text-gray-700">Loading...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-white py-12 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-gray-900">In the Spotlight</h2>
            <p className="text-lg md:text-xl mt-2 font-light text-red-600">{error}</p>
          </div>
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
                setIsModalOpen(true)
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

        {/* Team Members Grid */}
        <div 
          ref={scrollContainerRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto"
        >
          {teamMembers.map((member, index) => (
            <div key={member._id}>
              <div 
                className="relative group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Image Container */}
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
                  <div className="absolute left-0 top-0 w-[90%] h-full bg-black p-4 md:p-8 flex items-center z-[2]">
                    <p className="text-base md:text-lg font-light leading-relaxed text-white">&ldquo;{member.description}&rdquo;</p>
                  </div>
                )}

                {/* Admin Controls */}
                {isAuthenticated && activeIndex === index && (
                  <div className="absolute top-4 left-4 z-[3] flex gap-2">
                    <button
                      onClick={() => {
                        setIsModalOpen(true)
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
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
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
        title={editingMember ? 'Edit Team Member' : 'Add New Team Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
              required={!editingMember}
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">LinkedIn URL</label>
            <input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Twitter URL</label>
            <input
              type="url"
              value={formData.twitter}
              onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">GitHub URL</label>
            <input
              type="url"
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 p-2 rounded border border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              {editingMember ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false)
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
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}

export default Team
