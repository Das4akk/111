import React from 'react';
import { ShieldCheck, Sparkles, Phone, MapPin, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { openConsultantWith } = useCart();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#060606] text-[#F5EFEA] pt-16 pb-12 border-t border-[#201C1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Delivery & Service Highlight Banner */}
        <div className="bg-[#121010] rounded-3xl p-7 sm:p-9 border border-[#262220] mb-14 text-left flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#D49D94] font-semibold flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              Доставка и получение заказов
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EFEA] font-normal">
              Курьерская доставка по Брянску от 5 000 ₽ — бесплатно
            </h3>
            <p className="text-xs sm:text-sm text-[#A89F99] font-light leading-relaxed">
              По Брянску доставляем курьером до двери или выдаём в офисе на проспекте Ленина, д. 99. В другие города бережно отправляем транспортной компанией СДЭК. Оплата на руки при получении.
            </p>
          </div>

          <button
            onClick={() => scrollTo('showroom')}
            className="px-6 py-3.5 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xs whitespace-nowrap shrink-0"
          >
            Контакты офиса
          </button>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left pb-12 border-b border-[#201C1A]">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-3xl font-normal text-[#F5EFEA]">
                Точка красоты
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D49D94] font-medium -mt-1">
                BRASH SYSTEM • Брянск
              </span>
            </div>
            <p className="text-xs text-[#A89F99] leading-relaxed font-light max-w-sm">
              Профессиональная косметика BRASH SYSTEM для бережного ухода, биорепарации и восстановления естественного барьера кожи.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#C8BEB8]">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D49D94]" />
                Официальная продукция BRASH SYSTEM
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-white font-medium text-[11px]">
              Навигация
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  Каталог средств
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('brand')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  О бренде BRASH
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('benefits')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  Преимущества формул
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('reviews')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  Отзывы клиенток
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('showroom')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  Офис в Брянске
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-white font-medium text-[11px]">
              Каталог BRASH SYSTEM
            </h4>
            <ul className="space-y-2 text-[#A8A29E]">
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  PDRN Valkyrie & Mystic
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  PDRN Open Eyes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  Milk Cream & 76 Peptides
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-[#D49D94] transition-colors cursor-pointer"
                >
                  System Booster & Tsar Peel
                </button>
              </li>
              <li>
                <button
                  onClick={() => openConsultantWith()}
                  className="hover:text-[#D49D94] transition-colors text-[#D49D94] cursor-pointer flex items-center gap-1 font-medium"
                >
                  <Sparkles className="w-3 h-3" />
                  AI-подбор протокола
                </button>
              </li>
            </ul>
          </div>

          {/* Office & Contacts */}
          <div className="space-y-3 text-xs">
            <h4 className="uppercase tracking-widest text-white font-medium text-[11px]">
              Офис и контакты
            </h4>
            <ul className="space-y-2.5 text-[#A8A29E]">
              <li className="text-white font-medium flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D49D94] shrink-0 mt-0.5" />
                <span>г. Брянск, проспект Ленина, д. 99</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D49D94] shrink-0" />
                <a href="tel:+79102982730" className="hover:text-white transition-colors">
                  8 (910) 298-27-30
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D49D94] shrink-0" />
                <a href="tel:+79192967779" className="hover:text-white transition-colors">
                  8 (919) 296-77-79
                </a>
              </li>
              <li>Курьер по Брянску от 5 000 ₽ бесплатно</li>
              <li>Отправка СДЭК по всей России</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & delivery/payment methods */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#968C86]">
          <div>
            © {new Date().getFullYear()} Точка красоты. Все права защищены. Магазин косметики BRASH SYSTEM.
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#C8BEB8]">
            <span className="px-2.5 py-0.5 rounded bg-[#121010] border border-[#262220]">Оплата на руки при получении</span>
            <span className="px-2.5 py-0.5 rounded bg-[#121010] border border-[#262220]">Курьер по Брянску</span>
            <span className="px-2.5 py-0.5 rounded bg-[#121010] border border-[#262220]">СДЭК по РФ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
