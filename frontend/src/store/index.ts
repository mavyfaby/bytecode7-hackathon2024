import { defineStore } from "pinia";

const useStore = defineStore("global", () => {
  const isLoading = false;
  const isDark = false;
  const selectedRail = "events";
  const rails: NavigationRailItem[] = [];
  const isLoggedIn = true;
  const isShowBackButton = false;
  const user = {};

  return {
    isLoading, isDark, rails, selectedRail, user, isLoggedIn, isShowBackButton
  }
});

export * from "./dialog";
export {
  useStore
}