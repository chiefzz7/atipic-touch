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
  Image,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import {
  saveSession,
} from "../../services/auth/auth.js";

import {
  getChildren,
} from "../../services/children/children";

const API_URL =
  "https://atipic-touch-devlop.onrender.com";

export default function LoginScreen() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const scrollViewRef =
    useRef(null);

  const {
    width,
    height,
  } = useWindowDimensions();

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
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

  const isSmallScreen =
    height < 700;

  const horizontalPadding =
    20;

  const cardWidth =
    Math.min(
      width -
        horizontalPadding * 2,
      390
    );

  const titleSize =
    width < 360
      ? 34
      : width < 600
      ? 44
      : 52;

  const labelSize =
    width < 360
      ? 20
      : 23;

  const broccoliWidth =
    Math.min(
      width * 0.5,
      210
    );

  const circleSize =
    Math.max(
      width * 1.7,
      620
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

  function scrollToEmail() {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 110,
        animated: true,
      });
    }, 150);
  }

  function scrollToPassword() {
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: 210,
        animated: true,
      });
    }, 150);
  }

  async function handleLogin() {
    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Preencha o e-mail e a senha."
      );

      return;
    }

    setError("");
    setLoading(true);

    try {
      const response =
        await fetch(
          `${API_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              Accept:
                "application/json",
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                email:
                  email.trim(),
                senha:
                  password,
              }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          "E-mail ou senha inválidos."
        );

        return;
      }

      await saveSession(
        data.access_token
      );

      const children =
        await getChildren();

      if (
        children.length > 0
      ) {
        router.replace(
          "/device"
        );
      } else {
        router.replace(
          "/child-introduction"
        );
      }

    } catch (error) {
      setError(
        "Não foi possível conectar ao servidor."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      className="flex-1 bg-[#FFFCEF]"
      style={{
        overflow: "hidden",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar
        style="dark"
      />

      <View
        pointerEvents="none"
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{
          width: circleSize,
          height: circleSize,
          top:
            keyboardVisible
              ? height * 0.02
              : height * 0.10,
          left:
            (width - circleSize) /
            2,
        }}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent:
              keyboardVisible ||
              isSmallScreen
                ? "flex-start"
                : "center",
            paddingHorizontal:
              horizontalPadding,
            paddingTop:
              keyboardVisible
                ? 80
                : 0,
            paddingBottom:
              keyboardVisible
                ? 40
                : 30,
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={
            false
          }
        >
          <Text
            className="text-[#3F361E] font-bold italic"
            style={{
              fontSize:
                titleSize,
              textAlign:
                "center",
              marginBottom:
                keyboardVisible
                  ? 20
                  : isSmallScreen
                  ? 25
                  : 35,
            }}
          >
            Bem-Vindo(a)!
          </Text>

          <View
            className="items-center bg-[#C6BB9A] rounded-[7px]"
            style={{
              width:
                cardWidth,
              paddingHorizontal:
                25,
              paddingVertical:
                keyboardVisible
                  ? 18
                  : isSmallScreen
                  ? 18
                  : 24,
            }}
          >
            <Text
              className="text-white font-bold text-center"
              style={{
                fontSize:
                  width < 360
                    ? 25
                    : 27,
              }}
            >
              Login do responsável
            </Text>

            <View className="w-full mt-5">
              <Text
                className="text-white text-center"
                style={{
                  fontSize:
                    labelSize,
                  marginBottom:
                    7,
                }}
              >
                Seu E-mail
              </Text>

              <TextInput
                value={email}
                onChangeText={
                  setEmail
                }
                onFocus={
                  scrollToEmail
                }
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                className="w-full rounded-[7px] bg-white px-4 text-[18px] text-black"
                style={{
                  height:
                    45,
                }}
              />
            </View>

            <View className="w-full mt-4">
              <Text
                className="text-white text-center"
                style={{
                  fontSize:
                    labelSize,
                  marginBottom:
                    7,
                }}
              >
                Senha
              </Text>

              <TextInput
                value={
                  password
                }
                onChangeText={
                  setPassword
                }
                onFocus={
                  scrollToPassword
                }
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={
                  handleLogin
                }
                className="w-full rounded-[7px] bg-white px-4 text-[18px] text-black"
                style={{
                  height:
                    45,
                }}
              />
            </View>

            {error ? (
              <Text
                className="text-red-700 text-center font-bold"
                style={{
                  marginTop:
                    12,
                }}
              >
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={
                handleLogin
              }
              disabled={
                loading
              }
              activeOpacity={
                0.8
              }
              className="items-center justify-center rounded-[7px] bg-[#A3987B]"
              style={{
                width:
                  Math.min(
                    cardWidth *
                      0.72,
                    260
                  ),
                height:
                  65,
                marginTop:
                  keyboardVisible
                    ? 22
                    : isSmallScreen
                    ? 25
                    : 32,
                opacity:
                  loading
                    ? 0.6
                    : 1,
              }}
            >
              <Text
                className="text-white font-bold"
                style={{
                  fontSize:
                    width < 360
                      ? 27
                      : 32,
                }}
              >
                {loading
                  ? "Entrando..."
                  : "Continuar"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {!keyboardVisible && (
        <Image
          source={require(
            "../../../assets/images/login_brocolis.png"
          )}
          resizeMode="contain"
          pointerEvents="none"
          style={{
            position:
              "absolute",
            width:
              broccoliWidth,
            height:
              broccoliWidth,
            left:
              -width * 0.1,
            bottom:
              insets.bottom,
          }}
        />
      )}
    </View>
  );
}
