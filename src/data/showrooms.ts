export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  landmark?: string;
  hours: string;
  phone: string;
  phones: Array<{ label: string; href: string }>;
  telegram: string;
  whatsapp: string;
  features: string[];
  description: string;
  isFlagship: boolean;
  mapsUrl: string;
}

export const SHOWROOMS: Showroom[] = [
  {
    id: 'bryansk-lenina-99',
    name: 'Офис и шоурум «Точка красоты» BRASH SYSTEM',
    city: 'Брянск',
    address: 'проспект Ленина, д. 99',
    landmark: 'Центр города (Советский район)',
    hours: 'Ежедневно с 10:00 до 20:00',
    phone: '8 (910) 298-27-30 • 8 (919) 296-77-79',
    phones: [
      { label: '8 (910) 298-27-30', href: 'tel:+79102982730' },
      { label: '8 (919) 296-77-79', href: 'tel:+79192967779' },
    ],
    telegram: '',
    whatsapp: '',
    features: [
      'Полный ассортимент оригинальных препаратов и кремов BRASH SYSTEM',
      'Курьерская доставка по Брянску (от 5 000 ₽ бесплатно) и отправка СДЭК по всей России',
      'Оплата на руки при получении, самовывоз без ожидания доставки',
      'Индивидуальный подбор домашнего и салонного протокола ухода',
    ],
    description:
      'Официальный офис и пространство красоты «Точка красоты» в Брянске по адресу проспект Ленина, д. 99. Здесь вы можете лично познакомиться с профессиональной линейкой BRASH SYSTEM, забрать заказ или оформить курьерскую доставку по городу и отправку СДЭК.',
    isFlagship: true,
    mapsUrl: 'https://yandex.ru/maps/?text=Брянск+проспект+Ленина+99',
  },
];
