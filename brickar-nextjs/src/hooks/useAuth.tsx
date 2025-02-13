"use client";

import { useState } from "react";
import { apiRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
import useLocalStorage from "./useLocalStorage";

interface User {
  id: string;
  name: string;
  email: string;
}

const useAuth = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "access_token",
    null,
  );
  const [refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refresh_token",
    null,
  );

  const [userInfo, setUserInfo] = useLocalStorage<string | null>(
    "user_info",
    null,
  );
  const login = async (username: string, password: string) => {
    const response = await apiRequest({
      method: "POST",
      path: "admin/login/",
      data: { username, password },
    });
    setAccessToken(response.access_token);
    setRefreshToken(response.refresh_token);
    setUserInfo(response.user_name);
    router.push("/");
  };

  const logout = async () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    router.push("/login");
  };

  return { userInfo, accessToken, refreshToken, login, logout };
};

export default useAuth;
