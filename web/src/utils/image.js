// Utilidades de arquivo/imagem (web). Retornam data URLs prontos para persistir.

export function pickFile(accept = 'image/png,image/jpeg') {
  return new Promise((resolve) => {
    if (typeof document === 'undefined') return resolve(null);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => resolve(input.files?.[0] || null);
    input.oncancel = () => resolve(null);
    input.click();
  });
}

const readAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Não foi possível ler o arquivo.'));
    reader.readAsDataURL(file);
  });

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Imagem inválida.'));
    img.src = src;
  });

/**
 * Lê e redimensiona uma imagem mantendo transparência (PNG) ou JPEG.
 * Valida tipo e tamanho antes de processar.
 */
export async function fileToResizedDataURL(file, { maxSize = 512, maxBytes = 2 * 1024 * 1024 } = {}) {
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    throw new Error('Formato inválido. Use PNG ou JPG.');
  }
  if (file.size > maxBytes) {
    throw new Error(`Arquivo muito grande (máx. ${Math.round(maxBytes / 1024 / 1024)}MB).`);
  }

  const img = await loadImage(await readAsDataURL(file));
  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

  return file.type === 'image/png' ? canvas.toDataURL('image/png') : canvas.toDataURL('image/jpeg', 0.9);
}

export function downloadText(filename, text, mime = 'text/csv;charset=utf-8') {
  const blob = new Blob(['﻿', text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
