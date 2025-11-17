'use client'

import { useState, FormEvent } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryPurpose: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        inquiryPurpose: '',
        message: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit form')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 px-4 gradient-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Get In Touch
        </h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 fade-in">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <i className="fas fa-envelope text-purple-600 text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <a href="mailto:jtremblay@jontremblay.com" className="text-purple-600 hover:text-purple-700 transition">
                      jtremblay@jontremblay.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <i className="fas fa-phone text-purple-600 text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-semibold text-gray-800">Phone</h4>
                    <a href="tel:404-374-9322" className="text-purple-600 hover:text-purple-700 transition">
                      404-374-9322
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Let's Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're interested in working together, exploring partnership opportunities, or simply want to connect, I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name *
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                  Company
                </label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition disabled:bg-gray-100"
                  placeholder="Your company"
                />
              </div>
            </div>

            <div>
              <label htmlFor="inquiryPurpose" className="block text-sm font-semibold text-gray-700 mb-2">
                Inquiry Purpose *
              </label>
              <select 
                id="inquiryPurpose" 
                name="inquiryPurpose" 
                required 
                value={formData.inquiryPurpose}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition disabled:bg-gray-100"
              >
                <option value="">Select a purpose</option>
                <option value="business">Business</option>
                <option value="partnership">Partnership</option>
                <option value="speaking">Speaking</option>
                <option value="church-community">Church/Community</option>
                <option value="personal">Personal</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message *
              </label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={6} 
                value={formData.message}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition resize-none disabled:bg-gray-100"
                placeholder="Tell me about your inquiry..."
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full btn-primary px-8 py-4 rounded-lg text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                </>
              ) : (
                <>
                  Send Message <i className="fas fa-paper-plane ml-2"></i>
                </>
              )}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              <i className="fas fa-check-circle mr-2"></i>
              Thank you for your message! Check your email for a confirmation. I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {errorMessage || 'Something went wrong. Please try again or email me directly.'}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

