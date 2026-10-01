import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Feather,
} from '@expo/vector-icons';

const CustomSwitch = ({
  label,
  description,
  isEnabled,
  onToggle,
}) => (
  <View className="flex-row items-center justify-between py-3 border-b border-[#DDD3B9] last:border-0">
    <View className="flex-1 pr-4">
      <Text className="text-[14px] font-bold text-[#554B41]">
        {label}
      </Text>

      <Text className="text-[12px] text-[#80775C] leading-tight mt-1">
        {description}
      </Text>
    </View>

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onToggle}
      className={`w-12 h-6 rounded-full px-1 justify-center transition-colors ${
        isEnabled
          ? 'bg-[#83BF6E]'
          : 'bg-[#C6BB9A]'
      }`}
    >
      <View
        className={`w-4 h-4 rounded-full bg-white transition-transform ${
          isEnabled
            ? 'translate-x-6'
            : 'translate-x-0'
        }`}
      />
    </TouchableOpacity>
  </View>
);

export default function SystemTab() {
  const [
    autoSync,
    setAutoSync,
  ] = useState(true);

  const [
    offlineAlert,
    setOfflineAlert,
  ] = useState(true);

  const [
    lgpdConsent,
    setLgpdConsent,
  ] = useState(true);

  return (
    <View className="flex-col gap-8">
      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <View className="flex-row items-center mb-4 border-b border-[#C6BB9A] pb-2">
          <Feather
            name="activity"
            size={18}
            color="#554B41"
          />

          <Text className="text-[15px] font-bold text-[#554B41] ml-2">
            Parâmetros de Análise Sensorial
          </Text>
        </View>

        <Text className="text-[12px] text-[#80775C] mb-4">
          Defina as porcentagens que acionarão os gatilhos críticos e alertas na tela inicial do Dashboard.
        </Text>

        <View className="flex-col md:flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Limiar de Rejeição Crítica (%)
            </Text>

            <View className="flex-row items-center bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 focus-within:border-[#D9534F] transition-colors">
              <TextInput
                defaultValue="80"
                keyboardType="numeric"
                className="flex-1 text-[#554B41] outline-none font-bold"
              />

              <Text className="text-[#80775C] font-bold">
                %
              </Text>
            </View>

            <Text className="text-[10px] text-[#80775C] mt-1">
              Acima deste valor, o sistema gera um alerta vermelho.
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-[12px] font-bold text-[#554B41] mb-2 uppercase">
              Amostragem Mínima (Sessões)
            </Text>

            <View className="flex-row items-center bg-[#FFFCEF] border border-[#DDD3B9] rounded-[10px] h-[48px] px-4 focus-within:border-[#83BF6E] transition-colors">
              <TextInput
                defaultValue="5"
                keyboardType="numeric"
                className="flex-1 text-[#554B41] outline-none font-bold"
              />

              <Text className="text-[#80775C] font-bold">
                Refeições
              </Text>
            </View>

            <Text className="text-[10px] text-[#80775C] mt-1">
              Nº mínimo de interações para considerar o dado válido.
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <View className="flex-row items-center mb-4 border-b border-[#C6BB9A] pb-2">
          <Feather
            name="wifi-off"
            size={18}
            color="#554B41"
          />

          <Text className="text-[15px] font-bold text-[#554B41] ml-2">
            Resiliência e Gateway IoT
          </Text>
        </View>

        <View className="flex-col">
          <CustomSwitch
            label="Sincronização Automática em Background"
            description="Permite que o aplicativo dos pais (Gateway) envie os dados armazenados offline assim que detectar conexão Wi-Fi ou 4G/5G."
            isEnabled={autoSync}
            onToggle={() =>
              setAutoSync(
                !autoSync
              )
            }
          />

          <CustomSwitch
            label="Notificar Dispositivos Offline"
            description="Exibe um alerta visual no Dashboard caso a placa Arduino Uno / App do cuidador não sincronize dados há mais de 7 dias."
            isEnabled={offlineAlert}
            onToggle={() =>
              setOfflineAlert(
                !offlineAlert
              )
            }
          />
        </View>
      </View>

      <View className="bg-[#E5DCC4] p-6 rounded-[10px] border border-[#C6BB9A]">
        <View className="flex-row items-center mb-4 border-b border-[#C6BB9A] pb-2">
          <Feather
            name="lock"
            size={18}
            color="#554B41"
          />

          <Text className="text-[15px] font-bold text-[#554B41] ml-2">
            Segurança e Dados (LGPD)
          </Text>
        </View>

        <View className="flex-col">
          <CustomSwitch
            label="Anonimizar Dados Sensíveis para Exportação"
            description="Oculta o nome da criança e do cuidador ao exportar bases de dados em massa (CSV) para pesquisas acadêmicas."
            isEnabled={lgpdConsent}
            onToggle={() =>
              setLgpdConsent(
                !lgpdConsent
              )
            }
          />
        </View>

        <View className="mt-4 pt-4 border-t border-[#C6BB9A]">
          <TouchableOpacity className="flex-row items-center justify-center bg-[#C6BB9A] px-4 py-3 rounded-[10px] hover:bg-[#B9AE8D] transition-colors">
            <Feather
              name="download"
              size={14}
              color="#554B41"
            />

            <Text className="ml-2 text-[13px] font-bold text-[#554B41]">
              Fazer Backup do Banco de Dados
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-row justify-end mt-2 mb-10">
        <TouchableOpacity className="bg-[#83BF6E] px-8 py-3.5 rounded-[10px] hover:bg-[#4D9B43] transition-colors flex-row items-center">
          <Feather
            name="save"
            size={16}
            color="#FFFFFF"
          />

          <Text className="text-white font-bold text-[15px] ml-2">
            Atualizar Parâmetros
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
