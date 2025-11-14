import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../Context/CartContext';

const AddToCartModal = ({ product, onClose, onContinue }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState(new Set());

  // Trouver des produits complémentaires (upsell)
  const getUpsellProducts = () => {
    // Si c'est un café, suggérer des viennoiseries ou desserts
    if (product.category === 'café') {
      return products.filter(p => 
        (p.category === 'viennoiseries' || p.category === 'desserts') && 
        p.id !== product.id
      ).slice(0, 3);
    }
    // Si c'est une viennoiserie, suggérer des cafés
    if (product.category === 'viennoiseries') {
      return products.filter(p => 
        p.category === 'café' && 
        p.id !== product.id
      ).slice(0, 3);
    }
    // Si c'est une sucrerie ou dessert, suggérer des cafés
    if (product.category === 'sucreries' || product.category === 'desserts') {
      return products.filter(p => 
        p.category === 'café' && 
        p.id !== product.id
      ).slice(0, 3);
    }
    return [];
  };

  const upsellProducts = getUpsellProducts();

  const handleAddUpsell = (upsellProduct) => {
    addToCart(upsellProduct);
    setAddedProducts(prev => new Set([...prev, upsellProduct.id]));
  };

  const handleViewCart = () => {
    onClose();
    navigate('/panier');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* En-tête avec confirmation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#BB9457' }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#432818' }}>
                  Produit ajouté au panier !
                </h2>
                <p className="text-sm" style={{ color: '#99582A' }}>
                  {product.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Section upsell */}
          {upsellProducts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#432818' }}>
                Ces produits iraient bien avec :
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {upsellProducts.map((upsellProduct) => (
                  <div
                    key={upsellProduct.id}
                    className="border-2 border-stone-200 rounded-lg p-3 hover:border-stone-400 transition-colors"
                  >
                    <div className="aspect-square bg-stone-200 rounded-lg overflow-hidden mb-2">
                      <img
                        src={upsellProduct.image}
                        alt={upsellProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/cafe-espresso.avif';
                        }}
                      />
                    </div>
                    <h4 className="font-semibold text-sm mb-1" style={{ color: '#432818' }}>
                      {upsellProduct.name}
                    </h4>
                    <p className="text-xs mb-2 text-stone-600 line-clamp-2">
                      {upsellProduct.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold" style={{ color: '#6F1D1B' }}>
                        {upsellProduct.price.toFixed(2)} €
                      </span>
                      <button
                        onClick={() => handleAddUpsell(upsellProduct)}
                        disabled={addedProducts.has(upsellProduct.id)}
                        className={`px-3 py-1 rounded text-white text-xs font-semibold transition-opacity ${
                          addedProducts.has(upsellProduct.id) 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:opacity-90'
                        }`}
                        style={{ backgroundColor: addedProducts.has(upsellProduct.id) ? '#BB9457' : '#6F1D1B' }}
                      >
                        {addedProducts.has(upsellProduct.id) ? '✓ Ajouté' : 'Ajouter'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onContinue}
              className="flex-1 py-3 rounded-lg font-semibold border-2 transition-colors"
              style={{ 
                borderColor: '#6F1D1B',
                color: '#6F1D1B',
                backgroundColor: 'transparent'
              }}
            >
              Continuer mes achats
            </button>
            <button
              onClick={handleViewCart}
              className="flex-1 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Voir mon panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;

