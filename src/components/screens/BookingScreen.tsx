import { useState } from "react";
import Icon from "@/components/ui/icon";

const masters = [
  { id: 1, name: "Анна Соколова", role: "Стилист-колорист", rating: 4.9, reviews: 134, avatar: "👩‍🦰" },
  { id: 2, name: "Мария Белова", role: "Мастер маникюра", rating: 4.8, reviews: 89, avatar: "👩" },
  { id: 3, name: "Ольга Петрова", role: "Визажист", rating: 4.7, reviews: 56, avatar: "👩‍🦱" },
];

const services = [
  { id: 1, name: "Стрижка женская", price: 1800, duration: 60, category: "Волосы" },
  { id: 2, name: "Окрашивание", price: 4500, duration: 120, category: "Волосы" },
  { id: 3, name: "Укладка", price: 1200, duration: 45, category: "Волосы" },
  { id: 4, name: "Маникюр + покрытие", price: 2200, duration: 90, category: "Ногти" },
  { id: 5, name: "Педикюр", price: 2500, duration: 90, category: "Ногти" },
  { id: 6, name: "Макияж дневной", price: 2000, duration: 60, category: "Макияж" },
];

const timeSlots = ["10:00", "10:30", "11:00", "11:30", "12:00", "13:30", "14:00", "15:30", "16:00", "17:00"];

const familyMembers = [
  { id: 1, name: "Дочь Катя", role: "Дочь" },
  { id: 2, name: "Мама Светлана", role: "Мама" },
];

const days = [
  { date: "Пт", day: 4, full: "2026-04-04" },
  { date: "Сб", day: 5, full: "2026-04-05" },
  { date: "Вс", day: 6, full: "2026-04-06" },
  { date: "Пн", day: 7, full: "2026-04-07" },
  { date: "Вт", day: 8, full: "2026-04-08" },
  { date: "Ср", day: 9, full: "2026-04-09" },
];

const BookingScreen = () => {
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [forSelf, setForSelf] = useState(true);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center animate-scale-in">
        <div className="w-20 h-20 orange-gradient rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
          <Icon name="CheckCircle" size={40} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-foreground mb-2">Запись подтверждена!</h2>
        <p className="text-muted-foreground text-sm mb-1">
          {services.find(s => s.id === selectedService)?.name}
        </p>
        <p className="text-muted-foreground text-sm mb-6">
          {selectedDay}, {selectedTime} · {masters.find(m => m.id === selectedMaster)?.name}
        </p>
        <div className="bg-orange-50 rounded-2xl px-6 py-3 mb-6">
          <p className="text-orange-600 font-semibold text-sm">+10 баллов за запись начислено</p>
        </div>
        <button
          onClick={() => { setConfirmed(false); setSelectedMaster(null); setSelectedService(null); setSelectedDay(null); setSelectedTime(null); }}
          className="orange-gradient text-white font-bold px-8 py-3.5 rounded-2xl active:scale-95 transition-all"
        >
          Записаться ещё раз
        </button>
      </div>
    );
  }

  const canConfirm = selectedMaster && selectedService && selectedDay && selectedTime && (forSelf || selectedMember);

  return (
    <div className="px-4 py-4 space-y-5 animate-fade-in">
      {/* Для кого */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Для кого запись</h3>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setForSelf(true)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${forSelf ? "border-orange-500 bg-orange-50 text-orange-600" : "border-border bg-white text-muted-foreground"}`}
          >
            Для себя
          </button>
          <button
            onClick={() => setForSelf(false)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${!forSelf ? "border-orange-500 bg-orange-50 text-orange-600" : "border-border bg-white text-muted-foreground"}`}
          >
            Член семьи
          </button>
        </div>
        {!forSelf && (
          <div className="space-y-2 animate-fade-in">
            {familyMembers.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${selectedMember === m.id ? "border-orange-500 bg-orange-50" : "border-border bg-white"}`}
              >
                <div className="w-8 h-8 orange-gradient-soft rounded-full flex items-center justify-center text-sm">👤</div>
                <div className="text-left">
                  <p className="font-semibold text-sm text-foreground">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
                {selectedMember === m.id && <Icon name="CheckCircle" size={18} className="text-orange-500 ml-auto" />}
              </button>
            ))}
            <button className="w-full flex items-center gap-2 p-3 rounded-xl border-2 border-dashed border-orange-300 text-orange-500 text-sm font-medium">
              <Icon name="UserPlus" size={16} />
              Добавить члена семьи
            </button>
          </div>
        )}
      </div>

      {/* Мастер */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Выберите мастера</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {masters.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMaster(m.id)}
              className={`flex-shrink-0 w-28 rounded-2xl p-3 text-center border-2 transition-all card-shadow active:scale-95 ${selectedMaster === m.id ? "border-orange-500 bg-orange-50" : "border-transparent bg-white"}`}
            >
              <div className="text-3xl mb-1">{m.avatar}</div>
              <p className="font-semibold text-xs text-foreground leading-tight">{m.name}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.role}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Icon name="Star" size={10} className="text-orange-400 fill-orange-400" />
                <span className="text-[10px] font-bold text-orange-500">{m.rating}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Услуга */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Выберите услугу</h3>
        <div className="space-y-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedService(s.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all active:scale-[0.98] bg-white card-shadow ${selectedService === s.id ? "border-orange-500 bg-orange-50" : "border-transparent"}`}
            >
              <div className="text-left">
                <p className="font-semibold text-sm text-foreground">{s.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{s.category}</span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                    <Icon name="Clock" size={10} /> {s.duration} мин
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-orange-500">{s.price.toLocaleString()} ₽</span>
                {selectedService === s.id && <Icon name="CheckCircle" size={18} className="text-orange-500" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Дата */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Выберите дату</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {days.map((d) => (
            <button
              key={d.full}
              onClick={() => setSelectedDay(d.full)}
              className={`flex-shrink-0 flex flex-col items-center py-2.5 px-3.5 rounded-2xl border-2 transition-all ${selectedDay === d.full ? "border-orange-500 bg-orange-500 text-white" : "border-border bg-white text-foreground"}`}
            >
              <span className={`text-[10px] font-medium ${selectedDay === d.full ? "text-orange-100" : "text-muted-foreground"}`}>{d.date}</span>
              <span className="text-xl font-black leading-none">{d.day}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Время */}
      {selectedDay && (
        <div className="animate-fade-in">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Свободное время</h3>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 ${selectedTime === t ? "border-orange-500 bg-orange-500 text-white" : "border-border bg-white text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Кнопка */}
      <div className="pt-2 pb-4">
        <button
          disabled={!canConfirm}
          onClick={() => setConfirmed(true)}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98] shadow-sm ${canConfirm ? "orange-gradient text-white" : "bg-muted text-muted-foreground"}`}
        >
          Подтвердить запись
        </button>
        {canConfirm && (
          <p className="text-center text-xs text-orange-500 font-medium mt-2 animate-fade-in">
            +10 баллов за запись
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingScreen;
