import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HeaderFrame from "@/components/headerFrame/headerFrame";
import { useSystemState } from "@/context/systemStateContext";
import capibaraImage from "@/assets/testAssets/test-capibara.png";

// Types of items available in the closet
type ItemType = "hat" | "accessory" | "shoes" | "scene";

interface ClosetItem {
  id: string;
  name: string;
  type: ItemType;
}

// Dummy list of items to display in the closet
const closetItems: ClosetItem[] = [
  { id: "hat-1", name: "Chapéu Azul", type: "hat" },
  { id: "hat-2", name: "Chapéu Vermelho", type: "hat" },
  { id: "acc-1", name: "Óculos Moderno", type: "accessory" },
  { id: "acc-2", name: "Cachecol", type: "accessory" },
  { id: "shoe-1", name: "Tênis", type: "shoes" },
  { id: "shoe-2", name: "Sandália", type: "shoes" },
  { id: "scene-1", name: "Praia", type: "scene" },
  { id: "scene-2", name: "Floresta", type: "scene" },
];

const typeColors: Record<ItemType, string> = {
  hat: "bg-blue-300",
  accessory: "bg-green-300",
  shoes: "bg-yellow-300",
  scene: "bg-purple-300",
};

const Closet: React.FC = () => {
  const navigate = useNavigate();
  const { toggleSize } = useSystemState();

  const [selectedTab, setSelectedTab] = useState<"all" | ItemType>("all");
  const [equipped, setEquipped] = useState<Partial<Record<ItemType, ClosetItem>>>({});

  useEffect(() => {
    toggleSize(720, 720);
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  const filteredItems =
    selectedTab === "all"
      ? closetItems
      : closetItems.filter((item) => item.type === selectedTab);

  const handleSelectItem = (item: ClosetItem) => {
    setEquipped((prev) => {
      const current = prev[item.type];
      if (current && current.id === item.id) {
        const newState = { ...prev };
        delete newState[item.type];
        return newState;
      }
      return { ...prev, [item.type]: item };
    });
  };

  const renderEquipped = (type: ItemType) => {
    const item = equipped[type];
    return (
      <div
        key={type}
        className={`flex-1 h-10 border-2 border-[#633000] rounded-md flex items-center justify-center text-sm font-bold mx-1 ${
          item ? typeColors[type] : "bg-gray-200"
        }`}
      >
        {item ? item.name : ""}
      </div>
    );
  };

  return (
    <div className="bg-[#c78f40] overflow-hidden h-full">
      <HeaderFrame />
      <div className="flex flex-col pt-10 px-4 pb-4 overflow-hidden">
        <button
          onClick={handleBack}
          className="bg-transparent font-sans cursor-pointer font-bold text-xl mt-6 absolute top-4 left-4"
        >
          Back
        </button>

        {/* Top section with capybara and equipped items */}
        <div className="flex w-full mt-10 h-40 items-start">
          <img src={capibaraImage} alt="capybara" className="h-36 w-auto" />
          <div className="flex flex-col flex-1 ml-4">
            <div className="text-[#4d330e] font-bold">Itens em uso</div>
            <div className="flex mt-2">
              {(["hat", "accessory", "shoes", "scene"] as ItemType[]).map(
                (t) => renderEquipped(t)
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { key: "all", label: "Todos" },
            { key: "hat", label: "Chapéus" },
            { key: "accessory", label: "Acessórios" },
            { key: "shoes", label: "Sapatos" },
            { key: "scene", label: "Cenário" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              className={`px-3 py-1 border-2 border-[#633000] rounded-md text-sm font-bold ${
                selectedTab === tab.key ? "bg-[#d69851]" : "bg-[#c08440]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items list */}
        <div className="flex flex-wrap mt-4 overflow-auto" style={{ height: 260 }}>
          {filteredItems.map((item) => {
            const isEquipped = equipped[item.type]?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={`cursor-pointer m-1 flex flex-col items-center justify-center w-24 h-28 rounded-md border-2 border-[#633000] text-sm font-bold ${
                  typeColors[item.type]
                } ${isEquipped ? "ring-4 ring-[#633000]" : ""}`}
              >
                {item.name}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Closet;
