import React from 'react';
import { Droplets, Sparkles, Heart, ShieldCheck, Microscope } from 'lucide-react';
import { ASSETS } from '../assets/images';

export const BrandPhilosophy: React.FC = () => {
  return (
    <section id="brand" className="py-20 lg:py-28 bg-[#FCFAF8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B3756C] font-semibold">
            Философия слияния
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242220] font-normal leading-tight">
            О бренде BRASH & магазине «Точка красоты»
          </h2>
          <div className="w-12 h-0.5 bg-[#EAD8D3] mx-auto mt-4" />
        </div>

        {/* Story Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Macro texture visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] sm:aspect-square">
              <img
                src={ASSETS.texture}
                alt="Текстура крема BRASH SYSTEM — Точка красоты"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="text-xs uppercase tracking-widest text-[#EAD8D3] font-medium block">
                  Биомиметическая текстура
                </span>
                <p className="font-serif text-lg sm:text-xl font-light italic mt-1">
                  «Косметика, которая не лежит на лице маской, а становится частью твоего липидного слоя.»
                </p>
              </div>
            </div>

            {/* Travertine card underneath */}
            <div className="absolute -top-4 -right-4 -z-10 w-full h-full rounded-3xl bg-[#F4EBE7] border border-[#E5D5CE]" />
          </div>

          {/* Right: Narrative & 4 Core Pillars */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-[#3E3B38] font-normal leading-relaxed">
                В пространстве <span className="font-medium text-[#242220]">«Точка красоты»</span> представлена оригинальная профессиональная линейка <span className="font-medium text-[#B3756C]">BRASH SYSTEM</span>: наши формулы созданы не для того, чтобы создавать временную иллюзию ухоженности, а чтобы восстанавливать естественные защитные механизмы кожи.
              </p>
              <p className="text-sm sm:text-base text-[#5A5551] font-light leading-relaxed">
                Мы отказались от агрессивных спиртов, синтетических красителей, сульфатов и силиконов в пользу идентичных коже церамидов, физиологических липидов и клинически доказанных пептидов. Каждое нанесение средства — это глубокий тактильный ритуал заботы и уважения к собственной красоте.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-[#FAF6F3] border border-[#EFE7DE] hover:border-[#D49D94] transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#F4EBE7] flex items-center justify-center text-[#B3756C]">
                  <Microscope className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#242220]">
                  Доказанная биохимия
                </h4>
                <p className="text-xs text-[#5A5551] leading-relaxed font-light">
                  Только рабочие концентрации активов BRASH SYSTEM (PDRN 5–9%, комплекс из 76 пептидов, мадекассосид и мультигиалуроновая кислота), проверенные дерматологическими тестами.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F3] border border-[#EFE7DE] hover:border-[#D49D94] transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#F4EBE7] flex items-center justify-center text-[#B3756C]">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#242220]">
                  Ламеллярные эмульсии
                </h4>
                <p className="text-xs text-[#5A5551] leading-relaxed font-light">
                  Кристаллическая решетка кремов имитирует водно-липидный барьер человека, мгновенно "встраиваясь" в эпидермис.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F3] border border-[#EFE7DE] hover:border-[#D49D94] transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#F4EBE7] flex items-center justify-center text-[#B3756C]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#242220]">
                  Чистота стандартов Clean Care
                </h4>
                <p className="text-xs text-[#5A5551] leading-relaxed font-light">
                  Без микропластика, комедогенных масел и искусственных отдушек. Безопасно даже для реактивной и травмированной кожи.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF6F3] border border-[#EFE7DE] hover:border-[#D49D94] transition-colors space-y-2">
                <div className="w-9 h-9 rounded-full bg-[#F4EBE7] flex items-center justify-center text-[#B3756C]">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="font-serif text-lg font-medium text-[#242220]">
                  Soft Wellness & Эстетика
                </h4>
                <p className="text-xs text-[#5A5551] leading-relaxed font-light">
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
