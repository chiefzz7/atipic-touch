import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

import AvatarHeader from "../../components/AvatarHeader";
import SectionCard from "../../components/SectionCard";
import PowerButton from "../../components/PowerButton";
import PrimaryButton from "../../components/PrimaryButton";
import BottomNavigation from "../../components/BottomNavigation";

export default function Device() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <View className="flex-1 w-full max-w-[600px] self-center px-3 pt-7 pb-[105px]">
  <ScrollView>
        <AvatarHeader/>

        <View className="mt-0">
          <SectionCard title="Status do dispositivo auxiliador">

            <PowerButton />

            <Text className="text-[#554B41] text-[30px] font-normal mt-8 text-center">
              Auxiliador desconectado
            </Text>

          </SectionCard>
        </View>

        <View className="mt-8">
          <PrimaryButton title="Iniciar refeição" disabled onPress={() => {}} />
        </View>

  </ScrollView>
      </View>

      <BottomNavigation active="device" />

    </SafeAreaView>
  );
}