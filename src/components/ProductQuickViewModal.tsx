import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Check, Sparkles, Shield, Droplets, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    isInWishlist,
    toggleWishlist,
    openConsultantWith,
  } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EFE7DE] my-8 text-left animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#242220] hover:text-[#B3756C] shadow-md transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image */}
          <div className="md:col-span-5 bg-[#FAF6F3] p-6 flex flex-col justify-between items-center relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Quick facts under photo */}
            <div className="w-full mt-4 space-y-2 text-xs text-[#5A5551]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-[#EFE7DE]">
                <Droplets className="w-4 h-4 text-[#B3756C] shrink-0" />
                <span>Текстура: {product.texture}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/90 border border-[#EFE7DE]">
                <Shield className="w-4 h-4 text-[#B3756C] shrink-0" />
                <span>Физиологичный pH • Дерматоконтроль</span>
              </div>
            </div>

            {/* AI Advisor Button */}
            <button
              onClick={() => {
                setQuickViewProduct(null);
                openConsultantWith(
                  `Расскажи подробно, как средство ${product.name} работает с кожей и с чем его лучше сочетать?`
                );
              }}
              className="mt-4 w-full py-2.5 px-3 bg-[#F4EBE7] hover:bg-[#EAD8D3] text-[#B3756C] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#E5D5CE]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B3756C]" />
              <span>Спросить AI о средстве</span>
            </button>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, Badge & Volume */}
              <div className="flex items-center justify-between text-xs text-[#7E7873] uppercase tracking-wider pr-10">
                <span>{product.categoryLabel}</span>
                <span className="font-semibold text-[#B3756C]">{product.volume}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#242220] font-normal mt-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#7E7873] font-light mt-0.5">
                {product.ruName}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#242220]">{product.rating}</span>
                <span className="text-xs text-[#7E7873]">({product.reviewsCount} отзывов)</span>
                <span className="text-[#EAD8D3]">•</span>
                <span className="text-xs text-emerald-800 font-medium">В наличии</span>
              </div>

              {/* Divider */}
              <div className="mt-4 border-b border-[#EFE7DE]" />

              {/* Full Description */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#242220]">
                  Действие формулы
                </h4>
                <p className="text-xs sm:text-sm text-[#5A5551] leading-relaxed font-light">
                  {product.fullDesc}
                </p>
              </div>

              {/* Key Active Ingredients */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#242220]">
                  Ключевые активы
                </h4>
                <div className="space-y-1.5">
                  {product.keyIngredients.map((ing, i) => (
                    <div key={i} className="text-xs flex items-baseline gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B3756C] shrink-0" />
                      <span className="font-medium text-[#242220]">
                        {ing.name} {ing.percentage && `(${ing.percentage})`}:
                      </span>
                      <span className="text-[#7E7873]">{ing.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="mt-4 p-3 bg-[#FAF6F3] rounded-2xl border border-[#EFE7DE] text-xs text-[#5A5551]">
                <span className="font-semibold text-[#242220] block mb-0.5">Способ применения:</span>
                {product.usage}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#EFE7DE] flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#E5D5CE] rounded-full bg-[#FAF6F3] px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#242220] hover:text-[#B3756C] font-semibold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-[#242220]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#242220] hover:text-[#B3756C] font-semibold cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-full text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-sm active:scale-98 ${
                  justAdded
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#242220] hover:bg-[#3E3B38] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#D49D94]" />
                    <span>В корзину</span>
                  </>
                )}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border border-[#E5D5CE] transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#F4EBE7] text-[#B3756C] border-[#B3756C]'
                    : 'bg-white text-[#7E7873] hover:text-[#B3756C]'
                }`}
                aria-label="В избранное"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
