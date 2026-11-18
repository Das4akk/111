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
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EFE7DE] text-left animate-scale-up max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF6F3] text-[#7E7873] hover:text-[#242220]"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#B3756C] font-semibold block">
              Заказ успешно оформлен
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#242220]">
              Спасибо за заказ, {name}!
            </h3>

            <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-[#EFE7DE] max-w-sm mx-auto text-xs text-[#5A5551] space-y-1.5">
              <p>
                Номер вашего заказа: <strong className="text-[#242220] font-mono text-sm">{orderNumber}</strong>
              </p>
              <p>
                Оплата:{' '}
                <strong className="text-[#242220]">На руки при получении</strong>
              </p>
              <p>
                Контакт для связи: <span className="text-[#242220]">{phone}</span>
              </p>
            </div>

            <p className="text-xs text-[#7E7873] max-w-md mx-auto">
              Специалист «Точки красоты» свяжется с вами в ближайшее время для подтверждения времени курьерской доставки по Брянску или оформления отправки СДЭК.
            </p>

            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3.5 bg-[#242220] hover:bg-[#3E3B38] text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Вернуться в магазин
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B3756C]">
                Оформление заказа • Точка красоты
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#242220] font-normal">
                Доставка и оплата
              </h3>
            </div>

            {/* Step 1: Contact Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#242220]">
                1. Контактные данные
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#7E7873] mb-1">Имя и фамилия *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Елена Васильева"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-xs text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7E7873] mb-1">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (910) 000-00-00"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-xs text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#7E7873] mb-1">Email для деталей заказа (необязательно)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-xs text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                />
              </div>
            </div>

            {/* Step 2: Delivery Method */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#242220]">
                2. Способ доставки
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'courier'
                      ? 'border-[#B3756C] bg-[#F4EBE7]/50'
                      : 'border-[#EFE7DE] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Truck className="w-4 h-4 text-[#B3756C]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'courier'}
                      onChange={() => setDeliveryMethod('courier')}
                      className="accent-[#B3756C]"
                    />
                  </div>
                  <span className="font-semibold text-[#242220]">Курьер по Брянску</span>
                  <span className="text-[11px] text-[#7E7873]">От 5 000 ₽ бесплатно</span>
                </label>

                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'cdek'
                      ? 'border-[#B3756C] bg-[#F4EBE7]/50'
                      : 'border-[#EFE7DE] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <MapPin className="w-4 h-4 text-[#B3756C]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'cdek'}
                      onChange={() => setDeliveryMethod('cdek')}
                      className="accent-[#B3756C]"
                    />
                  </div>
                  <span className="font-semibold text-[#242220]">Отправка СДЭК</span>
                  <span className="text-[11px] text-[#7E7873]">Бережная доставка по РФ</span>
                </label>

                <label
                  className={`p-3 rounded-2xl border cursor-pointer flex flex-col justify-between space-y-1 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#B3756C] bg-[#F4EBE7]/50'
                      : 'border-[#EFE7DE] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ShoppingBag className="w-4 h-4 text-[#B3756C]" />
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="accent-[#B3756C]"
                    />
                  </div>
                  <span className="font-semibold text-[#242220]">Офис в Брянске</span>
                  <span className="text-[11px] text-[#7E7873]">пр-т Ленина, 99 • Бесплатно</span>
                </label>
              </div>

              {deliveryMethod !== 'pickup' && (
                <div>
                  <label className="block text-xs text-[#7E7873] mb-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-xs text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                  />
                </div>
              )}
            </div>

            {/* Step 3: Payment Method (Cash / on-hand only) */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#242220]">
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
                        ? 'border-[#B3756C] bg-[#F4EBE7] text-[#242220]'
                        : 'border-[#EFE7DE] bg-white text-[#5A5551]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#B3756C] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">{pm.label}</span>
                      <span className="text-[11px] text-[#7E7873]">{pm.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary Breakdown */}
            <div className="p-4 bg-[#FAF6F3] rounded-2xl border border-[#EFE7DE] text-xs space-y-1.5">
              <div className="flex justify-between text-[#7E7873]">
                <span>Выбрано позиций:</span>
                <span className="font-medium text-[#242220]">{totalItems} шт.</span>
              </div>
              <div className="flex justify-between text-[#7E7873]">
                <span>Способ получения:</span>
                <span className="font-medium text-[#242220]">
                  {deliveryMethod === 'courier'
                    ? 'Курьер по Брянску (от 5 000 ₽ бесплатно)'
                    : deliveryMethod === 'cdek'
                    ? 'Отправка СДЭК по РФ'
                    : 'Самовывоз: Брянск, пр-т Ленина, 99'}
                </span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-[#242220] pt-2 border-t border-[#E5D5CE]">
                <span>Расчёт:</span>
                <span>Оплата на руки при получении</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-[#242220] hover:bg-[#3E3B38] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md active:scale-98"
            >
              Подтвердить заказ
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
