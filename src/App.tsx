/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ComparisonPage from './pages/ComparisonPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { ComparisonProvider } from './context/ComparisonContext';

export default function App() {
  return (
    <ComparisonProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col font-sans">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/compare" element={<ComparisonPage />} />
                  <Route path="/search" element={<HomePage />} /> {/* Basic reuse for now */}
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ComparisonProvider>
  );
}

