import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-[#FDFFF1] justify-center items-center px-5">
      <View className={`w-full max-w-[1100px] bg-transparent ${Platform.OS === 'web' ? 'flex-row' : ''} items-center justify-center`}>
        <View className="flex-1 items-center justify-center px-8 mb-10">
          <Text className="text-[38px] font-extrabold text-[#212134] mb-2">AtipicTouch</Text>
          <Text className="text-[15px] text-[#6B7280] text-center max-w-[420px] leading-6 mb-8">
            Sistema IoT para auxílio de mães de crianças não verbais com seletividade alimentar
          </Text>
          <Image source={require('../../../assets/terapeuta.png')} className="w-[280px] h-[350px]" resizeMode="contain" />
        </View>

        <View className="flex-1 items-center justify-center w-full">
          <View className="bg-white rounded-2xl w-full max-w-[450px] p-8 shadow-md">
            <Text className="text-[28px] font-bold text-[#212134] text-center mb-2">Bem-vindo(a) de volta!</Text>
            <Text className="text-[14px] text-[#9CA3AF] text-center mb-8">Faça login para acessar o painel do especialista</Text>

            <View className="mb-5">
              <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">E-mail</Text>
              <TextInput placeholder="Digite seu e-mail" keyboardType="email-address" autoCapitalize="none" className="bg-[#F3F4F6] rounded-xl h-[52px] px-4 text-black outline-none" />
            </View>

            <View className="mb-6">
              <Text className="text-[12px] font-bold text-[#4B5563] mb-2 uppercase">Senha</Text>
              <TextInput placeholder="Digite sua senha" secureTextEntry className="bg-[#F3F4F6] rounded-xl h-[52px] px-4 text-black outline-none" />
            </View>

            <TouchableOpacity className="bg-[#528F33] h-[52px] rounded-xl justify-center items-center mb-5">
              <Text className="text-white font-bold text-[16px]">Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mb-6">
              <Text className="text-center text-[#4B5563]">Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center mb-10">
              <Image
                source={require('../../../assets/google.png')}
                className="w-7 h-7 mr-3"
              />
              <Text className="text-[16px] text-[#4B5563] font-medium">
                Entrar com Google
              </Text>
            </TouchableOpacity>

            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text className="text-center text-[#9CA3AF]">
                  Não tem uma conta? <Text className="text-[#528F33] font-bold">Clique aqui para criar uma</Text>
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>

      <View className="absolute bottom-5">
        <Text className="text-[12px] text-[#111827]">© 2026 AtipicTouch. Todos os direitos reservados</Text>
      </View>
    </View>
  );
}
