export default function Faith() {
  const services = [
    'Sound Booth',
    'Lighting',
    'Media',
    'Livestream Operations',
    'Stage Audio and Tech',
    'Sunday Production Support'
  ]

  return (
    <section id="faith" className="py-20 px-4 gradient-bg">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Faith & Community
        </h2>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 fade-in">
          <div className="text-center mb-12">
            <div className="text-purple-600 text-6xl mb-6">
              <i className="fas fa-church"></i>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Active Service at Grace Church</h3>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Jonathan actively serves at Grace Church, using his technical expertise and servant leadership to support the ministry:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-4">
                <i className="fas fa-check-circle text-purple-600 text-2xl mt-1"></i>
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">{service}</h4>
                </div>
              </div>
            ))}
          </div>

          <blockquote className="quote-block pl-6 py-6 my-8 italic text-2xl text-gray-800 text-center">
            "I care deeply about people. My calling is to use my gifts to make a lasting, God-honoring impact on every life I touch."
          </blockquote>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 mb-4">
              Interested in visiting Grace Church? We'd love to have you join us!
            </p>
            <a href="https://gracechurch.com" target="_blank" rel="noopener noreferrer" className="inline-block btn-primary px-8 py-3 rounded-lg text-white font-semibold">
              Visit Grace Church <i className="fas fa-external-link-alt ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

