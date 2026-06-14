import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleButton from '../../components/ui/GoogleButton';
import Footer from '../../components/ui/Footer';

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-[#FDFFF1] relative">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[1100px] mx-auto flex-col md:flex-row items-center justify-center py-10 px-5">
          
          <View className="flex-1 items-center justify-center px-4 md:px-8 mb-8 md:mb-10">
            <Text className="text-3xl md:text-[38px] font-extrabold text-[#212134] mb-2 text-center md:text-left">AtipicTouch</Text>
            <Text className="text-[14px] md:text-[15px] text-[#6B7280] text-center max-w-[420px] leading-6 mb-8">
              Sistema IoT para auxílio de mães de crianças não verbais com seletividade alimentar
            </Text>
            <Image source={require('../../../assets/terapeuta.png')} className="w-[200px] h-[250px] md:w-[280px] md:h-[350px]" resizeMode="contain" />
          </View>

          <View className="flex-1 items-center justify-center w-full">
            <View className="bg-white rounded-2xl w-full max-w-[450px] p-6 md:p-8 shadow-md border border-gray-50">
              <Text className="text-2xl md:text-[28px] font-bold text-[#212134] text-center mb-2">Bem-vindo(a) de volta!</Text>
              <Text className="text-[13px] md:text-[14px] text-[#9CA3AF] text-center mb-8">Faça login para acessar o painel do especialista</Text>

              <Input label="E-mail" placeholder="Digite seu e-mail" keyboardType="email-address" autoCapitalize="none" />
              <Input label="Senha" placeholder="Digite sua senha" secureTextEntry />

              <Link href="/patients" asChild>
                <View className="w-full"><Button title="Entrar" /></View>
              </Link>

              <TouchableOpacity className="mb-6">
                <Text className="text-center text-[#4B5563]">Esqueceu sua senha?</Text>
              </TouchableOpacity>

              <GoogleButton />

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
      </ScrollView>
      <Footer />
    </View>
  );
}
