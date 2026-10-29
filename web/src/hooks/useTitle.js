import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    if (typeof document !== 'undefined') document.title = title;
  }, [title]);
}
