import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the shared Gemini client server-side
const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export interface ConsultantRequest {
  prompt: string;
  skinType?: string;
  concern?: string;
  routineStep?: string;
  conversation?: Array<{ role: 'user' | 'model'; text: string }>;
}

export async function handleSkinConsultation(data: ConsultantRequest) {
  if (!apiKey) {
    return {
      text: 'Для работы интеллектуального консультанта BRASH необходим ключ API. Вы можете задать вопросы о любом продукте, а базовые рекомендации доступны в каталоге.',
      groundingChunks: [],
      webSearchQueries: [],
    };
  }

  const systemInstruction = `Вы — ведущий эксперт-дерматолог и бренд-консультант магазина профессиональной косметики BRASH SYSTEM «Точка красоты» (офис в Брянске по адресу: проспект Ленина, д. 99, телефоны: 8 (910) 298-27-30, 8 (919) 296-77-79).
Философия BRASH SYSTEM: инновационная корейская космецевтика на основе полинуклеотидов (PDRN), пептидов и биомиметических эмульсий, дерматологический контроль и бережный уход.

Актуальный каталог BRASH SYSTEM:
1. BRASH PDRN Valkyrie («Валькирия») — непрямой липолитический PDRN-комплекс с пептидами, кофеином и L-карнитином (коррекция контуров, дренаж, уплотнение тканей).
2. BRASH PDRN Mystic («Мистик») — антивозрастной биорепарант с PDRN 8% и гиалуроновой кислотой (лифтинг, упругость, сокращение морщин).
3. BRASH PDRN Open Eyes («Опен Айс») — деликатный комплекс с PDRN 9%, троксерутином и гинкго билоба для зоны вокруг глаз (от темных кругов и отечности).
4. BRASH Milk Cream («Милк Крем») — нежный питательный крем с молочными протеинами, PDRN и церамидами NP (смягчение, восстановление липидного барьера).
5. BRASH System Booster — клеточный крем-бустер с PDRN, глутатионом и коэнзимом Q10 (усиление действия сывороток и кремов, антистресс-энергия).
6. BRASH 76 Peptides Cream — интенсивный омолаживающий крем с комплексом из 76 пептидов и PDRN (плотность кожи и лифтинг).
7. BRASH PDRN Millionaire («Миллионер») — универсальный биоревитализант для сияния, гидратации и эффекта «glass skin».
8. BRASH PDRN Ultimate («Ультимейт») — осветляющий комплекс с транексамовой кислотой и PDRN против пигментации.
9. BRASH PDRN Dr.Water («Доктор Вотер») — глубокое увлажнение и гидробаланс обезвоженной кожи.
10. BRASH Madecassoside Cream — успокаивающий крем с мадекассосидом центеллы для чувствительной и проблемной кожи.
11. BRASH Tsar Peel («Царь Пил») — всесезонный обновляющий пилинг без длительной реабилитации.
12. BRASH PDRN Hair+ — трихологический PDRN-комплекс с медным трипептидом-1 для роста и густоты волос.

Правила ответа:
- Рекомендуйте ТОЛЬКО позиции из каталога BRASH SYSTEM выше с объяснением, как они решают задачу клиента.
- При необходимости используйте поиск Google для проверки актуальных данных о дерматологических исследованиях и совместимости ингредиентов.
- Упоминайте при желании, что все оригинальные средства можно забрать лично в нашем офисе в г. Брянск, проспект Ленина, д. 99, заказать курьерскую доставку по Брянску (от 5 000 ₽ бесплатно) или отправку СДЭК по России, оплата на руки при получении.`;

  let promptText = data.prompt;
  if (data.skinType || data.concern) {
    promptText = `[Контекст пользователя: Тип кожи: ${data.skinType || 'Не указан'}, Основное беспокойство: ${data.concern || 'Не указано'}, Шаг ухода: ${data.routineStep || 'Все шаги'}]\n\nЗапрос: ${data.prompt}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction,
      },
    });

    const text = response.text || 'Не удалось сформировать ответ. Попробуйте уточнить вопрос.';
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    const groundingChunks = rawChunks
      .map((c: any) => {
        if (c.web?.uri) {
          return {
            title: c.web.title || 'Источник Google Search',
            uri: c.web.uri,
          };
        }
        return null;
      })
      .filter(Boolean);

    return {
      text,
      groundingChunks,
      webSearchQueries,
    };
  } catch (error: any) {
    console.error('Gemini API consultation error:', error);
    return {
      error: error?.message || 'Ошибка обработки запроса',
      text: 'В данный момент консультант не смог связаться с базой знаний. Вы можете ознакомиться с составом и инструкциями в карточке каждого продукта BRASH.',
      groundingChunks: [],
      webSearchQueries: [],
    };
  }
}
