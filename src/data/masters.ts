export const masters = [
  {
    id: 1,
    name: "Анна Соколова",
    role: "Стилист-колорист",
    slogan: "Создаю образы, которые меняют жизнь",
    rating: 4.9,
    reviews: 134,
    experience: "8 лет",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/385c8106-0371-4f15-9192-fb060c22c1e3.jpg",
    works: [
      "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/e557819a-2dc1-46ae-b625-cb8616dbd469.jpg",
      "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6766d82c-18a0-4c3b-b125-85aac8de9638.jpg",
    ],
    certificates: [
      "Колористика L'Oréal Professionnel 2023",
      "Мастер-класс Wella Professionals",
      "Техники окрашивания Balayage & Highlights",
    ],
    reviews: [
      { author: "Татьяна К.", rating: 5, text: "Анна — настоящий профессионал! Окрасила волосы именно так, как я хотела.", date: "20 марта 2026" },
      { author: "Светлана М.", rating: 5, text: "Лучший стилист в Москве! Хожу уже 3 года, всегда восхитительный результат.", date: "5 марта 2026" },
      { author: "Ольга Д.", rating: 5, text: "Сделала стрижку и укладку на свадьбу — все гости были в восторге!", date: "14 февраля 2026" },
    ] as { author: string; rating: number; text: string; date: string }[],
  },
  {
    id: 2,
    name: "Мария Белова",
    role: "Мастер маникюра",
    slogan: "Каждый ноготь — маленький шедевр",
    rating: 4.8,
    reviews: 89,
    experience: "5 лет",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/f660d679-c1ac-4381-8780-b0017091d585.jpg",
    works: [
      "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6e1376c1-ef94-4bba-9f36-afe8cf4991d6.jpg",
    ],
    certificates: [
      "Технологии гель-лак Advanced 2024",
      "Nail Art Professional Certificate",
    ],
    reviews: [
      { author: "Ирина В.", rating: 5, text: "Маша — золотые руки! Маникюр держится больше месяца.", date: "25 марта 2026" },
      { author: "Дарья П.", rating: 4, text: "Очень аккуратно работает, приятная атмосфера.", date: "10 марта 2026" },
    ] as { author: string; rating: number; text: string; date: string }[],
  },
  {
    id: 3,
    name: "Ольга Петрова",
    role: "Визажист",
    slogan: "Подчёркиваю вашу естественную красоту",
    rating: 4.7,
    reviews: 56,
    experience: "6 лет",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/ef3aee44-5d45-42cf-bfec-268fb2df57ac.jpg",
    works: [
      "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6766d82c-18a0-4c3b-b125-85aac8de9638.jpg",
    ],
    certificates: [
      "Make Up For Ever Artist Course",
      "Техники свадебного макияжа",
    ],
    reviews: [
      { author: "Наталья С.", rating: 5, text: "Ольга сделала сногсшибательный макияж на выпускной дочери!", date: "22 марта 2026" },
    ] as { author: string; rating: number; text: string; date: string }[],
  },
];
