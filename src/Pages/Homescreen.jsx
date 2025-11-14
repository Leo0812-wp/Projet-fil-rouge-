import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Homescreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Produits vedettes par catégorie
  const featuredProducts = {
    café: products.filter(p => p.category === 'café').slice(0, 3),
    viennoiseries: products.filter(p => p.category === 'viennoiseries').slice(0, 3),
    desserts: products.filter(p => p.category === 'desserts').slice(0, 2),
  };

  const categories = [
    { 
      id: 'café', 
      name: 'Cafés', 
      image: '/cafe.avif',
      description: 'Nos cafés d\'exception',
      count: products.filter(p => p.category === 'café').length
    },
    { 
      id: 'viennoiseries', 
      name: 'Viennoiseries', 
      image: '/vienoiseries.avif',
      description: 'Fait maison chaque jour',
      count: products.filter(p => p.category === 'viennoiseries').length
    },
    { 
      id: 'sucreries', 
      name: 'Sucreries', 
      image: '/sucreries.avif',
      description: 'Délices sucrés',
      count: products.filter(p => p.category === 'sucreries').length
    },
    { 
      id: 'desserts', 
      name: 'Desserts', 
      image: '/gateaux.avif',
      description: 'Gourmandises artisanales',
      count: products.filter(p => p.category === 'desserts').length
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Section Hero avec effet parallax */}
      <section className="relative h-screen md:h-[90vh] overflow-hidden">
        {/* Image avec effet parallax */}
        <div 
          className="absolute inset-0 bg-stone-300"
          style={{
            transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            backgroundImage: 'url(/leboncafe_16_9.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-stone-400 bg-opacity-30">
            <div className="text-center text-stone-600 opacity-0">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">Image du café</p>
            </div>
          </div>
        </div>

        {/* Overlay pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>

        {/* Contenu centré */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
              Le Bon Café
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white drop-shadow-md max-w-3xl mx-auto">
              Découvrez l'art du café dans une ambiance chaleureuse et authentique
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/produits"
                className="px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#6F1D1B' }}
              >
                Découvrir nos produits
              </Link>
              <Link
                to="/reservation"
                className="px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg border-2 border-white text-white hover:bg-white hover:text-[#432818] transition-all transform hover:scale-105"
              >
                Réserver une table
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white drop-shadow-md">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-base md:text-lg lg:text-xl">2 rue des Prés, 44000 Nantes</p>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section Bienvenue */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FFE6A7]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#432818' }}>
              Bienvenue au Bon Café
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed" style={{ color: '#432818' }}>
              Un lieu où chaque tasse raconte une histoire, où chaque grain est sélectionné avec soin 
              pour vous offrir une expérience unique. Venez découvrir notre passion pour le café dans 
              une ambiance chaleureuse et conviviale.
            </p>
          </div>

          {/* Cards d'informations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#432818' }}>Qualité Premium</h3>
              <p className="text-stone-600">Grains sélectionnés avec soin pour une expérience gustative exceptionnelle</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#432818' }}>Fait Maison</h3>
              <p className="text-stone-600">Nos pâtisseries et viennoiseries sont préparées quotidiennement sur place</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#432818' }}>Ambiance Chaleureuse</h3>
              <p className="text-stone-600">Un espace convivial où vous vous sentez comme chez vous</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#432818' }}>
              Nos Catégories
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits artisanaux
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/produits?category=${category.id}`}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/cafe-espresso.avif';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-white/90 text-sm md:text-base mb-2">{category.description}</p>
                  <p className="text-white/80 text-xs md:text-sm">{category.count} produits</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Produits vedettes */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FFE6A7]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#432818' }}>
              Nos Produits Vedettes
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto">
              Une sélection de nos meilleurs produits
            </p>
          </div>

          {/* Produits vedettes - Cafés */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#432818' }}>
                Cafés
              </h3>
              <Link
                to="/produits?category=café"
                className="text-base md:text-lg font-semibold hover:underline"
                style={{ color: '#6F1D1B' }}
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.café.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produit/${product.id}`)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden bg-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/cafe-espresso.avif';
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{ backgroundColor: '#BB9457' }}>
                        {product.category}
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#432818' }}>
                      {product.name}
                    </h4>
                    <p className="text-stone-600 text-sm md:text-base mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold" style={{ color: '#6F1D1B' }}>
                        {product.price.toFixed(2)} €
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/produit/${product.id}`);
                        }}
                        className="px-4 py-2 rounded-lg text-white font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#6F1D1B' }}
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Produits vedettes - Viennoiseries */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#432818' }}>
                Viennoiseries
              </h3>
              <Link
                to="/produits?category=viennoiseries"
                className="text-base md:text-lg font-semibold hover:underline"
                style={{ color: '#6F1D1B' }}
              >
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.viennoiseries.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produit/${product.id}`)}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="aspect-square overflow-hidden bg-stone-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/cafe-espresso.avif';
                      }}
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold text-white"
                        style={{ backgroundColor: '#BB9457' }}>
                        {product.category}
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold mb-2" style={{ color: '#432818' }}>
                      {product.name}
                    </h4>
                    <p className="text-stone-600 text-sm md:text-base mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold" style={{ color: '#6F1D1B' }}>
                        {product.price.toFixed(2)} €
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/produit/${product.id}`);
                        }}
                        className="px-4 py-2 rounded-lg text-white font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#6F1D1B' }}
                      >
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Informations pratiques */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#432818' }}>
              Informations Pratiques
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Horaires */}
            <div className="bg-[#FFE6A7]/10 rounded-xl p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#432818' }}>Horaires</h3>
              </div>
              <div className="space-y-2">
                <p className="text-stone-700"><strong>Lun - Ven:</strong> 7h - 19h</p>
                <p className="text-stone-700"><strong>Samedi:</strong> 8h - 20h</p>
                <p className="text-stone-700"><strong>Dimanche:</strong> 9h - 18h</p>
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-[#FFE6A7]/10 rounded-xl p-6 md:p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#432818' }}>Localisation</h3>
              </div>
              <p className="text-stone-700 mb-2">2 rue des Prés</p>
              <p className="text-stone-700">44000 Nantes</p>
              <p className="text-sm text-stone-600 mt-2">Accessible en transport en commun</p>
            </div>

            {/* Services */}
            <div className="bg-[#FFE6A7]/10 rounded-xl p-6 md:p-8 md:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold" style={{ color: '#432818' }}>Services</h3>
              </div>
              <div className="space-y-2">
                <p className="text-stone-700">✓ Wi-Fi gratuit</p>
                <p className="text-stone-700">✓ Prises électriques</p>
                <p className="text-stone-700">✓ Espace télétravail</p>
                <p className="text-stone-700">✓ Commande à emporter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FFE6A7]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#432818' }}>
            Prêt à découvrir Le Bon Café ?
          </h2>
          <p className="text-lg md:text-xl text-stone-600 mb-8 md:mb-10 max-w-2xl mx-auto">
            Venez nous rendre visite ou commandez en ligne pour une expérience café exceptionnelle
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/produits"
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Commander maintenant
            </Link>
            <Link
              to="/reservation"
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all transform hover:scale-105 w-full sm:w-auto"
              style={{ 
                borderColor: '#6F1D1B',
                color: '#6F1D1B',
                backgroundColor: 'transparent'
              }}
            >
              Réserver une table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homescreen;
