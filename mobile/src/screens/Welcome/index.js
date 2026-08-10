import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center">

      <View
        className="absolute rounded-full bg-[#E5D8B0]"
        style={{ width: 713, height: 756, top: 0 }}
      />

      <Image
        source={require("../../../assets/images/welcome_brocolis.png")}
        resizeMode="contain"
        className="absolute"
        borderRadius={335 / 2}
        style={{ width: 335, height: 335, top: 143}}
      />

      <TouchableOpacity
        className="absolute w-[85%] max-w-[350px] h-[83px] bg-[#D8C792] items-center justify-center rounded-[7px]"
        style={{ top: 568 }}
        onPress={() => router.push("/register")}
      >
        <Text className="text-white text-[24px] font-bold">
          Criar minha conta
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute items-center"
        style={{ top: 655 }}
        onPress={() => router.push("/login")}
      >
        <Text className="text-[#6E6246] text-[18px]">
          Já tem uma conta? <Text className="font-bold">Entrar</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}