export default function Leadership() {
  const traits = [
    { icon: 'fa-eye', title: 'Visionary', description: 'Sees the big picture and plans for long-term impact' },
    { icon: 'fa-cogs', title: 'Systems Thinker', description: 'Builds frameworks that create order and clarity' },
    { icon: 'fa-clipboard-check', title: 'Highly Accountable', description: 'Takes ownership and follows through' },
    { icon: 'fa-brain', title: 'Emotionally Intelligent', description: 'Understands people and leads with empathy' },
    { icon: 'fa-balance-scale', title: 'Structured + Compassionate', description: 'Blends discipline with genuine care' },
    { icon: 'fa-comments', title: 'Excellent Communicator', description: 'Simplifies complexity and teaches clearly' },
    { icon: 'fa-shield-alt', title: 'Integrity-Driven', description: 'Character and honesty guide every decision' },
    { icon: 'fa-monument', title: 'Legacy-Focused', description: 'Builds things that outlast him' },
    { icon: 'fa-chalkboard-teacher', title: 'Skilled Teacher & Simplifier', description: 'Makes complex topics accessible' },
    { icon: 'fa-praying-hands', title: 'Faith-Driven Stewardship', description: 'Honors God in all he does' },
    { icon: 'fa-seedling', title: 'Passionate About Growth', description: 'Dedicated to helping people rise' }
  ]

  return (
    <section id="leadership" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-4xl md:text-5xl font-bold text-gray-800 mb-16 text-center fade-in">
          Leadership & Personal Traits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {traits.map((trait, index) => (
            <div key={index} className="fade-in flex items-start space-x-4">
              <i className={`fas ${trait.icon} text-purple-600 text-3xl mt-1`}></i>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{trait.title}</h3>
                <p className="text-gray-600">{trait.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

