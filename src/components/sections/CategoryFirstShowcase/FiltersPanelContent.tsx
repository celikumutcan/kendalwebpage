"use client";

import { Dispatch, SetStateAction } from "react";

export type FilterTab = "casings" | "watts" | "sockets";

export interface AvailableFilters {
  casings: string[];
  watts: string[];
  sockets: string[];
}

interface FiltersPanelContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  isK2: boolean;
  availableFilters: AvailableFilters;
  activeFilterTab: FilterTab;
  setActiveFilterTab: Dispatch<SetStateAction<FilterTab>>;
  selectedCasings: string[];
  setSelectedCasings: Dispatch<SetStateAction<string[]>>;
  selectedWatts: string[];
  setSelectedWatts: Dispatch<SetStateAction<string[]>>;
  selectedSockets: string[];
  setSelectedSockets: Dispatch<SetStateAction<string[]>>;
  casingSearchQuery: string;
  setCasingSearchQuery: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  onClose: () => void;
}

export function FiltersPanelContent({
  t,
  isK2,
  availableFilters,
  activeFilterTab,
  setActiveFilterTab,
  selectedCasings,
  setSelectedCasings,
  selectedWatts,
  setSelectedWatts,
  selectedSockets,
  setSelectedSockets,
  casingSearchQuery,
  setCasingSearchQuery,
  setCurrentPage,
  onClose,
}: FiltersPanelContentProps) {
  const selectedCount = selectedCasings.length + selectedWatts.length + selectedSockets.length;

  return (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 tracking-tight">{t.brand_pages?.showcase?.filters || "Filtreler"}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            {selectedCount > 0 ? `${selectedCount} filtre seçili` : "Ürünleri daraltmak için filtre seçin"}
          </p>
        </div>
        <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-full transition-colors">
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 pt-5">
        <div className="flex gap-1 p-1 bg-zinc-100/80 rounded-full">
          {[
            { id: "casings" as const, label: "Renkler", show: availableFilters.casings.length > 1, count: selectedCasings.length },
            { id: "watts" as const, label: "Güç", show: availableFilters.watts.length > 1, count: selectedWatts.length },
            { id: "sockets" as const, label: "Duy Tipi", show: availableFilters.sockets.length > 1, count: selectedSockets.length }
          ].filter(tab => tab.show).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilterTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeFilterTab === tab.id
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] leading-none ${
                  activeFilterTab === tab.id
                    ? (isK2 ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700")
                    : "bg-zinc-200 text-zinc-600"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-200">

        {activeFilterTab === "casings" && availableFilters.casings.length > 0 && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Renk ara..."
                value={casingSearchQuery}
                onChange={(e) => setCasingSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-full text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 focus:bg-white transition-all"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pr-1">
              {availableFilters.casings
                .filter(c => c.toLowerCase().includes(casingSearchQuery.toLowerCase()))
                .map(casing => (
                  <label key={casing} className={`flex items-center gap-3 p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${selectedCasings.includes(casing) ? (isK2 ? "border-orange-500/60 bg-orange-50 shadow-sm" : "border-blue-500/60 bg-blue-50 shadow-sm") : "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"}`}>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                      selectedCasings.includes(casing)
                        ? (isK2 ? "bg-orange-500 border-orange-500" : "bg-blue-600 border-blue-600")
                        : "border-zinc-300 bg-white"
                    }`}>
                      {selectedCasings.includes(casing) && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-sm flex-1 ${selectedCasings.includes(casing) ? "font-semibold text-zinc-900" : "text-zinc-600"}`}>
                      {casing}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedCasings.includes(casing)}
                      onChange={() => {
                        setSelectedCasings(prev => prev.includes(casing) ? prev.filter(c => c !== casing) : [...prev, casing]);
                        setCurrentPage(1);
                      }}
                    />
                  </label>
              ))}
              {availableFilters.casings.filter(c => c.toLowerCase().includes(casingSearchQuery.toLowerCase())).length === 0 && (
                <div className="p-4 text-center text-sm text-zinc-500 col-span-full">
                  Sonuç bulunamadı.
                </div>
              )}
            </div>
          </div>
        )}

        {activeFilterTab === "watts" && availableFilters.watts.length > 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-wrap gap-2.5">
              {availableFilters.watts.map(watt => (
                <button
                  key={watt}
                  onClick={() => {
                    setSelectedWatts(prev => prev.includes(watt) ? prev.filter(w => w !== watt) : [...prev, watt]);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    selectedWatts.includes(watt)
                      ? isK2 ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20 scale-[1.03]" : "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-[1.03]"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:-translate-y-0.5"
                  }`}
                >
                  {watt}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeFilterTab === "sockets" && availableFilters.sockets.length > 0 && (
          <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-wrap gap-2.5">
              {availableFilters.sockets.map(socket => (
                <button
                  key={socket}
                  onClick={() => {
                    setSelectedSockets(prev => prev.includes(socket) ? prev.filter(s => s !== socket) : [...prev, socket]);
                    setCurrentPage(1);
                  }}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                    selectedSockets.includes(socket)
                      ? isK2 ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20 scale-[1.03]" : "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 scale-[1.03]"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:-translate-y-0.5"
                  }`}
                >
                  {socket}
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="p-5 border-t border-zinc-100 flex gap-3 bg-zinc-50/60">
        <button
          onClick={() => {
            setSelectedCasings([]);
            setSelectedWatts([]);
            setSelectedSockets([]);
            setCasingSearchQuery("");
            setCurrentPage(1);
          }}
          className="px-5 py-3 rounded-full font-bold text-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
        >
          Temizle
        </button>
        <button
          onClick={onClose}
          className={`flex-1 px-5 py-3 rounded-full font-bold text-sm text-white transition-all duration-300 shadow-lg hover:-translate-y-0.5 ${isK2 ? "bg-orange-600 hover:bg-orange-700 shadow-orange-600/25" : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/25"}`}
        >
          Uygula ({selectedCount})
        </button>
      </div>
    </>
  );
}
