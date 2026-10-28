import React, {
  useEffect,
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import PrimaryButton from "../PrimaryButton";

import {
  updateChild,
} from "../../services/children/children";

export default function ChildEditModal({
  visible,
  child,
  onClose,
  onSaved,
}) {
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

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (
      !visible ||
      !child
    ) {
      return;
    }

    setNome(
      child.nome ||
        ""
    );

    setDataNascimento(
      formatApiDateToDisplay(
        child.dataNascimento
      )
    );

    setTemasPreferidos(
      Array.isArray(
        child.temasPreferidos
      )
        ? child.temasPreferidos.join(
            ", "
          )
        : ""
    );

    setRestricoesMedicas(
      child.restricoesMedicas ||
        ""
    );

    setError("");
  }, [
    visible,
    child,
  ]);

  function formatApiDateToDisplay(
    date
  ) {
    if (!date) {
      return "";
    }

    const [
      year,
      month,
      day,
    ] =
      date.split("-");

    if (
      !year ||
      !month ||
      !day
    ) {
      return date;
    }

    return `${day}/${month}/${year}`;
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

  function getPreferredThemes() {
    return temasPreferidos
      .split(",")
      .map(
        (theme) =>
          theme.trim()
      )
      .filter(Boolean);
  }

  async function handleSave() {
    const normalizedName =
      nome.trim();

    const birthDate =
      formatDateToApi(
        dataNascimento
      );

    if (!child?.id) {
      setError(
        "Não foi possível identificar a criança."
      );

      return;
    }

    if (!normalizedName) {
      setError(
        "Informe o nome da criança."
      );

      return;
    }

    if (
      !dataNascimento.trim()
    ) {
      setError(
        "Informe a data de nascimento."
      );

      return;
    }

    if (!birthDate) {
      setError(
        "Informe a data no formato dd/mm/aaaa."
      );

      return;
    }

    try {
      setLoading(
        true
      );

      setError("");

      const updatedChild =
        await updateChild(
          child.id,
          {
            nome:
              normalizedName,

            dataNascimento:
              birthDate,

            temasPreferidos:
              getPreferredThemes(),

            restricoesMedicas:
              restricoesMedicas.trim(),
          }
        );

      if (onSaved) {
        await onSaved(
          updatedChild
        );
      }

      onClose?.();
    } catch (err) {
      console.error(
        "Erro ao atualizar criança:",
        err
      );

      setError(
        err?.message ||
          "Não foi possível atualizar os dados da criança."
      );
    } finally {
      setLoading(
        false
      );
    }
  }

  function handleClose() {
    if (loading) {
      return;
    }

    onClose?.();
  }

  return (
    <Modal
      visible={
        visible
      }
      transparent
      animationType="fade"
      onRequestClose={
        handleClose
      }
    >
      <KeyboardAvoidingView
        className="flex-1"
        behavior={
          Platform.OS ===
          "ios"
            ? "padding"
            : "height"
        }
      >
        <View className="flex-1 bg-black/40 items-center justify-center px-5">
          <View
            className="w-full max-w-[420px] bg-[#FFFCEF] rounded-[28px] overflow-hidden"
            style={{
              maxHeight:
                "88%",
            }}
          >
            <View className="bg-white border border-[#EFE7D0] shadow-sm px-5 py-4 flex-row items-center">
              <View className="w-[42px] h-[42px] rounded-full bg-[#EFEAD6] items-center justify-center">
                <Ionicons
                  name="person-outline"
                  size={23}
                  color="#554B41"
                />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-[#554B41] text-[20px] font-bold">
                  Editar criança
                </Text>

                <Text
                  numberOfLines={
                    1
                  }
                  className="text-[#80775C] text-[13px] mt-1"
                >
                  {child?.nome ||
                    "Atualize os dados da criança"}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                onPress={
                  handleClose
                }
                disabled={
                  loading
                }
                className="w-[38px] h-[38px] items-center justify-center"
              >
                <Ionicons
                  name="close"
                  size={25}
                  color="#554B41"
                />
              </TouchableOpacity>
            </View>

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={
                false
              }
              contentContainerStyle={{
                padding:
                  20,
              }}
            >
              <Text className="text-[#554B41] text-[14px] font-medium mb-2">
                Nome
              </Text>

              <TextInput
                value={
                  nome
                }
                onChangeText={
                  setNome
                }
                editable={
                  !loading
                }
                placeholder="Nome da criança"
                placeholderTextColor="#A3987B"
                className="w-full h-[54px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 text-[#554B41] text-[15px]"
              />

              <Text className="text-[#554B41] text-[14px] font-medium mt-4 mb-2">
                Data de nascimento
              </Text>

              <TextInput
                value={
                  dataNascimento
                }
                onChangeText={(
                  value
                ) =>
                  setDataNascimento(
                    formatBirthDate(
                      value
                    )
                  )
                }
                editable={
                  !loading
                }
                keyboardType="numeric"
                maxLength={
                  10
                }
                placeholder="dd/mm/aaaa"
                placeholderTextColor="#A3987B"
                className="w-full h-[54px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 text-[#554B41] text-[15px]"
              />

              <Text className="text-[#554B41] text-[14px] font-medium mt-4 mb-2">
                Temas preferidos
              </Text>

              <TextInput
                value={
                  temasPreferidos
                }
                onChangeText={
                  setTemasPreferidos
                }
                editable={
                  !loading
                }
                multiline
                textAlignVertical="top"
                placeholder="Ex.: dinossauros, carros, desenhos..."
                placeholderTextColor="#A3987B"
                className="w-full min-h-[90px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-3 text-[#554B41] text-[15px]"
              />

              <Text className="text-[#80775C] text-[12px] mt-1">
                Separe os temas por vírgulas.
              </Text>

              <Text className="text-[#554B41] text-[14px] font-medium mt-4 mb-2">
                Restrições
              </Text>

              <TextInput
                value={
                  restricoesMedicas
                }
                onChangeText={
                  setRestricoesMedicas
                }
                editable={
                  !loading
                }
                multiline
                textAlignVertical="top"
                placeholder="Se houver, informe as restrições..."
                placeholderTextColor="#A3987B"
                className="w-full min-h-[90px] bg-[#FBF8EE] border border-[#E7DFC6] rounded-[16px] px-4 py-3 text-[#554B41] text-[15px]"
              />

              {error ? (
                <View className="bg-[#FCEBE8] rounded-[16px] px-3 py-3 mt-4">
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
                      : "Salvar alterações"
                  }
                  onPress={
                    handleSave
                  }
                  disabled={
                    loading
                  }
                />
              </View>

              <TouchableOpacity
                activeOpacity={
                  0.8
                }
                onPress={
                  handleClose
                }
                disabled={
                  loading
                }
                className="h-[50px] mt-2 items-center justify-center"
              >
                <Text className="text-[#80775C] text-[15px] font-medium">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
