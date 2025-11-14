import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { searchProducts } from '../data/products';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      
      // Si on est tout en haut de la page, header toujours visible
      if (currentScrollY < 50) {
        setIsScrollingUp(true);
      }
      // Si on remonte (scroll vers le haut) - avec seuil pour éviter les micro-mouvements
      else if (currentScrollY < lastScrollY - 5) {
        setIsScrollingUp(true);
      } 
      // Si on descend (scroll vers le bas) - avec seuil pour éviter les micro-mouvements
      else if (currentScrollY > lastScrollY + 5) {
        setIsScrollingUp(false);
      }
      
      lastScrollY = currentScrollY;
      setLastScrollY(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchProducts(query);
      setSearchResults(results.slice(0, 5)); // Limiter à 5 résultats
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleProductClick = (productId) => {
    setSearchQuery('');
    setShowSearchResults(false);
    navigate(`/produit/${productId}`);
  };

  const cafes = [
    { id: 1, name: 'Espresso', image: '/cafe-espresso.avif' },
    { id: 2, name: 'Cappuccino', image: '/cafe-cappucino.avif' },
    { id: 3, name: 'Latte', image: '/cafe-espresso.avif' }, // Utilise espresso en attendant
    { id: 4, name: 'Americano', image: '/cafe-americano.avif' },
    { id: 5, name: 'Macchiato', image: '/cafe-macciato.avif' },
    { id: 6, name: 'Mocha', image: '/cafe-mocha.avif' },
  ];

  return (
    <header 
      className="bg-stone-50 border-b border-stone-200 z-50 fixed top-0 left-0 w-full"
      style={{
        transform: isScrollingUp ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-20">
          {/* Logo à gauche */}
          <Link to="/" className="flex items-center">
            <img src="/image.png" alt="Le Bon Café" className="w-16 h-16 object-contain" />
          </Link>

          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
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
            
            {/* Résultats de recherche */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-stone-300 z-50 max-h-96 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="p-4 hover:bg-stone-50 cursor-pointer border-b border-stone-200 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src = '/cafe-espresso.avif';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-800">{product.name}</h4>
                        <p className="text-sm text-stone-600">{product.price.toFixed(2)} €</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
              <Link 
                to="/produits?category=café" 
                className="text-stone-800 hover:text-stone-600 transition-colors flex items-center"
                onClick={() => setIsMegaMenuOpen(false)}
              >
                Nos cafés
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
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
                        to="/produits?category=café"
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
            <Link to="/panier" className="relative text-stone-800 hover:text-stone-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16">
          {/* Logo à gauche */}
          <Link to="/" className="flex items-center">
            <img src="/image.png" alt="Le Bon Café" className="w-12 h-12 object-contain" />
            <span className="ml-2 text-lg font-bold text-stone-800">Le Bon Café</span>
          </Link>

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
              <Link to="/" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
              <Link to="/histoire" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Histoire</Link>
              <div>
                <Link
                  to="/produits?category=café"
                  className="w-full text-left text-stone-800 hover:text-stone-600 px-4 py-2 flex items-center justify-between"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nos cafés
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                {isMegaMenuOpen && (
                  <div className="pl-6 pr-4 py-2 space-y-3">
                    {cafes.map((cafe) => (
                      <Link
                        key={cafe.id}
                        to="/produits?category=café"
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
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={handleSearchChange}
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
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-lg shadow-xl border border-stone-300 z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          handleProductClick(product.id);
                          setIsMenuOpen(false);
                        }}
                        className="p-3 hover:bg-stone-50 cursor-pointer border-b border-stone-200 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.src = '/cafe-espresso.avif';
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-stone-800">{product.name}</h4>
                            <p className="text-xs text-stone-600">{product.price.toFixed(2)} €</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/contact" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/reservation" className="text-stone-800 hover:text-stone-600 px-4 py-2" onClick={() => setIsMenuOpen(false)}>Réservation</Link>
              <Link to="/panier" className="relative text-stone-800 hover:text-stone-600 px-4 py-2 flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Panier
                {getTotalItems() > 0 && (
                  <span className="ml-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

