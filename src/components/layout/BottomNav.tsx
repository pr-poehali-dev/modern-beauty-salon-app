import Icon from "@/components/ui/icon";
import { Screen } from "@/pages/Index";

interface NavItem {
  id: Screen;
  label: string;
  icon: string;
}

const items: NavItem[] = [
  { id: "booking", label: "Запись", icon: "CalendarPlus" },
  { id: "loyalty", label: "Баллы", icon: "Star" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "salon", label: "Салон", icon: "MapPin" },
];

interface BottomNavProps {
  active: Screen;
  onChange: (screen: Screen) => void;
}

const BottomNav = ({ active, onChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md glass border-t border-border z-40">
      <div className="flex items-center justify-around px-1 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? "text-orange-500"
                  : "text-muted-foreground"
              }`}
            >
              <div className={`relative transition-all duration-200 ${isActive ? "scale-110" : ""}`}>
                {isActive && (
                  <div className="absolute inset-0 bg-orange-100 rounded-full scale-150 opacity-60" />
                )}
                <Icon
                  name={item.icon}
                  size={22}
                  className={`relative z-10 ${isActive ? "text-orange-500" : "text-muted-foreground"}`}
                />
              </div>
              <span className={`text-[10px] font-medium leading-none ${isActive ? "text-orange-500" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
