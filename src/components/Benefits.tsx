import React from 'react';
import { ShieldCheck, Sparkles, Award, PackageCheck, Heart, Leaf } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Award,
      title: '100% оригинальная продукция BRASH',
      description:
        'Прямые поставки со свежих партий лаборатории. Каждая упаковка имеет индивидуальный QR-код подлинности и сертификат качества.',
      badge: 'Оригинал',
    },
    {
      icon: Leaf,
      title: 'Натуральные и физиологичные составы',
      description:
        'Биомиметические церамиды, растительный сквалан и пептиды. 0% парабенов, минеральных масел, микропластика и раздражающих отдушек.',
      badge: 'Clean Formula',
    },
    {
      icon: ShieldCheck,
      title: 'Строгий дерматологический контроль',
      description:
        'Клинически доказанная безопасность и переносимость. Продукция разработана с учетом реактивной, аллергичной и постпроцедурной кожи.',
      badge: 'Dermatest',
    },
    {
      icon: PackageCheck,
      title: 'Курьер по Брянску и отправка СДЭК',
      description:
        'Курьерская доставка по Брянску при заказе от 5 000 ₽ — бесплатно. В другие регионы бережно и оперативно отправляем заказы транспортной компанией СДЭК.',
      badge: 'Доставка & СДЭК',
    },
  ];

  return (
    <section id="benefits" className="py-20 lg:py-28 bg-[#0B0A0A] border-b border-[#24201E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D49D94] font-semibold">
            Стандарты совершенства
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5EFEA] font-normal">
            Почему выбирают «Точку красоты»
          </h2>
          <p className="text-sm sm:text-base text-[#A89F99] font-light">
            Профессиональная косметика BRASH объединяет передовую биохимию и безупречный тактильный комфорт.
          </p>
          <div className="w-12 h-0.5 bg-[#382F2C] mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-[#161414] rounded-3xl p-6 sm:p-7 border border-[#262220] hover:border-[#D49D94]/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between space-y-6 text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#201C1A] group-hover:bg-[#2C2523] flex items-center justify-center text-[#D49D94] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#968C86]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5EFEA] group-hover:text-[#D49D94] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B8AEA8] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#24201E] flex items-center gap-1.5 text-xs text-[#D49D94] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#D49D94]" />
                  <span>Стандарт BRASH Labs</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
