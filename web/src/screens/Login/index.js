import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleButton from '../../components/ui/GoogleButton';
import Footer from '../../components/ui/Footer';

export default function LoginScreen() {
  return (
    <View className="flex-1 min-h-screen bg-[#FDFFF1]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
        showsVerticalScrollIndicator={false}
        className="w-full"
      >
        <View className="w-full max-w-[1100px] mx-auto flex-1 flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 px-6 py-8 md:py-12">
          <View className="flex-1 w-full max-w-[460px] items-center md:items-start justify-center">
            <Text className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#212134] mb-3 text-center md:text-left tracking-tight">
              AtipicTouch
            </Text>
            <Text className="text-[14px] md:text-[15px] text-[#6B7280] text-center md:text-left leading-relaxed mb-6">
              Sistema IoT para auxílio de mães de crianças não verbais com seletividade alimentar
            </Text>
            <View className="w-full items-center justify-center">
              <Image 
                source={require('../../../assets/terapeuta.png')} 
                className="w-[220px] h-[260px] md:w-[280px] md:h-[340px] lg:w-[320px] lg:h-[380px]" 
                resizeMode="contain" 
              />
            </View>
          </View>

          <View className="flex-1 w-full max-w-[440px] items-center justify-center">
            <View className="bg-white rounded-2xl w-full p-6 md:p-8 shadow-sm border border-gray-100">
              <Text className="text-2xl md:text-[26px] font-bold text-[#212134] text-center mb-1.5">
                Bem-vindo(a) de volta!
              </Text>
              <Text className="text-[13px] md:text-[14px] text-[#9CA3AF] text-center mb-6">
                Faça login para acessar o painel do especialista
              </Text>

              <Input 
                label="E-mail" 
                placeholder="Digite seu e-mail" 
                keyboardType="email-address" 
                autoCapitalize="none" 
              />
              <Input 
                label="Senha" 
                placeholder="Digite sua senha" 
                secureTextEntry 
              />

              <Link href="/patients" asChild>
                <View className="w-full">
                  <Button title="Entrar" />
                </View>
              </Link>

              <TouchableOpacity className="mb-5">
                <Text className="text-center text-xs md:text-sm text-[#4B5563] font-medium hover:underline">
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              <GoogleButton />

              <Link href="/register" asChild>
                <TouchableOpacity className="mt-2">
                  <Text className="text-center text-xs md:text-sm text-[#9CA3AF]">
                    Não tem uma conta? <Text className="text-[#528F33] font-bold hover:underline">Clique aqui para criar uma</Text>
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
