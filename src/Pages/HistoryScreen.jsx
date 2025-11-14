import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const HistoryScreen = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const activeSectionRef = useRef(0); // Ref pour avoir la valeur actuelle à jour

  const sections = [
    { id: 'hero', title: 'Accueil' },
    { id: 'histoire', title: 'Notre Histoire' },
    { id: 'engagement', title: 'Notre Engagement' },
    { id: 'valeurs', title: 'Nos Valeurs' },
    { id: 'cta', title: 'Contact' }
  ];

  // Données de contenu
  const contentData = {
    hero: {
      title: 'À Propos du',
      titleHighlight: 'Le Bon Café',
      subtitle: 'Une passion pour le café authentique et l\'art de la viennoiserie, bientôt à Nantes'
    },
    histoire: {
      title: 'Notre Histoire',
      intro: 'Le Bon Café est né d\'une passion simple : partager les meilleurs cafés et viennoiseries artisanales avec nos clients.',
      paragraph1: 'Le Bon Café ouvrira ses portes en février 2026 au cœur de Nantes. Notre projet commence avec une vision : créer un lieu chaleureux où chaque client se sentira comme chez lui, autour d\'un excellent café et de produits faits maison.',
      paragraph2: 'Chaque jour, nos baristas sélectionneront avec soin les meilleurs grains de café, torréfiés selon des méthodes traditionnelles. Nos viennoiseries seront préparées chaque matin dans notre laboratoire, avec des ingrédients de qualité supérieure et sans conservateurs.',
      paragraph3: 'Nous avons hâte de vous accueillir et de partager avec vous notre passion pour le café authentique et l\'art de la viennoiserie. Notre engagement : vous offrir une expérience unique à chaque visite dès notre ouverture.'
    },
    engagement: {
      title: 'Notre Engagement',
      subtitle: 'Qualité, authenticité et passion au quotidien',
      intro: 'Chez Le Bon Café, chaque détail compte. De la sélection des grains à la préparation de nos pâtisseries, nous mettrons tout en œuvre pour vous offrir le meilleur.',
      feature1_title: 'Cafés d\'Exception',
      feature1_desc: 'Sélection rigoureuse de grains premium, torréfiés selon des méthodes artisanales',
      feature2_title: 'Fait Maison',
      feature2_desc: 'Toutes nos viennoiseries et desserts seront préparés quotidiennement dans notre laboratoire',
      feature3_title: 'Ingrédients Premium',
      feature3_desc: 'Nous privilégierons les produits locaux et de qualité supérieure, sans conservateurs',
      feature4_title: 'Ambiance Chaleureuse',
      feature4_desc: 'Un lieu convivial où il fera bon se retrouver, travailler ou simplement se détendre',
      stat1_value: 'Fév. 2026',
      stat1_label: 'Date d\'ouverture',
      stat2_value: '100%',
      stat2_label: 'Fait maison',
      stat3_value: '0',
      stat3_label: 'Clients (à venir)',
      stat4_value: '20+',
      stat4_label: 'Variétés de cafés'
    },
    valeurs: {
      title: 'Nos Valeurs',
      subtitle: 'Les principes qui guident notre passion au quotidien',
      value1_title: 'Authenticité',
      value1_desc: 'Nous restons fidèles aux méthodes traditionnelles et aux recettes authentiques qui font notre réputation.',
      value2_title: 'Qualité',
      value2_desc: 'Chaque produit est sélectionné et préparé avec le plus grand soin pour garantir une expérience exceptionnelle.',
      value3_title: 'Convivialité',
      value3_desc: 'Le Bon Café est avant tout un lieu de rencontre, d\'échange et de partage autour d\'un bon café.'
    },
    cta: {
      title: 'Venez Nous Découvrir',
      subtitle: 'Nous ouvrirons nos portes en février 2026. Rejoignez-nous pour déguster nos cafés et viennoiseries faites maison !',
      button1_text: 'Découvrir nos produits',
      button2_text: 'Nous contacter'
    }
  };

  // Synchroniser la ref avec l'état
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    // Bloquer complètement le scroll
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.documentElement.style.scrollBehavior = 'smooth';

    // Bloquer tous les événements de scroll
    const blockScroll = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Bloquer wheel, touch, scroll
    window.addEventListener('wheel', blockScroll, { passive: false });
    window.addEventListener('touchmove', blockScroll, { passive: false });
    window.addEventListener('scroll', blockScroll, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('scroll', blockScroll);
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  // Fonction pour passer à la section suivante
  const goToNextSection = () => {
    const currentSection = activeSectionRef.current;
    if (currentSection < sectionsRef.current.length - 1) {
      const nextSection = currentSection + 1;
      activeSectionRef.current = nextSection;
      setActiveSection(nextSection);
      setVisibleSections(prev => new Set([...prev, nextSection]));
      
      if (sectionsRef.current[nextSection]) {
        sectionsRef.current[nextSection].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Fonction pour revenir à la section précédente
  const goToPreviousSection = () => {
    const currentSection = activeSectionRef.current;
    if (currentSection > 0) {
      const prevSection = currentSection - 1;
      activeSectionRef.current = prevSection;
      setActiveSection(prevSection);
      setVisibleSections(prev => new Set([...prev, prevSection]));
      
      if (sectionsRef.current[prevSection]) {
        sectionsRef.current[prevSection].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Observer pour détecter l'entrée dans le viewport
  useEffect(() => {
    setVisibleSections(new Set([0]));

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionIndex = sectionsRef.current.findIndex(ref => ref === entry.target);
          if (sectionIndex !== -1) {
            setVisibleSections(prev => new Set([...prev, sectionIndex]));
          }
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  const getSectionData = (sectionId) => contentData[sectionId] || {};

  // Déterminer si la section active a un fond clair ou foncé
  const isDarkBackground = (sectionIndex) => {
    // Sections avec fond foncé : engagement (2)
    return sectionIndex === 2;
  };

  // Icônes SVG simples
  const CoffeeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const HeartIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const AwardIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );

  const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const SparklesIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  const LightbulbIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );

  return (
    <>
      <Header />
      <div 
        ref={containerRef}
        className="relative"
        style={{ 
          fontFamily: "'Montserrat', sans-serif"
        }}
      >
      {/* Navigation Bullet Points */}
      <div className="fixed left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {sections.map((section, index) => {
          const currentSectionIsDark = isDarkBackground(activeSection);
          const isActive = activeSection === index;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(index)}
              className="group relative flex items-center"
              aria-label={`Aller à ${section.title}`}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 shadow-lg ${
                  isActive
                    ? currentSectionIsDark
                      ? 'bg-[#BB9457] scale-125 ring-2 ring-white'
                      : 'bg-[#BB9457] scale-125 ring-2 ring-[#432818]'
                    : currentSectionIsDark
                      ? 'bg-white opacity-60 hover:opacity-100 ring-1 ring-white/50'
                      : 'bg-[#432818] opacity-40 hover:opacity-70 ring-1 ring-[#432818]/30'
                }`}
              />
              <span
                className={`ml-4 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? currentSectionIsDark
                      ? 'text-white opacity-100 translate-x-0 drop-shadow-lg'
                      : 'text-[#432818] opacity-100 translate-x-0'
                    : currentSectionIsDark
                      ? 'text-white opacity-0 -translate-x-2 group-hover:opacity-80 group-hover:translate-x-0 drop-shadow-md'
                      : 'text-[#432818] opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0'
                }`}
              >
                {section.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section 1: Hero */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="min-h-screen flex items-center justify-center bg-[#FFE6A7]/10 snap-start pt-16 sm:pt-20 relative px-4"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {(() => {
            const data = getSectionData('hero');
            const isVisible = visibleSections.has(0);
            return (
              <>
                <div className={`mb-4 sm:mb-6 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight flex items-start justify-center flex-wrap gap-2 sm:gap-3 md:gap-4">
                    <span className="block sm:inline" style={{ color: '#432818' }}>{data.title}</span>
                    <span className="block sm:inline" style={{ color: '#BB9457' }}>Bon Café</span>
                  </h1>
                </div>
                <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-2 sm:px-0 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ color: '#432818' }}>
                  {data.subtitle}
                </p>
              </>
            );
          })()}
        </div>
        {/* Bouton pour passer à la section suivante */}
        {activeSection < sections.length - 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              onClick={goToNextSection}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#BB9457' }}
            >
              Suivant
            </button>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ color: '#BB9457' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </section>

      {/* Section 2: Histoire */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="min-h-screen flex items-center justify-center bg-white snap-start relative py-8 sm:py-12"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {(() => {
            const data = getSectionData('histoire');
            const isVisible = visibleSections.has(1);
            return (
              <>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                }`} style={{ color: '#432818' }}>
                  {data.title}
                </h2>
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">
                  <p className={`text-lg sm:text-xl font-semibold transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`} style={{ color: '#BB9457' }}>
                    {data.intro}
                  </p>
                  <p className={`transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ color: '#432818' }}>{data.paragraph1}</p>
                  <p className={`transition-all duration-1000 delay-400 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ color: '#432818' }}>{data.paragraph2}</p>
                  <p className={`transition-all duration-1000 delay-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ color: '#432818' }}>{data.paragraph3}</p>
                </div>
              </>
            );
          })()}
        </div>
        {/* Bouton pour passer à la section suivante */}
        {activeSection < sections.length - 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              onClick={goToNextSection}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#BB9457' }}
            >
              Suivant
            </button>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ color: '#BB9457' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </section>

      {/* Section 3: Engagement */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#432818] via-[#6F1D1B] to-[#432818] snap-start relative py-12 px-2 sm:px-6 gap-8 overflow-hidden"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:flex-row gap-8 items-center justify-center">
          {(() => {
            const data = getSectionData('engagement');
            const isVisible = visibleSections.has(2);
            const features = [
              { title: data.feature1_title, desc: data.feature1_desc, icon: CoffeeIcon },
              { title: data.feature2_title, desc: data.feature2_desc, icon: AwardIcon },
              { title: data.feature3_title, desc: data.feature3_desc, icon: HeartIcon },
              { title: data.feature4_title, desc: data.feature4_desc, icon: UsersIcon }
            ];

            const stats = [
              { value: data.stat1_value, label: data.stat1_label },
              { value: data.stat2_value, label: data.stat2_label },
              { value: data.stat3_value, label: data.stat3_label },
              { value: data.stat4_value, label: data.stat4_label }
            ];

            return (
              <>
                {/* Left: Text + KPIs */}
                <div className="flex-1 flex flex-col gap-8 min-w-[320px] max-w-xl w-full">
                  <div className="flex flex-col gap-3">
                    <div className={`inline-block mb-2 transition-all duration-1000 ${
                      isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
                    }`}>
                      <div className="w-16 h-16 rounded-full bg-[#BB9457] flex items-center justify-center shadow-2xl">
                        <LightbulbIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 transition-all duration-1000 delay-150 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                    }`}>
                      {data.title}
                    </h2>
                    <p className={`text-lg sm:text-xl font-semibold text-[#BB9457] mb-1 transition-all duration-1000 delay-300 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {data.subtitle}
                    </p>
                    <p className={`text-base sm:text-lg text-white/90 leading-relaxed transition-all duration-1000 delay-400 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      {data.intro}
                    </p>
                  </div>

                  {/* KPIs in a single horizontal bar */}
                  <div className={`flex flex-row justify-between items-center bg-white/10 backdrop-blur-lg rounded-2xl px-4 py-3 gap-2 shadow-lg border border-white/20 mt-2 transition-all duration-1000 delay-500 ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}>
                    {stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center flex-1 min-w-0">
                        <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#BB9457] leading-tight drop-shadow-lg">{stat.value}</span>
                        <span className="text-xs sm:text-sm text-white/90 font-medium mt-1 tracking-wide whitespace-nowrap">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Features */}
                <div className="flex-1 flex flex-col gap-6 min-w-[320px] max-w-xl w-full items-center">
                  <div className={`flex flex-col gap-3 w-full transition-all duration-1000 delay-600 ${
                    isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                  }`}>
                    {features.map((feature, idx) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="flex flex-row items-center gap-4 bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 border border-white/15 transition-all duration-500"
                        >
                          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#BB9457] flex items-center justify-center shadow-md">
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-base sm:text-lg leading-snug">{feature.title}</span>
                            <span className="text-white/80 text-xs sm:text-sm">{feature.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
        {/* Effet de particules animées en arrière-plan */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#BB9457]/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        {/* Bouton pour passer à la section suivante */}
        {activeSection < sections.length - 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <button
              onClick={goToNextSection}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#BB9457' }}
            >
              Suivant
            </button>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ color: '#BB9457' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </section>

      {/* Section 4: Valeurs */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="min-h-screen flex items-center justify-center bg-[#FFE6A7]/10 snap-start py-8 sm:py-12 relative"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {(() => {
            const data = getSectionData('valeurs');
            const isVisible = visibleSections.has(3);
            const values = [
              { title: data.value1_title, desc: data.value1_desc, icon: AwardIcon, color: '#432818' },
              { title: data.value2_title, desc: data.value2_desc, icon: SparklesIcon, color: '#BB9457' },
              { title: data.value3_title, desc: data.value3_desc, icon: HeartIcon, color: '#432818' }
            ];

            return (
              <>
                <div className="text-center mb-6 sm:mb-10">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                  }`} style={{ color: '#432818' }}>
                    {data.title}
                  </h2>
                  <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-2 sm:px-0 transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`} style={{ color: '#432818' }}>
                    {data.subtitle}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div
                        key={index}
                        className={`text-center transition-all duration-700 transform hover:scale-105 ${
                          isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90'
                        }`}
                        style={{ transitionDelay: `${300 + index * 200}ms` }}
                      >
                        <div className="inline-block mb-3 sm:mb-4">
                          <div 
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-700 hover:rotate-12 ${
                              isVisible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-180'
                            }`}
                            style={{ 
                              backgroundColor: `${value.color}15`,
                              transitionDelay: `${400 + index * 200}ms`
                            }}
                          >
                            <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: value.color }} />
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ color: '#432818' }}>
                          {value.title}
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed px-2 sm:px-0" style={{ color: '#432818' }}>
                          {value.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })()}
        </div>
        {/* Bouton pour passer à la section suivante */}
        {activeSection < sections.length - 1 && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <button
              onClick={goToNextSection}
              className="px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:opacity-90 shadow-lg"
              style={{ backgroundColor: '#BB9457' }}
            >
              Suivant
            </button>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" style={{ color: '#BB9457' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        )}
      </section>

      {/* Section 5: CTA */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="min-h-screen flex items-center justify-center bg-white snap-start relative py-8 sm:py-12"
        style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          {(() => {
            const data = getSectionData('cta');
            const isVisible = visibleSections.has(4);
            return (
              <div className={`rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 transition-all duration-1000 ${
                isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
              }`} style={{ backgroundColor: '#432818' }}>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}>
                  {data.title}
                </h2>
                <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2 sm:px-0 text-white transition-all duration-1000 delay-400 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  {data.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    to="/produits"
                    className={`px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg hover:opacity-90 transition-all duration-500 transform hover:scale-105 text-base sm:text-lg ${
                      isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 -translate-x-8 scale-95'
                    }`}
                    style={{ 
                      backgroundColor: '#BB9457',
                      color: 'white',
                      transitionDelay: '600ms'
                    }}
                  >
                    {data.button1_text}
                  </Link>
                  <Link
                    to="/contact"
                    className={`px-6 sm:px-8 py-3 sm:py-4 font-bold rounded-lg hover:bg-gray-100 transition-all duration-500 transform hover:scale-105 text-base sm:text-lg ${
                      isVisible ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-8 scale-95'
                    }`}
                    style={{ 
                      backgroundColor: 'white',
                      color: '#432818',
                      transitionDelay: '700ms'
                    }}
                  >
                    {data.button2_text}
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default HistoryScreen;
