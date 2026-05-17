import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center bg-white mt-8 shadow-sm rounded-sm">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Heart size={64} className="text-gray-300" />
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Wishlist-mu masih kosong</h2>
        <p className="text-gray-400 mb-8">Simpan barang yang kamu suka ke wishlist untuk membelinya nanti!</p>
        <Link to="/" className="bg-verisa-orange text-white px-10 py-3 rounded-sm font-bold uppercase tracking-wide hover:opacity-90">
          Cari Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="text-verisa-orange fill-verisa-orange" size={24} />
        <h1 className="text-xl font-medium text-gray-700">Wishlist Saya ({wishlist.length})</h1>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {wishlist.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index % 5) * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
