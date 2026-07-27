import React from "react";
import {View,Text} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import ExperienceOption from "../ExperienceOption";

export default function ExperienceCard({
  title, question, icon, options = [],selected}) {

  return (

    <View className="bg-[#FFFCEF] rounded-[7px] p-4 mb-2">

      <View className="flex-row items-center mb-2">

        <Ionicons
          name={icon}
          size={24}
          color="#554B41"
        />

        <Text className="text-lg font-bold text-[#554B41] ml-2">
          {title}
        </Text>

      </View>

      <Text className="text-[#80775C] mb-2">
        {question}
      </Text>

      <View className="flex-row flex-wrap">

        {options.map((option) => (

          <ExperienceOption
            key={option}
            title={option}
            selected={option === selected}
          />

        ))}

      </View>

    </View>

  );

}