import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PowerButton() {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="items-center justify-center"
    >

      <View
        className="w-[250px] h-[250px] rounded-full items-center justify-center"
        style={{
          backgroundColor: "#A3987B",
        }}
      >

        <View
          className="w-[225px] h-[225px] rounded-full items-center justify-center"
          style={{
            backgroundColor: "#F25A4F",
          }}
        >

          <Ionicons
            name="power"
            size={120}
            color="#7A0000"
          />

        </View>

      </View>

    </TouchableOpacity>
  );
}