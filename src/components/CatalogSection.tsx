import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { filterAndSortProducts, type CatalogSortBy } from '../utils/catalogFilter';

export const CatalogSection: React.FC = () => {
  const { openConsultantWith } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<CatalogSortBy>('popular');

  const categories = [
    { id: 'all', label: 'Весь каталог BRASH SYSTEM' },
    { id: 'pdrn', label: 'PDRN Линейка' },
    { id: 'creams', label: 'Кремы BRASH' },
    { id: 'boosters', label: 'Бустеры & Активаторы' },
    { id: 'peels', label: 'Пилинги' },
    { id: 'hair', label: 'Трихология' },
  ];

  const skinTypes = [
    { id: 'all', label: 'Любая задача' },
    { id: 'Сухая', label: 'Сухая & Обезвоженная' },
    { id: 'Чувствительная', label: 'Чувствительная' },
    { id: 'Зрелая', label: 'Лифтинг & Anti-Age' },
    { id: 'Склонная к отекам', label: 'Контуры & Дренаж' },
  ];

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(PRODUCTS, {
      category: selectedCategory,
      skinType: selectedSkinType,
      sortBy,
    });
  }, [selectedCategory, selectedSkinType, sortBy]);

  return (
    <section id="catalog" className="py-20 bg-[#FCFAF8] border-b border-[#EFE7DE]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B3756C] font-semibold">
              Официальный каталог
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#242220] font-normal">
              Каталог BRASH SYSTEM
            </h2>
            <p className="text-sm sm:text-base text-[#7E7873] font-light max-w-xl">
              Оригинальные PDRN-комплексы (Valkyrie, Mystic, Open Eyes), профессиональные кремы (Milk Cream, 76 Peptides), бустеры и пилинги.
            </p>
          </div>

          {/* Quick AI advice trigger */}
          <button
            onClick={() => openConsultantWith('Помоги подобрать полный уход для моего типа кожи')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F4EBE7] hover:bg-[#EAD8D3] text-[#B3756C] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer self-start md:self-auto border border-[#E5D5CE]"
          >
            <Sparkles className="w-4 h-4 text-[#B3756C]" />
            <span>Не знаете, что выбрать? Спросите AI</span>
          </button>
        </div>

        {/* Filters & Categories Toolbar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#242220] text-white shadow-xs'
                    : 'bg-[#FAF6F3] text-[#5A5551] hover:bg-[#EFE7DE] border border-[#EFE7DE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Skin Type Filter & Sort by Dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#EFE7DE]">
            {/* Skin type pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[#7E7873] font-medium mr-1 hidden sm:inline">Тип кожи:</span>
              {skinTypes.map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedSkinType(st.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    selectedSkinType === st.id
                      ? 'bg-[#EAD8D3] text-[#242220] font-semibold'
                      : 'text-[#7E7873] hover:text-[#242220] hover:bg-[#FAF6F3]'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            {/* Sorting select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#7E7873] font-medium">Сортировка:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as CatalogSortBy)}
                aria-label="Сортировка каталога"
                className="bg-[#FAF6F3] border border-[#EFE7DE] text-[#242220] rounded-xl px-3 py-1.5 focus:outline-hidden focus:border-[#B3756C] cursor-pointer"
              >
                <option value="popular">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="name-asc">По названию (А–Я)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE7DE] space-y-3">
            <p className="text-base text-[#7E7873]">
              В данной категории для выбранного типа кожи товары не найдены.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSkinType('all');
              }}
              className="px-6 py-2.5 bg-[#F4EBE7] text-[#242220] text-xs font-semibold rounded-full hover:bg-[#EAD8D3] transition-colors cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
