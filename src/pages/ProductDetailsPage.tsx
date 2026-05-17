import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useComparison } from '../context/ComparisonContext';
import { CURRENCY } from '../constants';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCcw, Heart, ArrowLeftRight } from 'lucide-react';
import { motion } from 'motion/react';
import ReviewSection from '../components/product/ReviewSection';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleComparison, isInComparison } = useComparison();
  const navigate = useNavigate();

  const wishlisted = product ? isInWishlist(product.id) : false;
  const isCompared = product ? isInComparison(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Produk tidak ditemukan</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white p-5 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
            <img src={product.mainImage} alt={product.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-5 gap-2">
             {[...Array(5)].map((_, i) => (
                <div key={i} className={`aspect-square border-2 rounded-sm overflow-hidden cursor-pointer ${i === 0 ? 'border-verisa-orange' : 'border-transparent'}`}>
                  <img src={product.mainImage} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100" referrerPolicy="no-referrer" />
                </div>
             ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <h1 className="text-xl font-medium text-gray-800 mb-2 leading-relaxed">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 border-r border-gray-200 pr-4">
              <span className="text-verisa-orange underline font-medium">{product.rating}</span>
              <div className="flex text-verisa-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />)}
              </div>
            </div>
            <div className="text-gray-500 text-sm border-r border-gray-200 pr-4">
              <span className="text-gray-800 font-medium underline">{product.reviewsCount}</span> Penilaian
            </div>
            <div className="text-gray-500 text-sm">
              <span className="text-gray-800 font-medium">{Math.floor(product.reviewsCount * 1.5)}</span> Terjual
            </div>
          </div>

          <div className="bg-gray-50 p-4 mb-8">
            <div className="text-3xl font-medium text-verisa-orange">
              {CURRENCY} {product.price.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="grid grid-cols-[100px_1fr] gap-y-6 text-sm mb-10">
            <span className="text-gray-500">Pengiriman</span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-green-600" />
                <span>Gratis Ongkir ke seluruh Indonesia</span>
              </div>
              <div className="text-gray-500 text-xs pl-7">Syarat & Ketentuan Berlaku</div>
            </div>

            <span className="text-gray-500">Stok</span>
            <span>{product.stock} tersisa</span>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => product && toggleWishlist(product)}
              className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-colors ${wishlisted ? 'border-verisa-orange text-verisa-orange bg-verisa-orange/5' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
              title={wishlisted ? "Hapus dari Wishlist" : "Tambah ke Wishlist"}
            >
              <Heart size={24} className={wishlisted ? "fill-verisa-orange" : ""} />
            </button>
            <button 
              onClick={() => product && toggleComparison(product)}
              className={`w-14 h-14 flex items-center justify-center border rounded-sm transition-colors ${isCompared ? 'border-verisa-orange text-verisa-orange bg-verisa-orange/5' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}
              title={isCompared ? "Hapus dari Perbandingan" : "Tambah ke Perbandingan"}
            >
              <ArrowLeftRight size={24} className={isCompared ? "text-verisa-orange" : ""} />
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 border border-verisa-orange text-verisa-orange bg-verisa-orange/5 py-4 rounded-sm font-medium hover:bg-verisa-orange/10 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Masukkan Keranjang
            </button>
            <button 
              onClick={() => { addToCart(product); navigate('/cart'); }}
              className="flex-1 bg-verisa-orange text-white py-4 rounded-sm font-medium hover:opacity-90 transition-opacity"
            >
              Beli Sekarang
            </button>
          </div>

          <div className="mt-12 flex gap-8 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={16} className="text-verisa-orange" /> Verisa Garansi
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <RefreshCcw size={16} className="text-verisa-orange" /> 7 Hari Pengembalian
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6 bg-white p-6 rounded-sm shadow-sm">
        <h2 className="bg-gray-50 text-lg font-medium p-3 mb-6 uppercase text-gray-700">Deskripsi Produk</h2>
        <div className="whitespace-pre-line text-sm text-gray-600 leading-relaxed px-3">
          {product.description}
        </div>
      </div>

      {/* Reviews */}
      <ReviewSection productId={product.id} />
    </div>
  );
}
