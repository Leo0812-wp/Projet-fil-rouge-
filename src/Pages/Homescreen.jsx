import React, { useEffect, useState } from 'react';

const Homescreen = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Section Hero avec effet parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Image avec effet parallax */}
        <div 
          className="absolute inset-0 bg-stone-300"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: 'url(/placeholder-cafe.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Placeholder si l'image n'existe pas */}
          <div className="absolute inset-0 flex items-center justify-center bg-stone-400 bg-opacity-50">
            <div className="text-center text-stone-600">
              <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">Image du café</p>
            </div>
          </div>
        </div>

        {/* Overlay sombre pour la lisibilité */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Contenu centré */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#FFE6A7' }}>
              Le Bon Café
            </h1>
            <p className="text-xl md:text-2xl mb-8" style={{ color: '#FFE6A7' }}>
              Découvrez l'art du café dans une ambiance chaleureuse et authentique
            </p>
            <div className="flex items-center justify-center space-x-2" style={{ color: '#FFE6A7' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-lg md:text-xl">123 Rue du Café, 75001 Paris</p>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6" style={{ color: '#FFE6A7' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section de contenu exemple */}
      <section className="py-20" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#432818' }}>
            Bienvenue au Bon Café
          </h2>
          <p className="text-lg text-center max-w-3xl mx-auto" style={{ color: '#432818' }}>
            Un lieu où chaque tasse raconte une histoire, où chaque grain est sélectionné avec soin 
            pour vous offrir une expérience unique. Venez découvrir notre passion pour le café.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homescreen;
