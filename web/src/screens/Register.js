import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
} from 'react-native';

export default function Register() {
    return (
        <View className="flex-1 bg-[#FDFFF1] justify-center items-center px-5 relative w-full overflow-hidden">
            <View
                className={`w-full max-w-[900px] bg-transparent ${Platform.OS === 'web' ? 'flex-row' : ''
                    } items-center justify-center`}
            >
                <View className="flex-1 items-center justify-center w-full z-10">
                    <View className="bg-white rounded-2xl w-full max-w-[450px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

                        <View className="items-center mb-6">
                            <Text className="text-[28px] font-bold text-[#212134] text-center mb-1">
                                AtipicTouch
                            </Text>
                            <Text className="text-[16px] text-[#528F33] font-semibold text-center mb-2">
                                Faça o seu cadastro!
                            </Text>
                            <Text className="text-[13px] text-[#9CA3AF] text-center">
                                Crie sua conta para acessar o painel do especialista
                            </Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-[11px] font-bold text-[#4B5563] mb-1 uppercase tracking-wide">
                                Nome Completo
                            </Text>
                            <TextInput
                                placeholder="Digite seu nome completo"
                                autoCapitalize="words"
                                className="bg-[#F3F4F6] rounded-xl h-[48px] px-4 text-black outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-[11px] font-bold text-[#4B5563] mb-1 uppercase tracking-wide">
                                E-mail
                            </Text>
                            <TextInput
                                placeholder="Digite seu e-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="bg-[#F3F4F6] rounded-xl h-[48px] px-4 text-black outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-[11px] font-bold text-[#4B5563] mb-1 uppercase tracking-wide">
                                Senha
                            </Text>
                            <TextInput
                                placeholder="Crie uma senha forte"
                                secureTextEntry
                                className="bg-[#F3F4F6] rounded-xl h-[48px] px-4 text-black outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-[11px] font-bold text-[#4B5563] mb-1 uppercase tracking-wide">
                                Confirmar senha
                            </Text>
                            <TextInput
                                placeholder="Repita sua senha"
                                secureTextEntry
                                className="bg-[#F3F4F6] rounded-xl h-[48px] px-4 text-black outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </View>

                        <TouchableOpacity className="bg-[#528F33] h-[50px] rounded-xl justify-center items-center mb-5 hover:bg-[#457a2a] transition-colors">
                            <Text className="text-white font-bold text-[15px]">
                                Cadastrar
                            </Text>
                        </TouchableOpacity>

                        <View className="h-px bg-gray-200 w-full mb-5" />

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
                            <Text className="text-center text-[12px] text-[#9CA3AF]">
                                Já tem uma conta?{' '}
                                <Text className="text-[#528F33] font-bold hover:underline">
                                    Faça login aqui
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="hidden md:flex flex-1 items-center justify-center mb-10">
                    <Image
                        source={require('../../assets/terapeuta.png')}
                        className="w-[320px] h-[400px]"
                        resizeMode="contain"
                    />
                </View>

            </View>

            <View className="absolute bottom-5 w-full items-center">
                <Text className="text-[12px] text-[#111827] font-medium">
                    © 2026 AtipicTouch. Todos os direitos reservados
                </Text>
            </View>
        </View>
    );
}
