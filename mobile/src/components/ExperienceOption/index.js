import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function ExperienceOption({
  title,
  selected = false,
}) {

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      className="px-4 py-2 rounded-full mr-2 mb-2"
      style={{
        backgroundColor: selected ? "#A3C78C" : "#EDE8D0",
      }}
    >

      <Text
        style={{
          color: selected ? "#FFFCEF" : "#554B41",
        }}
        className="font-semibold"
      >
        {title}
      </Text>

    </TouchableOpacity>
  );

}