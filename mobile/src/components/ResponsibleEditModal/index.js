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
  updateCurrentUser,
} from "../../services/users/users";

export default function ResponsibleEditModal({
  visible,
  user,
  onClose,
  onSaved,
}) {
  const [
    nome,
    setNome,
  ] = useState("");

  const [
    telefone,
    setTelefone,
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
    if (!visible) {
      return;
    }

    setNome(
      user?.nome ||
        ""
    );

    setTelefone(
      user?.telefone ||
        ""
    );

    setError("");
  }, [
    visible,
    user,
  ]);

  async function handleSave() {
    const normalizedName =
      nome.trim();

    const normalizedPhone =
      telefone.trim();

    if (!normalizedName) {
      setError(
        "Informe o nome do responsável."
      );

      return;
    }

    if (!normalizedPhone) {
      setError(
        "Informe o telefone do responsável."
      );

      return;
    }

    try {
      setLoading(
        true
      );

      setError("");

      const updatedUser =
        await updateCurrentUser({
          nome:
            normalizedName,

          telefone:
            normalizedPhone,
        });

      onSaved?.(
        updatedUser
      );

      onClose?.();
    } catch (err) {
      console.error(
        "Erro ao atualizar responsável:",
        err
      );

      setError(
        err?.message ||
          "Não foi possível atualizar os dados."
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
          <View className="w-full max-w-[420px] bg-[#FFFCEF] rounded-[10px] overflow-hidden">
            <View className="bg-[#E5DCC4] px-5 py-4 flex-row items-center">
              <View className="w-[42px] h-[42px] rounded-full bg-[#C6BB9A] items-center justify-center">
                <Ionicons
                  name="person-outline"
                  size={23}
                  color="#554B41"
                />
              </View>

              <View className="flex-1 ml-3">
                <Text className="text-[#554B41] text-[20px] font-bold">
                  Editar responsável
                </Text>

                <Text className="text-[#80775C] text-[13px] mt-1">
                  Atualize seus dados pessoais.
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
                placeholder="Nome do responsável"
                placeholderTextColor="#A7A7A7"
                className="w-full h-[54px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 text-[#554B41] text-[15px]"
              />

              <Text className="text-[#554B41] text-[14px] font-medium mt-4 mb-2">
                Telefone
              </Text>

              <TextInput
                value={
                  telefone
                }
                onChangeText={
                  setTelefone
                }
                editable={
                  !loading
                }
                keyboardType="phone-pad"
                placeholder="Telefone"
                placeholderTextColor="#A7A7A7"
                className="w-full h-[54px] bg-[#F7F0DC] border border-[#DDD3B9] rounded-[10px] px-4 text-[#554B41] text-[15px]"
              />

              <Text className="text-[#554B41] text-[14px] font-medium mt-4 mb-2">
                E-mail
              </Text>

              <View className="w-full min-h-[54px] bg-[#EDE8D0] border border-[#DDD3B9] rounded-[10px] px-4 justify-center">
                <Text
                  numberOfLines={
                    1
                  }
                  className="text-[#80775C] text-[15px]"
                >
                  {user?.email ||
                    "Não informado"}
                </Text>
              </View>

              <View className="flex-row items-start mt-2">
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#80775C"
                />

                <Text className="flex-1 text-[#80775C] text-[12px] ml-1">
                  O e-mail não pode ser alterado neste momento.
                </Text>
              </View>

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
