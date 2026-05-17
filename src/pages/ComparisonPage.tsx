import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';
import { CURRENCY } from '../constants';
import { Star, ShoppingCart, Trash2, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ComparisonPage() {
  const { comparisonList, toggleComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  if (comparisonList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center bg-white mt-8 shadow-sm rounded-sm">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ArrowLeftRight size={64} className="text-gray-300" />
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Daftar bandingkan kosong</h2>
        <p className="text-gray-400 mb-8">Pilih hingga 4 produk untuk dibandingkan fiturnya!</p>
        <Link to="/" className="bg-verisa-orange text-white px-10 py-3 rounded-sm font-bold uppercase tracking-wide hover:opacity-90">
          Cari Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 overflow-x-auto">
      <div className="flex justify-between items-center mb-8 min-w-[800px]">
        <div className="flex items-center gap-3">
          <ArrowLeftRight className="text-verisa-orange" size={24} />
          <h1 className="text-xl font-medium text-gray-700">Perbandingan Produk ({comparisonList.length}/4)</h1>
        </div>
        <button 
          onClick={clearComparison}
          className="text-gray-500 hover:text-verisa-orange text-sm font-medium transition-colors"
        >
          Bersihkan Semua
        </button>
      </div>
      
      <div className="bg-white rounded-sm shadow-sm border border-gray-100 min-w-[800px]">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/5 p-4 border-b border-r border-gray-100 bg-gray-50 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                Spesifikasi
              </th>
              {comparisonList.map(product => (
                <th key={product.id} className="w-1/5 p-4 border-b border-r border-gray-100 last:border-r-0 relative">
                  <button 
                    onClick={() => toggleComparison(product)}
                    className="absolute top-2 right-2 text-gray-300 hover:text-verisa-orange"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="flex flex-col items-center gap-4">
                    <img src={product.mainImage} alt="" className="w-32 h-32 object-contain" referrerPolicy="no-referrer" />
                    <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-verisa-orange text-center px-4">
                      {product.name}
                    </Link>
                  </div>
                </th>
              ))}
              {/* Fill remaining slots if < 4 */}
              {[...Array(4 - comparisonList.length)].map((_, i) => (
                <th key={`empty-${i}`} className="w-1/5 p-4 border-b border-r border-gray-100 last:border-r-0 bg-gray-50/50">
                   <div className="flex flex-col items-center justify-center gap-2 text-gray-300">
                      <div className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                        +
                      </div>
                      <span className="text-[10px] uppercase font-bold">Slot Kosong</span>
                   </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-4 border-b border-r border-gray-100 bg-gray-50 font-medium text-gray-600">Harga</td>
              {comparisonList.map(p => (
                <td key={`price-${p.id}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 text-center font-bold text-verisa-orange text-lg">
                  {CURRENCY} {p.price.toLocaleString('id-ID')}
                </td>
              ))}
              {[...Array(4 - comparisonList.length)].map((_, i) => <td key={`ep-${i}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 bg-gray-50/50"></td>)}
            </tr>
            <tr>
              <td className="p-4 border-b border-r border-gray-100 bg-gray-50 font-medium text-gray-600">Rating</td>
              {comparisonList.map(p => (
                <td key={`rating-${p.id}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star size={14} className="text-verisa-orange fill-verisa-orange" />
                    <span className="font-bold">{p.rating}</span>
                    <span className="text-gray-400 text-xs">({p.reviewsCount})</span>
                  </div>
                </td>
              ))}
              {[...Array(4 - comparisonList.length)].map((_, i) => <td key={`er-${i}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 bg-gray-50/50"></td>)}
            </tr>
            <tr>
              <td className="p-4 border-b border-r border-gray-100 bg-gray-50 font-medium text-gray-600 align-top">Deskripsi</td>
              {comparisonList.map(p => (
                <td key={`desc-${p.id}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 align-top">
                  <div className="text-[12px] text-gray-500 line-clamp-[8] leading-relaxed">
                    {p.description}
                  </div>
                </td>
              ))}
              {[...Array(4 - comparisonList.length)].map((_, i) => <td key={`ed-${i}`} className="p-4 border-b border-r border-gray-100 last:border-r-0 bg-gray-50/50"></td>)}
            </tr>
            <tr>
              <td className="p-4 border-r border-gray-100 bg-gray-50 font-medium text-gray-600 italic">Beli</td>
              {comparisonList.map(p => (
                <td key={`buy-${p.id}`} className="p-4 border-r border-gray-100 last:border-r-0 text-center">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full bg-verisa-orange text-white py-2 rounded-sm text-xs font-bold hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={14} /> Ke Keranjang
                  </button>
                </td>
              ))}
              {[...Array(4 - comparisonList.length)].map((_, i) => <td key={`eb-${i}`} className="p-4 border-r border-gray-100 last:border-r-0 bg-gray-50/50"></td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
