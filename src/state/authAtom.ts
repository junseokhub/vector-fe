import { atom } from "recoil";
import { storage } from "@/lib/storage";
import type { AuthState } from "@/types";

export const authState = atom<AuthState>({
  key: "authStateVector",
  default: {
    accessToken: storage.get("accessToken") || "",
    id: storage.get("userId") ? parseInt(storage.get("userId")!) : 0,
    email: storage.get("email") || "",
  },
});