import { useCallback } from 'react';

export enum EToastType {
  success = 'success',
  error = 'error',
}
export default function useToast() {
  return useCallback((content: string, type = EToastType.success) => {}, []);
}
