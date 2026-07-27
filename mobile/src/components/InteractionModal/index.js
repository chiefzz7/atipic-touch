import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import InteractionSection from "../InteractionSection";
import EmotionSelector from "../EmotionSelector";
import PrimaryButton from "../PrimaryButton";

export default function InteractionModal({
  visible,
  onClose,
  onSubmit,
}) {
  const [color, setColor] = useState("");
  const [texture, setTexture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [flavor, setFlavor] = useState("");
  const [smell, setSmell] = useState("");
  const [emotion, setEmotion] = useState("");

  const handleSubmit = () => {
    const experience = {
      color,
      texture,
      temperature,
      flavor,
      smell,
      emotion,
    };

    if (onSubmit) {
      onSubmit(experience);
    }

    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>

        <View className="flex-1 bg-black/40 justify-center items-center px-4">

          <TouchableWithoutFeedback>

            <View
              className="w-full max-w-[390px] bg-[#C6BB9A] rounded-xl p-5"
              style={{
                maxHeight: "88%",
              }}
            >

              <Text className="text-2xl font-bold text-[#554B41] mb-1">
                Minhas experiências
              </Text>

              <Text className="text-[#6F6755] mb-5">
                Conte como foi sua refeição.
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
              >

                <InteractionSection
                  title="Cor"
                  icon="color-palette-outline"
                  selected={color}
                  onSelect={setColor}
                  items={[
                    { label: "Vermelho", color: "#F44336" },
                    { label: "Laranja", color: "#FF9800" },
                    { label: "Amarelo", color: "#FDD835" },
                    { label: "Verde", color: "#43A047" },
                    { label: "Marrom", color: "#6D4C41" },
                    { label: "Roxo", color: "#8E24AA" },
                  ]}
                />

                <InteractionSection
                  title="Textura"
                  icon="hand-left-outline"
                  selected={texture}
                  onSelect={setTexture}
                  items={[
                    { label: "Macio", image: true },
                    { label: "Áspero", image: true },
                    { label: "Liso", image: true },
                    { label: "Pegajoso", image: true },
                    { label: "Neutro", image: true },
                  ]}
                />

                <InteractionSection
                  title="Temperatura"
                  icon="thermometer-outline"
                  selected={temperature}
                  onSelect={setTemperature}
                  items={[
                    { label: "Quente", image: true },
                    { label: "Agradável", image: true },
                    { label: "Neutro", image: true },
                    { label: "Frio", image: true },
                  ]}
                />

                <InteractionSection
                  title="Sabor"
                  icon="restaurant-outline"
                  selected={flavor}
                  onSelect={setFlavor}
                  items={[
                    { label: "Doce", image: true },
                    { label: "Salgado", image: true },
                    { label: "Azedo", image: true },
                    { label: "Amargo", image: true },
                    { label: "Neutro", image: true },
                  ]}
                />

                <InteractionSection
                  title="Cheiro"
                  icon="flower-outline"
                  selected={smell}
                  onSelect={setSmell}
                  items={[
                    { label: "Agradável", image: true },
                    { label: "Neutro", image: true },
                    { label: "Desagradável", image: true },
                  ]}
                />

                <EmotionSelector
                  selected={emotion}
                  onSelect={setEmotion}
                />

                <View className="mt-6 mb-2">

                  <PrimaryButton
                    title="Enviar"
                    onPress={handleSubmit}
                  />

                </View>

              </ScrollView>

            </View>

          </TouchableWithoutFeedback>

        </View>

      </TouchableWithoutFeedback>

    </Modal>
  );
}