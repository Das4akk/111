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
    <section id="showroom" className="py-20 lg:py-28 bg-[#FAF6F3] border-b border-[#EFE7DE]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B3756C] font-semibold">
            Офис и шоурум
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242220] font-normal">
            Офис «Точка красоты» в Брянске
          </h2>
          <p className="text-sm sm:text-base text-[#7E7873] font-light">
            Ждем вас по адресу: г. Брянск, проспект Ленина, д. 99. Курьерская доставка по Брянску от 5 000 ₽ бесплатно, отправка СДЭК по всей России.
          </p>
          <div className="w-12 h-0.5 bg-[#EAD8D3] mx-auto mt-4" />
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
                    ? 'bg-[#242220] text-white shadow-md'
                    : 'bg-white text-[#5A5551] hover:bg-[#F4EBE7] border border-[#EFE7DE]'
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] bg-white">
              <img
                src={ASSETS.showroom}
                alt={activeShowroom.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider font-semibold mb-2">
                  Официальный офис BRASH SYSTEM
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light">
                  {activeShowroom.name}
                </h3>
                <p className="text-xs text-[#EAD8D3] mt-1 font-light">
                  г. {activeShowroom.city}, {activeShowroom.address}
                  {activeShowroom.landmark ? ` • ${activeShowroom.landmark}` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Showroom Details & Booking */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DE] shadow-xs text-left space-y-6">
            <div className="space-y-4">
              <h4 className="font-serif text-2xl text-[#242220] font-normal">
                г. {activeShowroom.city}, {activeShowroom.address}
              </h4>
              <p className="text-xs sm:text-sm text-[#5A5551] leading-relaxed font-light">
                {activeShowroom.description}
              </p>
            </div>

            {/* Practical Info List */}
            <div className="space-y-3 text-xs text-[#3E3B38] border-y border-[#F4EBE7] py-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B3756C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium block text-[#242220]">
                    г. {activeShowroom.city}, {activeShowroom.address}
                  </span>
                  {activeShowroom.landmark && (
                    <span className="text-[#7E7873]">{activeShowroom.landmark}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#B3756C] shrink-0" />
                <span>{activeShowroom.hours}</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B3756C] shrink-0 mt-0.5" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-[#242220]">
                  {activeShowroom.phones.map((p, idx) => (
                    <React.Fragment key={p.href}>
                      <a
                        href={p.href}
                        className="hover:text-[#B3756C] transition-colors"
                      >
                        {p.label}
                      </a>
                      {idx < activeShowroom.phones.length - 1 && (
                        <span className="text-[#EAD8D3]">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Boutique Perks */}
            <div className="space-y-1.5">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7E7873]">
                В офисе доступно:
              </span>
              <ul className="space-y-1 text-xs text-[#5A5551]">
                {activeShowroom.features.slice(0, 3).map((feat, i) => (
                  <li key={i} className="flex items-baseline gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B3756C] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="flex-1 py-3 px-4 bg-[#242220] hover:bg-[#3E3B38] text-white rounded-full text-xs font-semibold tracking-wider uppercase text-center transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D49D94]" />
                <span>Записаться на консультацию</span>
              </button>

              <a
                href={activeShowroom.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-[#F4EBE7] hover:bg-[#EAD8D3] text-[#242220] rounded-full text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5 border border-[#E5D5CE]"
              >
                <span>На карте</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B3756C]" />
              </a>
            </div>

            {/* Messengers */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#7E7873]">Мессенджеры офиса:</span>
              <div className="flex items-center gap-3">
                <a
                  href={activeShowroom.telegram || '#telegram'}
                  target={activeShowroom.telegram ? '_blank' : undefined}
                  rel={activeShowroom.telegram ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleMessengerClick(e, activeShowroom.telegram, 'Telegram')}
                  className="flex items-center gap-1 text-[#242220] hover:text-[#B3756C] font-medium cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#24A1DE]" />
                  <span>Telegram</span>
                </a>
                <span className="text-[#EAD8D3]">•</span>
                <a
                  href={activeShowroom.whatsapp || '#whatsapp'}
                  target={activeShowroom.whatsapp ? '_blank' : undefined}
                  rel={activeShowroom.whatsapp ? 'noopener noreferrer' : undefined}
                  onClick={(e) => handleMessengerClick(e, activeShowroom.whatsapp, 'WhatsApp')}
                  className="flex items-center gap-1 text-[#242220] hover:text-[#B3756C] font-medium cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
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
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#EFE7DE] text-left animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#FAF6F3] text-[#7E7873] hover:text-[#242220]"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#242220]">
                  Вы записаны!
                </h3>
                <p className="text-xs text-[#5A5551]">
                  Ждем вас в офисе {activeShowroom.name} (г. {activeShowroom.city}, {activeShowroom.address}).
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 mb-6">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B3756C]">
                    Сервис BRASH SYSTEM • Брянск
                  </span>
                  <h3 className="font-serif text-2xl text-[#242220] font-normal">
                    Запись на подбор ухода в офисе
                  </h3>
                  <p className="text-xs text-[#7E7873] font-light">
                    Поможем подобрать комплекс BRASH SYSTEM (PDRN, кремы, бустеры) по адресу: г. Брянск, проспект Ленина, д. 99.
                  </p>
                </div>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#242220] mb-1">
                      Ваше имя:
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="Мария"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-sm text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#242220] mb-1">
                      Номер телефона:
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5D5CE] text-sm text-[#242220] focus:outline-hidden focus:border-[#B3756C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#242220] mb-1">
                      Удобный день и время:
                    </label>
                    <select
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#E5D5CE] text-xs text-[#242220] focus:outline-hidden focus:border-[#B3756C] bg-white"
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
                      className="w-full py-3.5 bg-[#242220] hover:bg-[#3E3B38] text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      Подтвердить запись
                    </button>
                    <span className="block text-[10px] text-center text-[#7E7873] mt-2">
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
