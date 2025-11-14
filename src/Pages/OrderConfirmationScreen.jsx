import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderConfirmationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const total = location.state?.total || 0;

  // Rediriger vers l'accueil si pas de total (accès direct à la page)
  useEffect(() => {
    if (!total) {
      navigate('/');
    }
  }, [total, navigate]);

  return (
    <div className="min-h-screen bg-[#FFE6A7]/10 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
          {/* Icône de succès animée */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center animate-bounce"
            style={{ backgroundColor: '#BB9457' }}>
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Titre */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#432818' }}>
            Commande validée !
          </h1>

          {/* Message de confirmation */}
          <div className="mb-8">
            <p className="text-xl mb-4" style={{ color: '#432818' }}>
              Votre commande d'un montant de <strong className="text-2xl" style={{ color: '#6F1D1B' }}>{total.toFixed(2)} € TTC</strong> a été enregistrée avec succès.
            </p>
            <div className="bg-[#FFE6A7]/20 rounded-lg p-6 mt-6">
              <p className="text-lg font-semibold mb-2" style={{ color: '#432818' }}>
                ⏱️ Votre commande sera bientôt disponible
              </p>
              <p className="text-base" style={{ color: '#99582A' }}>
                Vous pouvez venir récupérer votre commande sur place dans quelques instants.
              </p>
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="border-t border-stone-200 pt-6 mb-8">
            <p className="text-sm text-stone-600 mb-2">
              📍 2 rue des Prés, 44000 Nantes
            </p>
            <p className="text-sm text-stone-600">
              Un email de confirmation vous a été envoyé avec les détails de votre commande.
            </p>
          </div>

          {/* Bouton retour à l'accueil */}
          <button
            onClick={() => navigate('/')}
            className="w-full md:w-auto px-8 py-4 rounded-lg text-white font-semibold text-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#6F1D1B' }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationScreen;

