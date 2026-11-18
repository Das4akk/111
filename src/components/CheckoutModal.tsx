import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  MapPin,
  ShoppingBag,
  Banknote,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    totalItems,
    clearCart,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'cdek' | 'pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'transfer'>('cash');
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(`TK-${randomNum}`);
    setIsSuccess(true);
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsSuccess(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-[#161414] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#2E2927] text-left animate-scale-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#24201E] text-[#968C86] hover:text-[#F5EFEA] cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-800/60 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#D49D94] font-semibold block">
              Заказ успешно оформлен
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFEA]">
              Спасибо за заказ, {name}!
            </h3>

            <div className="p-4 bg-[#1A1716] rounded-2xl border border-[#2A2523] max-w-sm mx-auto text-xs text-[#C8BEB8] space-y-1.5">
              <p>
                Номер вашего заказа: <strong className="text-[#F5EFEA] font-mono text-sm">{orderNumber}</strong>
              </p>
              <p>
                Оплата:{' '}
                <strong className="text-[#F5EFEA]">На руки при получении</strong>
              </p>
              <p>
                Контакт для связи: <span className="text-[#F5EFEA]">{phone}</span>
              </p>
            </div>

            <p className="text-xs text-[#968C86] max-w-md mx-auto">
              Специалист «Точки красоты» свяжется с вами в ближайшее время для подтверждения времени курьерской доставки по Брянску или оформления отправки СДЭК.
            </p>

            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3.5 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Вернуться в магазин
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D49D94]">
                Оформление заказа • Точка красоты
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EFEA] font-normal">
                Доставка и оплата
              </h3>
            </div>

            {/* Step 1: Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F5EFEA]">
                1. Контактные данные
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#968C86] mb-1">Имя и фамилия *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Елена Васильева"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#968C86] mb-1">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (910) 000-00-00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#968C86] mb-1">Email для деталей заказа (необязательно)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                />
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F5EFEA]">
                2. Способ доставки
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'courier'
                      ? 'border-[#D49D94] bg-[#241E1C]'
                      : 'border-[#2A2523] bg-[#1A1716] hover:border-[#38312E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck className="w-4 h-4 text-[#D49D94]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'courier'}
                      onChange={() => setDeliveryMethod('courier')}
                      className="accent-[#D49D94]"
                    />
                  </div>
                  <span className="font-semibold text-[#F5EFEA]">Курьер по Брянску</span>
                  <span className="text-[11px] text-[#968C86]">От 5 000 ₽ бесплатно</span>
                </label>

                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'cdek'
                      ? 'border-[#D49D94] bg-[#241E1C]'
                      : 'border-[#2A2523] bg-[#1A1716] hover:border-[#38312E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <MapPin className="w-4 h-4 text-[#D49D94]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'cdek'}
                      onChange={() => setDeliveryMethod('cdek')}
                      className="accent-[#D49D94]"
                    />
                  </div>
                  <span className="font-semibold text-[#F5EFEA]">Отправка СДЭК</span>
                  <span className="text-[11px] text-[#968C86]">Бережная доставка по РФ</span>
                </label>

                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#D49D94] bg-[#241E1C]'
                      : 'border-[#2A2523] bg-[#1A1716] hover:border-[#38312E]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ShoppingBag className="w-4 h-4 text-[#D49D94]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="accent-[#D49D94]"
                    />
                  </div>
                  <span className="font-semibold text-[#F5EFEA]">Офис в Брянске</span>
                  <span className="text-[11px] text-[#968C86]">пр-т Ленина, 99 • Бесплатно</span>
                </label>
              </div>

              {deliveryMethod !== 'pickup' && (
                <div>
                  <label className="block text-xs text-[#968C86] mb-1">
                    {deliveryMethod === 'courier'
                      ? 'Адрес доставки по Брянску (улица, дом, кв.)'
                      : 'Город и адрес удобного пункта выдачи СДЭК'}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={
                      deliveryMethod === 'courier'
                        ? 'г. Брянск, проспект Ленина, д. 99'
                        : 'Город, улица и номер отделения СДЭК'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Payment Method (Cash / on-hand only) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#F5EFEA]">
                3. Способ оплаты
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  {
                    id: 'cash',
                    label: 'Оплата на руки при получении',
                    sub: 'Наличными курьеру или в офисе на пр-те Ленина, 99',
                  },
                  {
                    id: 'transfer',
                    label: 'Переводом при вручении',
                    sub: 'При курьерской доставке или перед отправкой СДЭК',
                  },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id as 'cash' | 'transfer')}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      paymentMethod === pm.id
                        ? 'border-[#D49D94] bg-[#241E1C] text-[#F5EFEA]'
                        : 'border-[#2A2523] bg-[#1A1716] text-[#C8BEB8] hover:border-[#38312E]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#D49D94] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-[#F5EFEA]">{pm.label}</span>
                      <span className="text-[11px] text-[#968C86]">{pm.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary Breakdown */}
            <div className="p-4 bg-[#1A1716] rounded-2xl border border-[#2A2523] text-xs space-y-1.5">
              <div className="flex justify-between text-[#968C86]">
                <span>Выбрано позиций:</span>
                <span className="font-medium text-[#F5EFEA]">{totalItems} шт.</span>
              </div>
              <div className="flex justify-between text-[#968C86]">
                <span>Способ получения:</span>
                <span className="font-medium text-[#F5EFEA]">
                  {deliveryMethod === 'courier'
                    ? 'Курьер по Брянску (от 5 000 ₽ бесплатно)'
                    : deliveryMethod === 'cdek'
                    ? 'Отправка СДЭК по РФ'
                    : 'Самовывоз: Брянск, пр-т Ленина, 99'}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-[#F5EFEA] pt-2 border-t border-[#2A2523]">
                <span>Расчёт:</span>
                <span>Оплата на руки при получении</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md active:scale-98"
            >
              Подтвердить заказ
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
