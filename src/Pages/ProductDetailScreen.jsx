import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../Context/CartContext';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>Produit non trouvé</h1>
          <button
            onClick={() => navigate('/produits')}
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#6F1D1B' }}
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/panier');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-stone-600 hover:text-stone-800 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/cafe-espresso.avif';
              }}
            />
          </div>

          {/* Détails */}
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white capitalize"
                style={{ backgroundColor: '#BB9457' }}>
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#432818' }}>
              {product.name}
            </h1>
            <p className="text-lg mb-6" style={{ color: '#432818' }}>
              {product.description}
            </p>
            <div className="mb-8">
              <span className="text-3xl font-bold" style={{ color: '#6F1D1B' }}>
                {product.price.toFixed(2)} €
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity mb-4"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Ajouter au panier
            </button>
            <button
              onClick={() => navigate('/panier')}
              className="w-full py-4 rounded-lg font-semibold text-lg border-2 transition-colors"
              style={{ 
                borderColor: '#6F1D1B',
                color: '#6F1D1B',
                backgroundColor: 'transparent'
              }}
            >
              Commander sur place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;

