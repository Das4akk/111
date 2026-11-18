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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        className="relative bg-[#161414] rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#2E2927] my-8 text-left animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#1C1918]/90 hover:bg-[#2A2523] text-[#C8BEB8] hover:text-[#F5EFEA] border border-[#332C2A] shadow-md transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image */}
          <div className="md:col-span-5 bg-[#111010] border-b md:border-b-0 md:border-r border-[#262220] p-6 flex flex-col justify-between items-center relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#0E0D0D] border border-[#262220] shadow-xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Quick facts under photo */}
            <div className="w-full mt-4 space-y-2 text-xs text-[#C8BEB8]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1A1716] border border-[#2A2523]">
                <Droplets className="w-4 h-4 text-[#D49D94] shrink-0" />
                <span>Текстура: {product.texture}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#1A1716] border border-[#2A2523]">
                <Shield className="w-4 h-4 text-[#D49D94] shrink-0" />
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
              className="mt-4 w-full py-2.5 px-3 bg-[#1E1918] hover:bg-[#2A2220] text-[#D49D94] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#382F2C]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D49D94]" />
              <span>Спросить AI о средстве</span>
            </button>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category, Badge & Volume */}
              <div className="flex items-center justify-between text-xs text-[#968C86] uppercase tracking-wider pr-10">
                <span>{product.categoryLabel}</span>
                <span className="font-semibold text-[#D49D94]">{product.volume}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5EFEA] font-normal mt-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#968C86] font-light mt-0.5">
                {product.ruName}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#F5EFEA]">{product.rating}</span>
                <span className="text-xs text-[#968C86]">({product.reviewsCount} отзывов)</span>
                <span className="text-[#453D3A]">•</span>
                <span className="text-xs text-emerald-400 font-medium">В наличии</span>
              </div>

              {/* Divider */}
              <div className="mt-4 border-b border-[#262220]" />

              {/* Full Description */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F5EFEA]">
                  Действие формулы
                </h4>
                <p className="text-xs sm:text-sm text-[#C8BEB8] leading-relaxed font-light">
                  {product.fullDesc}
                </p>
              </div>

              {/* Key Active Ingredients */}
              <div className="mt-4 space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F5EFEA]">
                  Ключевые активы
                </h4>
                <div className="space-y-1.5">
                  {product.keyIngredients.map((ing, i) => (
                    <div key={i} className="text-xs flex items-baseline gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D49D94] shrink-0" />
                      <span className="font-medium text-[#F5EFEA]">
                        {ing.name} {ing.percentage && `(${ing.percentage})`}:
                      </span>
                      <span className="text-[#968C86]">{ing.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage */}
              <div className="mt-4 p-3 bg-[#1B1817] rounded-2xl border border-[#2A2523] text-xs text-[#C8BEB8]">
                <span className="font-semibold text-[#F5EFEA] block mb-0.5">Способ применения:</span>
                {product.usage}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#262220] flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#332C2A] rounded-full bg-[#1C1918] px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#F5EFEA] hover:text-[#D49D94] font-semibold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-[#F5EFEA]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#F5EFEA] hover:text-[#D49D94] font-semibold cursor-pointer"
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
                    : 'bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Добавлено в корзину!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#121010]" />
                    <span>В корзину</span>
                  </>
                )}
              </button>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-full border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#2A201E] text-[#D49D94] border-[#D49D94]'
                    : 'bg-[#1C1918] border-[#332C2A] text-[#968C86] hover:text-[#D49D94]'
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
