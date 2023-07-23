"use client";

import { useEffect } from "react";

const requireAuth = () => {
  const loggedIn = document.cookie.includes("accessToken");

  if (!loggedIn) {
    window.location.href = "/";
  }
};

export const AuthPageInvisible = () => {
  useEffect(() => {
    requireAuth();
  }, []);

  return <></>;
};