import { atom } from "recoil";
import { storage } from "@/lib/storage";

export const projectKeyState = atom<string | null>({
  key: "selectedProjectKeyState",
  default: null,
  effects: [
    ({ setSelf }) => {
      if (typeof window === "undefined") return;
      setSelf(storage.get("selectedProjectKey") || null);
    },
  ],
});