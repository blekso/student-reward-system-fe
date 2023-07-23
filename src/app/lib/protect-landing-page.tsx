"use client";

import { useEffect } from "react";

const requireAuth = () => {
  const loggedIn = document.cookie.includes("accessToken");

  if (loggedIn) {
    window.location.href = "/items";
  }
};

export const LandingAuthPageInvisible = () => {
  useEffect(() => {
    requireAuth();
  }, []);

  return <></>;
};