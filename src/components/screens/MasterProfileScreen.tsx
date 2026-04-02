import Icon from "@/components/ui/icon";
import { masters } from "@/data/masters";

interface MasterProfileScreenProps {
  masterId: number;
  onBack: () => void;
  onBook: () => void;
}

const MasterProfileScreen = ({ masterId, onBack, onBook }: MasterProfileScreenProps) => {
  const master = masters.find((m) => m.id === masterId);
  if (!master) return null;

  return (
    <div className="flex flex-col h-full bg-background animate-fade-in">
      {/* Шапка с фото */}
      <div className="relative h-72 flex-shrink-0">
        <img
          src={master.photo}
          alt={master.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 glass rounded-2xl flex items-center justify-center active:scale-95 transition-all"
        >
          <Icon name="ChevronLeft" size={20} className="text-white" />
        </button>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">{master.role}</p>
          <h1 className="text-white text-2xl font-bold leading-tight">{master.name}</h1>
          <p className="text-white/80 text-sm mt-0.5 italic">«{master.slogan}»</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((s) => (
                <Icon key={s} name="Star" size={13}
                  className={s <= Math.round(master.rating) ? "text-orange-400 fill-orange-400" : "text-white/30"} />
              ))}
              <span className="text-white font-semibold text-sm ml-1">{master.rating}</span>
            </div>
            <span className="text-white/60 text-xs">{(master.reviews as { author: string; rating: number; text: string; date: string }[]).length} отзывов</span>
            <span className="text-white/60 text-xs">·</span>
            <span className="text-white/60 text-xs">{master.experience} опыта</span>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-4 py-4 space-y-4">

          {/* Кнопка записи */}
          <button
            onClick={onBook}
            className="w-full py-3.5 orange-gradient text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-sm"
          >
            <Icon name="CalendarPlus" size={17} />
            Записаться к {master.name.split(" ")[0]}
          </button>

          {/* Работы */}
          {master.works.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Icon name="Image" size={15} className="text-orange-500" />
                Мои работы
              </h3>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {master.works.map((url, i) => (
                  <div key={i} className="flex-shrink-0 w-44 h-44 rounded-2xl overflow-hidden card-shadow">
                    <img src={url} alt={`Работа ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Сертификаты */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Icon name="Award" size={15} className="text-orange-500" />
              Сертификаты и образование
            </h3>
            <div className="space-y-2">
              {master.certificates.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-2xl card-shadow">
                  <div className="w-8 h-8 orange-gradient-soft rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={14} className="text-orange-500" />
                  </div>
                  <p className="text-sm text-foreground flex-1">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Отзывы */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Icon name="MessageSquare" size={15} className="text-orange-500" />
              Отзывы клиентов
            </h3>
            <div className="space-y-3">
              {(master.reviews as { author: string; rating: number; text: string; date: string }[]).map((review, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 card-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 orange-gradient rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        {review.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.author}</p>
                        <p className="text-[10px] text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Icon key={s} name="Star" size={11}
                          className={s <= review.rating ? "text-orange-400 fill-orange-400" : "text-muted"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-4" />
        </div>
      </div>
    </div>
  );
};

export default MasterProfileScreen;
