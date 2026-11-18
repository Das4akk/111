import React, { useState } from 'react';
import { X, User, Heart, Package, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const { wishlist, addToCart, setQuickViewProduct, openConsultantWith } = useCart();
  const [activeTab, setActiveTab] = useState<'profile' | 'wishlist' | 'orders'>('profile');

  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-[#161414] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#2E2927] text-left animate-scale-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#24201E] text-[#968C86] hover:text-[#F5EFEA] cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#262220]">
          <div className="w-14 h-14 rounded-full bg-[#1C1918] border border-[#332C2A] flex items-center justify-center text-[#D49D94] font-serif text-2xl font-light">
            Т
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl text-[#F5EFEA] font-normal">
                Личный кабинет
              </h3>
              <span className="bg-[#241E1C] text-[#D49D94] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#382F2C]">
                Точка красоты
              </span>
            </div>
            <p className="text-xs text-[#968C86]">
              Персональный бьюти-профиль и история ухода
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#262220] gap-6 text-xs font-medium pt-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#D49D94] text-[#F5EFEA] font-semibold'
                : 'text-[#968C86] hover:text-[#F5EFEA]'
            }`}
          >
            Skin-Паспорт
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#D49D94] text-[#F5EFEA] font-semibold'
                : 'text-[#968C86] hover:text-[#F5EFEA]'
            }`}
          >
            <span>Избранное</span>
            {wishlist.length > 0 && (
              <span className="bg-[#D49D94] text-[#121010] font-semibold text-[10px] px-1.5 py-0.2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#D49D94] text-[#F5EFEA] font-semibold'
                : 'text-[#968C86] hover:text-[#F5EFEA]'
            }`}
          >
            История заказов
          </button>
        </div>

        {/* Tab 1: Profile & Skin Passport */}
        {activeTab === 'profile' && (
          <div className="py-5 space-y-5 text-xs">
            {/* Client Status Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E1A18] to-[#171413] border border-[#332C2A] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-[#F5EFEA] font-normal">
                  Профиль клиента «Точка красоты»
                </span>
                <span className="text-xs font-semibold text-[#D49D94]">BRASH SYSTEM</span>
              </div>
              <p className="text-[11px] text-[#C8BEB8] leading-relaxed">
                Курьерская доставка по Брянску от 5 000 ₽ бесплатно, отправка СДЭК по России. Оплата на руки при получении.
              </p>
            </div>

            {/* Skin Passport */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#F5EFEA] uppercase tracking-wider text-[11px]">
                Ваш текущий профиль кожи:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-[#1C1918] rounded-xl border border-[#2A2523]">
                  <span className="text-[#968C86] block text-[10px]">Тип кожи:</span>
                  <span className="font-medium text-[#F5EFEA]">Чувствительная / Сухая</span>
                </div>
                <div className="p-3 bg-[#1C1918] rounded-xl border border-[#2A2523]">
                  <span className="text-[#968C86] block text-[10px]">Главный приоритет:</span>
                  <span className="font-medium text-[#F5EFEA]">Липидный барьер</span>
                </div>
                <div className="p-3 bg-[#1C1918] rounded-xl border border-[#2A2523]">
                  <span className="text-[#968C86] block text-[10px]">Любимая линейка:</span>
                  <span className="font-medium text-[#F5EFEA]">PDRN Mystic & Milk Cream</span>
                </div>
                <div className="p-3 bg-[#1C1918] rounded-xl border border-[#2A2523]">
                  <span className="text-[#968C86] block text-[10px]">Офис обслуживания:</span>
                  <span className="font-medium text-emerald-400">Брянск, пр-т Ленина, 99</span>
                </div>
              </div>
            </div>

            {/* AI Advisor Button */}
            <button
              onClick={() => {
                onClose();
                openConsultantWith('Посмотри мой skin-профиль и порекомендуй уход из каталога BRASH SYSTEM');
              }}
              className="w-full py-3 px-4 bg-[#1E1918] hover:bg-[#2A2220] text-[#D49D94] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#382F2C]"
            >
              <Sparkles className="w-4 h-4 text-[#D49D94]" />
              <span>Обновить профиль с помощью AI-диагностики</span>
            </button>
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="py-5 space-y-3">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-[#1B1817] rounded-2xl border border-[#2A2523] flex items-center justify-between gap-3"
                >
                  <div
                    onClick={() => {
                      onClose();
                      setQuickViewProduct(p);
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-xl border border-[#2A2523]"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-[#F5EFEA]">{p.name}</h4>
                      <p className="text-[11px] text-[#968C86]">
                        {p.volume} • {p.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="py-2 px-3 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] text-[11px] font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#121010]" />
                    <span>В корзину</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-[#968C86] space-y-2">
                <Heart className="w-8 h-8 mx-auto text-[#4A403C]" />
                <p>Вы еще не добавили средства в избранное.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Order History */}
        {activeTab === 'orders' && (
          <div className="py-5 space-y-3 text-xs">
            <div className="p-4 bg-[#1B1817] rounded-2xl border border-[#2A2523] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[#F5EFEA]">Заказ #BR-8124</span>
                <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Выдан (Брянск, пр-т Ленина, 99)
                </span>
              </div>
              <p className="text-[11px] text-[#968C86]">
                15 октября 2026 • 2 товара
              </p>
              <div className="pt-2 border-t border-[#2A2523] text-[11px] text-[#C8BEB8]">
                Состав: BRASH PDRN Mystic + BRASH Milk Cream
              </div>
            </div>

            <div className="p-4 bg-[#1B1817] rounded-2xl border border-[#2A2523] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-[#F5EFEA]">Заказ #BR-7419</span>
                <span className="bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Доставлен
                </span>
              </div>
              <p className="text-[11px] text-[#968C86]">
                28 августа 2026 • 1 товар
              </p>
              <div className="pt-2 border-t border-[#2A2523] text-[11px] text-[#C8BEB8]">
                Состав: BRASH PDRN Open Eyes
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
