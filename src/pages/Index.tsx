import { useState } from "react";
import BookingScreen from "@/components/screens/BookingScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import SalonInfoScreen from "@/components/screens/SalonInfoScreen";
import MasterProfileScreen from "@/components/screens/MasterProfileScreen";
import CatalogScreen from "@/components/screens/CatalogScreen";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";
import LoginScreen from "@/components/screens/LoginScreen";

export type Screen = "booking" | "loyalty" | "history" | "profile" | "salon";

type OverlayScreen =
  | { type: "master"; masterId: number }
  | { type: "catalog" }
  | null;

const screenTitles: Record<Screen, string> = {
  booking: "Онлайн-запись",
  loyalty: "Программа лояльности",
  history: "История посещений",
  profile: "Мой профиль",
  salon: "О салоне",
};

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("booking");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [overlay, setOverlay] = useState<OverlayScreen>(null);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (overlay?.type === "master") {
    return (
      <div className="flex flex-col h-full max-w-md mx-auto">
        <MasterProfileScreen
          masterId={overlay.masterId}
          onBack={() => setOverlay(null)}
          onBook={() => { setOverlay(null); setActiveScreen("booking"); }}
        />
      </div>
    );
  }

  if (overlay?.type === "catalog") {
    return (
      <div className="flex flex-col h-full max-w-md mx-auto">
        <CatalogScreen onBack={() => setOverlay(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background max-w-md mx-auto relative">
      <TopBar
        title={screenTitles[activeScreen]}
        onChatOpen={() => {}}
        onCatalogOpen={() => setOverlay({ type: "catalog" })}
      />

      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {activeScreen === "booking" && (
          <BookingScreen onMasterClick={(id) => setOverlay({ type: "master", masterId: id })} />
        )}
        {activeScreen === "loyalty" && <LoyaltyScreen />}
        {activeScreen === "history" && (
          <HistoryScreen
            onGoToLoyalty={() => setActiveScreen("loyalty")}
            onCatalogOpen={() => setOverlay({ type: "catalog" })}
          />
        )}
        {activeScreen === "profile" && (
          <ProfileScreen onMasterClick={(id) => setOverlay({ type: "master", masterId: id })} />
        )}
        {activeScreen === "salon" && <SalonInfoScreen />}
      </main>

      <BottomNav active={activeScreen} onChange={setActiveScreen} />
    </div>
  );
};

export default Index;
