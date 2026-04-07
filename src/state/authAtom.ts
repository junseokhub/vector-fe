import { atom } from "recoil";
import type { AuthState } from "@/types";


export const authState = atom<AuthState>({
  key: "authStateVector",
  default: {
    isAuthenticated: false,
    id: null,
  },
});