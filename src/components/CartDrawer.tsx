import React from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalItems,
    setIsCheckoutOpen,
    setQuickViewProduct,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between text-left animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EFE7DE] flex items-center justify-between bg-[#FCFAF8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#B3756C]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#242220] font-normal">
              Корзина покупок
            </h3>
            <span className="text-xs text-[#7E7873]">({totalItems})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-[#FAF6F3] text-[#7E7873] hover:text-[#242220] transition-colors cursor-pointer"
            aria-label="Закрыть корзину"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Info Bar */}
        <div className="px-5 py-3 bg-[#FAF6F3] border-b border-[#EFE7DE] flex items-center gap-2 text-xs text-[#242220]">
          <Truck className="w-4 h-4 text-[#B3756C] shrink-0" />
          <span>Курьер по Брянску от 5 000 ₽ бесплатно • Отправка СДЭК</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F4EBE7]">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.product.id} className="py-4 first:pt-0 flex gap-4">
                <div
                  onClick={() => {
                    setIsCartOpen(false);
                    setQuickViewProduct(item.product);
                  }}
                  className="w-20 h-20 rounded-2xl bg-[#FAF6F3] border border-[#EFE7DE] overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          setQuickViewProduct(item.product);
                        }}
                        className="text-xs sm:text-sm font-medium text-[#242220] hover:text-[#B3756C] transition-colors cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#7E7873]">
                        {item.product.volume}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-[#A8A29E] hover:text-red-500 transition-colors p-1"
                      aria-label="Удалить товар"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E5D5CE] rounded-full bg-[#FCFAF8] px-2 py-0.5 text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#5A5551] hover:text-[#242220] font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-medium text-[#242220]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-[#5A5551] hover:text-[#242220] font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs text-[#7E7873]">
                      {item.product.categoryLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F3] flex items-center justify-center text-[#B3756C] mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#242220]">
                Ваша корзина пуста
              </h4>
              <p className="text-xs text-[#7E7873] max-w-xs mx-auto">
                Выберите профессиональные средства BRASH SYSTEM в каталоге «Точки красоты».
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-3 bg-[#242220] text-white text-xs font-semibold rounded-full hover:bg-[#3E3B38] transition-colors uppercase tracking-wider"
              >
                Перейти в каталог
              </button>
            </div>
          )}
        </div>

        {/* Footer with Delivery & Totals */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EFE7DE] bg-[#FCFAF8] space-y-4">
            <div className="p-3 bg-[#FAF6F3] rounded-2xl border border-[#EFE7DE] flex items-start gap-2.5 text-[11px] text-[#5A5551]">
              <Truck className="w-4 h-4 text-[#B3756C] shrink-0 mt-0.5" />
              <span>
                Курьерская доставка по Брянску от 5 000 ₽ бесплатно. В другие города отправляем <strong className="text-[#242220]">СДЭК</strong>. Оплата на руки при получении.
              </span>
            </div>

            {/* Order Summary Breakdown */}
            <div className="space-y-1.5 text-xs text-[#5A5551]">
              <div className="flex justify-between">
                <span>Выбрано товаров:</span>
                <span className="font-medium text-[#242220]">{totalItems} шт.</span>
              </div>

              <div className="flex justify-between">
                <span>Оплата:</span>
                <span className="font-medium text-[#242220]">На руки при получении</span>
              </div>

              <div className="text-[11px] text-[#7E7873] pt-2 border-t border-[#EFE7DE]">
                Итоговую стоимость и время доставки уточнит менеджер при подтверждении заказа.
              </div>
            </div>

            {/* Checkout CTA Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-[#242220] hover:bg-[#3E3B38] text-white rounded-full text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <span>Оформить заказ</span>
              <ArrowRight className="w-4 h-4 text-[#D49D94]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
