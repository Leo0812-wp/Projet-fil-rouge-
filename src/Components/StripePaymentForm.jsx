import React, { useState } from 'react';

const StripePaymentForm = ({ onPaymentSuccess, isProcessing, setIsProcessing }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [error, setError] = useState(null);

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
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) {
      setError('Veuillez entrer un numéro de carte valide');
      return;
    }
    if (!expiryDate || expiryDate.length < 5) {
      setError('Veuillez entrer une date d\'expiration valide');
      return;
    }
    if (!cvv || cvv.length < 3) {
      setError('Veuillez entrer un CVV valide');
      return;
    }
    if (!cardholderName) {
      setError('Veuillez entrer le nom sur la carte');
      return;
    }

    setIsProcessing(true);
    // Simulation d'un délai de traitement
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Numéro de carte */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
          Numéro de carte *
        </label>
        <div className="relative">
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            style={{ fontSize: '16px' }}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2 items-center">
            <img src="/visa-icon-lg.png" alt="Visa" className="h-5 object-contain" />
            <img src="/Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain" />
          </div>
        </div>
      </div>

      {/* Nom sur la carte */}
      <div>
        <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
          Nom sur la carte *
        </label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          placeholder="Jean Dupont"
          className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
          style={{ fontSize: '16px' }}
        />
      </div>

      {/* Date d'expiration et CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
            Date d'expiration *
          </label>
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryChange}
            placeholder="MM/AA"
            maxLength="5"
            className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            style={{ fontSize: '16px' }}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#432818' }}>
            CVV *
          </label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="123"
            maxLength="4"
            className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent"
            style={{ fontSize: '16px' }}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="flex items-center space-x-2">
            {/* Logos de cartes */}
            <img src="/visa-icon-lg.png" alt="Visa" className="h-5 object-contain" />
            <img src="/Mastercard-logo.svg.png" alt="Mastercard" className="h-5 object-contain" />
          </div>
          <p className="text-xs font-semibold text-blue-800">
            Paiement sécurisé par Stripe
          </p>
        </div>
        <p className="text-xs text-blue-700">
          🔒 Vos informations de carte sont cryptées et sécurisées. Nous ne stockons jamais vos données bancaires.
        </p>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-4 rounded-lg text-white font-semibold text-lg transition-opacity ${
          isProcessing
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
          'Payer par carte bancaire'
        )}
      </button>
    </form>
  );
};

export default StripePaymentForm;
