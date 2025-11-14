import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { products, searchProducts } from '../data/products';

const ProductScreen = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Lire le paramètre category de l'URL au chargement
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = [
    { id: 'tous', name: 'Tous', label: 'Tous les produits' },
    { id: 'café', name: 'Café', label: 'Cafés' },
    { id: 'viennoiseries', name: 'Viennoiseries', label: 'Viennoiseries' },
    { id: 'sucreries', name: 'Sucreries', label: 'Sucreries' },
    { id: 'desserts', name: 'Desserts', label: 'Desserts' },
  ];

  // Filtrer les produits selon la catégorie et la recherche
  const getFilteredProducts = () => {
    let filtered = products;

    // Filtrer par catégorie
    if (selectedCategory !== 'tous') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      const searchResults = searchProducts(searchQuery);
      filtered = filtered.filter(product => 
        searchResults.some(result => result.id === product.id)
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const handleProductClick = (productId) => {
    navigate(`/produit/${productId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFE6A7]/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ color: '#432818' }}>
          Nos Produits
        </h1>

        {/* Barre de recherche */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-stone-300 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'text-white'
                  : 'text-stone-800 bg-white border-2 border-stone-300 hover:border-stone-400'
              }`}
              style={
                selectedCategory === category.id
                  ? { backgroundColor: '#6F1D1B' }
                  : {}
              }
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Résultats de recherche */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-lg" style={{ color: '#432818' }}>
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Grille de produits */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-105"
              >
                <div className="aspect-square bg-stone-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/cafe-espresso.avif';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold text-white capitalize"
                      style={{ backgroundColor: '#BB9457' }}>
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#432818' }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-3 text-stone-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: '#6F1D1B' }}>
                      {product.price.toFixed(2)} €
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product.id);
                      }}
                      className="px-4 py-2 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: '#6F1D1B' }}
                    >
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl mb-6" style={{ color: '#432818' }}>
              Aucun produit trouvé
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('tous');
              }}
              className="px-6 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;

