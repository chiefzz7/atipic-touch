import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
  validateSession,
  subscribeAuth,
} from "../services/auth/auth";

import { getChildren } from "../services/children/children";

import "../../global.css";

export default function Layout() {
  const router = useRouter();
  const segments = useSegments();

  const [checkingSession, setCheckingSession] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Indica que a verificação inicial da sessão já terminou.
  const sessionInitialized = useRef(false);

  // Guarda se o aplicativo acabou de iniciar.
  // Alterações de autenticação durante o cadastro não
  // devem reiniciar o fluxo de navegação.
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

    /*
     * O listener acompanha apenas o estado da autenticação.
     *
     * Ele não toma decisões de navegação. Isso é importante
     * porque saveSession() também é executado durante o cadastro.
     */
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

    const publicRoutes = [
      "login",
      "register",
    ];

    const onboardingRoutes = [
      "child-introduction",
      "home-introduction",
    ];

    const isPublicRoute = publicRoutes.includes(currentRoute);
    const isOnboardingRoute = onboardingRoutes.includes(currentRoute);

    /*
     * O onboarding é controlado pelas próprias telas.
     *
     * O layout não pode enviar o usuário para /device
     * enquanto ele estiver passando pelo cadastro.
     */
    if (isOnboardingRoute) {
      return;
    }

    /*
     * Durante a inicialização, se não existe sessão,
     * permitimos que o usuário permaneça em login/register.
     *
     * Não redirecionamos imediatamente para login porque
     * o cadastro pode estar acabando de criar a sessão.
     */
    if (!authenticated) {
      if (isPublicRoute) {
        return;
      }

      router.replace("/login");
      return;
    }

    /*
     * Usuário autenticado em login/register.
     *
     * Aqui verificamos a existência de uma criança somente
     * para sessões já existentes ao abrir o aplicativo.
     *
     * O resultado NÃO é utilizado durante o onboarding.
     */
    if (authenticated && isPublicRoute && isInitialSessionCheck.current) {
      isInitialSessionCheck.current = false;

      redirectAuthenticatedUser();
    }
  }, [
    authenticated,
    checkingSession,
    segments,
    router,
  ]);

  async function redirectAuthenticatedUser() {
    try {
      const children = await getChildren();

      /*
       * Enquanto verificamos os filhos, a tela atual continua
       * intacta. Só depois da resposta decidimos a rota.
       */
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