import React from 'react';
import { ArrowDown, Sparkles, Shield, HeartHandshake, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ASSETS } from '../assets/images';

export const Hero: React.FC = () => {
  const { openConsultantWith } = useCart();

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B0A0A] via-[#121010] to-[#0B0A0A] pt-6 pb-16 lg:pt-12 lg:pb-24 border-b border-[#24201E]">
      {/* Subtle organic background ambient glow */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#D49D94]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#B3756C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Soft kicker */}
            <div className="inline-flex items-center gap-2 text-[#D49D94] text-xs uppercase tracking-[0.2em] font-semibold">
              <span>Точка красоты</span>
              <span aria-hidden="true">·</span>
              <span>Профессиональный уход BRASH SYSTEM</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.08] text-[#F5EFEA] tracking-tight">
                Твоя кожа. <br />
                <span className="italic font-light text-[#D49D94]">Твоя истинная</span> красота
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#C8BEB8] font-normal leading-relaxed max-w-xl">
              Профессиональная косметика бренда BRASH, созданная для слияния с липидным слоем эпидермиса. Без парабенов и агрессивных компонентов — только биомиметическая чистота, восстанавливающая естественное сияние и здоровье.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] font-semibold text-sm tracking-wide rounded-full transition-all duration-300 shadow-lg shadow-black/30 cursor-pointer group active:scale-98"
              >
                <span>Смотреть каталог</span>
                <ArrowDown className="w-4 h-4 text-[#121010] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => openConsultantWith('Помоги подобрать средства для моего типа кожи')}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#181514] hover:bg-[#221E1C] text-[#F5EFEA] hover:text-[#D49D94] border border-[#332C2A] font-medium text-sm tracking-wide rounded-full transition-all duration-300 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-[#D49D94] group-hover:rotate-12 transition-transform" />
                <span>AI-диагностика ухода</span>
              </button>
            </div>

            {/* Micro proof points */}
            <div className="pt-6 border-t border-[#24201E] grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif text-2xl font-normal text-[#F5EFEA] tabular-nums">100%</span>
                <span className="text-[11px] sm:text-xs text-[#968C86] leading-tight">Биомиметические формулы</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-[#F5EFEA] tabular-nums">0%</span>
                <span className="text-[11px] sm:text-xs text-[#968C86] leading-tight">Синтетических отдушек</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-normal text-[#F5EFEA] tabular-nums">pH 5.5</span>
                <span className="text-[11px] sm:text-xs text-[#968C86] leading-tight">Физиологический баланс</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Rounded soft frame with soft drop shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-[#2E2927] bg-[#161414] aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={ASSETS.hero}
                  alt="Профессиональная косметика BRASH SYSTEM — Точка красоты"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
                
                {/* Floating Aesthetic Glass Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#141212]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#332C2A] shadow-xl text-left space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D49D94]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D49D94]" />
                    <span>Dermatologically Approved</span>
                  </div>
                  <p className="text-[11px] text-[#C8BEB8] leading-tight font-light">
                    Комплекс липидов и церамидов, мгновенно сливающийся с кожей без эффекта пленки.
                  </p>
                </div>

                <div className="hidden sm:flex absolute top-4 right-4 bg-[#0B0A0A]/85 backdrop-blur-md px-3 py-1.5 rounded-full text-[#F5EFEA] text-[10px] tracking-wider uppercase font-medium items-center gap-1.5 border border-[#2E2927]">
                  <span>Cruelty Free & Clean Formula</span>
                </div>
              </div>

              {/* Decorative accent element */}
              <div className="absolute -bottom-6 -left-6 -z-10 w-full h-full rounded-3xl bg-[#1A1615] border border-[#2A2422]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
