import Icon from "@/components/ui/icon";

const levels = [
  { name: "Новый клиент", min: 0, max: 499, serviceDiscount: 10, cosmeticDiscount: 0, color: "#A8998C" },
  { name: "Постоянный гость", min: 500, max: 1499, serviceDiscount: 20, cosmeticDiscount: 10, color: "#FF8C00" },
  { name: "Постоянный клиент", min: 1500, max: 2999, serviceDiscount: 30, cosmeticDiscount: 20, color: "#E67A00" },
  { name: "Любимый клиент", min: 3000, max: Infinity, serviceDiscount: 40, cosmeticDiscount: 30, color: "#CC6000" },
];

const bonusActions = [
  { action: "Первая запись", points: "+100", icon: "Sparkles" },
  { action: "Запись на услугу", points: "+10", icon: "CalendarPlus" },
  { action: "Посещение услуги", points: "+50", icon: "CheckCircle" },
  { action: "Заполнение профиля", points: "+30", icon: "User" },
  { action: "День рождения", points: "+150", icon: "Gift" },
  { action: "Запись члена семьи", points: "+40", icon: "Users" },
  { action: "Отзыв", points: "+20", icon: "Star" },
  { action: "Бронь косметики", points: "+10", icon: "ShoppingBag" },
  { action: "Выкуп косметики", points: "+30", icon: "Package" },
  { action: "Привёл друга", points: "+100", icon: "UserPlus" },
];

const BALANCE = 1400;
const BURN_DAYS = 42;

const LoyaltyScreen = () => {
  const currentLevel = levels.find(l => BALANCE >= l.min && BALANCE <= l.max) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? ((BALANCE - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      {/* Карта баллов */}
      <div className="relative overflow-hidden rounded-3xl p-5 orange-gradient text-white shadow-lg">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">Баланс баллов</p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black leading-none">{BALANCE.toLocaleString()}</span>
                <span className="text-white/70 text-base font-medium mb-1">Б</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-3 shadow-sm">
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-0.5">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-[2px] ${[0,3,4,5,6,7,10,11,12,13,15].includes(i) ? "bg-foreground" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-2 w-fit">
            <Icon name="AlertCircle" size={13} className="text-white/80" />
            <span className="text-xs text-white/90 font-medium">Сгорят через {BURN_DAYS} дней</span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/20">
            <p className="text-white/70 text-xs">Курс: 1 балл = 0,5 ₽ · Списание не более 10% от суммы</p>
          </div>
        </div>
      </div>

      {/* Уровень */}
      <div className="bg-white rounded-3xl p-4 card-shadow">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Ваш уровень</p>
            <p className="font-black text-lg text-foreground">{currentLevel.name}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Скидки</p>
            <p className="text-sm font-bold text-orange-500">{currentLevel.serviceDiscount}% услуги</p>
            <p className="text-xs text-muted-foreground">{currentLevel.cosmeticDiscount}% косметика</p>
          </div>
        </div>
        {nextLevel && (
          <>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>{BALANCE} Б</span>
              <span>до {nextLevel.name}: {nextLevel.min - BALANCE} Б</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full orange-gradient rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
        {!nextLevel && (
          <div className="flex items-center gap-2 bg-orange-50 rounded-xl px-3 py-2">
            <Icon name="Crown" size={16} className="text-orange-500" />
            <p className="text-orange-600 text-xs font-semibold">Вы на максимальном уровне!</p>
          </div>
        )}
      </div>

      {/* Таблица уровней */}
      <div className="bg-white rounded-3xl p-4 card-shadow">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Icon name="Trophy" size={16} className="text-orange-500" />
          Уровни программы
        </h3>
        <div className="space-y-2">
          {levels.map((level) => {
            const isCurrent = level.name === currentLevel.name;
            return (
              <div
                key={level.name}
                className={`flex items-center justify-between p-3 rounded-2xl transition-all ${isCurrent ? "bg-orange-50 border-2 border-orange-200" : "bg-muted/40"}`}
              >
                <div>
                  <p className={`font-semibold text-xs ${isCurrent ? "text-orange-600" : "text-foreground"}`}>{level.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {level.max === Infinity ? `от ${level.min}` : `${level.min}–${level.max}`} Б
                  </p>
                </div>
                <div className="flex gap-3 text-right">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Услуги</p>
                    <p className={`text-sm font-black ${isCurrent ? "text-orange-500" : "text-foreground"}`}>{level.serviceDiscount}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Косметика</p>
                    <p className={`text-sm font-black ${isCurrent ? "text-orange-500" : "text-foreground"}`}>{level.cosmeticDiscount}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Как получить баллы */}
      <div className="bg-white rounded-3xl p-4 card-shadow">
        <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-orange-500" />
          Как получить баллы
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {bonusActions.map((b) => (
            <div key={b.action} className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-xl">
              <div className="w-7 h-7 orange-gradient-soft rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={b.icon} size={13} className="text-orange-500" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground leading-tight">{b.action}</p>
                <p className="text-xs font-black text-orange-500">{b.points} Б</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-4" />
    </div>
  );
};

export default LoyaltyScreen;
