import { useEffect, useMemo, useState } from 'react';

export default function usePeriodFilter(logs) {
  const [periodType, setPeriodType] = useState('month');
  const [selectedDate, setSelectedDate] = useState(null);

  const getStartOfWeek = (date) => {
    const result = new Date(date);
    const day = result.getDay();

    const difference = day === 0 ? -6 : 1 - day;

    result.setDate(result.getDate() + difference);
    result.setHours(0, 0, 0, 0);

    return result;
  };

  const getEndOfWeek = (date) => {
    const result = getStartOfWeek(date);

    result.setDate(result.getDate() + 6);
    result.setHours(23, 59, 59, 999);

    return result;
  };

  const getStartOfDay = (date) => {
    const result = new Date(date);

    result.setHours(0, 0, 0, 0);

    return result;
  };

  const getEndOfDay = (date) => {
    const result = new Date(date);

    result.setHours(23, 59, 59, 999);

    return result;
  };

  const getStartOfMonth = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      1,
      0,
      0,
      0,
      0
    );
  };

  const getEndOfMonth = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );
  };

  const logsFiltrados = useMemo(() => {
    if (periodType === 'all' || !selectedDate) {
      return logs;
    }

    let startDate;
    let endDate;

    if (periodType === 'day') {
      startDate = getStartOfDay(selectedDate);
      endDate = getEndOfDay(selectedDate);
    }

    if (periodType === 'week') {
      startDate = getStartOfWeek(selectedDate);
      endDate = getEndOfWeek(selectedDate);
    }

    if (periodType === 'month') {
      startDate = getStartOfMonth(selectedDate);
      endDate = getEndOfMonth(selectedDate);
    }

    return logs.filter(log => {
      if (!log.timestamp) {
        return false;
      }

      const timestamp = new Date(log.timestamp);

      return timestamp >= startDate && timestamp <= endDate;
    });
  }, [logs, periodType, selectedDate]);

  const formatPeriod = () => {
    if (periodType === 'all') {
      return 'Todos os registros';
    }

    if (!selectedDate) {
      return 'Selecionar período';
    }

    if (periodType === 'day') {
      return selectedDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }

    if (periodType === 'week') {
      const start = getStartOfWeek(selectedDate);
      const end = getEndOfWeek(selectedDate);

      return `${start.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })} – ${end.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      })}`;
    }

    return selectedDate.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
  };

  const selecionarPeriodo = (type) => {
    setPeriodType(type);
  };

  return {
    periodType,
    selectedDate,
    setSelectedDate,
    logsFiltrados,
    formatPeriod,
    selecionarPeriodo,
  };
}
