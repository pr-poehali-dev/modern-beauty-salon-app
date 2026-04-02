import { useState } from "react";
import BookingScreen from "@/components/screens/BookingScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import HistoryScreen from "@/components/screens/HistoryScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import SalonInfoScreen from "@/components/screens/SalonInfoScreen";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";
import LoginScreen from "@/components/screens/LoginScreen";

export type Screen = "booking" | "loyalty" | "history" | "profile" | "salon";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("booking");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const screenTitles: Record<Screen, string> = {
    booking: "Онлайн-запись",
    loyalty: "Программа лояльности",
    history: "История посещений",
    profile: "Мой профиль",
    salon: "О салоне",
  };

  return (
    <div className="flex flex-col h-full bg-background max-w-md mx-auto relative">
      <TopBar title={screenTitles[activeScreen]} onChatOpen={() => {}} />

      <main className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {activeScreen === "booking" && <BookingScreen />}
        {activeScreen === "loyalty" && <LoyaltyScreen />}
        {activeScreen === "history" && <HistoryScreen onGoToLoyalty={() => setActiveScreen("loyalty")} />}
        {activeScreen === "profile" && <ProfileScreen />}
        {activeScreen === "salon" && <SalonInfoScreen />}
      </main>

      <BottomNav active={activeScreen} onChange={setActiveScreen} />
    </div>
  );
};

export default Index;
