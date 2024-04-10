import { defineStore } from "pinia";

const useStore = defineStore("global", () => {
  const isLoading = false;
  const isDark = false;
  const selectedRail = "events";
  const rails: NavigationRailItem[] = [];

  return {
    isLoading, isDark, rails, selectedRail
  }
});

export * from "./dialog";
export {
  useStore
}