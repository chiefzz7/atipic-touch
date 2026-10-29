import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { useSettings } from '../../context/SettingsContext';
import useDraft from '../../hooks/useDraft';
import { pickFile, fileToResizedDataURL } from '../../utils/image';
import { isValidEmail, maskPhone, initials } from '../../utils/format';
import { Section, Field, Row, SaveBar, GhostButton } from './ui';

export default function ProfileTab({ notify }) {
  const { settings, save } = useSettings();
  const { draft, set, reset, dirty } = useDraft({ profile: settings.profile, clinic: settings.clinic });
  const [saving, setSaving] = useState(false);
  const [touched, setTouched] = useState(false);

  const { profile, clinic } = draft;
  const setProfile = (patch) => set({ profile: { ...profile, ...patch } });
  const setClinic = (patch) => set({ clinic: { ...clinic, ...patch } });

  const errors = {
    nome: !profile.nome.trim() ? 'Informe seu nome.' : '',
    email: !isValidEmail(profile.email) ? 'E-mail inválido.' : '',
  };
  const hasErrors = Boolean(errors.nome || errors.email);

  const trocarFoto = async () => {
    try {
      const file = await pickFile();
      if (!file) return;
      setProfile({ foto: await fileToResizedDataURL(file, { maxSize: 320 }) });
    } catch (e) {
      notify(e.message, 'error');
    }
  };

  const onSave = async () => {
    setTouched(true);
    if (hasErrors) return notify('Corrija os campos destacados.', 'error');
    setSaving(true);
    try {
      await save({ profile, clinic });
      notify('Perfil atualizado com sucesso.');
    } catch {
      notify('Não foi possível salvar. Tente novamente.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-col gap-6">
      <View className="flex-row items-center bg-white p-6 rounded-[16px] border border-[#DCE7D2] shadow-card">
        <View className="w-24 h-24 rounded-full bg-[#EEF5E8] border-2 border-[#A3C78B] items-center justify-center overflow-hidden">
          {profile.foto ? (
            <Image source={{ uri: profile.foto }} style={{ width: 96, height: 96 }} />
          ) : (
            <Text className="text-[30px] font-extrabold text-[#528F33]">{initials(profile.nome)}</Text>
          )}
        </View>

        <View className="ml-5 flex-1">
          <Text className="text-[20px] font-extrabold text-[#212134]">{profile.nome || 'Seu nome'}</Text>
          <Text className="text-[14px] text-[#6B6554]">
            {profile.especialidade || 'Profissional de saúde'}
            {profile.registro ? ` · ${profile.registro}` : ''}
          </Text>
          <View className="flex-row gap-2 mt-3">
            <GhostButton icon="camera" label={profile.foto ? 'Trocar foto' : 'Adicionar foto'} onPress={trocarFoto} />
            {profile.foto ? <GhostButton icon="trash-2" label="Remover" danger onPress={() => setProfile({ foto: null })} /> : null}
          </View>
        </View>
      </View>

      <Section icon="briefcase" title="Dados profissionais" description="Aparecem na assinatura dos relatórios clínicos.">
        <Row>
          <Field
            label="Nome completo"
            value={profile.nome}
            onChangeText={(v) => setProfile({ nome: v })}
            error={touched ? errors.nome : ''}
          />
          <Field
            label="E-mail profissional"
            value={profile.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(v) => setProfile({ email: v })}
            error={touched ? errors.email : ''}
          />
        </Row>
        <Row>
          <Field
            label="Registro (CRN / CRP / CREFITO)"
            placeholder="Ex.: CRN-3 00000"
            value={profile.registro}
            onChangeText={(v) => setProfile({ registro: v })}
          />
          <Field
            label="Especialidade"
            placeholder="Ex.: Nutricionista materno-infantil"
            value={profile.especialidade}
            onChangeText={(v) => setProfile({ especialidade: v })}
          />
        </Row>
        <Row>
          <Field
            label="Telefone / WhatsApp"
            placeholder="(00) 00000-0000"
            keyboardType="phone-pad"
            value={profile.telefone}
            onChangeText={(v) => setProfile({ telefone: maskPhone(v) })}
          />
          <View className="flex-1" />
        </Row>
      </Section>

      <Section icon="map-pin" title="Clínica (cabeçalho e rodapé dos laudos)" description="Usado nos relatórios impressos e exportados em PDF.">
        <Row>
          <Field
            label="Nome da clínica ou consultório"
            value={clinic.nome}
            onChangeText={(v) => setClinic({ nome: v })}
          />
        </Row>
        <Row>
          <Field label="Endereço completo" value={clinic.endereco} onChangeText={(v) => setClinic({ endereco: v })} />
        </Row>
      </Section>

      <SaveBar dirty={dirty} saving={saving} onSave={onSave} onReset={() => { reset(); setTouched(false); }} />
    </View>
  );
}
