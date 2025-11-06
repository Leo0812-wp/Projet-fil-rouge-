import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cafes = [
    { id: 1, name: 'Espresso', image: '/cafe-espresso.avif' },
    { id: 2, name: 'Cappuccino', image: '/cafe-cappucino.avif' },
    { id: 3, name: 'Latte', image: '/cafe-espresso.avif' }, // Utilise espresso en attendant
    { id: 4, name: 'Americano', image: '/cafe-americano.avif' },
    { id: 5, name: 'Macchiato', image: '/cafe-macciato.avif' },
    { id: 6, name: 'Mocha', image: '/cafe-mocha.avif' },
  ];

  return (
    <header className="bg-stone-50 border-b border-stone-200 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <img src="/image.png" alt="Le Bon Café" className="w-16 h-16 object-contain" />
          </div>

          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Menu navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-stone-800 hover:text-stone-600 transition-colors">
              Accueil
            </Link>
            <Link to="/histoire" className="text-stone-800 hover:text-stone-600 transition-colors">
              Histoire
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button className="text-stone-800 hover:text-stone-600 transition-colors flex items-center">
                Nos cafés
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div 
                  className="fixed left-0 right-0 top-20 bg-stone-50 shadow-xl border-t border-stone-300 p-6 z-50"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onMouseLeave={() => setIsMegaMenuOpen(false)}
                  style={{ marginTop: 0 }}
                >
                  {/* Zone de connexion invisible en haut du menu pour éviter la fermeture */}
                  <div 
                    className="absolute left-0 right-0 -top-8 h-8 bg-transparent"
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                  />
                  <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-semibold text-stone-800 mb-4 text-center">Nos cafés les plus connus</h3>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                    {cafes.map((cafe) => (
                      <Link
                        key={cafe.id}
                        to="/produits"
                        className="group flex flex-col items-center hover:scale-105 transition-transform"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="w-20 h-20 mb-2 bg-stone-200 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={cafe.image} 
                            alt={cafe.name}
                            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full hidden items-center justify-center bg-stone-300">
                            <svg className="w-8 h-8 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        <div className="font-medium text-stone-800 group-hover:text-stone-600 text-center text-sm">
                          {cafe.name}
                        </div>
                      </Link>
                    ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link to="/contact" className="text-stone-800 hover:text-stone-600 transition-colors">
              Contact
            </Link>
            <Link to="/reservation" className="text-stone-800 hover:text-stone-600 transition-colors">
              Réservation
            </Link>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Logo à gauche */}
          <div className="flex items-center">
            <img src="/image.png" alt="Le Bon Café" className="w-12 h-12 object-contain" />
            <span className="ml-2 text-lg font-bold text-stone-800">Le Bon Café</span>
          </div>

          {/* Menu burger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-stone-800 hover:bg-stone-100 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-stone-300 mt-2">
            <nav className="flex flex-col space-y-4 pt-4">
              <a href="#" className="text-stone-800 hover:text-stone-600 px-4 py-2">Accueil</a>
              <a href="#" className="text-stone-800 hover:text-stone-600 px-4 py-2">Histoire</a>
              <div>
                <button
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="w-full text-left text-stone-800 hover:text-stone-600 px-4 py-2 flex items-center justify-between"
                >
                  Nos cafés
                  <svg className={`w-4 h-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMegaMenuOpen && (
                  <div className="pl-6 pr-4 py-2 space-y-3">
                    {cafes.map((cafe) => (
                      <Link
                        key={cafe.id}
                        to="/produits"
                        className="flex items-center space-x-3 text-stone-700 hover:text-stone-600 py-2"
                        onClick={() => {
                          setIsMegaMenuOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="w-12 h-12 bg-stone-200 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={cafe.image} 
                            alt={cafe.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <span>{cafe.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone-300 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
                <svg
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <Link to="/contact" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/reservation" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Réservation</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

