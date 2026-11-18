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
      className="group bg-white rounded-3xl p-4 sm:p-5 border border-[#EFE7DE] hover:border-[#D49D94] transition-all duration-300 hover:shadow-lg flex flex-col justify-between cursor-pointer relative"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF6F3] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge (e.g. Бестселлер) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold text-[#B3756C] shadow-2xs border border-[#EFE7DE]">
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
              ? 'bg-[#B3756C] text-white'
              : 'bg-white/80 hover:bg-white text-[#5A5551] hover:text-[#B3756C]'
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
            className="w-full py-2.5 px-3 bg-white/95 hover:bg-white backdrop-blur-md rounded-xl text-xs font-medium text-[#242220] shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#B3756C]" />
            <span>Быстрый просмотр</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Category & Volume */}
          <div className="flex items-center justify-between text-[11px] text-[#7E7873] uppercase tracking-wider font-medium">
            <span>{product.categoryLabel}</span>
            <span className="text-[#B3756C] font-semibold">{product.volume}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[#242220] group-hover:text-[#B3756C] transition-colors mt-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Russian name subtitle */}
          <p className="text-xs text-[#5A5551] line-clamp-2 leading-relaxed mt-0.5 font-light">
            {product.ruName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#242220]">{product.rating}</span>
            <span className="text-[11px] text-[#7E7873]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Availability & Add to Cart button */}
        <div className="pt-3 border-t border-[#EFE7DE] flex items-center justify-between gap-2 mt-3">
          <div>
            <span className="text-xs font-medium text-emerald-800 block">
              {product.inStock ? 'В наличии' : 'Под заказ'}
            </span>
            <span className="text-[11px] text-[#7E7873] block">
              Оригинал BRASH
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`py-2.5 px-3.5 sm:px-4 rounded-full text-xs font-medium tracking-wide flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#F4EBE7] hover:bg-[#EAD8D3] text-[#242220]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">В корзине</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#B3756C]" />
                <span>Купить</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
