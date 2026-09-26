import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  useRouter,
} from "expo-router";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  StatusBar,
} from "expo-status-bar";

import PrimaryButton from "../../components/PrimaryButton";

import {
  registerChild,
} from "../../services/children/children";

import {
  saveSelectedChild,
} from "../../services/children/selectedChild";

export default function ChildRegister() {
  const router =
    useRouter();

  const insets =
    useSafeAreaInsets();

  const [
    nome,
    setNome,
  ] = useState("");

  const [
    dataNascimento,
    setDataNascimento,
  ] = useState("");

  const [
    temasPreferidos,
    setTemasPreferidos,
  ] = useState("");

  const [
    restricoesMedicas,
    setRestricoesMedicas,
  ] = useState("");

  // Campos mantidos na interface,
  // mas ainda não são usados pela API.
  const [
    sexo,
    setSexo,
  ] = useState(null);

  const [
    observacoes,
    setObservacoes,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  function formatDateToApi(
    date
  ) {
    const match =
      date.match(
        /^(\d{2})\/(\d{2})\/(\d{4})$/
      );

    if (!match) {
      return null;
    }

    const [
      ,
      day,
      month,
      year,
    ] = match;

    const dateObject =
      new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      );

    const isValidDate =
      dateObject.getFullYear() ===
        Number(year) &&
      dateObject.getMonth() ===
        Number(month) - 1 &&
      dateObject.getDate() ===
        Number(day);

    if (!isValidDate) {
      return null;
    }

    return `${year}-${month}-${day}`;
  }

  function validateForm() {
    if (!nome.trim()) {
      return "Informe o nome da criança.";
    }

    if (
      !dataNascimento.trim()
    ) {
      return "Informe a data de nascimento.";
    }

    if (
      !formatDateToApi(
        dataNascimento
      )
    ) {
      return "Informe a data no formato dd/mm/aaaa.";
    }

    if (
      !temasPreferidos.trim()
    ) {
      return "Informe pelo menos um tema preferido.";
    }

    return null;
  }

  function getPreferredThemes() {
    return temasPreferidos
      .split(",")
      .map(
        (tema) =>
          tema.trim()
      )
      .filter(Boolean);
  }

  async function handleRegisterChild() {
    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(
        validationError
      );

      return;
    }

    try {
      setLoading(
        true
      );

      const child =
        await registerChild({
          nome:
            nome.trim(),

          dataNascimento:
            formatDateToApi(
              dataNascimento
            ),

          temasPreferidos:
            getPreferredThemes(),

          restricoesMedicas:
            restricoesMedicas.trim(),
        });

      console.log(
        "CRIANÇA CADASTRADA:",
        child
      );

      await saveSelectedChild(
        child
      );

      console.log(
        "CRIANÇA SALVA COMO SELECIONADA:",
        child
      );

      router.replace(
        "/device"
      );
    } catch (error) {
      console.error(
        "Erro ao cadastrar criança:",
        error
      );

      setError(
        error.message ||
          "Não foi possível cadastrar a criança."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  function formatBirthDate(
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
          8
        );

    if (
      numbers.length <= 2
    ) {
      return numbers;
    }

    if (
      numbers.length <= 4
    ) {
      return `${numbers.slice(
        0,
        2
      )}/${numbers.slice(
        2
      )}`;
    }

    return `${numbers.slice(
      0,
      2
    )}/${numbers.slice(
      2,
      4
    )}/${numbers.slice(
      4
    )}`;
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
        className="flex-1 px-3 pt-2"
        showsVerticalScrollIndicator={
          false
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          paddingBottom:
            40,
        }}
      >
        <View className="mt-3 mb-5">
          <Text className="text-[#80775C] text-[14px] font-medium mb-2">
            Passo 2 de 2
          </Text>

          <View className="w-full h-[8px] bg-[#E8E3D7] rounded-full overflow-hidden">
            <View className="h-full w-full bg-[#A3C78C] rounded-full" />
          </View>
        </View>

        <View className="w-full h-[190px] bg-[#E5DCC4] rounded-[10px] items-center justify-center mb-4">
          <View className="relative">
            <View className="w-[110px] h-[110px] rounded-full bg-[#F2F0E8] items-center justify-center">
              <Ionicons
                name="person"
                size={64}
                color="#A3A3A3"
              />
            </View>

            <TouchableOpacity
              activeOpacity={
                0.8
              }
              className="absolute -right-2 bottom-0 w-[44px] h-[44px] bg-[#83BF6E] rounded-full items-center justify-center"
            >
              <Ionicons
                name="camera"
                size={21}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-[#E5DCC4] rounded-[10px] px-4 py-5">
          <Text className="text-[#554B41] text-[20px] font-bold mb-5">
            Dados da criança
          </Text>

          <Text className="text-[#554B41] text-[15px] font-medium mb-2">
            Nome completo
          </Text>

          <TextInput
            value={
              nome
            }
            onChangeText={
              setNome
            }
            className="w-full h-[54px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 mb-4 text-[#554B41] text-[15px]"
            placeholder="Digite o nome completo"
            placeholderTextColor="#A7A7A7"
          />

          <Text className="text-[#554B41] text-[15px] font-medium mb-2">
            Data de nascimento
          </Text>

          <TextInput
            value={
              dataNascimento
            }
            onChangeText={(
              value
            ) => {
              setDataNascimento(
                formatBirthDate(
                  value
                )
              );
            }}
            className="w-full h-[54px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 mb-4 text-[#554B41] text-[15px]"
            placeholder="dd/mm/aaaa"
            placeholderTextColor="#A7A7A7"
            keyboardType="numeric"
            maxLength={
              10
            }
          />

          <Text className="text-[#554B41] text-[15px] font-medium mb-3">
            Sexo
          </Text>

          <View className="flex-row justify-between mb-5">
            <TouchableOpacity
              activeOpacity={
                0.8
              }
              onPress={() =>
                setSexo(
                  "masculino"
                )
              }
              className={`w-[48%] h-[82px] rounded-[10px] items-center justify-center border ${
                sexo ===
                "masculino"
                  ? "border-[#83BF6E] bg-[#EDF6E8]"
                  : "border-[#DDD3B9] bg-[#F7F0DC]"
              }`}
            >
              <Image
                source={require(
                  "../../../assets/images/masculino_sexo.png"
                )}
                className="w-[25px] h-[26px] mb-1"
                resizeMode="contain"
              />

              <Text className="text-[#554B41] text-[14px] font-medium">
                Masculino
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={
                0.8
              }
              onPress={() =>
                setSexo(
                  "feminino"
                )
              }
              className={`w-[48%] h-[82px] rounded-[10px] items-center justify-center border ${
                sexo ===
                "feminino"
                  ? "border-[#83BF6E] bg-[#EDF6E8]"
                  : "border-[#DDD3B9] bg-[#F7F0DC]"
              }`}
            >
              <Image
                source={require(
                  "../../../assets/images/feminino_sexo.png"
                )}
                className="w-[25px] h-[26px] mb-1"
                resizeMode="contain"
              />

              <Text className="text-[#554B41] text-[14px] font-medium">
                Feminino
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-[#554B41] text-[15px] font-medium mb-2">
            Temas preferidos
          </Text>

          <TextInput
            value={
              temasPreferidos
            }
            onChangeText={
              setTemasPreferidos
            }
            className="w-full min-h-[96px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 py-3 text-[#554B41] text-[15px]"
            placeholder="Ex.: dinossauros, carros, desenhos..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          <Text className="text-[#80775C] text-[12px] mt-1 mb-4">
            Separe os temas por vírgulas.
          </Text>

          <Text className="text-[#554B41] text-[15px] font-medium mb-2">
            Restrições
          </Text>

          <TextInput
            value={
              restricoesMedicas
            }
            onChangeText={
              setRestricoesMedicas
            }
            className="w-full min-h-[96px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 py-3 text-[#554B41] text-[15px]"
            placeholder="Se houver, insira as restrições..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          <Text className="text-[#554B41] text-[15px] font-medium mb-2 mt-4">
            Observações
          </Text>

          <TextInput
            value={
              observacoes
            }
            onChangeText={
              setObservacoes
            }
            className="w-full min-h-[96px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 py-3 text-[#554B41] text-[15px]"
            placeholder="Digite alguma observação..."
            placeholderTextColor="#A7A7A7"
            multiline
            textAlignVertical="top"
          />

          {error ? (
            <View className="bg-[#FCEBE8] rounded-[10px] px-3 py-3 mt-4">
              <Text className="text-[#D9534F] text-[14px] font-medium text-center">
                {error}
              </Text>
            </View>
          ) : null}

          <View className="mt-6">
            <PrimaryButton
              title={
                loading
                  ? "Salvando..."
                  : "Salvar"
              }
              onPress={
                handleRegisterChild
              }
              disabled={
                loading
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
