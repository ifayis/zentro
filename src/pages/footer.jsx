function Footer() {
  return (
    <footer className="relative mt-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img
              src="/images/zentro-app.png"
              alt="logo"
              className="w-10 h-10 drop-shadow-lg"
            />
            <span className="text-xl font-bold">Zentro Apps</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            <a
              href="/features"
              className="hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="/contact"
              className="hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
          </div>

          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/176igqnuZ4/" target="_blank" rel="noreferrer">
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
            <a href="https://github.com/ifayis" target="_blank" rel="noreferrer">
              <img
                src="/icons/github.svg"
                alt="git"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
            <a href="https://x.com/FayisKV280338" target="_blank" rel="noreferrer">
              <img
                src="/icons/twitter.svg"
                alt="Twitter"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
            <a href="https://www.instagram.com/i.faayis?igsh=MTZ1eDg0MTAyb3JmYQ==" target="_blank" rel="noreferrer">
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
                className="w-6 h-6 hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 mb-4 opacity-50"></div>

        <div className="flex flex-col md:flex-row justify-center items-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Zentro Apps. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
export default Footer