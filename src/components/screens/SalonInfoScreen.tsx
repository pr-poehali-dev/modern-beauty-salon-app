import Icon from "@/components/ui/icon";

const SalonInfoScreen = () => {
  return (
    <div className="px-4 py-4 space-y-4 animate-fade-in">
      {/* Фото */}
      <div className="relative h-48 rounded-3xl overflow-hidden">
        <img
          src="https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/adf50aad-184f-4044-ad2a-95367aad896b.jpg"
          alt="Салон Модерн"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h2 className="text-white font-black text-2xl">Модерн</h2>
          <p className="text-white/80 text-sm">семейный салон красоты</p>
        </div>
      </div>

      {/* Контакты */}
      <div className="bg-white rounded-3xl p-4 card-shadow space-y-3">
        <h3 className="font-bold text-sm text-foreground mb-1">Контакты и адрес</h3>

        {[
          { icon: "MapPin", label: "Адрес", value: "ул. Пушкина, 10, Москва", action: "Маршрут" },
          { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67", action: "Позвонить" },
          { icon: "Clock", label: "Режим работы", value: "Пн–Сб 9:00–21:00\nВс 10:00–18:00", action: null },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-3 bg-muted/40 rounded-2xl">
            <div className="w-9 h-9 orange-gradient rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name={item.icon} size={16} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium">{item.label}</p>
              <p className="text-sm font-semibold text-foreground whitespace-pre-line">{item.value}</p>
            </div>
            {item.action && (
              <button className="orange-gradient text-white text-xs font-bold px-3 py-2 rounded-xl flex-shrink-0 active:scale-95 transition-all">
                {item.action}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Карта-заглушка */}
      <div className="bg-white rounded-3xl overflow-hidden card-shadow">
        <div className="h-44 bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center gap-2">
          <Icon name="MapPin" size={32} className="text-orange-400" />
          <p className="text-sm font-semibold text-orange-500">Яндекс Карты</p>
          <p className="text-xs text-muted-foreground">ул. Пушкина, 10</p>
        </div>
        <div className="p-4">
          <button className="w-full py-3 orange-gradient text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <Icon name="Navigation" size={16} />
            Проложить маршрут
          </button>
        </div>
      </div>

      {/* Чат */}
      <div className="bg-white rounded-3xl p-4 card-shadow">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 orange-gradient rounded-2xl flex items-center justify-center">
            <Icon name="MessageCircle" size={22} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-foreground">Чат с администратором</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-green-600 font-medium">Онлайн · ответим за 5 мин</p>
            </div>
          </div>
        </div>
        <button className="w-full py-3 border-2 border-orange-200 bg-orange-50 text-orange-600 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
          <Icon name="MessageCircle" size={16} />
          Написать в чат
        </button>
      </div>

      {/* Соцсети */}
      <div className="bg-white rounded-3xl p-4 card-shadow">
        <h3 className="font-bold text-sm text-foreground mb-3">Мы в соцсетях</h3>
        <div className="flex gap-2">
          {[
            { name: "ВКонтакте", icon: "Globe", color: "bg-blue-50 text-blue-500 border-blue-200" },
            { name: "Instagram", icon: "Camera", color: "bg-pink-50 text-pink-500 border-pink-200" },
            { name: "Telegram", icon: "Send", color: "bg-sky-50 text-sky-500 border-sky-200" },
          ].map((s) => (
            <button key={s.name} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 ${s.color} active:scale-95 transition-all text-xs font-semibold`}>
              <Icon name={s.icon} size={18} />
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-4" />
    </div>
  );
};

export default SalonInfoScreen;
