"use client";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Loader from "./Loader";

export default function NavigationLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  // Listen for global app-level loading events (dispatched by pages/actions)
  useEffect(() => {
    const onStart = () => setLoading(true);
    const onStop = () => setLoading(false);

    window.addEventListener('app:loading:start', onStart as EventListener);
    window.addEventListener('app:loading:stop', onStop as EventListener);

    return () => {
      window.removeEventListener('app:loading:start', onStart as EventListener);
      window.removeEventListener('app:loading:stop', onStop as EventListener);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <Loader />
    </div>
  );
}
