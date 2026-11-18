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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EFE7DE] text-left animate-scale-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF6F3] text-[#7E7873] hover:text-[#242220]"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* User Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#EFE7DE]">
          <div className="w-14 h-14 rounded-full bg-[#FAF6F3] border border-[#E5D5CE] flex items-center justify-center text-[#B3756C] font-serif text-2xl font-light">
            Т
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-2xl text-[#242220] font-normal">
                Личный кабинет
              </h3>
              <span className="bg-[#F4EBE7] text-[#B3756C] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-[#E5D5CE]">
                Точка красоты
              </span>
            </div>
            <p className="text-xs text-[#7E7873]">
              Персональный бьюти-профиль и история ухода
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#EFE7DE] gap-6 text-xs font-medium pt-3">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'border-b-2 border-[#B3756C] text-[#242220] font-semibold'
                : 'text-[#7E7873] hover:text-[#242220]'
            }`}
          >
            Skin-Паспорт
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-2.5 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'wishlist'
                ? 'border-b-2 border-[#B3756C] text-[#242220] font-semibold'
                : 'text-[#7E7873] hover:text-[#242220]'
            }`}
          >
            <span>Избранное</span>
            {wishlist.length > 0 && (
              <span className="bg-[#B3756C] text-white text-[10px] px-1.5 py-0.2 rounded-full">
                {wishlist.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2.5 transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'border-b-2 border-[#B3756C] text-[#242220] font-semibold'
                : 'text-[#7E7873] hover:text-[#242220]'
            }`}
          >
            История заказов
          </button>
        </div>

        {/* Tab 1: Profile & Skin Passport */}
        {activeTab === 'profile' && (
          <div className="py-5 space-y-5 text-xs">
            {/* Client Status Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF6F3] to-[#F4EBE7] border border-[#E5D5CE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg text-[#242220] font-normal">
                  Профиль клиента «Точка красоты»
                </span>
                <span className="text-xs font-semibold text-[#B3756C]">BRASH SYSTEM</span>
              </div>
              <p className="text-[11px] text-[#5A5551] leading-relaxed">
                Курьерская доставка по Брянску от 5 000 ₽ бесплатно, отправка СДЭК по России. Оплата на руки при получении.
              </p>
            </div>

            {/* Skin Passport */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#242220] uppercase tracking-wider text-[11px]">
                Ваш текущий профиль кожи:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-[#FCFAF8] rounded-xl border border-[#EFE7DE]">
                  <span className="text-[#7E7873] block text-[10px]">Тип кожи:</span>
                  <span className="font-medium text-[#242220]">Чувствительная / Сухая</span>
                </div>
                <div className="p-3 bg-[#FCFAF8] rounded-xl border border-[#EFE7DE]">
                  <span className="text-[#7E7873] block text-[10px]">Главный приоритет:</span>
                  <span className="font-medium text-[#242220]">Липидный барьер</span>
                </div>
                <div className="p-3 bg-[#FCFAF8] rounded-xl border border-[#EFE7DE]">
                  <span className="text-[#7E7873] block text-[10px]">Любимая линейка:</span>
                  <span className="font-medium text-[#242220]">PDRN Mystic & Milk Cream</span>
                </div>
                <div className="p-3 bg-[#FCFAF8] rounded-xl border border-[#EFE7DE]">
                  <span className="text-[#7E7873] block text-[10px]">Офис обслуживания:</span>
                  <span className="font-medium text-emerald-800">Брянск, пр-т Ленина, 99</span>
                </div>
              </div>
            </div>

            {/* AI Advisor Button */}
            <button
              onClick={() => {
                onClose();
                openConsultantWith('Посмотри мой skin-профиль и порекомендуй уход из каталога BRASH SYSTEM');
              }}
              className="w-full py-3 px-4 bg-[#F4EBE7] hover:bg-[#EAD8D3] text-[#B3756C] rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#E5D5CE]"
            >
              <Sparkles className="w-4 h-4 text-[#B3756C]" />
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
                  className="p-3 bg-[#FCFAF8] rounded-2xl border border-[#EFE7DE] flex items-center justify-between gap-3"
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
                      className="w-12 h-12 object-cover rounded-xl border border-[#EFE7DE]"
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-[#242220]">{p.name}</h4>
                      <p className="text-[11px] text-[#7E7873]">
                        {p.volume} • {p.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(p)}
                    className="py-2 px-3 bg-[#242220] hover:bg-[#3E3B38] text-white text-[11px] font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 text-[#D49D94]" />
                    <span>В корзину</span>
                  </button>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-[#7E7873] space-y-2">
                <Heart className="w-8 h-8 mx-auto text-[#E5D5CE]" />
                <p>Вы еще не добавили средства в избранное.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Order History */}
        {activeTab === 'orders' && (
          <div className="py-5 space-y-3 text-xs">
            <div className="p-4 bg-[#FCFAF8] rounded-2xl border border-[#EFE7DE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#242220]">Заказ #BR-8124</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Выдан (Брянск, пр-т Ленина, 99)
                </span>
              </div>
              <p className="text-[11px] text-[#7E7873]">
                15 октября 2026 • 2 товара
              </p>
              <div className="pt-2 border-t border-[#EFE7DE] text-[11px] text-[#5A5551]">
                Состав: BRASH PDRN Mystic + BRASH Milk Cream
              </div>
            </div>

            <div className="p-4 bg-[#FCFAF8] rounded-2xl border border-[#EFE7DE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#242220]">Заказ #BR-7419</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  Доставлен
                </span>
              </div>
              <p className="text-[11px] text-[#7E7873]">
                28 августа 2026 • 1 товар
              </p>
              <div className="pt-2 border-t border-[#EFE7DE] text-[11px] text-[#5A5551]">
                Состав: BRASH PDRN Open Eyes
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
