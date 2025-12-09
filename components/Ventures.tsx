export default function Ventures() {
  const ventures = [
    {
      icon: 'fa-server',
      title: 'Gretrix LLC',
      description: 'Full-service MSP and custom development partner. Deeply integrated long-term technology leadership, infrastructure, cybersecurity, automations, analytics, and high-impact systems.',
      url: 'https://gretrix.com/'
    },
    {
      icon: 'fa-chart-line',
      title: 'Pivotal Tech Solutions',
      description: 'Strategic technology leadership + architecture guidance for businesses needing clarity, direction, and systems that scale.',
      url: 'https://www.pivotaltech.solutions/'
    },
    {
      icon: 'fa-graduation-cap',
      title: 'Pivotal Institute Solutions',
      description: 'Training, systems thinking, foundational computing education, and skill-building for new developers and technologists.',
      url: 'https://www.pivotalinstitute.solutions/'
    },
    {
      icon: 'fa-rocket',
      title: 'Fortune Leo',
      description: 'Entrepreneurial investment initiative focused on high-impact, long-term opportunities.',
      url: 'https://fortuneleo.com/'
    },
    {
      icon: 'fa-home',
      title: 'Happy Host',
      description: 'Short-term rental management in the Marietta/Kennesaw area. Focus: high occupancy, excellent guest experience, efficient operations.',
      url: null
    },
    {
      icon: 'fa-heart',
      title: 'Joyful Solutions',
      description: 'A faith-aligned personal and relational development initiative. Supports emotional health, spiritual growth, and practical guidance rooted in clarity and biblical wisdom.',
      url: 'https://www.thejoyful.solutions/'
    }
  ]

  return (
    <section id="ventures" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Companies & Ventures
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => {
            const content = (
              <>
                <div className="text-blue-900 text-4xl mb-4">
                  <i className={`fas ${venture.icon}`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-900 transition-colors">
                  {venture.title}
                  {venture.url && (
                    <i className="fas fa-external-link-alt text-sm ml-2 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                  )}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {venture.description}
                </p>
              </>
            )

            return venture.url ? (
              <a
                key={index}
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-hover bg-white rounded-xl shadow-lg p-8 border border-gray-100 fade-in block hover:border-blue-900 transition-all"
              >
                {content}
              </a>
            ) : (
              <div key={index} className="card-hover bg-white rounded-xl shadow-lg p-8 border border-gray-100 fade-in">
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

