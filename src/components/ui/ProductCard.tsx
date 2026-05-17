import { Star, Heart, ArrowLeftRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../../types';
import { CURRENCY } from '../../constants';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleComparison, isInComparison } = useComparison();
  const wishlisted = isInWishlist(product.id);
  const isCompared = isInComparison(product.id);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="product-card group flex flex-col h-full bg-white border border-[#f0f0f0] rounded-[4px] relative"
    >
      <div className="badge-sale">-30%</div>
      
      {/* Action Buttons */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={18} className={wishlisted ? "text-verisa-orange fill-verisa-orange" : "text-gray-400"} />
        </button>

        {/* Comparison Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleComparison(product);
          }}
          className="w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
          title="Bandingkan Produk"
        >
          <ArrowLeftRight size={18} className={isCompared ? "text-verisa-orange" : "text-gray-400"} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="aspect-square bg-[#fafafa] overflow-hidden rounded-t-[4px] flex items-center justify-center">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="p-2 flex flex-col flex-grow gap-1">
          <h3 className="text-[13px] text-gray-800 line-clamp-2 leading-tight h-8 overflow-hidden">
            {product.name}
          </h3>
          
          <div className="mt-auto">
            <div className="text-[16px] text-verisa-orange font-medium">
              {CURRENCY} {product.price.toLocaleString('id-ID')}
            </div>
            
            <div className="flex items-center justify-between mt-2 text-[11px] text-[#888]">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-verisa-orange fill-verisa-orange" />
                <span>{product.rating}</span>
              </div>
              <span>{product.reviewsCount} Terjual</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
