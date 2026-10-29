import { useEffect, useState } from 'react';

async function sha256(text) {
  const bytes = new TextEncoder().encode(text);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Gera hash SHA-256 e QR Code do relatório, conforme as preferências de documentos. */
export default function useReportAuth({ enabled, withQr, payload }) {
  const [state, setState] = useState({ hash: null, qr: null });
  const body = enabled || withQr ? JSON.stringify(payload) : null;

  useEffect(() => {
    if (!body || !globalThis.crypto?.subtle) {
      setState({ hash: null, qr: null });
      return undefined;
    }
    let active = true;
    (async () => {
      try {
        const hash = await sha256(body);
        let qr = null;
        if (withQr) {
          const QRCode = (await import('qrcode')).default;
          qr = await QRCode.toDataURL(`ATIPICTOUCH:${hash}`, { margin: 1, width: 168, color: { dark: '#212134', light: '#FFFFFF' } });
        }
        if (active) setState({ hash: enabled ? hash : null, qr });
      } catch {
        if (active) setState({ hash: null, qr: null });
      }
    })();
    return () => {
      active = false;
    };
  }, [body, enabled, withQr]);

  return state;
}
