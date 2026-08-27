import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleButton from '../../components/ui/GoogleButton';
import Footer from '../../components/ui/Footer';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      window.alert(
        'Atenção\n\nPor favor, preencha todos os campos.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Erro ao realizar login.'
        );
      }

      if (data.perfil !== 'PROFISSIONAL') {
        window.alert(
          'Acesso Restrito\n\nEste portal é exclusivo para profissionais. Seu perfil é do tipo: ' + data.perfil
        );
        return;
      }

      await AsyncStorage.setItem(
        '@atipictouch:token',
        data.access_token
      );

      await AsyncStorage.setItem(
        '@atipictouch:user_id',
        data.usuario_id
      );

      await AsyncStorage.setItem(
        '@atipictouch:perfil',
        data.perfil
      );

      router.replace('/patients');

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao realizar login.';

      window.alert(
        `Erro de Autenticação\n\n${message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 min-h-screen bg-[#FDFFF1]">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
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
                value={email}
                onChangeText={setEmail}
              />

              <Input
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <View className="w-full mt-2">
                <Button
                  title={loading ? 'Autenticando...' : 'Entrar'}
                  onPress={handleLogin}
                  disabled={loading}
                />
              </View>

              <TouchableOpacity className="mb-5">
                <Text className="text-center text-xs md:text-sm text-[#4B5563] font-medium hover:underline">
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

              <GoogleButton />

              <Link href="/register" asChild>
                <TouchableOpacity className="mt-2">
                  <Text className="text-center text-xs md:text-sm text-[#9CA3AF]">
                    Não tem uma conta?{' '}
                    <Text className="text-[#528F33] font-bold hover:underline">
                      Clique aqui para criar uma
                    </Text>
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
