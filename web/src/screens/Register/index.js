import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleButton from '../../components/ui/GoogleButton';
import Footer from '../../components/ui/Footer';

export default function RegisterScreen() {
  return (
    <View className="flex-1 bg-[#FDFFF1] relative w-full overflow-hidden">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
        <View className="w-full max-w-[1100px] mx-auto flex-col md:flex-row items-center justify-center py-10 px-5">

          <View className="flex-1 items-center justify-center w-full z-10 mb-8 md:mb-0">
            <View className="bg-white rounded-2xl w-full max-w-[450px] p-6 md:p-8 shadow-md border border-gray-50">
              <View className="items-center mb-6">
                <Text className="text-2xl md:text-[28px] font-bold text-[#212134] text-center mb-1">AtipicTouch</Text>
                <Text className="text-[14px] md:text-[16px] text-[#528F33] font-semibold text-center mb-2">Faça o seu cadastro!</Text>
                <Text className="text-[12px] md:text-[13px] text-[#9CA3AF] text-center">Crie sua conta para acessar o painel do especialista</Text>
              </View>

              <Input label="Nome Completo" placeholder="Digite seu nome completo" autoCapitalize="words" />
              <Input label="E-mail" placeholder="Digite seu e-mail" keyboardType="email-address" autoCapitalize="none" />
              <Input label="Senha" placeholder="Crie uma senha forte" secureTextEntry />
              <Input label="Confirmar senha" placeholder="Repita sua senha" secureTextEntry />

              <Button title="Cadastrar" />
              <GoogleButton />

              <Link href="/" asChild>
                <TouchableOpacity>
                  <Text className="text-center text-[12px] md:text-[13px] text-[#9CA3AF]">
                    Já tem uma conta? <Text className="text-[#528F33] font-bold">Faça login aqui</Text>
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>

          <View className="hidden md:flex flex-1 items-center justify-center pl-8 mb-10">
            <Image source={require('../../../assets/terapeuta.png')} className="w-[320px] h-[400px]" resizeMode="contain" />
          </View>
          
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
