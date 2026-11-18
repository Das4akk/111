export interface Review {
  id: string;
  author: string;
  city: string;
  skinType: string;
  rating: number;
  date: string;
  productName: string;
  productId: string;
  comment: string;
  verified: boolean;
  avatar: string;
  highlight: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Екатерина В.',
    city: 'Брянск',
    skinType: 'Сухая, склонная к шелушениям',
    rating: 5,
    date: '3 дня назад',
    productName: 'BRASH Milk Cream',
    productId: 'brash-milk-cream',
    highlight: '«Кожа буквально ожила за 4 дня»',
    comment: 'Забирала заказ прямо в офисе на проспекте Ленина! Milk Cream от BRASH стал настоящим спасением — текстура нежнейшая, мгновенно смягчает и убирает все шелушения без тяжести.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'rev-2',
    author: 'Дарья П.',
    city: 'Брянск',
    skinType: 'Склонность к отечности и потере четкости овала',
    rating: 5,
    date: '1 неделю назад',
    productName: 'BRASH PDRN Valkyrie',
    productId: 'brash-pdrn-valkyrie',
    highlight: '«Четкий овал без отеков и реабилитации»',
    comment: 'Валькирия — абсолютный фаворит! Очень комфортное действие, никакого дискомфорта, при этом лишний объем в области подбородка ушел мягко, а кожа осталась упругой и подтянутой.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
  },
];

