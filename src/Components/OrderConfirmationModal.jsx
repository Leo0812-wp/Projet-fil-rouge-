import React, { useEffect } from 'react';

const OrderConfirmationModal = ({ total, onConfirm, onClose }) => {
  useEffect(() => {
    // Redirection automatique après 3 secondes
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onConfirm]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: '#BB9457' }}>
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#432818' }}>
            Commande confirmée !
          </h2>
          <p className="text-lg mb-4" style={{ color: '#432818' }}>
            Votre commande d'un montant de <strong>{total.toFixed(2)} € TTC</strong> a été enregistrée.
          </p>
          <p className="text-sm mb-4" style={{ color: '#99582A' }}>
            Vous pouvez venir récupérer votre commande sur place.
          </p>
          <p className="text-xs text-stone-500">
            Redirection automatique dans quelques secondes...
          </p>
        </div>
        <button
          onClick={onConfirm}
          className="w-full py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#6F1D1B' }}
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;

