import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { validateSession, subscribeAuth } from "../services/auth/auth";


export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const isValid = await validateSession();

      setAuthenticated(isValid);
      setCheckingSession(false);
    }

    checkSession();
    const unsubscribe = subscribeAuth(setAuthenticated);
    return unsubscribe;
  }, []);

  useEffect(() => {
  if (checkingSession) {
    return;
  }
  
  if (!segments.length) {
    return;
  }

  const currentRoute = segments[0];

  const isLoginRoute = currentRoute === "login";

  if (!authenticated && !isLoginRoute) {
    router.replace("/login");
    return;
  }

  if (authenticated && isLoginRoute) {
    router.replace("/child-introduction");
  }
}, [authenticated, checkingSession, segments]);
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