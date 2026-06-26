
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FFFCEF] overflow-hidden">

      {/* Círculo bege */}
      <View
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{
          width: 713,
          height: 756,
          left: -148,
          top: -20,
        }}
      />

      {/* Conteúdo */}
      <View className="flex-1 items-center">

        {/* Mascote */}
        <Image
    source={require("../../../assets/images/welcome_brocolis.png")}
    resizeMode="contain"
    className="absolute"
    style={{
      width: 335,
      height: 358,
      top: 143,
      left: 41,
  }}
/>

        {/* Área inferior */}
        <View className="absolute bottom-24 items-center">

          <TouchableOpacity
            className="w-[350px] h-[83px] bg-[#D6C48F] rounded-[7px] items-center justify-center"
            onPress={() => router.push("/register")}
          >
            <Text className="text-white text-[34px] font-light">
              Criar minha conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-5"
            onPress={() => router.push("/login")}
          >
            <Text className="text-black text-[24px]">
              Já tem conta? ENTRAR.
            </Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}