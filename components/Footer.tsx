export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Jonathan Tremblay</h3>
          <p className="text-xl mb-6">Building People, Systems & Legacy</p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:jtremblay@jontremblay.com" className="text-gray-300 hover:text-white transition">
              <i className="fas fa-envelope text-2xl"></i>
            </a>
            <a href="tel:404-374-9322" className="text-gray-300 hover:text-white transition">
              <i className="fas fa-phone text-2xl"></i>
            </a>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-400">
              &copy; 2025 Jonathan Tremblay. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              "Build things that matter. Build people who grow. Honor God in everything."
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

