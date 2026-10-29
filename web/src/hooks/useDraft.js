import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/** Rascunho editável sincronizado com o valor salvo; expõe `dirty` e `reset`. */
export default function useDraft(saved) {
  const [draft, setDraft] = useState(saved);
  const lastSaved = useRef(saved);
  const savedKey = JSON.stringify(saved);

  // Quando o valor salvo muda (ex.: perfil chegou da API) e o usuário não editou, atualiza o rascunho.
  useEffect(() => {
    setDraft((current) =>
      JSON.stringify(current) === JSON.stringify(lastSaved.current) ? saved : current
    );
    lastSaved.current = saved;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedKey]);

  const set = useCallback((patch) => setDraft((d) => ({ ...d, ...patch })), []);
  const reset = useCallback(() => setDraft(lastSaved.current), []);
  const dirty = useMemo(() => JSON.stringify(draft) !== savedKey, [draft, savedKey]);

  return { draft, set, reset, dirty };
}
