'use client'

import { useState } from 'react'

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const photos = [
    {
      src: '/images/Jonathan Looking Professional in a Blue Suit.jpg',
      alt: 'Jonathan in professional attire',
      caption: 'Professional Excellence'
    },
    {
      src: '/images/Linda Being Playful.jpg',
      alt: 'Linda',
      caption: 'Linda Tremblay'
    },
    {
      src: '/images/Linda and Jonathan With Their Beautiful Family.jpg',
      alt: 'The Tremblay Family',
      caption: 'Carter, Leo, and Maverick with Jonathan and Linda'
    },
    {
      src: '/images/Jonathan Representing Gretrix With his truck.jpg',
      alt: 'Jonathan with Gretrix company truck',
      caption: 'Gretrix - On the Move'
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Life & Work
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="card-hover rounded-xl overflow-hidden shadow-lg cursor-pointer fade-in"
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-center text-gray-700 font-semibold">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img 
            src={selectedImage}
            alt="Selected photo"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      )}
    </section>
  )
}

