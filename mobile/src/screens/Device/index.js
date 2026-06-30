import React from "react";
import { SafeAreaView, View, Text } from "react-native";

import AvatarHeader from "../../components/AvatarHeader";
import StatusCard from "../../components/StatusCard";
import PowerButton from "../../components/PowerButton";
import PrimaryButton from "../../components/PrimaryButton";
import BottomNavigation from "../../components/BottomNavigation";

export default function Device() {
  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">

      <View className="flex-1 px-3 pt-7">

        {/* Header */}

        <AvatarHeader />

        {/* Card */}

        <View className="mt-5 flex-1">

          <StatusCard>

            <PowerButton />

            <Text
              className="text-[#554B41] text-[30px] font-normal mt-8 text-center"
            >
              Auxiliador desconectado
            </Text>

          </StatusCard>

        </View>

        {/* Botão */}

        <View className="mb-6">

          <PrimaryButton
            title="Iniciar refeição"
            disabled
            onPress={() => {}}
          />

        </View>

      </View>

      <BottomNavigation />

    </SafeAreaView>
  );
}