import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import OrderConfirmationModal from '../Components/OrderConfirmationModal';

const CheckoutScreen = () => {
  const { cartItems, getTotalPrice, getTotalHT, getTotalTVA, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null); // 'apple', 'stripe'
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Informations client (sur place / à emporter)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  // Informations de carte (pour Stripe)
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e, type) => {
    if (type === 'customer') {
      setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    } else if (type === 'card') {
      setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardInfo({ ...cardInfo, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setCardInfo({ ...cardInfo, expiryDate: formatted });
  };

  const validateForm = () => {
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      return false;
    }
    if (paymentMethod === 'stripe') {
      if (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv || !cardInfo.cardholderName) {
        return false;
      }
    }
    return true;
  };

  const simulatePayment = async () => {
    setIsProcessing(true);
    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowConfirmation(true);
    clearCart();
  };

  const handlePayment = () => {
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    simulatePayment();
  };

  const handleConfirmOrder = () => {
    setShowConfirmation(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
            Votre panier est vide
          </h1>
          <button
            onClick={() => navigate('/panier')}
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#6F1D1B' }}
          >
            Retour au panier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: '#432818' }}>
          Validation de commande
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire client et paiement */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informations client */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
                Vos informations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={customerInfo.firstName}
                    onChange={(e) => handleInputChange(e, 'customer')}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={customerInfo.lastName}
                    onChange={(e) => handleInputChange(e, 'customer')}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange(e, 'customer')}
                    className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    required
                  />
                </div>
              </div>
              <p className="text-sm text-stone-600 mt-4">
                📍 Commande sur place / à emporter
              </p>
            </div>

            {/* Méthode de paiement */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
                Méthode de paiement
              </h2>
              
              {/* Apple Pay */}
              <div className="mb-4">
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`w-full py-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-3 ${
                    paymentMethod === 'apple'
                      ? 'border-black bg-black text-white'
                      : 'border-stone-300 bg-white text-black hover:border-stone-400'
                  }`}
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span className="font-semibold text-lg">Apple Pay</span>
                </button>
              </div>

              {/* Stripe - Payer par carte bancaire */}
              <div className="mb-4">
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`w-full py-4 rounded-lg border-2 transition-all flex items-center justify-center space-x-3 ${
                    paymentMethod === 'stripe'
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-stone-300 bg-white text-black hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {/* Logo Visa */}
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                      <svg className="w-10 h-6" viewBox="0 0 60 20" fill="none">
                        <rect width="60" height="20" rx="2" fill="#1434CB"/>
                        <path d="M26.5 7h-3l-2 6h3l.7-1.8h2.6l.7 1.8h3l-2.3-6zm-2 3l.7-1.8.7 1.8h-1.4z" fill="white"/>
                        <path d="M20 7h-2.5l-2.5 6h3l.4-1h2.4l.4 1h3l-2.5-6zm-3 3.5l.7-1.8.7 1.8h-1.4z" fill="white"/>
                        <path d="M35 7h-2.5l-1.5 4.2-1.7-4.2h-3l2.5 6h3l2.5-6h-2.3z" fill="white"/>
                      </svg>
                    </div>
                    {/* Logo Mastercard */}
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-gray-200">
                      <svg className="w-10 h-6" viewBox="0 0 60 20" fill="none">
                        <rect width="60" height="20" rx="2" fill="white"/>
                        <circle cx="22" cy="10" r="6" fill="#EB001B"/>
                        <circle cx="28" cy="10" r="6" fill="#F79E1B"/>
                        <path d="M25 6c2 1.3 3.3 3.5 3.3 6s-1.3 4.7-3.3 6c-2-1.3-3.3-3.5-3.3-6s1.3-4.7 3.3-6z" fill="#FF5F00"/>
                      </svg>
                    </div>
                  </div>
                  <span className="font-semibold text-lg">Payer par carte bancaire</span>
                </button>
              </div>

              {/* Formulaire de carte Stripe */}
              {paymentMethod === 'stripe' && (
                <div className="mt-6 p-4 border-2 border-stone-200 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                      Numéro de carte *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                      Nom sur la carte *
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardInfo.cardholderName}
                      onChange={(e) => handleInputChange(e, 'card')}
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                        Date d'expiration *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardInfo.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/AA"
                        maxLength="5"
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={(e) => handleInputChange(e, 'card')}
                        placeholder="123"
                        maxLength="4"
                        className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="flex items-center space-x-1">
                        {/* Logos de cartes */}
                        <svg className="w-8 h-5" viewBox="0 0 40 12" fill="none">
                          <rect width="40" height="12" rx="1.5" fill="#1434CB"/>
                          <path d="M17 4h-2l-1 3h2l.3-1h1.4l.3 1h2l-1.5-3zm-1 1.5l.3-1 .3 1h-.6z" fill="white"/>
                        </svg>
                        <svg className="w-8 h-5" viewBox="0 0 40 12" fill="none">
                          <rect width="40" height="12" rx="1.5" fill="#EB001B"/>
                          <circle cx="15" cy="6" r="4" fill="#EB001B"/>
                          <circle cx="18" cy="6" r="4" fill="#F79E1B"/>
                          <path d="M16.5 4c1.2.8 2 2.3 2 4s-.8 3.2-2 4c-1.2-.8-2-2.3-2-4s.8-3.2 2-4z" fill="#FF5F00"/>
                        </svg>
                      </div>
                      <p className="text-xs font-semibold text-blue-800">
                        Paiement sécurisé
                      </p>
                    </div>
                    <p className="text-xs text-blue-700">
                      🔒 Vos informations de carte sont cryptées et sécurisées. Nous ne stockons jamais vos données bancaires.
                    </p>
                  </div>
                </div>
              )}

              {/* Simulation Apple Pay */}
              {paymentMethod === 'apple' && (
                <div className="mt-6 p-6 bg-black rounded-lg text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div>
                        <p className="font-semibold">Carte principale</p>
                        <p className="text-sm text-gray-300">•••• •••• •••• 1234</p>
                      </div>
                    </div>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <p className="text-xs text-gray-400 mb-2">Facturation à</p>
                    <p className="text-sm">{customerInfo.email || 'votre@email.com'}</p>
                  </div>
                  <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Paiement sécurisé avec Face ID / Touch ID</p>
                    <p className="text-xs text-gray-500">Vos informations de paiement sont stockées de manière sécurisée dans votre portefeuille Apple.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
                Récapitulatif
              </h2>
              
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="text-sm font-semibold" style={{ color: '#432818' }}>
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-600">
                        Quantité: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: '#432818' }}>
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: '#432818' }}>Sous-total HT</span>
                  <span style={{ color: '#432818' }}>{getTotalHT().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#432818' }}>TVA</span>
                  <span style={{ color: '#432818' }}>{getTotalTVA().toFixed(2)} €</span>
                </div>
                <div className="border-t border-stone-300 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold" style={{ color: '#432818' }}>
                      Total TTC
                    </span>
                    <span className="text-xl font-bold" style={{ color: '#6F1D1B' }}>
                      {getTotalPrice().toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paymentMethod || isProcessing}
                className={`w-full py-4 rounded-lg text-white font-semibold text-lg mt-6 transition-opacity ${
                  !paymentMethod || isProcessing
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:opacity-90'
                }`}
                style={{ backgroundColor: '#6F1D1B' }}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement en cours...
                  </span>
                ) : (
                  paymentMethod === 'apple' ? 'Payer avec Apple Pay' :
                  paymentMethod === 'stripe' ? 'Payer par carte bancaire' :
                  'Sélectionner une méthode de paiement'
                )}
              </button>

              <button
                onClick={() => navigate('/panier')}
                className="w-full py-3 rounded-lg font-semibold border-2 mt-3 transition-colors"
                style={{ 
                  borderColor: '#6F1D1B',
                  color: '#6F1D1B',
                  backgroundColor: 'transparent'
                }}
              >
                Retour au panier
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <OrderConfirmationModal
          total={getTotalPrice()}
          onConfirm={handleConfirmOrder}
          onClose={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default CheckoutScreen;

