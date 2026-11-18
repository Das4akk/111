import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Send,
  Calendar,
  ExternalLink,
  CheckCircle,
  X,
} from 'lucide-react';
import { SHOWROOMS, Showroom } from '../data/showrooms';
import { ASSETS } from '../assets/images';
import { useCart } from '../context/CartContext';

export const ShowroomSection: React.FC = () => {
  const { showToast } = useCart();
  const [activeShowroom, setActiveShowroom] = useState<Showroom>(SHOWROOMS[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('Завтра в 14:00');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setIsBookingOpen(false);
      setBookingName('');
      setBookingPhone('');
      showToast('Вы успешно записаны на консультацию в офис «Точка красоты» в Брянске!');
    }, 1800);
  };

  const handleMessengerClick = (e: React.MouseEvent, url: string, label: string) => {
    if (!url) {
      e.preventDefault();
      showToast(`Актуальная ссылка на ${label} скоро будет добавлена`);
    }
  };

  return (
    <section id="showroom" className="py-20 lg:py-28 bg-[#0B0A0A] border-b border-[#24201E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D49D94] font-semibold">
            Офис и шоурум
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5EFEA] font-normal">
            Офис «Точка красоты» в Брянске
          </h2>
          <p className="text-sm sm:text-base text-[#A89F99] font-light">
            Ждем вас по адресу: г. Брянск, проспект Ленина, д. 99. Курьерская доставка по Брянску от 5 000 ₽ бесплатно, отправка СДЭК по всей России.
          </p>
          <div className="w-12 h-0.5 bg-[#382F2C] mx-auto mt-4" />
        </div>

        {/* City Badges (when multiple showrooms exist, allow switching) */}
        {SHOWROOMS.length > 1 && (
          <div className="flex justify-center gap-3 mb-10">
            {SHOWROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => setActiveShowroom(room)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeShowroom.id === room.id
                    ? 'bg-[#D49D94] text-[#121010] shadow-md'
                    : 'bg-[#161414] text-[#C8BEB8] hover:bg-[#221E1C] border border-[#2E2927]'
                }`}
              >
                {room.city} {room.isFlagship && '• Главный офис'}
              </button>
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Boutique Photo */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-[#2E2927] aspect-[16/10] bg-[#161414]">
              <img
                src={ASSETS.showroom}
                alt={activeShowroom.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#D49D94] font-semibold mb-1.5">
                  Официальный офис BRASH SYSTEM
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F5EFEA]">
                  {activeShowroom.name}
                </h3>
                <p className="text-xs text-[#C8BEB8] mt-1 font-light">
                  г. {activeShowroom.city}, {activeShowroom.address}
                  {activeShowroom.landmark ? ` • ${activeShowroom.landmark}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Showroom Details & Booking */}
          <div className="lg:col-span-5 bg-[#161414] rounded-3xl p-6 sm:p-8 border border-[#262220] shadow-xl shadow-black/40 text-left space-y-6">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-[#F5EFEA] font-normal">
                г. {activeShowroom.city}, {activeShowroom.address}
              </h4>
              <p className="text-xs sm:text-sm text-[#B8AEA8] leading-relaxed font-light">
                {activeShowroom.description}
              </p>
            </div>

            {/* Practical Info List */}
            <div className="space-y-3 text-xs text-[#D6CEC8] border-y border-[#262220] py-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D49D94] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium block text-[#F5EFEA]">
                    г. {activeShowroom.city}, {activeShowroom.address}
                  </span>
                  {activeShowroom.landmark && (
                    <span className="text-[#968C86]">{activeShowroom.landmark}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D49D94] shrink-0" />
                <span>{activeShowroom.hours}</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D49D94] shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-[#F5EFEA]">
                  {activeShowroom.phones.map((p, idx) => (
                    <React.Fragment key={p.href}>
                      <a
                        href={p.href}
                        className="hover:text-[#D49D94] transition-colors tabular-nums"
                      >
                        {p.label}
                      </a>
                      {idx < activeShowroom.phones.length - 1 && (
                        <span className="text-[#5A504C]">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Boutique Perks */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#968C86]">
                В офисе доступно:
              </span>
              <ul className="space-y-1.5 text-xs text-[#C8BEB8]">
                {activeShowroom.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-baseline gap-2">
                    <span className="text-[#D49D94] font-semibold">·</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 py-3 px-4 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold tracking-wider uppercase text-center transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#121010]" />
                <span>Записаться на консультацию</span>
              </button>

              <a
                href={activeShowroom.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#1E1A19] hover:bg-[#282321] text-[#F5EFEA] rounded-full text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 border border-[#332C2A]"
              >
                <span>На карте</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D49D94]" />
              </a>
            </div>

            {/* Messengers */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#968C86]">Мессенджеры офиса:</span>
              <div className="flex items-center gap-3">
                <a
                  href={activeShowroom.telegram || '#telegram'}
                  target={activeShowroom.telegram ? '_blank' : undefined}
                  rel={activeShowroom.telegram ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleMessengerClick(e, activeShowroom.telegram, 'Telegram')}
                  className="flex items-center gap-1 text-[#F5EFEA] hover:text-[#D49D94] font-medium cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>Telegram</span>
                </a>
                <span className="text-[#5A504C]">•</span>
                <a
                  href={activeShowroom.whatsapp || '#whatsapp'}
                  target={activeShowroom.whatsapp ? '_blank' : undefined}
                  rel={activeShowroom.whatsapp ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleMessengerClick(e, activeShowroom.whatsapp, 'WhatsApp')}
                  className="flex items-center gap-1 text-[#F5EFEA] hover:text-[#D49D94] font-medium cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#4ADE80]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Free Skin Consultation Booking Modal */}
      {isBookingOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="relative bg-[#161414] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#2E2927] text-left animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#24201E] text-[#968C86] hover:text-[#F5EFEA]"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#F5EFEA]">
                  Вы записаны!
                </h3>
                <p className="text-xs text-[#C8BEB8]">
                  Ждем вас в офисе {activeShowroom.name} (г. {activeShowroom.city}, {activeShowroom.address}).
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D49D94]">
                    Сервис BRASH SYSTEM • Брянск
                  </span>
                  <h3 className="font-serif text-2xl text-[#F5EFEA] font-normal">
                    Запись на подбор ухода в офисе
                  </h3>
                  <p className="text-xs text-[#968C86] font-light">
                    Поможем подобрать комплекс BRASH SYSTEM (PDRN, кремы, бустеры) по адресу: г. Брянск, проспект Ленина, д. 99.
                  </p>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                      Ваше имя:
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Мария"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                      Номер телефона:
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                      Удобный день и время:
                    </label>
                    <select
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] focus:outline-hidden focus:border-[#D49D94]"
                    >
                      <option value="Сегодня в 16:00">Сегодня в 16:00</option>
                      <option value="Сегодня в 18:30">Сегодня в 18:30</option>
                      <option value="Завтра в 12:00">Завтра в 12:00</option>
                      <option value="Завтра в 15:00">Завтра в 15:00</option>
                      <option value="В субботу в 14:00">В субботу в 14:00</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Подтвердить запись
                    </button>
                    <span className="block text-[10px] text-center text-[#968C86] mt-2">
                      Консультация и подбор средств абсолютно бесплатны
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
