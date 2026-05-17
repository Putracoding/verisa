import { motion } from 'motion/react';
import heroImage from '../../assets/images/verisa_shop_hero_1779007673762.png';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:h-[200px]">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 promo-gradient relative rounded-sm overflow-hidden flex justify-between items-center px-10 h-[200px] text-white"
        >
          <div className="max-w-md">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[32px] font-bold mb-1"
            >
              DISKON S/D 90%
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg opacity-90"
            >
              Promo Puncak Verisa Day! Gratis Ongkir RP0
            </motion.p>
          </div>
          <div className="hidden md:block text-[80px] opacity-20 select-none">🎁</div>
        </motion.div>
        
        <div className="hidden lg:grid grid-rows-2 gap-1 h-[200px]">
           <div className="bg-white p-3 rounded-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex flex-col">
                <span className="text-verisa-orange font-bold text-sm">Voucher 50%</span>
                <span className="text-[10px] text-gray-500">Klaim Sekarang</span>
              </div>
              <div className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">🎟️</div>
           </div>
           <div className="bg-white p-3 rounded-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex flex-col">
                <span className="text-verisa-orange font-bold text-sm">Gratis Ongkir</span>
                <span className="text-[10px] text-gray-500">Min. Belanja Rp0</span>
              </div>
              <div className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">🚚</div>
           </div>
        </div>
      </div>
    </section>
  );
}
