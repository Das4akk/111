import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Heart,
  User,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';
import { searchProducts } from '../utils/catalogFilter';

interface HeaderProps {
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAccount }) => {
  const { totalItems, setIsCartOpen, wishlist, openConsultantWith, setQuickViewProduct } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const searchResults: Product[] = searchProducts(PRODUCTS, searchQuery);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#060606] text-[#C8BEB8] text-[11px] md:text-xs py-2 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2 border-b border-[#1D1A18]">
        <span>Курьерская доставка по Брянску от 5 000 ₽ бесплатно</span>
        <span className="hidden sm:inline text-[#D49D94]">•</span>
        <span className="hidden sm:inline">Отправка СДЭК по всей России</span>
        <span className="hidden md:inline text-[#D49D94]">•</span>
        <button
          onClick={() => openConsultantWith('Посоветуй стартовый уход для моей кожи')}
          className="hidden md:inline-flex items-center gap-1 text-[#D49D94] hover:text-[#E8C5BE] transition-colors underline font-medium cursor-pointer ml-1"
        >
          <Sparkles className="w-3 h-3" />
          Спросить AI-дерматолога
        </button>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0A0A]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-[#24201E] py-3.5'
            : 'bg-[#0B0A0A]/90 backdrop-blur-xs py-4.5 border-b border-[#1C1917]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-left group cursor-pointer focus:outline-hidden whitespace-nowrap"
              >
                <div className="flex flex-col">
                  <span className="font-serif text-2xl xl:text-[28px] font-normal tracking-wide text-[#F5EFEA] group-hover:text-[#D49D94] transition-colors whitespace-nowrap">
                    Точка красоты
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#968C86] -mt-0.5 font-medium whitespace-nowrap">
                    BRASH SYSTEM • Брянск
                  </span>
                </div>
              </button>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mx-4 text-[13px] tracking-wide font-medium text-[#D6CEC8] whitespace-nowrap">
              <button
                onClick={() => scrollTo('catalog')}
                className="hover:text-[#D49D94] transition-colors cursor-pointer py-1 whitespace-nowrap"
              >
                Каталог
              </button>
              <button
                onClick={() => scrollTo('brand')}
                className="hover:text-[#D49D94] transition-colors cursor-pointer py-1 whitespace-nowrap"
              >
                О бренде BRASH
              </button>
              <button
                onClick={() => scrollTo('benefits')}
                className="hover:text-[#D49D94] transition-colors cursor-pointer py-1 whitespace-nowrap"
              >
                Преимущества
              </button>
              <button
                onClick={() => scrollTo('reviews')}
                className="hover:text-[#D49D94] transition-colors cursor-pointer py-1 whitespace-nowrap"
              >
                Отзывы
              </button>
              <button
                onClick={() => scrollTo('showroom')}
                className="hover:text-[#D49D94] transition-colors cursor-pointer py-1 whitespace-nowrap"
              >
                Офис в Брянске
              </button>
              <button
                onClick={() => openConsultantWith()}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1817] text-[#D49D94] hover:bg-[#282220] transition-all cursor-pointer font-medium border border-[#362E2B] whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D49D94]" />
                <span>Skin AI Consultant</span>
              </button>
            </nav>

            {/* Right: Actions (Search, Wishlist, User, Cart, Mobile Toggle) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-[#D6CEC8] hover:text-[#D49D94] hover:bg-[#1B1817] rounded-full transition-colors cursor-pointer relative"
                aria-label="Поиск по косметике"
                title="Поиск по косметике"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => scrollTo('catalog')}
                className="p-2 text-[#D6CEC8] hover:text-[#D49D94] hover:bg-[#1B1817] rounded-full transition-colors cursor-pointer relative"
                aria-label="Избранное"
                title="Избранное"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D49D94] text-[#121010] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Account / Profile */}
              <button
                onClick={onOpenAccount}
                className="p-2 text-[#D6CEC8] hover:text-[#D49D94] hover:bg-[#1B1817] rounded-full transition-colors cursor-pointer"
                aria-label="Личный кабинет"
                title="Личный кабинет & Клуб BRASH"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart Button with badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
                aria-label="Корзина покупок"
              >
                <ShoppingBag className="w-4 h-4 text-[#121010]" />
                <span className="text-xs font-semibold pr-0.5">
                  {totalItems > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <span>Корзина</span>
                      <span className="bg-[#121010] text-[#F5EFEA] text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                        {totalItems}
                      </span>
                    </span>
                  ) : (
                    'Корзина'
                  )}
                </span>
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#F5EFEA] hover:bg-[#1B1817] rounded-full transition-colors ml-1 cursor-pointer"
                aria-label="Открыть меню"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Live Search Drawer / Dropdown */}
        {isSearchOpen && (
          <div className="border-t border-[#24201E] bg-[#111010] py-4 px-4 sm:px-6 shadow-xl animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-[#968C86] absolute left-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать в каталоге BRASH SYSTEM (Валькирия, Мистик, Опен Айс, Милк Крем, Бустер)..."
                  className="w-full pl-12 pr-20 py-3 bg-[#191615] text-[#F5EFEA] placeholder-[#968C86] text-sm rounded-full border border-[#2E2927] focus:outline-hidden focus:border-[#D49D94] focus:bg-[#1E1A19] transition-all"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-xs text-[#968C86] hover:text-[#F5EFEA]"
                  >
                    Очистить
                  </button>
                )}
              </div>

              {/* Search suggestions & live results */}
              {searchQuery && (
                <div className="mt-3 bg-[#161414] rounded-2xl border border-[#2A2523] shadow-2xl max-h-80 overflow-y-auto p-3 divide-y divide-[#24201E]">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="py-2.5 px-3 hover:bg-[#201C1B] rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-[#2E2927]"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-[#F5EFEA]">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[#968C86] line-clamp-1">
                              {product.ruName}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-[#D49D94]">
                            {product.volume}
                          </span>
                          <span className="block text-[11px] text-emerald-400">
                            {product.inStock ? 'В наличии' : 'Под заказ'}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-6 text-center text-sm text-[#968C86]">
                      По запросу «{searchQuery}» ничего не найдено.
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          openConsultantWith(`Подскажи средство для: ${searchQuery}`);
                        }}
                        className="block mx-auto mt-2 text-[#D49D94] hover:underline font-medium"
                      >
                        Спросить AI-консультанта BRASH →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#24201E] bg-[#111010] px-6 py-6 space-y-4 shadow-2xl">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#D6CEC8]">
              <button
                onClick={() => scrollTo('catalog')}
                className="text-left py-2 border-b border-[#24201E] flex items-center justify-between"
              >
                <span>Каталог BRASH SYSTEM</span>
                <ArrowRight className="w-4 h-4 text-[#D49D94]" />
              </button>
              <button
                onClick={() => scrollTo('brand')}
                className="text-left py-2 border-b border-[#24201E] flex items-center justify-between"
              >
                <span>О бренде BRASH SYSTEM</span>
                <ArrowRight className="w-4 h-4 text-[#D49D94]" />
              </button>
              <button
                onClick={() => scrollTo('benefits')}
                className="text-left py-2 border-b border-[#24201E] flex items-center justify-between"
              >
                <span>Наши преимущества</span>
                <ArrowRight className="w-4 h-4 text-[#D49D94]" />
              </button>
              <button
                onClick={() => scrollTo('reviews')}
                className="text-left py-2 border-b border-[#24201E] flex items-center justify-between"
              >
                <span>Отзывы покупательниц</span>
                <ArrowRight className="w-4 h-4 text-[#D49D94]" />
              </button>
              <button
                onClick={() => scrollTo('showroom')}
                className="text-left py-2 border-b border-[#24201E] flex items-center justify-between"
              >
                <span>Офис в Брянске (пр-т Ленина, 99)</span>
                <ArrowRight className="w-4 h-4 text-[#D49D94]" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openConsultantWith();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1D1817] text-[#D49D94] font-semibold text-xs tracking-wider uppercase rounded-xl border border-[#362E2B]"
              >
                <Sparkles className="w-4 h-4 text-[#D49D94]" />
                Консультация с AI-дерматологом
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
