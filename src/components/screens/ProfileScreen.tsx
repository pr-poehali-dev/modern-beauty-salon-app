import { useState } from "react";
import Icon from "@/components/ui/icon";

const familyMembers = [
  { id: 1, name: "Катя", role: "Дочь", phone: "+7 900 *** 44 12", birthday: "12.05.2010", favMaster: "Анна Соколова", emoji: "👧" },
  { id: 2, name: "Светлана", role: "Мама", phone: "+7 915 *** 22 88", birthday: "03.07.1958", favMaster: "Мария Белова", emoji: "👩‍🦳" },
];

const masters = ["Анна Соколова", "Мария Белова", "Ольга Петрова"];

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "family">("profile");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Мария Иванова");
  const [email, setEmail] = useState("maria@example.com");
  const [birthday, setBirthday] = useState("15.06.1990");
  const [allergies, setAllergies] = useState("Нет");
  const [favMaster, setFavMaster] = useState("Анна Соколова");
  const [addingMember, setAddingMember] = useState(false);
  const [members, setMembers] = useState(familyMembers);

  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");

  return (
    <div className="flex flex-col h-full animate-fade-in">
      {/* Tabs */}
      <div className="flex gap-2 px-4 pt-4 pb-2">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${activeTab === "profile" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-border bg-white text-muted-foreground"}`}
        >
          Мой профиль
        </button>
        <button
          onClick={() => setActiveTab("family")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${activeTab === "family" ? "border-orange-500 bg-orange-50 text-orange-600" : "border-border bg-white text-muted-foreground"}`}
        >
          Моя семья
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2">
        {activeTab === "profile" && (
          <div className="space-y-4">
            {/* Аватар */}
            <div className="flex flex-col items-center py-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl orange-gradient flex items-center justify-center text-4xl shadow-lg">
                  👩
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center">
                  <Icon name="Camera" size={14} className="text-orange-500" />
                </button>
              </div>
              <h2 className="font-black text-xl text-foreground mt-3">{name}</h2>
              <div className="flex items-center gap-1.5 mt-1 bg-orange-50 px-3 py-1 rounded-xl">
                <Icon name="Phone" size={12} className="text-orange-400" />
                <span className="text-xs text-orange-600 font-medium">+7 916 *** 11 22 · подтверждён</span>
              </div>
            </div>

            {/* Поля */}
            <div className="bg-white rounded-3xl p-4 card-shadow space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-sm text-foreground">Данные профиля</p>
                <button
                  onClick={() => setEditing(!editing)}
                  className="flex items-center gap-1 text-xs text-orange-500 font-semibold active:opacity-70"
                >
                  <Icon name={editing ? "Check" : "Pen"} size={13} />
                  {editing ? "Сохранить" : "Изменить"}
                </button>
              </div>

              {[
                { label: "Имя", value: name, onChange: setName, icon: "User" },
                { label: "Email", value: email, onChange: setEmail, icon: "Mail" },
                { label: "Дата рождения", value: birthday, onChange: setBirthday, icon: "Cake" },
                { label: "Особенности / аллергии", value: allergies, onChange: setAllergies, icon: "AlertCircle" },
              ].map((field) => (
                <div key={field.label} className="flex items-center gap-3 p-2.5 bg-muted/40 rounded-xl">
                  <div className="w-7 h-7 orange-gradient-soft rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={field.icon} size={13} className="text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium">{field.label}</p>
                    {editing ? (
                      <input
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full bg-transparent text-sm font-medium text-foreground border-b border-orange-300 focus:outline-none pb-0.5"
                      />
                    ) : (
                      <p className="text-sm font-medium text-foreground truncate">{field.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Любимый мастер */}
              <div className="flex items-center gap-3 p-2.5 bg-muted/40 rounded-xl">
                <div className="w-7 h-7 orange-gradient-soft rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Heart" size={13} className="text-orange-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-muted-foreground font-medium">Любимый мастер</p>
                  {editing ? (
                    <select
                      value={favMaster}
                      onChange={(e) => setFavMaster(e.target.value)}
                      className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none"
                    >
                      {masters.map(m => <option key={m}>{m}</option>)}
                    </select>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{favMaster}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Выход */}
            <button className="w-full py-3 rounded-2xl border-2 border-border text-muted-foreground text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
              <Icon name="LogOut" size={15} />
              Выйти из аккаунта
            </button>
            <div className="pb-4" />
          </div>
        )}

        {activeTab === "family" && (
          <div className="space-y-3 py-2">
            {members.map((m) => (
              <div key={m.id} className="bg-white rounded-3xl p-4 card-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 orange-gradient-soft rounded-2xl flex items-center justify-center text-2xl">
                    {m.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-base text-foreground">{m.name}</p>
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-lg font-medium">{m.role}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="w-8 h-8 rounded-xl bg-muted/50 flex items-center justify-center active:scale-95 transition-all">
                      <Icon name="Pen" size={13} className="text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => setMembers(prev => prev.filter(x => x.id !== m.id))}
                      className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center active:scale-95 transition-all"
                    >
                      <Icon name="Trash2" size={13} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/40 rounded-xl p-2.5">
                    <p className="text-[10px] text-muted-foreground">Телефон</p>
                    <p className="text-xs font-semibold text-foreground">{m.phone}</p>
                  </div>
                  <div className="bg-muted/40 rounded-xl p-2.5">
                    <p className="text-[10px] text-muted-foreground">День рождения</p>
                    <p className="text-xs font-semibold text-foreground">{m.birthday}</p>
                  </div>
                  <div className="col-span-2 bg-muted/40 rounded-xl p-2.5">
                    <p className="text-[10px] text-muted-foreground">Любимый мастер</p>
                    <p className="text-xs font-semibold text-foreground">{m.favMaster}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Добавить */}
            {!addingMember ? (
              <button
                onClick={() => setAddingMember(true)}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-orange-300 text-orange-500 text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <Icon name="UserPlus" size={16} />
                Добавить члена семьи
              </button>
            ) : (
              <div className="bg-white rounded-3xl p-4 card-shadow animate-fade-in space-y-3">
                <p className="font-bold text-sm text-foreground">Новый член семьи</p>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Имя"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Роль (Дочь, Сын, Муж...)"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <div className="flex gap-2">
                  <button onClick={() => setAddingMember(false)} className="flex-1 py-3 rounded-xl border border-border text-muted-foreground text-sm font-medium">Отмена</button>
                  <button
                    onClick={() => {
                      if (newName && newRole) {
                        setMembers(prev => [...prev, { id: Date.now(), name: newName, role: newRole, phone: "—", birthday: "—", favMaster: "—", emoji: "👤" }]);
                        setNewName("");
                        setNewRole("");
                        setAddingMember(false);
                      }
                    }}
                    className="flex-1 py-3 rounded-xl orange-gradient text-white text-sm font-bold active:scale-95 transition-all"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            )}
            <div className="pb-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
