import { useState } from "react";
import Icon from "@/components/ui/icon";

const categories = ["Все", "Волосы", "Ногти", "Уход", "Макияж"];

const products = [
  {
    id: 1,
    name: "Сыворотка Olaplex №7",
    brand: "Olaplex",
    price: 3200,
    category: "Волосы",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/95c6812e-4283-4b02-b514-6f68df13736c.jpg",
    description: "Восстанавливает структуру волос, защищает от термоповреждений",
    inStock: true,
  },
  {
    id: 2,
    name: "Маска для волос Кератин",
    brand: "Kerastase",
    price: 4100,
    category: "Волосы",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/bcfaabd9-c42b-452e-a5e0-b6d374f28643.jpg",
    description: "Глубокое питание и восстановление повреждённых волос",
    inStock: true,
  },
  {
    id: 3,
    name: "Набор гель-лаков",
    brand: "Luxio",
    price: 2400,
    category: "Ногти",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6e1376c1-ef94-4bba-9f36-afe8cf4991d6.jpg",
    description: "Профессиональный набор из 5 оттенков, стойкость до 4 недель",
    inStock: true,
  },
  {
    id: 4,
    name: "Крем для лица SPF50",
    brand: "La Roche-Posay",
    price: 2890,
    category: "Уход",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/d9780ffe-4693-483c-87b1-385cebd3bab8.jpg",
    description: "Дневной увлажняющий крем с защитой от UV-излучения",
    inStock: true,
  },
  {
    id: 5,
    name: "Масло для кутикулы",
    brand: "CND",
    price: 890,
    category: "Ногти",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/6e1376c1-ef94-4bba-9f36-afe8cf4991d6.jpg",
    description: "Питает и увлажняет кутикулу, придаёт ногтям блеск",
    inStock: false,
  },
  {
    id: 6,
    name: "Термозащитный спрей",
    brand: "Moroccanoil",
    price: 1750,
    category: "Волосы",
    photo: "https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/95c6812e-4283-4b02-b514-6f68df13736c.jpg",
    description: "Защита при укладке до 230°C, лёгкость и блеск",
    inStock: true,
  },
];

const CatalogScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [reserved, setReserved] = useState<number[]>([]);
  const [detailId, setDetailId] = useState<number | null>(null);

  const filtered = activeCategory === "Все"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const detail = products.find((p) => p.id === detailId);

  if (detail) {
    return (
      <div className="flex flex-col h-full bg-background animate-fade-in">
        <div className="relative h-72 flex-shrink-0">
          <img src={detail.photo} alt={detail.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={() => setDetailId(null)}
            className="absolute top-4 left-4 w-9 h-9 glass rounded-2xl flex items-center justify-center active:scale-95 transition-all"
          >
            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          {!detail.inStock && (
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1.5 rounded-xl font-medium">
              Нет в наличии
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium">{detail.brand}</p>
            <h2 className="text-xl font-bold text-foreground mt-0.5">{detail.name}</h2>
            <p className="text-2xl font-black text-orange-500 mt-1">{detail.price.toLocaleString()} ₽</p>
          </div>
          <div className="bg-muted/40 rounded-2xl p-4">
            <p className="text-sm text-foreground leading-relaxed">{detail.description}</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-3">
            <p className="text-xs text-orange-600 font-medium">
              +10 Б при бронировании · +30 Б при выкупе в салоне
            </p>
          </div>
          <div className="flex gap-2 pb-4">
            {reserved.includes(detail.id) ? (
              <div className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-50 border border-green-200 text-green-600 font-medium text-sm">
                <Icon name="CheckCircle" size={16} />
                Забронировано
              </div>
            ) : (
              <button
                disabled={!detail.inStock}
                onClick={() => setReserved((p) => [...p, detail.id])}
                className="flex-1 py-3.5 orange-gradient text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-40"
              >
                <Icon name="ShoppingBag" size={16} />
                Забронировать
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Шапка */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-white border border-border flex items-center justify-center active:scale-95 transition-all card-shadow">
          <Icon name="ChevronLeft" size={18} className="text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Каталог товаров</h2>
      </div>

      {/* Категории */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat
                ? "orange-gradient text-white shadow-sm"
                : "bg-white border border-border text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Товары */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-4">
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <button
              key={product.id}
              onClick={() => setDetailId(product.id)}
              className="bg-white rounded-2xl overflow-hidden card-shadow text-left active:scale-[0.97] transition-all"
            >
              <div className="relative h-36">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-[10px] font-semibold bg-black/50 px-2 py-1 rounded-lg">Нет в наличии</span>
                  </div>
                )}
                {reserved.includes(product.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-muted-foreground">{product.brand}</p>
                <p className="text-xs font-semibold text-foreground leading-tight mt-0.5 line-clamp-2">{product.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-orange-500">{product.price.toLocaleString()} ₽</span>
                  <span className="text-[10px] text-orange-400 font-medium">+10 Б</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogScreen;
