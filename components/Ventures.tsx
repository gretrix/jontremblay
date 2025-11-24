export default function Ventures() {
  const ventures = [
    {
      icon: 'fa-server',
      title: 'Gretrix LLC',
      description: 'Full-service MSP and custom development partner. Deeply integrated long-term technology leadership, infrastructure, cybersecurity, automations, analytics, and high-impact systems.',
      image: '/images/Jonathan Representing Gretrix With his truck.jpg'
    },
    {
      icon: 'fa-chart-line',
      title: 'Pivotal Tech Solutions',
      description: 'Strategic technology leadership + architecture guidance for businesses needing clarity, direction, and systems that scale.'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Pivotal Institute Solutions',
      description: 'Training, systems thinking, foundational computing education, and skill-building for new developers and technologists.'
    },
    {
      icon: 'fa-rocket',
      title: 'Fortune Leo',
      description: 'Entrepreneurial investment initiative focused on high-impact, long-term opportunities.'
    },
    {
      icon: 'fa-home',
      title: 'Happy Host',
      description: 'Short-term rental management in the Marietta/Kennesaw area. Focus: high occupancy, excellent guest experience, efficient operations.'
    },
    {
      icon: 'fa-heart',
      title: 'Joyful Solutions',
      description: 'A faith-aligned personal and relational development initiative. Supports emotional health, spiritual growth, and practical guidance rooted in clarity and biblical wisdom.'
    }
  ]

  return (
    <section id="ventures" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Companies & Ventures
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <div key={index} className="card-hover bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 fade-in">
              {venture.image && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={venture.image} 
                    alt={venture.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="text-blue-900 text-4xl mb-4">
                  <i className={`fas ${venture.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{venture.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {venture.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

