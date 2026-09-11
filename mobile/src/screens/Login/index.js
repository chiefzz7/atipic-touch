import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { saveSession } from "../../services/auth/auth.js";

const API_URL = "https://atipic-touch-devlop.onrender.com";

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSmallScreen = height < 700;
  const horizontalPadding = 20;

  const cardWidth = Math.min(width - horizontalPadding * 2, 390);

  const titleSize =
    width < 360 ? 34 :
      width < 600 ? 44 : 52;

  const labelSize = width < 360 ? 20 : 23;
  const broccoliWidth = Math.min(width * 0.5, 210);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setError("Preencha o e-mail e a senha.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("E-mail ou senha inválidos.");
        return;
      }

      await saveSession(data.access_token);

      router.push("/child-introduction");
    } catch (error) {
      setError("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF] overflow-hidden">
      <View
        pointerEvents="none"
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{
          width: width * 1.7,
          height: Math.max(height * 0.78, 600),
          top: 16,
          left: -(width * 0.35),
        }}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
            justifyContent: isSmallScreen ? "flex-start" : "center",
            paddingHorizontal: horizontalPadding,
            paddingVertical: 30,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text
            className="text-[#3F361E] font-bold italic"
            style={{
              fontSize: titleSize,
              textAlign: "center",
              marginBottom: isSmallScreen ? 25 : 35,
            }}
          >
            Bem-Vindo(a)!
          </Text>

          <View
            className="items-center bg-[#C6BB9A] rounded-[7px]"
            style={{
              width: cardWidth,
              paddingHorizontal: 25,
              paddingVertical: isSmallScreen ? 18 : 24,
            }}
          >
            <Text
              className="text-white font-bold text-center"
              style={{
                fontSize: width < 360 ? 25 : 27,
              }}
            >
              Login do responsável
            </Text>

            <View className="w-full mt-5">
              <Text
                className="text-white text-center"
                style={{
                  fontSize: labelSize,
                  marginBottom: 7,
                }}
              >
                Seu E-mail
              </Text>

              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full rounded-[7px] bg-white px-4 text-[18px]"
                style={{
                  height: 45,
                }}
              />
            </View>

            <View className="w-full mt-4">
              <Text
                className="text-white text-center"
                style={{
                  fontSize: labelSize,
                  marginBottom: 7,
                }}
              >
                Senha
              </Text>

              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                className="w-full rounded-[7px] bg-white px-4 text-[18px]"
                style={{
                  height: 45,
                }}
              />
            </View>

            {error ? (
              <Text
                className="text-red-700 text-center font-bold"
                style={{
                  marginTop: 12,
                }}
              >
                {error}
              </Text>
            ) : null}

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.8}
              className="items-center justify-center rounded-[7px] bg-[#A3987B]"
              style={{
                width: Math.min(cardWidth * 0.72, 260),
                height: 65,
                marginTop: isSmallScreen ? 25 : 32,
                opacity: loading ? 0.6 : 1,
              }}
            >
              <Text
                className="text-white font-bold"
                style={{
                  fontSize: width < 360 ? 27 : 32,
                }}
              >
                {loading ? "Entrando..." : "Continuar"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Image
        source={require("../../../assets/images/login_brocolis.png")}
        resizeMode="contain"
        pointerEvents="none"
        style={{
          position: "absolute",
          width: broccoliWidth,
          height: broccoliWidth,
          left: -width * 0.1,
          bottom: -height * 0.01,
        }}
      />
    </SafeAreaView>
  );
}