import React, { useState } from "react";
import { Modal, SafeAreaView, ScrollView, View, Text, TouchableOpacity, TextInput, Image, useWindowDimensions, } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import BottomNavigation from "../BottomNavigation";

export default function InteractionModal({visible, onClose, onSubmit}) {
  const { width } = useWindowDimensions();

  const [emotion, setEmotion] = useState("Gostou");
  const [aspect, setAspect] = useState("Cor");
  const [observation, setObservation] = useState("");

  const emotions = [
    {
      value: "Gostou",
      icon: "happy-outline",
      color: "#3D8B3D",
    },
    {
      value: "Neutro",
      icon: "remove-circle-outline",
      color: "#F2C94C",
    },
    {
      value: "Não gostou",
      icon: "sad-outline",
      color: "#C92F2F",
    },
  ];

  const aspects = [
    {
      label: "Cor",
      icon: "color-palette-outline",
    },
    {
      label: "Sabor",
      icon: "restaurant-outline",
    },
    {
      label: "Cheiro",
      icon: "water-outline",
    },
    {
      label: "Textura",
      icon: "hand-left-outline",
    },
    {
      label: "Temperatura",
      icon: "thermometer-outline",
    },
  ];

  const horizontalPadding = 16;
  const aspectGap = 8;

  const aspectWidth =
    (width - horizontalPadding * 2 - aspectGap * 4) / 5;

  const handleSubmit = () => {
    const experience = {
      emotion,
      aspect,
      observation,
    };

    onSubmit?.(experience);
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-[#FFFCEF]">

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 110,
          }}
        >

          <View className="px-4 pt-3 flex-row items-center">

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.8}
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color="#6F4E24"
              />
            </TouchableOpacity>

            <Text
              numberOfLines={1}
              className="flex-1 text-center text-[#6F4E24] text-[28px] font-bold"
            >
              Confirmar dados
            </Text>

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-10 h-10 items-center justify-center"
            >
              <Ionicons
                name="help-circle-outline"
                size={28}
                color="#6F4E24"
              />
            </TouchableOpacity>

          </View>

          <Text className="px-4 mt-2 text-[#555555] text-[17px]">
            Reveja e confirme as informações antes de salvar.
          </Text>

          <View className="mx-4 mt-5 rounded-[10px] border border-[#E5DCC4] overflow-hidden">

            <View className="bg-[#F7F0DC] px-4 py-4">

              <View className="flex-row items-center justify-between">

                <View className="flex-1 pr-2">

                  <Text
                    numberOfLines={1}
                    className="text-[#554B41] text-[20px] font-bold"
                  >
                    Reação da criança
                  </Text>

                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.8}
                    className="text-[#80775C] text-[16px] mt-1"
                  >
                    Como a criança reagiu ao alimento?
                  </Text>

                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="border border-[#E5DCC4] rounded-[10px] px-3 py-2 flex-row items-center"
                >
                  <Ionicons
                    name="pencil-outline"
                    size={18}
                    color="#6F4E24"
                  />

                  <Text
                    numberOfLines={1}
                    className="text-[#6F4E24] ml-2 text-[14px] font-medium"
                  >
                    Alterar reação
                  </Text>
                </TouchableOpacity>

              </View>

            </View>

            <View className="bg-[#FFFCEF] px-4 py-6">

              <View className="flex-row">

                {emotions.map((item, index) => {
                  const selected = emotion === item.value;

                  return (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => setEmotion(item.value)}
                      activeOpacity={0.8}
                      className={`flex-1 h-[116px] rounded-[10px] items-center justify-center border ${index !== emotions.length - 1
                        ? "mr-3"
                        : ""
                        } ${selected
                          ? "border-[#3D8B3D] bg-[#F4FAEF]"
                          : "border-[#E5DCC4] bg-[#FFFCEF]"
                        }`}
                    >

                      <Ionicons
                        name={item.icon}
                        size={42}
                        color={item.color}
                      />

                      <Text
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        minimumFontScale={0.8}
                        className={`mt-2 text-[17px] ${selected
                          ? "text-[#3D8B3D] font-bold"
                          : "text-[#554B41]"
                          }`}
                      >
                        {item.value}
                      </Text>

                    </TouchableOpacity>
                  );
                })}

              </View>

            </View>

          </View>

          <View className="mx-4 mt-5 rounded-[10px] border border-[#E5DCC4] overflow-hidden">

            <View className="bg-[#F7F0DC] px-4 py-4">

              <View className="flex-row items-center">

                <View className="flex-1 min-w-0 pr-2">

                  <Text
                    numberOfLines={1}
                    className="text-[#554B41] text-[20px] font-bold"
                  >
                    Alimento
                  </Text>

                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-[#80775C] text-[15px] mt-1"
                  >
                    Qual alimento foi oferecido?
                  </Text>

                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="shrink-0 border border-[#E5DCC4] rounded-[10px] px-3 py-2 flex-row items-center"
                >

                  <Ionicons
                    name="pencil-outline"
                    size={18}
                    color="#6F4E24"
                  />

                  <Text
                    numberOfLines={1}
                    className="text-[#6F4E24] ml-2 text-[14px] font-medium"
                  >
                    Alterar alimento
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

            <View className="px-4 py-4 flex-row items-center">

              <View
                className="w-[78px] h-[78px] rounded-[8px] overflow-hidden shrink-0"
              >
                <Image
                  source={require("../../../assets/images/foods/feijao.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  resizeMode="cover"
                />
              </View>

              <View className="flex-1 min-w-0 ml-4">

                <Text
                  numberOfLines={2}
                  className="text-[#554B41] text-[18px] font-bold"
                >
                  Feijão
                </Text>

                <View className="self-start mt-2 px-3 py-1 rounded-full bg-[#F1E6CA]">

                  <Text className="text-[#806A42] text-[13px]">
                    Pré-cadastrado
                  </Text>

                </View>

              </View>

            </View>

          </View>

          <View className="mx-4 mt-5">

            <Text
              numberOfLines={1}
              className="text-[#554B41] text-[21px] font-bold"
            >
              Aspecto avaliado
            </Text>

            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
              className="text-[#80775C] text-[16px] mt-1"
            >
              Em qual aspecto a reação foi observada?
            </Text>

            <View className="flex-row mt-4">

              {aspects.map((item, index) => {
                const selected = aspect === item.label;

                return (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setAspect(item.label)}
                    activeOpacity={0.8}
                    style={{
                      width: aspectWidth,
                      height: 108,
                      marginRight:
                        index !== aspects.length - 1
                          ? aspectGap
                          : 0,
                    }}
                    className={`rounded-[10px] items-center justify-center border ${selected
                      ? "border-[#3D8B3D] bg-[#F4FAEF]"
                      : "border-[#E5DCC4] bg-[#FFFCEF]"
                      }`}
                  >

                    <Ionicons
                      name={item.icon}
                      size={40}
                      color={
                        selected
                          ? "#3D8B3D"
                          : "#806A42"
                      }
                    />

                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.65}
                      className={`mt-2 text-[15px] text-center ${selected
                        ? "text-[#3D8B3D] font-bold"
                        : "text-[#554B41]"
                        }`}
                    >
                      {item.label}
                    </Text>

                  </TouchableOpacity>
                );
              })}

            </View>

          </View>

          <View className="mx-4 mt-5 rounded-[10px] border border-[#E5DCC4] overflow-hidden">

            <View className="bg-[#F7F0DC] px-4 py-4">

              <Text className="text-[#554B41] text-[21px] font-bold">
                Resumo da interação
              </Text>

              <Text className="text-[#80775C] text-[16px] mt-1">
                Confira se está tudo certo:
              </Text>

            </View>

            <View className="px-4 py-4">

              <View className="flex-row items-center">

                <View className="flex-1 h-[98px] rounded-[10px] border border-[#9BC78C] bg-[#F4FAEF] items-center justify-center">

                  <Ionicons
                    name="happy-outline"
                    size={38}
                    color="#3D8B3D"
                  />

                  <Text className="text-[#3D8B3D] font-bold mt-1">
                    {emotion}
                  </Text>

                </View>

                <Text className="text-[#554B41] text-[28px] mx-2">
                  +
                </Text>

                <View className="flex-1 h-[98px] rounded-[10px] border border-[#E5DCC4] bg-[#FFFCEF] items-center justify-center">

                  <Ionicons
                    name="color-palette-outline"
                    size={36}
                    color="#806A42"
                  />

                  <Text className="text-[#554B41] font-bold mt-1">
                    {aspect}
                  </Text>

                </View>

                <Text className="text-[#554B41] text-[28px] mx-2">
                  +
                </Text>

                <View className="flex-[2.2] h-[98px] rounded-[10px] border border-[#E5DCC4] bg-[#F7F0DC] flex-row items-center px-1">

                  <View className="w-[72px] h-[72px] rounded-[8px] overflow-hidden shrink-0">
                    <Image
                      source={require("../../../assets/images/foods/feijao.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    numberOfLines={4}
                    className="flex-1 min-w-0 ml-1 text-[#554B41] text-[10px] font-bold"
                  >
                    Feijão
                  </Text>

                </View>
              </View>

              <View className="flex-row items-center mt-5">

                <Ionicons
                  name="calendar-outline"
                  size={21}
                  color="#6F4E24"
                />

                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  className="flex-1 ml-2 text-[#554B41] text-[15px]"
                >
                  Hoje, 08 de maio de 2025 às 09:41
                </Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="flex-row items-center ml-2"
                >

                  <Ionicons
                    name="pencil-outline"
                    size={18}
                    color="#6F4E24"
                  />

                  <Text
                    numberOfLines={1}
                    className="text-[#6F4E24] ml-1 text-[14px]"
                  >
                    Editar
                  </Text>

                </TouchableOpacity>

              </View>

              <View className="mt-5">

                <Text className="text-[#554B41] text-[16px] font-bold">

                  Observações

                  <Text className="font-normal">
                    {" "} (opcional)
                  </Text>

                </Text>

                <TextInput
                  value={observation}
                  onChangeText={setObservation}
                  placeholder="Adicione observações sobre esse momento..."
                  placeholderTextColor="#B8B4AA"
                  multiline
                  textAlignVertical="top"
                  className="mt-2 min-h-[70px] border border-[#E5DCC4] rounded-[10px] px-3 py-3 text-[#554B41]"
                />

              </View>

            </View>

          </View>

          <View className="mx-4 mt-5">

            <TouchableOpacity
              onPress={handleSubmit}
              activeOpacity={0.85}
              className="h-[62px] rounded-[10px] bg-[#4D9B43] items-center justify-center flex-row"
            >

              <Ionicons
                name="checkmark-circle-outline"
                size={27}
                color="white"
              />

              <Text className="text-white text-[18px] font-bold ml-2">
                Confirmar e salvar
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.85}
              className="h-[62px] mt-3 rounded-[10px] border border-[#C98F7C] items-center justify-center"
            >

              <Text className="text-[#9B5547] text-[18px] font-medium">
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </ScrollView>

        <BottomNavigation active="dashboard" />

      </SafeAreaView>
    </Modal>
  );
}