import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) setStep("code");
  };

  const handleCodeSubmit = () => {
    if (code.length === 4) onLogin();
  };

  return (
    <div className="min-h-full flex flex-col relative overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/47c6ee97-f17a-4bf0-afed-87d226d44dee/files/adf50aad-184f-4044-ad2a-95367aad896b.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
      </div>

      <div className="relative z-10 flex flex-col h-full min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
          <div className="animate-fade-in text-center">
            <div className="w-20 h-20 orange-gradient rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white text-3xl font-black">М</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">Модерн</h1>
            <p className="text-white/80 text-base font-medium">семейный салон красоты</p>
          </div>
        </div>

        <div className="relative z-10 px-4 pb-10 animate-slide-up animate-delay-200">
          <div className="bg-white rounded-3xl p-6 card-shadow">
            {step === "phone" ? (
              <>
                <h2 className="text-xl font-semibold text-foreground mb-1">Войти в аккаунт</h2>
                <p className="text-sm text-muted-foreground mb-5">Введите номер телефона — отправим SMS с кодом</p>

                <div className="relative mb-4">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm">+7</div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="(999) 999-99-99"
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-medium text-base focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>

                <button
                  onClick={handlePhoneSubmit}
                  disabled={phone.length < 10}
                  className="w-full py-3.5 orange-gradient rounded-2xl text-white font-bold text-base disabled:opacity-40 active:scale-[0.98] transition-all shadow-sm"
                >
                  Получить код
                </button>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">или</span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                <button className="mt-4 w-full py-3.5 rounded-2xl border-2 border-[#4C75A3] text-[#4C75A3] font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
                  <span className="text-lg">VK</span>
                  Войти через VK ID
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setStep("phone")} className="flex items-center gap-1 text-sm text-muted-foreground mb-4 active:opacity-70">
                  <Icon name="ChevronLeft" size={16} />
                  Назад
                </button>
                <h2 className="text-xl font-bold text-foreground mb-1">Введите код</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Отправили SMS на номер <span className="font-semibold text-foreground">+7 {phone}</span>
                </p>

                <div className="flex gap-3 mb-5 justify-center">
                  {[0,1,2,3].map((i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-black transition-all ${
                        code[i]
                          ? "border-orange-500 bg-orange-50 text-orange-600"
                          : "border-border bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      {code[i] || "·"}
                    </div>
                  ))}
                  <input
                    type="tel"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="absolute opacity-0 w-0 h-0"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mb-5">
                  {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((num, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (num === "⌫") setCode(c => c.slice(0,-1));
                        else if (num && code.length < 4) setCode(c => c + num);
                      }}
                      className={`h-14 rounded-2xl text-xl font-semibold transition-all active:scale-95 ${
                        num ? "bg-muted/60 text-foreground hover:bg-muted" : "invisible"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCodeSubmit}
                  disabled={code.length < 4}
                  className="w-full py-3.5 orange-gradient rounded-2xl text-white font-bold text-base disabled:opacity-40 active:scale-[0.98] transition-all shadow-sm"
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;