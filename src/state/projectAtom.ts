import { atom } from "recoil";
import { storage } from "@/lib/storage";

export const projectKeyState = atom<string | null>({
  key: "selectedProjectKeyState",
  default: storage.get("selectedProjectKey") || null,
});