import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/home/Hero';
import ProductCard from '../components/ui/ProductCard';
import { CATEGORIES, CURRENCY } from '../constants';
import * as LucideIcons from 'lucide-react';
import { getProducts, seedDatabase } from '../services/productService';
import { Product } from '../types';
import { motion } from 'motion/react';
import { handleFirestoreError, OperationType } from '../lib/firestoreUtils';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (q) {
      setFilteredProducts(products.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [q, products]);

  const loadProducts = async () => {
    setErrorMsg(null);
    try {
      let data: Product[] = [];
      try {
        data = await getProducts();
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, 'products');
      }

      if (data.length === 0) {
        // Auto-seed if empty for demo purposes
        try {
          await seedDatabase();
          data = await getProducts();
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, 'products (seeding)');
        }
        setProducts(data);
      } else {
        setProducts(data);
      }
    } catch (error: any) {
      console.error("Failed to load products", error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 w-full py-5 flex flex-col items-center">
      {errorMsg && (
        <div className="w-full bg-red-50 border border-red-200 text-red-700 p-4 mb-4 rounded-sm text-sm">
          <strong>Error Loading Products:</strong>
          <pre className="mt-2 whitespace-pre-wrap overflow-auto max-h-40 text-xs">
            {errorMsg}
          </pre>
          <button 
            onClick={loadProducts}
            className="mt-3 bg-red-600 text-white px-4 py-1.5 rounded-sm hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}
      <div className="flex w-full gap-5">
      {/* Sidebar */}
      <aside className="hidden lg:block w-[200px] flex-shrink-0">
        <h3 className="text-[16px] font-bold mb-[15px] border-b border-[#ddd] pb-[10px]">Kategori</h3>
        <ul className="list-none">
          {CATEGORIES.map((cat) => {
            const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.Package;
            return (
              <li key={cat.id} className="py-2 text-[14px] text-[#555] cursor-pointer hover:text-verisa-orange flex items-center gap-2 transition-colors">
                <Icon size={18} strokeWidth={1.5} /> {cat.name}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col gap-5 overflow-hidden">
        {!q && <Hero />}

        {/* Flash Sale Banner */}
        {!q && (
          <section className="bg-white rounded-[4px] p-[15px] flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-[15px]">
              <div className="text-verisa-orange text-[18px] font-bold flex items-center gap-2">
                ⚡ FLASH SALE 
                <span className="flex items-center gap-1 font-mono">
                  <span className="bg-black text-white px-1 py-0.5 rounded-[3px] text-[14px]">02</span>:
                  <span className="bg-black text-white px-1 py-0.5 rounded-[3px] text-[14px]">45</span>:
                  <span className="bg-black text-white px-1 py-0.5 rounded-[3px] text-[14px]">12</span>
                </span>
              </div>
              <button className="text-verisa-orange text-[14px] hover:underline">Lihat Semua {'>'}</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {loading ? (
                  [...Array(6)].map((_, i) => <div key={i} className="bg-gray-100 aspect-square animate-pulse rounded-sm"></div>)
               ) : (
                  products.slice(0, 6).map(p => (
                    <div key={`flash-${p.id}`} className="flex flex-col items-center group cursor-pointer">
                        <div className="relative aspect-square w-full mb-1 overflow-hidden bg-gray-50 rounded-[4px]">
                          <img src={p.mainImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                          <div className="absolute top-0 right-0 bg-[#ffe97a] text-verisa-orange text-[10px] font-bold px-2 py-0.5">
                            -30%
                          </div>
                        </div>
                        <span className="text-verisa-orange font-medium text-sm">{CURRENCY} {(p.price * 0.7).toLocaleString('id-ID')}</span>
                    </div>
                  ))
               )}
            </div>
          </section>
        )}

        {/* Featured Products */}
        <section className="w-full">
          <div className="sticky top-[115px] z-30 bg-white border-b border-gray-100 mb-4 py-3 px-4 shadow-sm flex items-center justify-between">
            <h2 className="text-verisa-orange font-bold uppercase text-sm tracking-wide">
              {q ? `Hasil Pencarian: "${q}"` : "Direkomendasikan Untukmu"}
            </h2>
            <div className="flex gap-4 text-xs text-gray-500 font-medium">
               <span className="text-verisa-orange border-b-2 border-verisa-orange pb-3 cursor-pointer">Populer</span>
               <span className="hover:text-verisa-orange cursor-pointer">Terbaru</span>
               <span className="hover:text-verisa-orange cursor-pointer">Terlaris</span>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-[4/5] animate-pulse rounded-sm"></div>
              ))}
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 5) * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white py-20 flex flex-col items-center justify-center text-gray-500 rounded-sm shadow-sm">
                  <LucideIcons.Search size={64} className="opacity-20 mb-4" />
                  <p>Tidak ada produk yang ditemukan untuk "{q}"</p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  </div>
);
}
