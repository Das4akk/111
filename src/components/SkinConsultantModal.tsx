import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Send,
  Loader2,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';

interface GroundingSource {
  title: string;
  uri: string;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: GroundingSource[];
  queries?: string[];
  suggestedProducts?: Product[];
}

export const SkinConsultantModal: React.FC = () => {
  const { isConsultantOpen, setIsConsultantOpen, consultantPrefill, addToCart, setQuickViewProduct } =
    useCart();

  const [inputPrompt, setInputPrompt] = useState('');
  const [skinType, setSkinType] = useState('Чувствительная');
  const [concern, setConcern] = useState('Восстановление барьера');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Здравствуйте! Я ваш персональный консультант магазина «Точка красоты» по профессиональной линейке BRASH SYSTEM. \n\nПомогу подобрать средства из каталога BRASH SYSTEM: PDRN Valkyrie, PDRN Mystic, PDRN Open Eyes, Milk Cream, System Booster, 76 Peptides Cream, Tsar Peel и другие позиции бренда. \n\nКакая задача стоит перед вашей кожей сегодня?',
      suggestedProducts: [PRODUCTS[1], PRODUCTS[3]],
    },
  ]);

  useEffect(() => {
    if (consultantPrefill && isConsultantOpen) {
      setInputPrompt(consultantPrefill);
    }
  }, [consultantPrefill, isConsultantOpen]);

  if (!isConsultantOpen) return null;

  const quickQuestions = [
    'В чем отличие PDRN Mystic и PDRN Millionaire?',
    'Как работает PDRN Valkyrie и есть ли реабилитация?',
    'Что выбрать для зоны вокруг глаз — Open Eyes или крем?',
    'Для чего нужен Milk Cream и System Booster?',
  ];

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputPrompt;
    if (!promptToSend.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      text: promptToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/skin-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          skinType,
          concern,
        }),
      });

      const data = await res.json();

      // Find matching products mentioned in text or relevant to prompt
      const matched = PRODUCTS.filter((p) => {
        const text = (data.text || '').toLowerCase();
        const pName = p.name.toLowerCase();
        const ru = p.ruName.toLowerCase();
        return (
          text.includes(pName) ||
          text.includes(pName.replace('brash ', '')) ||
          text.includes(ru.slice(0, 10)) ||
          p.keyIngredients.some((ing) => text.includes(ing.name.toLowerCase()))
        );
      }).slice(0, 2);

      const assistantMessage: Message = {
        role: 'assistant',
        text: data.text || 'Ответ сформирован.',
        sources: data.groundingChunks || [],
        queries: data.webSearchQueries || [],
        suggestedProducts: matched.length > 0 ? matched : [PRODUCTS[1], PRODUCTS[3]],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Благодарим за обращение! Рекомендуем обратить внимание на базовые хиты BRASH SYSTEM: PDRN Mystic для упругости и лифтинга и нежный BRASH Milk Cream для ежедневного восстановления барьера.',
          suggestedProducts: [PRODUCTS[1], PRODUCTS[3]],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      onClick={() => setIsConsultantOpen(false)}
    >
      <div
        className="relative bg-[#161414] rounded-3xl max-w-3xl w-full h-[90vh] max-h-[820px] flex flex-col shadow-2xl border border-[#2E2927] overflow-hidden text-left animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#111010] p-4 sm:p-5 border-b border-[#262220] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#241E1C] border border-[#382F2C] flex items-center justify-center text-[#D49D94] shadow-2xs">
              <Sparkles className="w-5 h-5 text-[#D49D94]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5EFEA] font-normal">
                  BRASH Skin AI Consultant
                </h3>
                <span className="bg-[#24201E] text-[#D49D94] border border-[#362E2B] text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  gemini-3.8-flash + search
                </span>
              </div>
              <p className="text-xs text-[#968C86] font-light">
                Научно обоснованный подбор ухода и анализ ингредиентов с поиском Google
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConsultantOpen(false)}
            className="p-2 rounded-full hover:bg-[#24201E] text-[#968C86] hover:text-[#F5EFEA] transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Context Selectors (Skin Type & Concern) */}
        <div className="bg-[#141212] px-4 py-2.5 border-b border-[#262220] flex flex-wrap items-center gap-2 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#968C86]">Кожа:</span>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              aria-label="Выбор типа кожи"
              className="bg-[#1E1B1A] border border-[#332C2A] text-[#F5EFEA] rounded-lg px-2 py-1 text-xs focus:outline-hidden focus:border-[#D49D94]"
            >
              <option value="Чувствительная">Чувствительная</option>
              <option value="Сухая">Сухая / Обезвоженная</option>
              <option value="Комбинированная">Комбинированная</option>
              <option value="Жирная">Жирная / Поры</option>
              <option value="Зрелая">Зрелая (Anti-Age)</option>
              <option value="Нормальная">Нормальная</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#968C86]">Задача:</span>
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              aria-label="Выбор задачи ухода"
              className="bg-[#1E1B1A] border border-[#332C2A] text-[#F5EFEA] rounded-lg px-2 py-1 text-xs focus:outline-hidden focus:border-[#D49D94]"
            >
              <option value="Восстановление барьера">Восстановление барьера</option>
              <option value="Глубокое увлажнение">Глубокое увлажнение</option>
              <option value="Борьба с постакне и воспалениями">Постакне и сужение пор</option>
              <option value="Упругость и морщины">Лифтинг и упругость</option>
              <option value="Снятие покраснений">Снятие покраснений (купероз)</option>
              <option value="Защита от фотостарения">Защита от солнца (SPF)</option>
            </select>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#0D0C0C]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-3xl p-4 sm:p-5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#D49D94] text-[#121010] font-medium rounded-tr-xs'
                    : 'bg-[#181615] text-[#F5EFEA] border border-[#2A2523] shadow-xs rounded-tl-xs space-y-3'
                }`}
              >
                {/* Text with paragraph splits */}
                <div className="whitespace-pre-line space-y-2">
                  {msg.text}
                </div>

                {/* Grounding Sources (Google Search Citations) */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#2A2523] space-y-1.5">
                    <span className="text-[11px] font-semibold text-[#D49D94] flex items-center gap-1 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D49D94]" />
                      Источники Google Search Grounding:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#121010] hover:bg-[#24201E] border border-[#2E2927] rounded-lg text-[11px] text-[#C8BEB8] hover:text-[#F5EFEA] transition-colors"
                        >
                          <span className="truncate max-w-[200px]">{source.title}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-[#D49D94]" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Products matching the query */}
                {msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#2A2523] space-y-2">
                    <span className="text-[11px] font-semibold text-[#F5EFEA] uppercase tracking-wider block">
                      Рекомендованный уход BRASH:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.suggestedProducts.map((p) => (
                        <div
                          key={p.id}
                          className="p-2.5 bg-[#121010] rounded-2xl border border-[#2A2523] flex items-center justify-between gap-3"
                        >
                          <div
                            onClick={() => {
                              setIsConsultantOpen(false);
                              setQuickViewProduct(p);
                            }}
                            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-cover rounded-lg border border-[#2A2523]"
                            />
                            <div className="min-w-0">
                              <h5 className="text-xs font-semibold text-[#F5EFEA] truncate">
                                {p.name}
                              </h5>
                              <p className="text-[11px] text-[#D49D94] font-medium truncate">
                                {p.volume} • {p.categoryLabel}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => addToCart(p)}
                            className="p-1.5 bg-[#1C1918] hover:bg-[#D49D94] text-[#D49D94] hover:text-[#121010] rounded-full border border-[#332C2A] transition-colors cursor-pointer shrink-0"
                            title="В корзину"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 p-4 bg-[#181615] rounded-2xl border border-[#2A2523] max-w-sm text-xs text-[#C8BEB8]">
              <Loader2 className="w-4 h-4 text-[#D49D94] animate-spin" />
              <span>Дерматолог BRASH анализирует запрос и обращается к поиску Google...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#121010] border-t border-[#262220] flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] text-[#968C86] shrink-0 font-medium">Спросить:</span>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 bg-[#1C1918] hover:bg-[#24201E] text-[#C8BEB8] hover:text-[#F5EFEA] text-xs rounded-full border border-[#2E2927] whitespace-nowrap transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#141212] border-t border-[#262220]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Задайте вопрос о вашей коже, составе или сочетаемости средств..."
              className="flex-1 py-3 px-4 bg-[#1E1B1A] border border-[#332C2A] rounded-full text-sm text-[#F5EFEA] placeholder-[#8A807A] focus:outline-hidden focus:border-[#D49D94] transition-all"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-3 bg-[#D49D94] hover:bg-[#E2B4AC] disabled:opacity-50 text-[#121010] rounded-full transition-all cursor-pointer shadow-xs"
              aria-label="Отправить вопрос"
            >
              <Send className="w-4 h-4 text-[#121010]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
