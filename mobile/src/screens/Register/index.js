import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { registerUser } from "../../services/auth/register";
import { saveSession } from "../../services/auth/auth";

const API_URL = "https://atipic-touch-devlop.onrender.com";

export default function RegisterScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateForm() {
    if (!nome.trim()) {
      return "Informe seu nome.";
    }

    if (!email.trim()) {
      return "Informe seu e-mail.";
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );

    if (!emailValido) {
      return "Informe um e-mail válido.";
    }

    if (!telefone.trim()) {
      return "Informe seu telefone.";
    }

    if (!senha) {
      return "Informe uma senha.";
    }

    if (!confirmarSenha) {
      return "Confirme sua senha.";
    }

    if (senha !== confirmarSenha) {
      return "As senhas não coincidem.";
    }

    return null;
  }

  async function loginAfterRegister() {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        senha,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.access_token) {
      throw new Error(
        "Cadastro realizado, mas não foi possível iniciar sua sessão."
      );
    }

    await saveSession(data.access_token);
  }

  async function handleRegister() {
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // Cria o responsável na API.
      await registerUser({
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        telefone: telefone.trim(),
        senha,
      });

      // O cadastro não retorna token, então fazemos login
      // automaticamente para criar a sessão do responsável.
      await loginAfterRegister();

      // Como o responsável acabou de ser cadastrado,
      // ele ainda precisa cadastrar a criança.
      router.replace("/child-introduction");
    } catch (error) {
      setError(
        error.message || "Não foi possível realizar o cadastro."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Progresso: cadastro do responsável é o primeiro de dois passos */}
        <View className="items-center mt-[35px]">
          <View className="w-[338px] h-[8px] rounded-full bg-[#EDE8D0] overflow-hidden">
            <View className="w-1/2 h-full bg-[#6B5A2A]" />
          </View>

          <Text className="mt-4 text-[24px] text-[#574A24] font-normal">
            Passo 1 de 2.
          </Text>
        </View>

        <View className="self-center mt-5 w-[355px] rounded-[7px] bg-[#C6BB9A] px-4 py-5">
          <Text className="text-center text-[32px] font-bold text-white">
            Cadastro responsável
          </Text>

          {/* Nome */}
          <Text className="mt-7 text-center text-[24px] text-white">
            Seu Nome (ou apelido)
          </Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            autoCapitalize="words"
            className="self-center mt-3 w-full h-[49px] rounded-[7px] bg-white px-4 text-[18px]"
          />

          {/* E-mail */}
          <Text className="mt-2 text-center text-[24px] text-white">
            Seu E-mail
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            className="self-center mt-3 w-full h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
          />

          {/* Telefone exigido pelo endpoint */}
          <Text className="mt-2 text-center text-[24px] text-white">
            Seu Telefone
          </Text>

          <TextInput
            value={telefone}
            onChangeText={setTelefone}
            placeholder="Digite seu telefone"
            keyboardType="phone-pad"
            className="self-center mt-3 w-full h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
          />

          {/* Senha */}
          <Text className="mt-2 text-center text-[24px] text-white">
            Crie uma senha
          </Text>

          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry
            autoCapitalize="none"
            className="self-center mt-3 w-full h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
          />

          {/* Confirmação */}
          <Text className="mt-2 text-center text-[24px] text-white">
            Confirme sua senha
          </Text>

          <TextInput
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Digite novamente sua senha"
            secureTextEntry
            autoCapitalize="none"
            className="self-center mt-3 w-full h-[50px] rounded-[7px] bg-white px-4 text-[18px]"
          />

          {/* Mensagem de erro */}
          {error ? (
            <Text className="mt-4 text-center text-[16px] font-semibold text-red-700">
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            className="self-center mt-7 w-full h-[72px] rounded-[7px] bg-[#A3987B] items-center justify-center"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            <Text className="text-[32px] font-bold text-white">
              {loading ? "Cadastrando..." : "Continuar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}