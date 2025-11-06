import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Homescreen from './Pages/Homescreen';
import ContactScreen from './Pages/ContactScreen';
import ProductScreen from './Pages/ProductScreen';
import HistoryScreen from './Pages/HistoryScreen';
import Orderscreen from './Pages/Orderscreen';
import BookingScreen from './Pages/BookingScreen';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/produits" element={<ProductScreen />} />
            <Route path="/histoire" element={<HistoryScreen />} />
            <Route path="/commande" element={<Orderscreen />} />
            <Route path="/reservation" element={<BookingScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
