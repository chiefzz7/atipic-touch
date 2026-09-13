import React from 'react';
import { Platform, Text, View } from 'react-native';

const pad = value => String(value).padStart(2, '0');

const formatInputDate = date => {
  if (!date) {
    return '';
  }

  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1
  )}-${pad(date.getDate())}`;
};

const parseInputDate = value => {
  if (!value) {
    return null;
  }

  const [year, month, day] = value
    .split('-')
    .map(Number);

  if (!year || !month || !day) {
    return null;
  }

  // Cria a data no horário local para evitar
  // problemas de timezone ao selecionar pelo calendário.
  return new Date(year, month - 1, day);
};

export default function PeriodDatePicker({
  selectedDate,
  onChange,
  disabled = false,
}) {
  if (Platform.OS !== 'web') {
    return (
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            color: '#666',
            fontSize: 13,
          }}
        >
          O calendário está disponível na versão Web.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: '#212134',
          marginBottom: 8,
        }}
      >
        Data de referência
      </Text>

      <input
        type="date"
        value={formatInputDate(selectedDate)}
        disabled={disabled}
        onChange={event => {
          const date = parseInputDate(
            event.target.value
          );

          if (date) {
            onChange(date);
          }
        }}
        style={{
          width: '100%',
          height: 48,
          border: '1px solid #D1D5DB',
          borderRadius: 12,
          padding: '0 12px',
          fontSize: 14,
          fontWeight: '600',
          color: '#212134',
          backgroundColor: disabled
            ? '#F3F4F6'
            : '#FFFFFF',
          boxSizing: 'border-box',
          outline: 'none',
          cursor: disabled
            ? 'not-allowed'
            : 'pointer',
        }}
      />

      <Text
        style={{
          marginTop: 6,
          fontSize: 12,
          color: '#777',
        }}
      >
        Selecione um dia para definir o período.
      </Text>
    </View>
  );
}
