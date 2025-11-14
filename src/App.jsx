import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homescreen from './Pages/Homescreen';
import ContactScreen from './Pages/ContactScreen';
import ProductScreen from './Pages/ProductScreen';
import ProductDetailScreen from './Pages/ProductDetailScreen';
import HistoryScreen from './Pages/HistoryScreen';
import Orderscreen from './Pages/Orderscreen';
import BookingScreen from './Pages/BookingScreen';
import CartScreen from './Pages/CartScreen';
import CheckoutScreen from './Pages/CheckoutScreen';
import OrderConfirmationScreen from './Pages/OrderConfirmationScreen';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Homescreen />} />
              <Route path="/contact" element={<ContactScreen />} />
              <Route path="/produits" element={<ProductScreen />} />
              <Route path="/produit/:id" element={<ProductDetailScreen />} />
              <Route path="/histoire" element={<HistoryScreen />} />
              <Route path="/commande" element={<Orderscreen />} />
              <Route path="/reservation" element={<BookingScreen />} />
              <Route path="/panier" element={<CartScreen />} />
              <Route path="/checkout" element={<CheckoutScreen />} />
              <Route path="/confirmation" element={<OrderConfirmationScreen />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
