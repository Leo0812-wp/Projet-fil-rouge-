import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import OrderConfirmationModal from '../Components/OrderConfirmationModal';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalHT, getTotalTVA, clearCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handlePay = () => {
    setShowModal(true);
  };

  const handleConfirmOrder = () => {
    clearCart();
    setShowModal(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#432818' }}>
            Votre panier
          </h1>
          <div className="text-center py-20">
            <p className="text-xl mb-6" style={{ color: '#432818' }}>
              Votre panier est vide
            </p>
            <Link
              to="/produits"
              className="inline-block px-6 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#6F1D1B' }}
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#432818' }}>
          Votre panier
        </h1>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = '/cafe-espresso.avif';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#432818' }}>
                    {item.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#99582A' }}>
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: '#BB9457', color: 'white' }}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold" style={{ color: '#432818' }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    style={{ backgroundColor: '#BB9457', color: 'white' }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg" style={{ color: '#432818' }}>
                Total HT
              </span>
              <span className="text-lg" style={{ color: '#432818' }}>
                {getTotalHT().toFixed(2)} €
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg" style={{ color: '#432818' }}>
                TVA
              </span>
              <span className="text-lg" style={{ color: '#432818' }}>
                {getTotalTVA().toFixed(2)} €
              </span>
            </div>
            <div className="border-t border-stone-300 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold" style={{ color: '#432818' }}>
                  Total TTC
                </span>
                <span className="text-2xl font-bold" style={{ color: '#6F1D1B' }}>
                  {getTotalPrice().toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePay}
            className="w-full py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#6F1D1B' }}
          >
            Payer
          </button>
        </div>

        <div className="text-center">
          <Link
            to="/produits"
            className="text-stone-600 hover:text-stone-800 underline"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>

      {showModal && (
        <OrderConfirmationModal
          total={getTotalPrice()}
          onConfirm={handleConfirmOrder}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CartScreen;

