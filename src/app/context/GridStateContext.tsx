"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type GridScenario = "normal" | "peak" | "dirty";

interface GridState {
  scenario: GridScenario;
  activeLoadKw: number;
  carbonIntensityG: number;
  efficiencyScore: number;
  tariffRate: number;
  tariffStatus: string;
  gridStatusLabel: string;
  gridStatusColor: string;
}

interface GridContextType {
  state: GridState;
  setScenario: (scenario: GridScenario) => void;
}

const GridStateContext = createContext<GridContextType | undefined>(undefined);

const scenarios: Record<GridScenario, GridState> = {
  normal: {
    scenario: "normal",
    activeLoadKw: 4.82,
    carbonIntensityG: 120,
    efficiencyScore: 94,
    tariffRate: 0.11,
    tariffStatus: "Off-Peak",
    gridStatusLabel: "Clean",
    gridStatusColor: "bg-[#119785] text-white"
  },
  peak: {
    scenario: "peak",
    activeLoadKw: 9.64, // Heavy spike
    carbonIntensityG: 195,
    efficiencyScore: 68, // Low efficiency due to peak loads
    tariffRate: 0.28, // High peak tariff
    tariffStatus: "Peak Rate",
    gridStatusLabel: "Peak Stress",
    gridStatusColor: "bg-orange-600 text-white animate-pulse"
  },
  dirty: {
    scenario: "dirty",
    activeLoadKw: 6.12,
    carbonIntensityG: 385, // Highly dirty power running
    efficiencyScore: 82,
    tariffRate: 0.11,
    tariffStatus: "Off-Peak",
    gridStatusLabel: "Dirty Grid",
    gridStatusColor: "bg-stone-700 text-white"
  }
};

export function GridStateProvider({ children }: { children: ReactNode }) {
  const [currentScenario, setCurrentScenario] = useState<GridScenario>("normal");

  const setScenario = (scenario: GridScenario) => {
    setCurrentScenario(scenario);
  };

  return (
    <GridStateContext.Provider value={{ state: scenarios[currentScenario], setScenario }}>
      {children}
    </GridStateContext.Provider>
  );
}

export function useGridState() {
  const context = useContext(GridStateContext);
  if (!context) {
    throw new Error("useGridState must be used within a GridStateProvider");
  }
  return context;
}