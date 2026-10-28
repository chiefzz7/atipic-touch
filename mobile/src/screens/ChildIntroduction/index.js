import React from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import {
  StatusBar,
} from "expo-status-bar";

import {
  useRouter,
} from "expo-router";

import ScreenContainer from "../../components/ScreenContainer";

export default function ChildIntroductionScreen() {
  const router =
    useRouter();

  const {
    width,
    height,
  } =
    useWindowDimensions();

  const isSmallScreen =
    height < 750;

  const artWidth =
    Math.min(
      width,
      412
    );

  const artHeight =
    isSmallScreen
      ? 275
      : 315;

  const broccoliSize =
    Math.min(
      width * 0.53,
      216
    );

  const circleWidth =
    Math.max(
      width * 1.75,
      700
    );

  return (
    <SafeAreaView className="flex-1 bg-[#FFFCEF]">
      <StatusBar
        style="dark"
      />

      <ScreenContainer>
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingHorizontal:
              20,

            paddingTop:
              isSmallScreen
                ? 18
                : 28,

            paddingBottom:
              30,
          }}
        >
          <View
            pointerEvents="none"
            className="absolute rounded-full bg-[#E5DCC4]"
            style={{
              width:
                circleWidth,

              height:
                isSmallScreen
                  ? 680
                  : 730,

              top:
                -40,

              left:
                -(
                  circleWidth -
                  width
                ) /
                2,
            }}
          />

          <View className="w-full items-center">
            <View className="w-full h-[8px] bg-[#FFFCEF] rounded-full overflow-hidden">
              <View
                className="h-full bg-[#438C3B] rounded-full"
                style={{
                  width:
                    "48%",
                }}
              />
            </View>

            <Text className="text-[#80775C] text-[18px] font-medium mt-2">
              Passo 1 de 2
            </Text>
          </View>

          <Text
            className={`text-[#554B41] text-center font-bold ${
              isSmallScreen
                ? "text-[42px]"
                : "text-[48px]"
            }`}
          >
            Boas-vindas!
          </Text>

          <View
            className="w-full items-center relative"
            style={{
              height:
                artHeight,

              marginTop:
                isSmallScreen
                  ? 4
                  : 8,
            }}
          >
            <Image
              source={require(
                "../../../assets/images/introducao_fitas.png"
              )}
              resizeMode="contain"
              style={{
                position:
                  "absolute",

                width:
                  artWidth,

                height:
                  artHeight,

                top:
                  0,
              }}
            />

            <Image
              source={require(
                "../../../assets/images/introducao_brocolis.png"
              )}
              resizeMode="contain"
              style={{
                position:
                  "absolute",

                width:
                  broccoliSize,

                height:
                  broccoliSize *
                  1.09,

                bottom:
                  isSmallScreen
                    ? -2
                    : 0,
              }}
            />
          </View>

          <View className="mt-2">
            <Text
              className={`text-[#554B41] font-bold ${
                isSmallScreen
                  ? "text-[20px]"
                  : "text-[22px]"
              }`}
            >
              Tudo certo, Maria.
            </Text>

            <Text
              className={`text-[#80775C] mt-2 ${
                isSmallScreen
                  ? "text-[17px]"
                  : "text-[19px]"
              }`}
              style={{
                lineHeight:
                  isSmallScreen
                    ? 24
                    : 27,
              }}
            >
              Agora precisamos conhecer um pouquinho de quem mais vai usar nosso pianinho mágico...
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={
              0.85
            }
            onPress={() =>
              router.push(
                "/child-register"
              )
            }
            className="w-full items-center justify-center rounded-[18px] bg-[#438C3B]"
            style={{
              height:
                isSmallScreen
                  ? 58
                  : 62,

              marginTop:
                isSmallScreen
                  ? 28
                  : 38,
            }}
          >
            <Text
              className={`text-white font-bold ${
                isSmallScreen
                  ? "text-[18px]"
                  : "text-[20px]"
              }`}
            >
              Cadastrar criança
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenContainer>
    </SafeAreaView>
  );
}
