import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, toggleWishlist, setQuickViewProduct } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-[#161414] rounded-3xl p-4 sm:p-5 border border-[#262220] hover:border-[#D49D94]/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#0E0D0D] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#141212]/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-[#D49D94] shadow-2xs border border-[#2E2826]">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-[#D49D94] text-[#121010]'
              : 'bg-[#141212]/80 hover:bg-[#221E1C] text-[#C8BEB8] hover:text-[#D49D94] border border-[#2E2826]'
          }`}
          aria-label="В избранное"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View overlay button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2.5 px-3 bg-[#161414]/95 hover:bg-[#24201E] backdrop-blur-md rounded-xl text-xs font-medium text-[#F5EFEA] border border-[#332C2A] shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#D49D94]" />
            <span>Быстрый просмотр</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-[11px] text-[#968C86] uppercase tracking-wider font-medium">
            <span>{product.categoryLabel}</span>
            <span className="text-[#D49D94] font-semibold">{product.volume}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#F5EFEA] group-hover:text-[#D49D94] transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Russian name subtitle */}
          <p className="text-xs text-[#B8AEA8] line-clamp-2 leading-relaxed mt-0.5 font-light">
            {product.ruName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#F5EFEA] tabular-nums">{product.rating}</span>
            <span className="text-[11px] text-[#968C86] tabular-nums">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Availability & Add to Cart button */}
        <div className="pt-3 border-t border-[#262220] flex items-center justify-between gap-2 mt-3">
          <div>
            <span className="text-xs font-medium text-emerald-400 block">
              {product.inStock ? 'В наличии' : 'Под заказ'}
            </span>
            <span className="text-[11px] text-[#968C86] block">
              Оригинал BRASH
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`py-2.5 px-3.5 sm:px-4 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#24201E] hover:bg-[#D49D94] text-[#F5EFEA] hover:text-[#121010] border border-[#36302D]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">В корзине</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D49D94] group-hover:text-current" />
                <span>Купить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
