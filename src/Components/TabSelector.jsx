import React, { useState } from 'react';
import './TabSelector.css';

const TabSelector = () => {
  const [selectedTab, setSelectedTab] = useState('histoire');

  const tabs = [
    { id: 'histoire', label: 'Notre histoire' },
    { id: 'produits', label: 'Nos produits' },
    { id: 'ambiance', label: "L'ambiance" },
    { id: 'connectivite', label: 'Connectivité' },
  ];

  const content = {
    histoire: {
      title: 'Notre histoire',
      text: 'Chez Le Bon Café, nous avons une vision simple mais essentielle : créer un lieu où chaque personne se sent comme chez elle. Un endroit chaleureux où l\'on peut prendre le temps de savourer un bon café, échanger avec des amis ou simplement se ressourcer dans une ambiance conviviale et authentique.',
      text2: 'Nous croyons qu\'un café n\'est pas seulement un lieu de passage, mais un véritable espace de vie où les rencontres se font naturellement et où chacun peut trouver sa place. Venez découvrir notre univers et faites de Le Bon Café votre deuxième chez-vous.',
    },
    produits: {
      title: 'Nos produits',
      text: 'Nous sélectionnons avec soin les meilleurs grains de café pour vous offrir une expérience gustative exceptionnelle. Chaque tasse est préparée avec passion et expertise, en respectant les traditions tout en innovant pour vous surprendre.',
      text2: 'Découvrez notre gamme de cafés d\'origine unique, nos spécialités maison et nos pâtisseries artisanales préparées quotidiennement. Chaque produit est choisi pour sa qualité et son authenticité.',
      categories: [
        { name: 'Cafés', image: '/cafe.avif' },
        { name: 'Viennoiseries', image: '/vienoiseries.avif' },
        { name: 'Sucreries', image: '/sucreries.avif' },
        { name: 'Desserts', image: '/gateaux.avif' },
      ],
    },
    ambiance: {
      title: "L'ambiance",
      text: 'Plongez dans une atmosphère chaleureuse et accueillante où le temps semble ralentir. Notre espace est pensé pour vous offrir confort et sérénité, que vous veniez travailler, lire ou simplement vous détendre.',
      text2: 'Un décor soigné, une musique douce en arrière-plan et un service attentionné créent l\'environnement parfait pour vos moments de pause. Chez Le Bon Café, chaque détail compte pour faire de votre visite un moment privilégié.',
    },
    connectivite: {
      title: 'Connectivité',
      text: 'Restez connecté dans un environnement propice au travail et à la créativité. Nous offrons un Wi-Fi haut débit gratuit, des prises électriques à chaque table et des espaces adaptés pour vos réunions ou votre télétravail.',
      text2: 'Que vous soyez entrepreneur, étudiant ou simplement en quête d\'un espace inspirant, Le Bon Café vous accueille avec tous les équipements nécessaires pour rester productif tout en profitant d\'un excellent café.',
    },
  };

  return (
    <div className="tab-selector-container">
      <div className="glass-radio-group">
        {tabs.map((tab, index) => (
          <React.Fragment key={tab.id}>
            <input
              type="radio"
              name="section"
              id={`glass-${tab.id}`}
              checked={selectedTab === tab.id}
              onChange={() => setSelectedTab(tab.id)}
            />
            <label htmlFor={`glass-${tab.id}`}>{tab.label}</label>
          </React.Fragment>
        ))}
        <div 
          className="glass-glider" 
          style={{ 
            transform: `translateX(${tabs.findIndex(t => t.id === selectedTab) * 100}%)`,
            width: `calc(100% / ${tabs.length})`
          }} 
        />
      </div>

      <div className="tab-content mt-12">
        <h2 className="text-4xl font-bold text-center mb-8" style={{ color: '#432818' }}>
          {content[selectedTab].title}
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-center leading-relaxed" style={{ color: '#432818' }}>
            {content[selectedTab].text}
          </p>
          <p className="text-lg text-center leading-relaxed mt-6" style={{ color: '#432818' }}>
            {content[selectedTab].text2}
          </p>
        </div>
        
        {/* Grille de produits pour l'onglet produits */}
        {selectedTab === 'produits' && content[selectedTab].categories && (
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content[selectedTab].categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center group cursor-pointer">
                  <div className="w-full aspect-square mb-3 bg-stone-200 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full hidden items-center justify-center bg-stone-300">
                      <svg className="w-12 h-12 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-center" style={{ color: '#432818' }}>
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSelector;

