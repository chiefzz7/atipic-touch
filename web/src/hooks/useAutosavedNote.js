import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Texto persistido por chave, com salvamento automático (debounce). */
export default function useAutosavedNote(storageKey, delay = 700) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const timer = useRef(null);
  const keyRef = useRef(storageKey);
  keyRef.current = storageKey;

  useEffect(() => {
    let active = true;
    setStatus('idle');
    if (!storageKey) {
      setText('');
      return undefined;
    }
    AsyncStorage.getItem(storageKey).then((value) => {
      if (active) setText(value || '');
    });
    return () => {
      active = false;
      clearTimeout(timer.current);
    };
  }, [storageKey]);

  const onChange = useCallback((value) => {
    setText(value);
    setStatus('saving');
    clearTimeout(timer.current);
    const key = keyRef.current;
    timer.current = setTimeout(async () => {
      if (!key) return;
      if (value.trim()) await AsyncStorage.setItem(key, value);
      else await AsyncStorage.removeItem(key);
      setStatus('saved');
    }, delay);
  }, [delay]);

  return { text, onChange, status };
}
