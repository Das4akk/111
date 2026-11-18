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
    <section id="benefits" className="py-20 lg:py-28 bg-[#FAF6F3] border-b border-[#EFE7DE]/80 relative overflow-hidden">
      {/* Background soft element */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B3756C] font-semibold">
            Стандарты совершенства
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242220] font-normal">
            Почему выбирают «Точку красоты»
          </h2>
          <p className="text-sm sm:text-base text-[#7E7873] font-light">
            Профессиональная косметика BRASH объединяет передовую биохимию и безупречный тактильный комфорт.
          </p>
          <div className="w-12 h-0.5 bg-[#EAD8D3] mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7DE] hover:border-[#D49D94] transition-all duration-300 hover:shadow-lg flex flex-col justify-between space-y-6 text-left group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F4EBE7] group-hover:bg-[#EAD8D3] flex items-center justify-center text-[#B3756C] transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#FAF6F3] text-[#7E7873] border border-[#EFE7DE]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#242220] group-hover:text-[#B3756C] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A5551] leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F4EBE7] flex items-center gap-1.5 text-xs text-[#B3756C] font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#B3756C]" />
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
