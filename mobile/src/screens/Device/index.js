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

      <View className="flex-1 w-full self-center px-3 pt-5">

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 110,
          }}
        >
          <AvatarHeader />

          <View className="mt-0">
            <SectionCard title="Status do dispositivo auxiliador">

              <PowerButton />

              <Text className="text-[#554B41] text-[30px] font-normal mt-8 text-center">
                Auxiliador desconectado
              </Text>

              <View className="mt-8">
                <PrimaryButton
                  title="Iniciar refeição"
                  disabled
                  onPress={() => {}}
                />
              </View>

            </SectionCard>
          </View>

        </ScrollView>

      </View>

      <BottomNavigation active="device" />

    </SafeAreaView>
  );
}