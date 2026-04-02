import { useState } from "react";
import Icon from "@/components/ui/icon";

interface HistoryScreenProps {
  onGoToLoyalty: () => void;
}

const visits = [
  {
    id: 1,
    client: "Я (Мария)",
    date: "28 марта 2026",
    time: "14:00",
    service: "Стрижка + укладка",
    price: 2800,
    master: "Анна Соколова",
    masterId: 1,
    points: 50,
    burnDate: "28 сентября 2026",
    hasReview: false,
    recommendation: {
      name: "Сыворотка для волос Olaplex",
      price: 3200,
    },
    photos: [
      "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6766d82c-18a0-4c3b-b125-85aac8de9638.jpg",
    ],
  },
  {
    id: 2,
    client: "Дочь Катя",
    date: "15 марта 2026",
    time: "11:00",
    service: "Окрашивание",
    price: 4500,
    master: "Анна Соколова",
    masterId: 1,
    points: 50,
    burnDate: "15 сентября 2026",
    hasReview: true,
    recommendation: null,
    photos: [],
  },
  {
    id: 3,
    client: "Я (Мария)",
    date: "2 марта 2026",
    time: "16:30",
    service: "Маникюр + покрытие",
    price: 2200,
    master: "Мария Белова",
    masterId: 2,
    points: 50,
    burnDate: "2 сентября 2026",
    hasReview: false,
    recommendation: {
      name: "Укрепляющий топ-гель Luxio",
      price: 890,
    },
    photos: [],
  },
];

const HistoryScreen = ({ onGoToLoyalty }: HistoryScreenProps) => {
  const [reviewOpen, setReviewOpen] = useState<number | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<number[]>([]);

  const handleReviewSubmit = (visitId: number) => {
    setSubmittedReviews(p => [...p, visitId]);
    setReviewOpen(null);
    setReviewText("");
    setRating(5);
  };

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-black text-lg text-foreground">Мои визиты</h2>
        <button
          onClick={onGoToLoyalty}
          className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl text-orange-600 text-xs font-semibold active:scale-95 transition-all"
        >
          <Icon name="Star" size={13} className="text-orange-500" />
          Мой баланс
        </button>
      </div>

      {visits.map((visit) => {
        const hasReview = visit.hasReview || submittedReviews.includes(visit.id);
        return (
          <div key={visit.id} className="bg-white rounded-3xl overflow-hidden card-shadow">
            {/* Фото */}
            {visit.photos.length > 0 && (
              <div className="relative h-40 overflow-hidden">
                <img src={visit.photos[0]} alt="До/После" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-xs font-semibold bg-black/40 px-2 py-1 rounded-lg">Фото до/после</span>
                </div>
              </div>
            )}

            <div className="p-4">
              {/* Шапка */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Icon name="User" size={13} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-medium">{visit.client}</span>
                  </div>
                  <p className="font-bold text-base text-foreground">{visit.service}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{visit.date} · {visit.time} · {visit.master}</p>
                </div>
                <span className="font-black text-lg text-orange-500">{visit.price.toLocaleString()} ₽</span>
              </div>

              {/* Баллы */}
              <div className="flex items-center gap-1.5 bg-orange-50 rounded-xl px-3 py-2 mb-3">
                <Icon name="Star" size={13} className="text-orange-400 fill-orange-400" />
                <span className="text-xs text-orange-600 font-medium">
                  Начислено +{visit.points} Б · сгорят {visit.burnDate}
                </span>
              </div>

              {/* Действия */}
              <div className="flex gap-2">
                {!hasReview ? (
                  <button
                    onClick={() => setReviewOpen(visit.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold active:scale-95 transition-all"
                  >
                    <Icon name="MessageSquare" size={13} />
                    Отзыв +15 Б
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-muted/40 text-muted-foreground text-xs font-medium">
                    <Icon name="CheckCircle" size={13} />
                    Отзыв оставлен
                  </div>
                )}
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl orange-gradient text-white text-xs font-semibold active:scale-95 transition-all">
                  <Icon name="RotateCcw" size={13} />
                  Снова +10 Б
                </button>
              </div>

              {/* Форма отзыва */}
              {reviewOpen === visit.id && (
                <div className="mt-3 border-t border-border pt-3 animate-fade-in">
                  <p className="text-sm font-semibold text-foreground mb-2">Оставить отзыв</p>
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map((s) => (
                      <button key={s} onClick={() => setRating(s)}>
                        <Icon name="Star" size={28} className={s <= rating ? "text-orange-400 fill-orange-400" : "text-muted"} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Напишите о вашем впечатлении..."
                    className="w-full p-3 rounded-xl border border-border bg-muted/30 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setReviewOpen(null)}
                      className="flex-1 py-2.5 rounded-xl border border-border text-muted-foreground text-xs font-medium"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => handleReviewSubmit(visit.id)}
                      className="flex-1 py-2.5 rounded-xl orange-gradient text-white text-xs font-bold active:scale-95 transition-all"
                    >
                      Отправить +15 Б
                    </button>
                  </div>
                </div>
              )}

              {/* Рекомендация мастера */}
              {visit.recommendation && (
                <div className="mt-3 border-t border-border pt-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                    <Icon name="Sparkles" size={12} className="text-orange-400" />
                    Мастер рекомендует
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{visit.recommendation.name}</p>
                      <p className="text-orange-500 font-black text-sm">{visit.recommendation.price.toLocaleString()} ₽</p>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="py-2 px-3 rounded-xl bg-muted/50 text-xs font-medium text-foreground active:scale-95 transition-all">
                        Каталог
                      </button>
                      <button className="py-2 px-3 rounded-xl orange-gradient text-white text-xs font-bold active:scale-95 transition-all">
                        Забронировать
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div className="pb-4" />
    </div>
  );
};

export default HistoryScreen;
