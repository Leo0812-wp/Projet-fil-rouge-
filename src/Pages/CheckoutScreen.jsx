import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import StripePaymentForm from '../Components/StripePaymentForm';

const CheckoutScreen = () => {
  const { cartItems, getTotalPrice, getTotalHT, getTotalTVA, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null); // 'apple', 'stripe'
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Informations client (sur place / à emporter)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e, type) => {
    if (type === 'customer') {
      setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      return false;
    }
    return true;
  };

  const simulatePayment = async () => {
    setIsProcessing(true);
    // Simulation d'un délai de traitement du paiement
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // Vider le panier et rediriger vers la page de confirmation
    clearCart();
    navigate('/confirmation', { state: { total: getTotalPrice() } });
  };

  const handlePayment = () => {
    if (!validateForm()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (paymentMethod === 'stripe') {
      // Le formulaire Stripe gère sa propre soumission
      return;
    }
    simulatePayment();
  };

  const handleStripePaymentSuccess = () => {
    simulatePayment();
  };


  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFE6A7]/10">
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
    <div className="min-h-screen bg-[#FFE6A7]/10 py-12">
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
                      ? 'border-stone-400 bg-white text-black'
                      : 'border-stone-300 bg-white text-black hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <img src="/visa-icon-lg.png" alt="Visa" className="h-6 object-contain" />
                    <img src="/Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
                  </div>
                  <span className="font-semibold text-lg">Payer par carte bancaire</span>
                </button>
              </div>

              {/* Formulaire Stripe simulé */}
              {paymentMethod === 'stripe' && (
                <div className="mt-6 p-4 border-2 border-stone-200 rounded-lg">
                  <StripePaymentForm 
                    onPaymentSuccess={handleStripePaymentSuccess}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                  />
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

              {paymentMethod !== 'stripe' && (
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
                    'Sélectionner une méthode de paiement'
                  )}
                </button>
              )}

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

      {/* Overlay de chargement pendant le traitement */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <svg className="animate-spin h-16 w-16 text-stone-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#432818' }}>
                Traitement du paiement...
              </h3>
              <p className="text-stone-600">
                Veuillez patienter pendant que nous traitons votre paiement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutScreen;

