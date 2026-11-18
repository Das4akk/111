import React from 'react';
import { Droplets, Sparkles, Heart, ShieldCheck, Microscope } from 'lucide-react';
import { ASSETS } from '../assets/images';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="brand" className="py-20 lg:py-28 bg-[#0B0A0A] relative overflow-hidden border-b border-[#24201E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D49D94] font-semibold">
            Философия слияния
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5EFEA] font-normal leading-tight">
            О бренде BRASH & магазине «Точка красоты»
          </h2>
          <div className="w-12 h-0.5 bg-[#382F2C] mx-auto mt-4" />
        </div>

        {/* Story Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Macro texture visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-[#2E2927] aspect-[4/3] sm:aspect-square bg-[#161414]">
              <img
                src={ASSETS.texture}
                alt="Текстура крема BRASH SYSTEM — Точка красоты"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-[#D49D94] font-medium block">
                  Биомиметическая текстура
                </span>
                <p className="font-serif text-lg sm:text-xl font-light italic mt-1 text-[#F5EFEA]">
                  «Косметика, которая не лежит на лице маской, а становится частью твоего липидного слоя.»
                </p>
              </div>
            </div>

            {/* Decorative card underneath */}
            <div className="absolute -top-4 -right-4 -z-10 w-full h-full rounded-3xl bg-[#181514] border border-[#2A2422]" />
          </div>

          {/* Right: Narrative & 4 Core Pillars */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-[#D6CEC8] font-normal leading-relaxed">
                В пространстве <span className="font-medium text-[#F5EFEA]">«Точка красоты»</span> представлена оригинальная профессиональная линейка <span className="font-medium text-[#D49D94]">BRASH SYSTEM</span>: наши формулы созданы не для того, чтобы создавать временную иллюзию ухоженности, а чтобы восстанавливать естественные защитные механизмы кожи.
              </p>
              <p className="text-sm sm:text-base text-[#A89F99] font-light leading-relaxed">
                Мы отказались от агрессивных спиртов, синтетических красителей, сульфатов и силиконов в пользу идентичных коже церамидов, физиологических липидов и клинически доказанных пептидов. Каждое нанесение средства — это глубокий тактильный ритуал заботы и уважения к собственной красоте.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#141212] border border-[#262220] hover:border-[#D49D94]/50 transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#1E1A19] flex items-center justify-center text-[#D49D94]">
                  <Microscope className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#F5EFEA]">
                  Доказанная биохимия
                </h4>
                <p className="text-xs text-[#A89F99] leading-relaxed font-light">
                  Только рабочие концентрации активов BRASH SYSTEM (PDRN 5–9%, комплекс из 76 пептидов, мадекассосид и мультигиалуроновая кислота), проверенные дерматологическими тестами.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141212] border border-[#262220] hover:border-[#D49D94]/50 transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#1E1A19] flex items-center justify-center text-[#D49D94]">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#F5EFEA]">
                  Ламеллярные эмульсии
                </h4>
                <p className="text-xs text-[#A89F99] leading-relaxed font-light">
                  Кристаллическая решетка кремов имитирует водно-липидный барьер человека, мгновенно "встраиваясь" в эпидермис.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141212] border border-[#262220] hover:border-[#D49D94]/50 transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#1E1A19] flex items-center justify-center text-[#D49D94]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#F5EFEA]">
                  Чистота стандартов Clean Care
                </h4>
                <p className="text-xs text-[#A89F99] leading-relaxed font-light">
                  Без микропластика, комедогенных масел и искусственных отдушек. Безопасно даже для реактивной и травмированной кожи.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141212] border border-[#262220] hover:border-[#D49D94]/50 transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#1E1A19] flex items-center justify-center text-[#D49D94]">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#F5EFEA]">
                  Soft Wellness & Эстетика
                </h4>
                <p className="text-xs text-[#A89F99] leading-relaxed font-light">
                  Утяжеленное матовое стекло, нежнейшие шелковистые текстуры и мягкий тактильный отклик при каждом прикосновении.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
