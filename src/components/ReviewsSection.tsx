import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, Heart, Sparkles, X } from 'lucide-react';
import { REVIEWS, Review } from '../data/reviews';
import { useCart } from '../context/CartContext';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useCart();
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newSkinType, setNewSkinType] = useState('Чувствительная');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('BRASH Milk Cream');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      city: newCity.trim() || 'Брянск',
      skinType: newSkinType,
      rating: newRating,
      date: 'Сегодня',
      productName: newProduct,
      productId: 'brash-milk-cream',
      highlight: '«Прекрасный результат после применения BRASH SYSTEM»',
      comment: newComment.trim(),
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewComment('');
    showToast('Благодарим за ваш отзыв о косметике BRASH! ❤️');
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#100F0F] border-b border-[#24201E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with CTA to add review */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D49D94] font-semibold">
              Реальный опыт
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F5EFEA] font-normal">
              Отзывы покупательниц «Точка красоты»
            </h2>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[#F5EFEA] tabular-nums">4.97 из 5</span>
              <span className="text-xs text-[#968C86]">на основе подтвержденных заказов</span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1C1817] hover:bg-[#282220] text-[#F5EFEA] text-xs font-semibold tracking-wider uppercase border border-[#332C2A] transition-all cursor-pointer self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#D49D94]" />
            <span>Оставить свой отзыв</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#161414] rounded-3xl p-6 sm:p-8 border border-[#262220] shadow-lg shadow-black/30 hover:border-[#3A322F] transition-colors text-left space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/70 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    Подтвержденная покупка
                  </span>
                </div>

                {/* Highlight Quote */}
                <h4 className="font-serif text-lg font-medium text-[#F5EFEA]">
                  {rev.highlight}
                </h4>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-[#C8BEB8] leading-relaxed font-light">
                  {rev.comment}
                </p>

                {/* Product Mentioned */}
                <div className="pt-2">
                  <span className="text-[11px] text-[#968C86]">Средство: </span>
                  <span className="text-xs font-semibold text-[#D49D94]">
                    {rev.productName}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#24201E] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#2E2927]"
                  />
                  <div>
                    <h5 className="text-sm font-semibold text-[#F5EFEA]">
                      {rev.author} <span className="text-xs font-normal text-[#968C86]">({rev.city})</span>
                    </h5>
                    <p className="text-[11px] text-[#968C86]">
                      Тип кожи: <span className="text-[#D6CEC8]">{rev.skinType}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-[#968C86]">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Review Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-[#161414] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#2E2927] text-left animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#24201E] text-[#968C86] hover:text-[#F5EFEA]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl text-[#F5EFEA] font-normal mb-1">
              Поделитесь вашим впечатлением
            </h3>
            <p className="text-xs text-[#968C86] mb-6">
              Ваш честный отзыв поможет другим девушкам подобрать идеальный бережный уход.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                  Ваше имя:
                </label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Анна Смирнова"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                    Город:
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Брянск"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                    Тип кожи:
                  </label>
                  <select
                    value={newSkinType}
                    onChange={(e) => setNewSkinType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] focus:outline-hidden focus:border-[#D49D94]"
                  >
                    <option value="Чувствительная">Чувствительная</option>
                    <option value="Сухая">Сухая / Обезвоженная</option>
                    <option value="Комбинированная">Комбинированная</option>
                    <option value="Жирная">Жирная</option>
                    <option value="Зрелая">Зрелая</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                  Оценка:
                </label>
                <div className="flex gap-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-current' : 'text-[#3A3431]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                  Используемое средство BRASH SYSTEM:
                </label>
                <select
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-xs text-[#F5EFEA] focus:outline-hidden focus:border-[#D49D94]"
                >
                  <option value="BRASH Milk Cream">BRASH Milk Cream</option>
                  <option value="BRASH PDRN Valkyrie">BRASH PDRN Valkyrie</option>
                  <option value="BRASH PDRN Mystic">BRASH PDRN Mystic</option>
                  <option value="BRASH PDRN Open Eyes">BRASH PDRN Open Eyes</option>
                  <option value="BRASH System Booster">BRASH System Booster</option>
                  <option value="BRASH 76 Peptides Cream">BRASH 76 Peptides Cream</option>
                  <option value="BRASH PDRN Millionaire">BRASH PDRN Millionaire</option>
                  <option value="BRASH PDRN Ultimate">BRASH PDRN Ultimate</option>
                  <option value="BRASH Tsar Peel">BRASH Tsar Peel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#D6CEC8] mb-1">
                  Ваш отзыв:
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Опишите ваши ощущения, текстуру средства и как отреагировала кожа..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1E1B1A] border border-[#332C2A] text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#D49D94] hover:bg-[#E2B4AC] text-[#121010] rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
              >
                Опубликовать отзыв
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
