import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function Login() {
  return (
    <View className="flex-1 bg-[#FDFFF1] items-center justify-center px-8 relative">
      <View className="w-full max-w-[1150px] flex-row items-center justify-center gap-16">
        <View className="w-[380px] items-center">
          <Text className="text-[52px] font-extrabold text-[#25244F] leading-none mb-2">
            AtipicTouch
          </Text>

          <Text className="text-[16px] text-[#7A8599] text-center leading-6 mb-8 max-w-[350px]">
            Sistema IoT para auxílio de mães de crianças não verbais com seletividade alimentar
          </Text>

          <Image
            source={require('../../assets/terapeuta.png')}
            className="w-[310px] h-[420px]"
            resizeMode="contain"
          />
        </View>

        <View
          className="bg-white w-[520px] px-14 py-14 rounded-sm border border-[#ECECEC]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 18,
            elevation: 6,
          }}
        >
          <Text className="text-[46px] font-bold text-[#25244F] text-center mb-4">
            Bem-vindo(a) de volta!
          </Text>

          <Text className="text-[17px] text-[#7B8794] text-center mb-12">
            Faça login para acessar o painel do especialista
          </Text>

          <View className="mb-7">
            <Text className="text-[14px] text-[#2D2D4F] font-semibold mb-3">
              E-mail
            </Text>

            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-[#F5F5F7] h-[56px] rounded-xl px-5 border border-[#E2E2E6]"
            />
          </View>

          <View className="mb-8">
            <Text className="text-[14px] text-[#2D2D4F] font-semibold mb-3">
              Senha
            </Text>

            <TextInput
              secureTextEntry
              className="bg-[#F5F5F7] h-[56px] rounded-xl px-5 border border-[#E2E2E6]"
            />
          </View>

          <TouchableOpacity
            className="h-[56px] rounded-xl items-center justify-center mb-5"
            style={{
              backgroundColor: '#528F33',
              shadowColor: '#528F33',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.18,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <Text className="text-white text-[18px] font-semibold">
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mb-8">
            <Text className="text-center text-[15px] text-[#3F4654]">
              Esqueceu sua senha?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-center mb-10">
            <Image
              source={require('../../assets/google.png')}
              className="w-7 h-7 mr-3"
            />

            <Text className="text-[16px] text-[#4B5563] font-medium">
              Entrar com Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className="text-center text-[14px] text-[#8D96A7]">
              Não tem uma conta?{' '}
              <Text className="text-[#5F687A] font-medium">
                Clique aqui para criar uma
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="absolute bottom-7">
        <Text className="text-[14px] text-[#111827]">
          © 2026 AtipicTouch. Todos os direitos reservados
        </Text>
      </View>
    </View>
  );
}