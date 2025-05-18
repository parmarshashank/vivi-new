'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  order: number;
  createdAt: string;
}

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, token } = useAuth();

  // Form states for adding/editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null as File | null,
  });

  useEffect(() => {
    setIsClient(true);
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (!response.ok) throw new Error('Failed to fetch gallery items');
      const data = await response.json();
      setGalleryItems(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load gallery items');
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const url = editingItem ? '/api/gallery' : '/api/gallery';
      const method = editingItem ? 'PUT' : 'POST';
      if (editingItem) {
        form.append('id', editingItem._id);
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });

      if (!response.ok) throw new Error('Failed to save item');
      
      await fetchGalleryItems();
      setIsEditing(false);
      setEditingItem(null);
      setFormData({ title: '', description: '', image: null });
    } catch (err) {
      setError('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/gallery`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete item');
      
      await fetchGalleryItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  if (!isClient || isLoading) {
    return (
      <section className="py-32 min-h-screen flex items-center bg-[#111111]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="section-title">Photo Journal</h2>
              <p className="text-gray-400 mt-4">Loading...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 min-h-screen flex items-center bg-[#111111]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="section-title">Photo Journal</h2>
              <p className="text-red-400 mt-4">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 min-h-screen flex items-center bg-[#111111]">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Gallery Header */}
          <div className="mb-24 text-center">
            <h2 className="section-title">Photo Journal</h2>
            <p className="text-gray-400 mt-4">A visual diary of moments and memories</p>
          </div>

          {/* Admin Controls */}
          {isAuthenticated && (
            <div className="mb-8">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setEditingItem(null);
                  setFormData({ title: '', description: '', image: null });
                }}
                className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Add New Item
              </button>
            </div>
          )}

          {/* Edit Form */}
          {isAuthenticated && isEditing && (
            <div className="mb-8 bg-gray-900 p-6 rounded">
              <h3 className="text-xl mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-gray-800 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                    className="w-full bg-gray-800 p-2 rounded"
                    required={!editingItem}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Gallery Carousel */}
          {galleryItems.length > 0 && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Card */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={`/api/gallery/${galleryItems[currentIndex]._id}/image`}
                    alt={galleryItems[currentIndex].title}
                    fill
                    className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/4"></div>
                  <div className="absolute bottom-6 left-6">
                    <span className="date-stamp">
                      {new Date(galleryItems[currentIndex].createdAt).getFullYear()}
                    </span>
                  </div>
                </div>

                {/* Description Card */}
                <div>
                  <h3 className="text-3xl mb-6">{galleryItems[currentIndex].title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed mb-8">
                    {galleryItems[currentIndex].description}
                  </p>

                  {/* Admin Controls for Current Item */}
                  {isAuthenticated && (
                    <div className="mb-8 flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setEditingItem(galleryItems[currentIndex]);
                          setFormData({
                            title: galleryItems[currentIndex].title,
                            description: galleryItems[currentIndex].description,
                            image: null,
                          });
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(galleryItems[currentIndex]._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      onClick={prevSlide}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex gap-2">
                      {galleryItems.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-white w-8' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={nextSlide}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 