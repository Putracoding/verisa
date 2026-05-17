import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { auth, signInWithGoogle, logout } from '../../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import { Search, ShoppingCart, User, LogOut, Menu, X, Heart, ArrowLeftRight } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { comparisonCount } = useComparison();

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-verisa-orange text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar (Desktop) */}
        <div className="hidden md:flex justify-end items-center py-1 text-[12px] gap-[15px]">
          <Link to="/compare" className="hover:text-white/80 cursor-pointer flex items-center gap-1">
            <ArrowLeftRight size={14} />
            Bandingkan ({comparisonCount})
          </Link>
          <Link to="/wishlist" className="hover:text-white/80 cursor-pointer flex items-center gap-1">
            <Heart size={14} className={wishlistCount > 0 ? "fill-white" : ""} />
            Wishlist ({wishlistCount})
          </Link>
          <span className="hover:text-white/80 cursor-pointer">Notifikasi</span>
          <span className="hover:text-white/80 cursor-pointer">Bantuan</span>
          <span className="hover:text-white/80 cursor-pointer">Bahasa Indonesia</span>
          {user ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={user.photoURL || ''} alt="" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
              <span className="font-semibold">{user.displayName}</span>
            </div>
          ) : (
            <>
              <button onClick={signInWithGoogle} className="hover:text-white/80">Daftar</button>
              <button onClick={signInWithGoogle} className="hover:text-white/80 font-bold border-l border-white/20 pl-[15px]">Login</button>
            </>
          )}
        </div>

        {/* Main Nav */}
        <div className="flex items-center justify-between py-2 px-0 md:py-[10px] md:pb-[20px] gap-10 lg:gap-[40px]">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <h1 className="text-[28px] font-extrabold tracking-tight flex items-center">
              <span className="bg-white text-verisa-orange px-2 py-0.5 rounded-[4px] mr-1 text-[24px]">V</span>
              erisa Shop
            </h1>
          </Link>

          <form onSubmit={handleSearch} className="flex-grow max-w-2xl flex">
            <input
              type="text"
              placeholder="Cari barang idamanmu di sini..."
              className="w-full bg-white text-gray-800 px-[15px] py-[10px] rounded-l-sm focus:outline-none text-[14px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-verisa-orange-bright px-5 rounded-r-sm hover:opacity-90 flex items-center justify-center">
              <span className="hidden md:inline font-medium">Cari</span>
              <Search className="w-5 h-5 md:hidden" />
            </button>
          </form>

          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative group text-[24px]">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-verisa-orange text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-shopee-orange-dark overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 py-2 border-b border-white/10">
                    <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                    <div>
                      <p className="font-bold">{user.displayName}</p>
                      <p className="text-xs opacity-80">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={logout} className="flex items-center gap-2 py-2 text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <button onClick={signInWithGoogle} className="bg-white text-shopee-orange font-bold py-2 rounded-sm">
                  Login / Daftar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
