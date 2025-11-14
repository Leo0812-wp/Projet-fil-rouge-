import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, products } from '../data/products';
import { useCart } from '../Context/CartContext';
import AddToCartModal from '../Components/AddToCartModal';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE6A7]/10">
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
    setLastAddedProduct(product);
    setShowAddToCartModal(true);
  };

  const handleOrderOnSite = () => {
    addToCart(product);
    navigate('/panier');
  };

  const handleContinueShopping = () => {
    setShowAddToCartModal(false);
  };

  // Trouver des produits complémentaires (upsell)
  const getUpsellProducts = () => {
    // Si c'est un café, suggérer des viennoiseries ou desserts
    if (product.category === 'café') {
      return products.filter(p => 
        (p.category === 'viennoiseries' || p.category === 'desserts') && 
        p.id !== product.id
      ).slice(0, 4);
    }
    // Si c'est une viennoiserie, suggérer des cafés
    if (product.category === 'viennoiseries') {
      return products.filter(p => 
        p.category === 'café' && 
        p.id !== product.id
      ).slice(0, 4);
    }
    // Si c'est une sucrerie ou dessert, suggérer des cafés
    if (product.category === 'sucreries' || product.category === 'desserts') {
      return products.filter(p => 
        p.category === 'café' && 
        p.id !== product.id
      ).slice(0, 4);
    }
    return [];
  };

  const upsellProducts = getUpsellProducts();

  const handleUpsellAddToCart = (upsellProduct) => {
    addToCart(upsellProduct);
    setLastAddedProduct(upsellProduct);
    setShowAddToCartModal(true);
  };

  const handleUpsellClick = (upsellProductId) => {
    navigate(`/produit/${upsellProductId}`);
  };

  return (
    <div className="min-h-screen bg-[#FFE6A7]/10 py-12">
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
              onClick={handleOrderOnSite}
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

        {/* Section Upsell */}
        {upsellProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#432818' }}>
              Ces produits iraient bien avec
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {upsellProducts.map((upsellProduct) => (
                <div
                  key={upsellProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-105"
                  onClick={() => handleUpsellClick(upsellProduct.id)}
                >
                  <div className="aspect-square bg-stone-200 overflow-hidden">
                    <img
                      src={upsellProduct.image}
                      alt={upsellProduct.name}
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
                        {upsellProduct.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#432818' }}>
                      {upsellProduct.name}
                    </h3>
                    <p className="text-sm mb-3 text-stone-600 line-clamp-2">
                      {upsellProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold" style={{ color: '#6F1D1B' }}>
                        {upsellProduct.price.toFixed(2)} €
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpsellAddToCart(upsellProduct);
                        }}
                        className="px-4 py-2 rounded-lg text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: '#6F1D1B' }}
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal d'ajout au panier avec upsell */}
      {showAddToCartModal && lastAddedProduct && (
        <AddToCartModal
          product={lastAddedProduct}
          onClose={handleContinueShopping}
          onContinue={handleContinueShopping}
        />
      )}
    </div>
  );
};

export default ProductDetailScreen;

