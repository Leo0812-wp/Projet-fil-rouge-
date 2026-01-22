import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';

const Homescreen = () => {
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  
  // Chemin de la vidéo
  const videoPath = "/public/videofront.mp4";

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
      description: 'Torréfiés ici, servis avec passion',
      count: products.filter(p => p.category === 'café').length
    },
    { 
      id: 'viennoiseries', 
      name: 'Viennoiseries', 
      image: '/vienoiseries.avif',
      description: 'Sorties du four chaque matin',
      count: products.filter(p => p.category === 'viennoiseries').length
    },
    { 
      id: 'sucreries', 
      name: 'Sucreries', 
      image: '/sucreries.avif',
      description: 'Pour les petits plaisirs',
      count: products.filter(p => p.category === 'sucreries').length
    },
    { 
      id: 'desserts', 
      name: 'Desserts', 
      image: '/gateaux.avif',
      description: 'Nos recettes de famille',
      count: products.filter(p => p.category === 'desserts').length
    },
  ];

  return (
    <div className="min-h-screen bg-[#432818] text-white">
      {/* Section Hero avec vidéo de fond */}
      <section className="relative h-screen md:h-[90vh] overflow-hidden">
        {/* Vidéo de fond ou image de fallback */}
        <div className="absolute inset-0 bg-[#432818]">
          {/* Image de fallback affichée pendant le chargement */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
            style={{
              backgroundImage: 'url(/leboncafe_16_9.png)',
              transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          />
          {/* Vidéo */}
          {!videoError && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                transform: `translate3d(0, ${scrollY * 0.35}px, 0)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
              onError={(e) => {
                console.error('Erreur de chargement de la vidéo:', e);
                setVideoError(true);
              }}
              onLoadedData={() => {
                setVideoLoaded(true);
              }}
              onCanPlay={() => {
                setVideoLoaded(true);
              }}
            >
              <source src={videoPath} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Overlay pour la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55"></div>

        {/* Contenu centré */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Le Bon Café
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-white drop-shadow-md max-w-3xl mx-auto leading-relaxed">
              Depuis 2015, nous torréfions chaque grain avec passion pour vous offrir des moments de douceur au quotidien
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                to="/produits"
                className="px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold text-base md:text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#6F1D1B' }}
              >
                Voir notre carte
              </Link>
              <Link
                to="/reservation"
                className="px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg border-2 border-white text-white hover:bg-white hover:text-[#432818] transition-all transform hover:scale-105"
              >
                Passer nous voir
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#432818] to-[#2d190d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Bienvenue chez nous
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed text-white/90" style={{}}>
              C'est ici, au cœur de Nantes, que nous avons créé un petit coin de paradis pour les amoureux du café. 
              Chaque matin, l'odeur de nos grains torréfiés fraîchement moulus accueille nos clients comme des amis. 
              Que vous veniez pour un expresso serré avant le travail ou pour savourer un cappuccino en terrasse, 
              vous trouverez toujours une place au Bon Café.
            </p>
          </div>

          {/* Cards d'informations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            <div className="bg-[#5A3A2E] rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nos grains, notre histoire</h3>
              <p className="text-white/80 leading-relaxed">Nous travaillons directement avec de petits producteurs du Brésil et d'Éthiopie. Chaque lot est goûté et sélectionné à la main par notre torréfacteur.</p>
            </div>

            <div className="bg-[#5A3A2E] rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Du fournil à votre table</h3>
              <p className="text-white/80 leading-relaxed">Chaque matin à 5h, notre boulanger-pâtissier prépare croissants, pains au chocolat et autres douceurs. Rien de mieux que l'odeur du beurre qui chauffe pour commencer la journée.</p>
            </div>

            <div className="bg-[#5A3A2E] rounded-xl shadow-lg p-6 md:p-8 text-center hover:shadow-xl transition-shadow transform hover:-translate-y-1 border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Un lieu de vie</h3>
              <p className="text-white/80 leading-relaxed">Ici, on vient pour le café mais on reste pour l'ambiance. Nos clients réguliers ont leurs habitudes, leurs tables préférées. C'est un peu comme une deuxième maison.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#2d190d] to-[#432818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ce que nous vous proposons
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              De l'expresso du matin aux douceurs de l'après-midi, voici ce qui fait notre quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/produits?category=${category.id}`}
                className="group relative bg-[#5A3A2E] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
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
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{category.name}</h3>
                  <p className="text-white/90 text-sm md:text-base mb-2 leading-relaxed">{category.description}</p>
                  <p className="text-white/80 text-xs md:text-sm">{category.count} produits</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/5">
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#432818] to-[#2d190d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nos coups de cœur
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ceux que nos clients réclament le plus, ceux qui font notre réputation
            </p>
          </div>

          {/* Produits vedettes - Cafés */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#FFFFFF', fontFamily: "'Cormorant Garamond', serif" }}>
                Nos cafés
              </h3>
              <Link
                to="/produits?category=café"
                className="text-base md:text-lg font-semibold hover:underline transition-all flex items-center gap-1"
                style={{ color: '#FFFFFF' }}
              >
                Tout voir
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.café.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produit/${product.id}`)}
                  className="bg-[#5A3A2E] rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
                >
                  <div className="aspect-square overflow-hidden bg-[#5A3A2E]">
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
                    <h4 className="text-xl md:text-2xl font-bold mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {product.name}
                    </h4>
                    <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold text-white">
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
                        Découvrir
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
              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: '#FFFFFF', fontFamily: "'Cormorant Garamond', serif" }}>
                Nos viennoiseries
              </h3>
              <Link
                to="/produits?category=viennoiseries"
                className="text-base md:text-lg font-semibold hover:underline transition-all flex items-center gap-1"
                style={{ color: '#FFFFFF' }}
              >
                Tout voir
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.viennoiseries.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produit/${product.id}`)}
                  className="bg-[#5A3A2E] rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10"
                >
                  <div className="aspect-square overflow-hidden bg-[#5A3A2E]">
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
                        style={{ backgroundColor: '#c5a87aff' }}>
                        {product.category}
                      </span>
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold mb-2 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {product.name}
                    </h4>
                    <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl md:text-3xl font-bold text-white">
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
                        Découvrir
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#2d190d] to-[#432818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              On vous attend
            </h2>
            <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: '#BB9457' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Horaires */}
            <div className="bg-[#5A3A2E] rounded-xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Nos horaires</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/80 leading-relaxed"><strong>Lundi - Vendredi:</strong> 7h - 19h</p>
                <p className="text-white/80 leading-relaxed"><strong>Samedi:</strong> 8h - 20h</p>
                <p className="text-white/80 leading-relaxed"><strong>Dimanche:</strong> 9h - 18h</p>
                <p className="text-sm text-white/80 mt-3 italic">Le dimanche, c'est brunch jusqu'à 14h !</p>
              </div>
            </div>

            {/* Localisation */}
            <div className="bg-[#5A3A2E] rounded-xl p-6 md:p-8 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Où nous trouver</h3>
              </div>
              <p className="text-white/80 mb-2 leading-relaxed">2 rue des Prés</p>
              <p className="text-white/80 leading-relaxed">44000 Nantes</p>
              <p className="text-sm text-white/80 mt-3 italic">À deux pas de la place Royale, facilement accessible en tram ou en bus</p>
            </div>

            {/* Services */}
            <div className="bg-[#5A3A2E] rounded-xl p-6 md:p-8 md:col-span-2 lg:col-span-1 border border-white/10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4" style={{ backgroundColor: '#BB9457' }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Pour votre confort</h3>
              </div>
              <div className="space-y-2">
                <p className="text-white/80 leading-relaxed">✓ Wi-Fi gratuit pour tous</p>
                <p className="text-white/80 leading-relaxed">✓ Prises partout pour vos ordinateurs</p>
                <p className="text-white/80 leading-relaxed">✓ Espace calme pour travailler</p>
                <p className="text-white/80 leading-relaxed">✓ À emporter ou sur place</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-[#432818] to-[#2d190d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            On vous attend avec impatience
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            Que vous préfériez passer nous voir ou commander depuis chez vous, nous sommes là pour vous faire plaisir
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/produits"
              className="px-8 py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Commander en ligne
            </Link>
            <Link
              to="/reservation"
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all transform hover:scale-105 w-full sm:w-auto"
              style={{ 
                borderColor: '#BB9457',
                color: '#BB9457',
                backgroundColor: 'transparent'
              }}
            >
              Réserver votre table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homescreen;
