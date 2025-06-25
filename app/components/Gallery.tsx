'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Edit, Trash2, Plus, Save, X } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  date: string;
}

const initialGalleryImages: GalleryItem[] = [
  {
    id: "1",
    src: '/images/gallery/image1.JPG',
    title: 'Chamber of Thoughts',
    description: 'A moment of solitude in the urban jungle. Where thoughts echo against concrete walls.',
    date: '2024'
  },
  {
    id: "2",
    src: '/images/gallery/image2.JPG',
    title: 'City Reflections',
    description: 'The city mirrors our dreams, each window a story waiting to be told.',
    date: '2024'
  },
  {
    id: "3",
    src: '/images/gallery/image3.JPG',
    title: 'Urban Poetry',
    description: 'Streets speak in whispers, telling tales of those who walk them.',
    date: '2023'
  },
  {
    id: "4",
    src: '/images/gallery/image4.JPG',
    title: 'Silent Conversations',
    description: 'In the quiet corners of the city, stories unfold in silence.',
    date: '2023'
  }
];

const Gallery = () => {
  const { isAdmin } = useAdmin();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(initialGalleryImages);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditingItem({ ...item });
  };

  const handleSave = () => {
    if (editingItem) {
      setGalleryImages(prev => 
        prev.map(item => 
          item.id === editingItem.id ? editingItem : item
        )
      );
      setEditingId(null);
      setEditingItem(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    setGalleryImages(prev => prev.filter(item => item.id !== id));
    if (currentIndex >= galleryImages.length - 1) {
      setCurrentIndex(Math.max(0, galleryImages.length - 2));
    }
  };

  const handleAdd = () => {
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      src: '/images/gallery/image1.JPG',
      title: 'New Image',
      description: 'Description',
      date: new Date().getFullYear().toString()
    };
    setGalleryImages(prev => [...prev, newItem]);
    setEditingId(newItem.id);
    setEditingItem({ ...newItem });
  };

  if (!isClient) {
    return (
      <section className="py-32 min-h-screen flex items-center bg-[#111111]">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-24 text-center">
              <h2 className="section-title">Photo Journal</h2>
              <p className="text-gray-400 mt-4">A visual diary of moments and memories</p>
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
            {isAdmin && (
              <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-white text-black hover:bg-gray-100 transition-colors font-light"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                Add Image
              </button>
            )}
          </div>

          {/* Gallery Carousel */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Image Card */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={galleryImages[currentIndex]?.src || '/images/gallery/image1.JPG'}
                  alt={galleryImages[currentIndex]?.title || 'Gallery Image'}
                  fill
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/4"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="date-stamp">{galleryImages[currentIndex]?.date || '2024'}</span>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-[#1a1a1a] p-12 relative min-h-[400px] flex flex-col justify-center">
                {/* Admin Controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    {editingId === galleryImages[currentIndex]?.id ? (
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
                          onClick={() => handleEdit(galleryImages[currentIndex])}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(galleryImages[currentIndex]?.id || '')}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                )}

                {editingId === galleryImages[currentIndex]?.id ? (
                  <div className="space-y-6">
                    <input
                      type="text"
                      value={editingItem?.title || ''}
                      onChange={(e) => setEditingItem(prev => prev ? {...prev, title: e.target.value} : null)}
                      className="text-3xl bg-transparent border-b border-gray-600 text-white focus:border-gray-400 focus:outline-none"
                    />
                    <textarea
                      value={editingItem?.description || ''}
                      onChange={(e) => setEditingItem(prev => prev ? {...prev, description: e.target.value} : null)}
                      className="text-gray-400 font-light leading-relaxed bg-transparent border-b border-gray-600 focus:border-gray-400 focus:outline-none resize-none w-full"
                      rows={4}
                    />
                    <input
                      type="text"
                      value={editingItem?.date || ''}
                      onChange={(e) => setEditingItem(prev => prev ? {...prev, date: e.target.value} : null)}
                      className="text-gray-400 bg-transparent border-b border-gray-600 focus:border-gray-400 focus:outline-none"
                      placeholder="Date"
                    />
                  </div>
                ) : (
                  <>
                    <h3 className="text-3xl mb-6">{galleryImages[currentIndex]?.title || 'Image Title'}</h3>
                    <p className="text-gray-400 font-light leading-relaxed mb-8">
                      {galleryImages[currentIndex]?.description || 'Image description'}
                    </p>
                  </>
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
                    {galleryImages.map((_, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default Gallery;