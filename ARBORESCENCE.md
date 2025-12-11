# Arborescence orientée parcours utilisateur

## Vue rapide (structure)
```
.
|-- index.html
|-- public/                # assets statiques (images, logos)
|-- src/
|   |-- main.jsx           # point d'entrée React
|   |-- App.jsx            # routes + layout global (Header/Footer)
|   |-- Components/        # éléments transverses (Header, Footer, modales, paiements)
|   |-- Context/           # état global du panier
|   |-- data/              # catalogue produits
|   |-- Pages/             # écrans du parcours (home, produits, panier, checkout, etc.)
|   |-- App.css, index.css # styles globaux
|-- tailwind.config.js
|-- vite.config.js
```

## Parcours utilisateur (routes principales)
- `/` → `Pages/Homescreen.jsx` : accueil et mise en avant.
- `/produits` → `Pages/ProductScreen.jsx` : catalogue.
- `/produit/:id` → `Pages/ProductDetailScreen.jsx` : fiche produit, ajout au panier.
- `/panier` → `Pages/CartScreen.jsx` : contenu du panier, quantités.
- `/checkout` → `Pages/CheckoutScreen.jsx` : paiement (incl. `Components/StripePaymentForm.jsx`).
- `/confirmation` → `Pages/OrderConfirmationScreen.jsx` : récap après paiement.
- `/commande` → `Pages/Orderscreen.jsx` : suivi commande.
- `/reservation` → `Pages/BookingScreen.jsx` : réserver une table.
- `/contact` → `Pages/ContactScreen.jsx` : formulaire/contact.
- `/histoire` → `Pages/HistoryScreen.jsx` : histoire de la maison.

## Composants transverses
- `Components/Header.jsx` et `Components/Footer.jsx` : navigation et pied de page toujours présents.
- `Components/AddToCartModal.jsx`, `OrderConfirmationModal.jsx` : interactions panier/commande.
- `Components/TabSelector.jsx` (+ `TabSelector.css`) : navigation interne par onglets.
- `Components/StripePaymentForm.jsx` : formulaire de paiement.

## Données et état
- `Context/CartContext.jsx` : logique panier (ajout, retrait, quantités, totaux HT/TVA/TTC).
- `data/products.js` : liste des produits (source du catalogue).

## Styles et assets
- Styles globaux : `src/App.css`, `src/index.css`.
- Assets : `public/` (images cafés, gâteaux, logos cartes), `src/assets/react.svg`.

## Config et outils
- Tailwind/PostCSS : `tailwind.config.js`, `postcss.config.js`.
- Vite : `vite.config.js`, `index.html` (point d’ancrage `#root`).
