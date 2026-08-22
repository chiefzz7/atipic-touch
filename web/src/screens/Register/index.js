import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';

import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import GoogleButton from '../../components/ui/GoogleButton';
import Footer from '../../components/ui/Footer';

export default function RegisterScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !telefone || !senha || !confirmarSenha) {
      window.alert(
        'Atenção\n\nPor favor, preencha todos os campos.'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      window.alert(
        'Senhas diferentes\n\nAs senhas informadas não são iguais.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8000/api/users/profissionais',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
            telefone,
            senha,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Erro ao realizar cadastro.'
        );
      }

      window.alert(
        'Cadastro realizado!\n\nSua conta de profissional foi criada com sucesso.'
      );

      router.replace('/');

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro inesperado ao realizar cadastro.';

      window.alert(
        `Erro no Cadastro\n\n${message}`
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

          <View className="flex-1 w-full max-w-[460px] items-center justify-center">
            <View className="bg-white rounded-2xl w-full p-6 md:p-8 shadow-sm border border-gray-100">

              <View className="items-center mb-5">
                <Text className="text-2xl md:text-3xl font-extrabold text-[#212134] text-center tracking-tight mb-1">
                  AtipicTouch
                </Text>

                <Text className="text-[14px] md:text-[15px] text-[#528F33] font-semibold text-center mb-1">
                  Faça o seu cadastro!
                </Text>

                <Text className="text-[12px] md:text-[13px] text-[#9CA3AF] text-center">
                  Crie sua conta para acessar o painel do especialista
                </Text>
              </View>

              <Input
                label="Nome Completo"
                placeholder="Digite seu nome completo"
                autoCapitalize="words"
                value={nome}
                onChangeText={setNome}
              />

              <Input
                label="E-mail"
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              <Input
                label="Telefone"
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />

              <Input
                label="Senha"
                placeholder="Crie uma senha forte"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <Input
                label="Confirmar senha"
                placeholder="Repita sua senha"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />

              <View className="mt-2 w-full">
                <Button
                  title={loading ? 'Cadastrando...' : 'Cadastrar'}
                  onPress={handleRegister}
                  disabled={loading}
                />
              </View>

              <GoogleButton />

              <Link href="/" asChild>
                <TouchableOpacity className="mt-1">
                  <Text className="text-center text-xs md:text-sm text-[#9CA3AF]">
                    Já tem uma conta?{' '}
                    <Text className="text-[#528F33] font-bold hover:underline">
                      Faça login aqui
                    </Text>
                  </Text>
                </TouchableOpacity>
              </Link>

            </View>
          </View>

          <View className="hidden md:flex flex-1 w-full max-w-[440px] items-center justify-center">
            <Image
              source={require('../../../assets/terapeuta.png')}
              className="w-[260px] h-[320px] md:w-[300px] md:h-[380px] lg:w-[340px] lg:h-[420px]"
              resizeMode="contain"
            />
          </View>

        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
