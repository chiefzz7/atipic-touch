import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ExpoImagePicker from "expo-image-picker";

export default function ImagePicker({ image, title = "Adicionar imagem", onChange, }) {
  async function pickImage() {
    const permission =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "É necessário permitir acesso à galeria."
      );
      return;
    }

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={pickImage}
      className="items-center justify-center self-center"
    >
      <View className="w-[190px] h-[190px] rounded-full border-2 border-dashed border-[#6E6246] bg-[#F4F0DE] items-center justify-center overflow-hidden">

        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <>
            <Ionicons
              name="camera"
              size={56}
              color="#6E6246"
            />

            <Text className="text-[#80775C] text-[18px] mt-3 text-center">
              {title}
            </Text>
          </>
        )}

      </View>
    </TouchableOpacity>
  );
}