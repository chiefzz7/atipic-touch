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
        className="w-[200px] h-[200px] rounded-full items-center justify-center"
        style={{
          backgroundColor: "#A3987B",
        }}
      >

        <View
          className="w-[165px] h-[165px] rounded-full items-center justify-center"
          style={{
            backgroundColor: "#F25A4F",
          }}
        >

          <Ionicons
            name="power"
            size={95}
            color="#7A0000"
          />

        </View>

      </View>

    </TouchableOpacity>
  );
}