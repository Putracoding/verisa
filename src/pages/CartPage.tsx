import { useCart } from '../context/CartContext';
import { CURRENCY } from '../constants';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalAmount, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center bg-white mt-8 shadow-sm rounded-sm">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Keranjang belanjaanmu kosong</h2>
        <Link to="/" className="bg-verisa-orange text-white px-10 py-3 rounded-sm font-bold uppercase tracking-wide hover:opacity-90">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-medium mb-6 text-gray-700">Keranjang Belanja</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-sm shadow-sm flex items-center font-medium text-gray-600 text-sm">
             <div className="w-12">Pilih</div>
             <div className="flex-grow">Produk</div>
             <div className="w-32 text-center">Harga Satuan</div>
             <div className="w-32 text-center">Kuantitas</div>
             <div className="w-32 text-center">Total Harga</div>
             <div className="w-20 text-center">Aksi</div>
          </div>

          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-sm shadow-sm flex items-center text-sm border border-transparent hover:border-verisa-orange transition-colors">
               <div className="w-12">
                  <input type="checkbox" checked readOnly className="accent-verisa-orange cursor-not-allowed" />
               </div>
               <div className="flex-grow flex items-center gap-3">
                  <img src={item.mainImage} alt="" className="w-20 h-20 object-cover border border-gray-100" referrerPolicy="no-referrer" />
                  <Link to={`/product/${item.id}`} className="hover:text-verisa-orange line-clamp-2 pr-4">{item.name}</Link>
               </div>
               <div className="w-32 text-center">
                  {CURRENCY} {item.price.toLocaleString('id-ID')}
               </div>
               <div className="w-32 flex justify-center">
                  <div className="flex items-center border border-gray-200">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 px-2 hover:bg-gray-50 border-r border-gray-200"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 px-2 hover:bg-gray-50 border-l border-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
               </div>
               <div className="w-32 text-center text-verisa-orange font-medium">
                  {CURRENCY} {(item.price * item.quantity).toLocaleString('id-ID')}
               </div>
               <div className="w-20 flex justify-center">
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-verisa-orange transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
               </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-sm shadow-sm sticky top-[130px]">
            <h2 className="font-bold border-b border-gray-100 pb-4 mb-4">Ringkasan Pesanan</h2>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total Produk ({cartCount})</span>
              <span>{CURRENCY} {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-6 font-bold text-lg text-verisa-orange">
              <span>Total Akhir</span>
              <span>{CURRENCY} {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <button className="w-full bg-verisa-orange text-white py-4 rounded-sm font-bold uppercase hover:opacity-90">
              Checkout
            </button>
            <p className="text-[10px] text-gray-400 mt-4 text-center">
              Dengan menekan tombol Checkout, Anda menyetujui Syarat & Ketentuan yang berlaku.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
