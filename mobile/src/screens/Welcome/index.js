
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#FFFCEF] overflow-hidden">

  <View
    className="absolute rounded-full bg-[#E5D8B0]"
    style={{
      width: 713,
      height: 756,
      left: -148,
      top: 0,
    }}
  />

  <Image
    source={require("../../../assets/images/welcome_brocolis.png")}
    resizeMode="contain"
    className="absolute rounded-full"
    style={{
      width: 335,
      height: 335,
      top: 143,
      left: 41,
    }}
  />

  <TouchableOpacity
  className="absolute bg-[#D8C792] items-center justify-center rounded-[7px]"
  style={{
    width: 350,
    height: 83,
    left: 31,
    top: 568,
  }}
  onPress={() => router.push("/register")}
>
  <Text className="text-white text-[40px] font-heavy">
    Criar minha conta
  </Text>
</TouchableOpacity>

<TouchableOpacity
  className="absolute items-center"
  style={{
    top: 655,
    width: 412,
  }}
  onPress={() => router.push("/login")}
>
  <Text className="text-[25px] text-[#1E1E1E] font-light">
    Já tem conta? <Text className="font-semibold">ENTRAR.</Text>
  </Text>
</TouchableOpacity>
</View>
  );
}