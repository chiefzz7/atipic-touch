import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "expo-router";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  useWindowDimensions,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import {
  registerUser,
} from "../../services/auth/register";

import {
  saveSession,
} from "../../services/auth/auth";

const API_URL =
  "https://atipic-touch-devlop.onrender.com";

export default function RegisterScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const scrollViewRef =
    useRef(null);

  const {
    width,
  } =
    useWindowDimensions();

  const [
    nome,
    setNome,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    telefone,
    setTelefone,
  ] = useState("");

  const [
    senha,
    setSenha,
  ] = useState("");

  const [
    confirmarSenha,
    setConfirmarSenha,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    keyboardVisible,
    setKeyboardVisible,
  ] = useState(false);

  const cardWidth =
    Math.min(
      width - 32,
      390
    );

  useEffect(() => {
    const showSubscription =
      Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(
            true
          );
        }
      );

    const hideSubscription =
      Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(
            false
          );
        }
      );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function scrollToPosition(
    y
  ) {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y,
        animated:
          true,
      });
    }, 250);
  }

  function formatTelefone(
    value
  ) {
    const numbers =
      value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          11
        );

    if (
      numbers.length ===
      0
    ) {
      return "";
    }

    if (
      numbers.length <=
      2
    ) {
      return `(${numbers}`;
    }

    if (
      numbers.length <=
      7
    ) {
      return `(${numbers.slice(
        0,
        2
      )}) ${numbers.slice(
        2
      )}`;
    }

    return `(${numbers.slice(
      0,
      2
    )}) ${numbers.slice(
      2,
      7
    )}-${numbers.slice(
      7
    )}`;
  }

  function validateForm() {
    if (
      !nome.trim()
    ) {
      return "Informe seu nome.";
    }

    if (
      !email.trim()
    ) {
      return "Informe seu e-mail.";
    }

    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email.trim()
      );

    if (
      !emailValido
    ) {
      return "Informe um e-mail válido.";
    }

    if (
      !telefone.trim()
    ) {
      return "Informe seu telefone.";
    }

    if (!senha) {
      return "Informe uma senha.";
    }

    if (
      !confirmarSenha
    ) {
      return "Confirme sua senha.";
    }

    if (
      senha !==
      confirmarSenha
    ) {
      return "As senhas não coincidem.";
    }

    return null;
  }

  async function loginAfterRegister() {
    const response =
      await fetch(
        `${API_URL}/api/auth/login`,
        {
          method:
            "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify({
              email:
                email
                  .trim()
                  .toLowerCase(),

              senha,
            }),
        }
      );

    const data =
      await response
        .json()
        .catch(
          () =>
            null
        );

    if (
      !response.ok ||
      !data?.access_token
    ) {
      throw new Error(
        "Cadastro realizado, mas não foi possível iniciar sua sessão."
      );
    }

    await saveSession(
      data.access_token
    );
  }

  async function handleRegister() {
    setError("");

    const validationError =
      validateForm();

    if (
      validationError
    ) {
      setError(
        validationError
      );

      return;
    }

    try {
      setLoading(
        true
      );

      await registerUser({
        nome:
          nome.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        telefone:
          telefone.trim(),

        senha,
      });

      await loginAfterRegister();

      router.replace(
        "/child-introduction"
      );
    } catch (error) {
      setError(
        error.message ||
          "Não foi possível realizar o cadastro."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  return (
    <View
      className="flex-1 bg-[#FFFCEF]"
      style={{
        paddingTop:
          insets.top,

        paddingBottom:
          insets.bottom,
      }}
    >
      <StatusBar
        style="dark"
      />

      <ScrollView
        ref={
          scrollViewRef
        }
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingHorizontal:
            16,

          paddingBottom:
            keyboardVisible
              ? 320
              : 30,
        }}
      >
        <View className="items-center mt-5">
          <View className="w-full max-w-[390px] h-[8px] rounded-full bg-[#E5DCC4] overflow-hidden">
            <View className="w-1/2 h-full bg-[#4D9B43]" />
          </View>

          <Text className="mt-4 text-[20px] text-[#80775C] font-medium">
            Passo 1 de 2
          </Text>
        </View>

        <View
          className="self-center mt-5 rounded-[10px] bg-[#E5DCC4] border border-[#C6BB9A] px-4 py-5"
          style={{
            width:
              cardWidth,
          }}
        >
          <Text className="text-center text-[28px] font-bold text-[#554B41]">
            Cadastro responsável
          </Text>

          <Text className="mt-7 text-center text-[18px] font-medium text-[#554B41]">
            Seu Nome (ou apelido)
          </Text>

          <TextInput
            value={nome}
            onChangeText={
              setNome
            }
            onFocus={() =>
              scrollToPosition(
                90
              )
            }
            placeholder="Digite seu nome"
            placeholderTextColor="#A3987B"
            autoCapitalize="words"
            returnKeyType="next"
            className="self-center mt-3 w-full h-[52px] rounded-[10px] bg-[#FFFCEF] border border-[#DDD3B9] px-4 text-[16px] text-[#554B41]"
          />

          <Text className="mt-4 text-center text-[18px] font-medium text-[#554B41]">
            Seu E-mail
          </Text>

          <TextInput
            value={email}
            onChangeText={
              setEmail
            }
            onFocus={() =>
              scrollToPosition(
                170
              )
            }
            placeholder="Digite seu e-mail"
            placeholderTextColor="#A3987B"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={
              false
            }
            returnKeyType="next"
            className="self-center mt-3 w-full h-[52px] rounded-[10px] bg-[#FFFCEF] border border-[#DDD3B9] px-4 text-[16px] text-[#554B41]"
          />

          <Text className="mt-4 text-center text-[18px] font-medium text-[#554B41]">
            Seu Telefone
          </Text>

          <TextInput
            value={
              telefone
            }
            onChangeText={(
              value
            ) =>
              setTelefone(
                formatTelefone(
                  value
                )
              )
            }
            onFocus={() =>
              scrollToPosition(
                260
              )
            }
            placeholder="Digite seu telefone"
            placeholderTextColor="#A3987B"
            keyboardType="phone-pad"
            returnKeyType="next"
            className="self-center mt-3 w-full h-[52px] rounded-[10px] bg-[#FFFCEF] border border-[#DDD3B9] px-4 text-[16px] text-[#554B41]"
          />

          <Text className="mt-4 text-center text-[18px] font-medium text-[#554B41]">
            Crie uma senha
          </Text>

          <TextInput
            value={senha}
            onChangeText={
              setSenha
            }
            onFocus={() =>
              scrollToPosition(
                350
              )
            }
            placeholder="Digite sua senha"
            placeholderTextColor="#A3987B"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="next"
            className="self-center mt-3 w-full h-[52px] rounded-[10px] bg-[#FFFCEF] border border-[#DDD3B9] px-4 text-[16px] text-[#554B41]"
          />

          <Text className="mt-4 text-center text-[18px] font-medium text-[#554B41]">
            Confirme sua senha
          </Text>

          <TextInput
            value={
              confirmarSenha
            }
            onChangeText={
              setConfirmarSenha
            }
            onFocus={() =>
              scrollToPosition(
                440
              )
            }
            placeholder="Digite novamente sua senha"
            placeholderTextColor="#A3987B"
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={
              handleRegister
            }
            className="self-center mt-3 w-full h-[52px] rounded-[10px] bg-[#FFFCEF] border border-[#DDD3B9] px-4 text-[16px] text-[#554B41]"
          />

          {error ? (
            <View className="bg-[#FCEBE8] rounded-[10px] px-3 py-3 mt-4">
              <Text className="text-center text-[14px] font-medium text-[#D9534F]">
                {error}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={
              handleRegister
            }
            disabled={
              loading
            }
            className="self-center mt-7 w-full h-[58px] rounded-[10px] bg-[#83BF6E] items-center justify-center"
            activeOpacity={
              0.8
            }
            style={{
              opacity:
                loading
                  ? 0.6
                  : 1,
            }}
          >
            <Text className="text-[22px] font-bold text-white">
              {loading
                ? "Cadastrando..."
                : "Continuar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
