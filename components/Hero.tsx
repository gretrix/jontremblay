export default function Hero() {
  return (
    <section className="hero-gradient text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Building People, Systems & Legacy
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
              Entrepreneur, technologist, and faith-driven leader dedicated to helping people grow, heal, and rise above where they started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#ventures" className="btn-primary px-8 py-4 rounded-lg text-white font-semibold text-lg text-center">
                Work With Me
              </a>
              <a href="#contact" className="btn-secondary bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold text-lg text-center">
                Contact Me
              </a>
            </div>
          </div>
          <div className="fade-in flex justify-center">
            <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-4 border-white/20">
              <i className="fas fa-user text-9xl text-white/40"></i>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/60 text-sm mt-60">Portrait Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

