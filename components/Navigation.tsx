'use client'

import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">Jonathan Tremblay</div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-purple-600 transition">About</a>
            <a href="#story" className="text-gray-700 hover:text-purple-600 transition">My Story</a>
            <a href="#ventures" className="text-gray-700 hover:text-purple-600 transition">Ventures</a>
            <a href="#faith" className="text-gray-700 hover:text-purple-600 transition">Faith</a>
            <a href="#contact" className="text-gray-700 hover:text-purple-600 transition">Contact</a>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-4 py-3 space-y-3">
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-purple-600 transition"
          >
            About
          </a>
          <a 
            href="#story" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-purple-600 transition"
          >
            My Story
          </a>
          <a 
            href="#ventures" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-purple-600 transition"
          >
            Ventures
          </a>
          <a 
            href="#faith" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-purple-600 transition"
          >
            Faith
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-purple-600 transition"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}

