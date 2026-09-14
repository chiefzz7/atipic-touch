import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { registerChild } from "../../services/children/children";

export default function ChildRegister() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [temasPreferidos, setTemasPreferidos] = useState("");
  const [restricoesMedicas, setRestricoesMedicas] = useState("");

  // Campos mantidos na interface, mas ainda não fazem parte da API.
  const [sexo, setSexo] = useState(null);
  const [observacoes, setObservacoes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function formatDateToApi(date) {
    const match = date.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

    if (!match) {
      return null;
    }

    const [, day, month, year] = match;

    const dateObject = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const isValidDate =
      dateObject.getFullYear() === Number(year) &&
      dateObject.getMonth() === Number(month) - 1 &&
      dateObject.getDate() === Number(day);

    if (!isValidDate) {
      return null;
    }

    return `${year}-${month}-${day}`;
  }

  function validateForm() {
    if (!nome.trim()) {
      return "Informe o nome da criança.";
    }

    if (!dataNascimento.trim()) {
      return "Informe a data de nascimento.";
    }

    if (!formatDateToApi(dataNascimento)) {
      return "Informe a data no formato dd/mm/aaaa.";
    }

    if (!temasPreferidos.trim()) {
      return "Informe pelo menos um tema preferido.";
    }

    return null;
  }

  function getPreferredThemes() {
    return temasPreferidos
      .split(",")
      .map((tema) => tema.trim())
      .filter(Boolean);
  }

  async function handleRegisterChild() {
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerChild({
        nome: nome.trim(),
        dataNascimento: formatDateToApi(dataNascimento),
        temasPreferidos: getPreferredThemes(),
        restricoesMedicas: restricoesMedicas.trim(),
      });

      // Após o cadastro, segue diretamente para a Home.
      router.replace("/home-introduction");
    } catch (error) {
      setError(
        error.message || "Não foi possível cadastrar a criança."
      );
    } finally {
      setLoading(false);
    }
    await registerChild({
      nome: nome.trim(),
      dataNascimento: formatDateToApi(dataNascimento),
      temasPreferidos: getPreferredThemes(),
      restricoesMedicas: restricoesMedicas.trim(),
    });

    router.replace("/device");
  }
  function formatBirthDate(value) {
    const numbers = value.replace(/\D/g, "").slice(0, 8);

    if (numbers.length <= 2) {
      return numbers;
    }

    if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }

    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
  }

  return (
    <View className="flex-1 bg-[#FFFCEF]">
      <ScrollView
        className="flex-1 px-6 pt-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Progresso */}
        <View className="mb-6">
          <Text className="text-[#7A7A7A] text-sm font-medium mb-2">
            Passo 2 de 2
          </Text>

          <View className="w-full h-2 bg-[#E8E3D7] rounded-full overflow-hidden">
            <View className="h-full w-full bg-[#A3C78C] rounded-full" />
          </View>
        </View>

        {/* Foto */}
        <View
          className="bg-white rounded-[28px] items-center justify-center shadow-sm mb-6"
          style={{ height: 230 }}
        >
          <View className="w-[120px] h-[120px] rounded-full bg-[#F2F0E8] items-center justify-center">
            <Ionicons
              name="person"
              size={70}
              color="#A3A3A3"
            />
          </View>

          <TouchableOpacity
            className="absolute right-[75px] bottom-[45px] w-[48px] h-[48px] bg-[#A3C78C] rounded-full items-center justify-center"
            activeOpacity={0.8}
          >
            <Ionicons
              name="camera"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {/* Formulário */}
        <View className="bg-white rounded-[28px] px-5 py-6 shadow-sm">
          <Text className="text-[#404040] text-lg font-semibold mb-5">
            Dados da criança
          </Text>

          {/* Nome */}
          <Text className="text-[#555555] text-sm mb-2">
            Nome Completo
          </Text>

          <TextInput
            value={nome}
            onChangeText={setNome}
            className="w-full h-[52px] bg-[#FAF8F1] rounded-2xl px-4 mb-4 text-[#444]"
            placeholder="Digite o nome completo"
            placeholderTextColor="#A7A7A7"
          />

          {/* Data de nascimento */}
          <Text className="text-[#555555] text-sm mb-2">
            Data de nascimento
          </Text>

          <TextInput
            value={dataNascimento}
            onChangeText={(value) => {
              setDataNascimento(formatBirthDate(value));
            }}
            className="w-full h-[52px] bg-[#FAF8F1] rounded-2xl px-4 mb-4 text-[#444]"
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#A7A7A7"
            keyboardType="numeric"
            maxLength={10}
          />
          {/* Sexo */}
          <Text className="text-[#555555] text-sm mb-3">
            Sexo
          </Text>

          <View className="flex-row justify-between mb-5">
            <TouchableOpacity
              onPress={() => setSexo("masculino")}
              className={`w-[44%] h-[75px] rounded-2xl items-center justify-center border ${sexo === "masculino"
                ? "border-[#A3C78C] bg-[#F1F8EC]"
                : "border-[#E7E2D8]"
                }`}
            >
              <Image
                source={require("../../../assets/images/masculino_sexo.png")}
                className="w-[24px] h-[25px] mb-1"
                resizeMode="cover"
              />

              <Text className="text-[#555] text-sm">
                Masculino
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSexo("feminino")}
              className={`w-[44%] h-[75px] rounded-2xl items-center justify-center border ${sexo === "feminino"
                ? "border-[#A3C78C] bg-[#F1F8EC]"
                : "border-[#E7E2D8]"
                }`}
            >
              <Image
                source={require("../../../assets/images/feminino_sexo.png")}
                className="w-[24px] h-[25px] mb-1"
                resizeMode="cover"
              />

              <Text className="text-[#555] text-sm">
                Feminino
              </Text>
            </TouchableOpacity>
          </View>

          {/* Temas preferidos */}
          <Text className="text-[#555555] text-sm mb-2">
            Temas preferidos
          </Text>

          <TextInput
            value={temasPreferidos}
            onChangeText={setTemasPreferidos}
            className="w-full h-[100px] bg-[#FAF8F1] rounded-2xl px-4 py-3 text-[#444]"
            placeholder="Ex.: dinossauros, carros, desenhos..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          <Text className="text-[#A0A0A0] text-xs mt-1 mb-4">
            Separe os temas por vírgulas.
          </Text>

          {/* Restrições */}
          <Text className="text-[#555555] text-sm mb-2">
            Restrições
          </Text>

          <TextInput
            value={restricoesMedicas}
            onChangeText={setRestricoesMedicas}
            className="w-full h-[100px] bg-[#FAF8F1] rounded-2xl px-4 py-3 text-[#444]"
            placeholder="Se houver, insira as restrições..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          {/* Observações */}
          <Text className="text-[#555555] text-sm mb-2 mt-4">
            Observações
          </Text>

          <TextInput
            value={observacoes}
            onChangeText={setObservacoes}
            className="w-full h-[100px] bg-[#FAF8F1] rounded-2xl px-4 py-3 text-[#444]"
            placeholder="Digite alguma observação..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          {/* Erro */}
          {error ? (
            <Text className="text-red-600 text-sm font-medium text-center mt-4">
              {error}
            </Text>
          ) : null}

          {/* Salvar */}
          <TouchableOpacity
            onPress={handleRegisterChild}
            disabled={loading}
            className="w-full h-[55px] bg-[#A3C78C] rounded-2xl items-center justify-center mt-6"
            activeOpacity={0.85}
            style={{
              opacity: loading ? 0.6 : 1,
            }}
          >
            <Text className="text-white font-semibold text-base">
              {loading ? "Salvando..." : "Salvar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}