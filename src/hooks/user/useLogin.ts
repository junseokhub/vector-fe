import { useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import client from "@/api/client";
import { authState } from "@/state/authAtom";
import { storage } from "@/lib/storage";
import type { LoginParams, LoginResponse } from "@/types";

export function useLogin() {
  const setAuth = useSetRecoilState(authState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await client
        .post("/api/auth/login", { json: { email, password } as LoginParams })
        .json<LoginResponse>();
      setAuth({ accessToken: data.accessToken, id: data.id, email: data.email });
      storage.set("accessToken", data.accessToken);
      storage.set("userId", data.id.toString());
      storage.set("userEmail", data.email);
      router.push("/project");
    } catch (e) {
      alert("로그인 실패: " + (e as Error).message);
    }
  };

  return { email, setEmail, password, setPassword, handleSubmit };
}