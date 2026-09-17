import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { validateSession, subscribeAuth, } from "../services/auth/auth";

import { getChildren } from "../services/children/children";

import "../../global.css";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Indica que a verificação inicial da sessão já terminou.
  const sessionInitialized = useRef(false);

  const isInitialSessionCheck = useRef(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const isValid = await validateSession();

        if (!mounted) return;

        if (!isValid) {
          setAuthenticated(false);
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);

        if (mounted) {
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          sessionInitialized.current = true;
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    const unsubscribe = subscribeAuth((isAuthenticated) => {
      if (!mounted) return;

      setAuthenticated(isAuthenticated);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (checkingSession) return;
    if (!sessionInitialized.current) return;
    if (!segments.length) return;

    const currentRoute = segments[0];

    const publicRoutes = ["login","register",];

    const onboardingRoutes = ["child-introduction", "home-introduction" ];

    const isPublicRoute = publicRoutes.includes(currentRoute);
    const isOnboardingRoute = onboardingRoutes.includes(currentRoute);

    if (isOnboardingRoute) {
      return;
    }

    if (!authenticated) {
      if (isPublicRoute) {
        return;
      }

      router.replace("/login");
      return;
    }

    if (authenticated && isPublicRoute && isInitialSessionCheck.current) {
      isInitialSessionCheck.current = false;

      redirectAuthenticatedUser();
    }}, [authenticated, checkingSession, segments, router]);

  async function redirectAuthenticatedUser() {
    try {
      const children = await getChildren();

      if (children.length > 0) {
        router.replace("/device");
      } else {
        router.replace("/child-introduction");
      }
    } catch (error) {
      console.error(
        "Erro ao verificar cadastro da criança:",
        error
      );

      router.replace("/child-introduction");
    }
  }

  if (checkingSession) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}