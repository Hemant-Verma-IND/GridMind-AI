import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { GridStateProvider } from "../context/GridStateContext";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <GridStateProvider>
      <main className="min-h-screen bg-[#FAF9F6] text-[#1E2522] selection:bg-[#119785]/10 font-sans relative">
        <DashboardNavbar />
        <DashboardContent />
      </main>
    </GridStateProvider>
  );
}