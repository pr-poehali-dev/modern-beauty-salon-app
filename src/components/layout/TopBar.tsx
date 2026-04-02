import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  title: string;
  onChatOpen: () => void;
  onCatalogOpen?: () => void;
}

const TopBar = ({ title, onChatOpen, onCatalogOpen }: TopBarProps) => {
  return (
    <header className="glass sticky top-0 z-40 border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 orange-gradient rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-semibold">М</span>
          </div>
          <span className="font-medium text-sm text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {onCatalogOpen && (
            <button
              onClick={onCatalogOpen}
              className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Icon name="ShoppingBag" size={17} className="text-orange-500" />
            </button>
          )}
          <button
            onClick={onChatOpen}
            className="relative w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center active:scale-95 transition-transform"
          >
            <Icon name="MessageCircle" size={17} className="text-orange-500" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[9px] bg-orange-500 text-white border-0">
              2
            </Badge>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
