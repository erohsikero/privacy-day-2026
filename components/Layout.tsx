
import React from 'react';
import { Lock, ExternalLink } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <a href="https://durhamcollege.ca/about/office-of-research-services-innovation-and-entrepreneurship-orsie/centre-for-cybersecurity-innovation" target="_blank" rel="noopener noreferrer">
                <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo" className="h-16 w-auto" />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#" className="text-gray-600 hover:text-durham-green transition font-medium">Checker</a>
              <a href="#about" className="text-gray-600 hover:text-durham-green transition font-medium">Why it matters</a>
              <div className="bg-durham-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                Data Privacy Day 2026
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-durham-green text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-green-800 pb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="w-6 h-6 text-green-300" />
                <span className="text-xl font-bold">Privacy First</span>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">
                We don't store your photos. Processing happens locally in your browser.
                Your data stays with you, exactly as it should.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-green-100 text-sm">
                <li><a href="https://staysafeonline.org/data-privacy-day/" target="_blank" className="hover:underline flex items-center gap-1">Data Privacy Day Official <ExternalLink size={14} /></a></li>
                <li><a href="#" className="hover:underline">Metadata Removal Guide</a></li>
                <li><a href="#" className="hover:underline">Cybersecurity Awareness</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Awareness</h3>
              <p className="text-green-100 text-sm italic">
                "Your pictures tell a story you might not want to share. Metadata reveals where you live, work, and play."
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-green-300 text-xs">
            <p>© 2026 Built for Data Privacy Awareness.</p>
            <p className="mt-4 md:mt-0">Inspired by Jimpl</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
