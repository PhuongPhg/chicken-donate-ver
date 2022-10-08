import { useCallback, useMemo } from "react";
import { toast, ToastOptions } from 'material-react-toastify';

export enum EToastType {
  success = 'success',
  error = 'error'
}
export default function useToast(){

  const toastConfig = useMemo(() => ({
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    } as ToastOptions), []);

  return useCallback(
    (content: string, type = EToastType.success) => {
      if(type === EToastType.error){
        toast.error(content, toastConfig);
      } else {
        toast.dark(content, toastConfig);
      }
    },
    [toastConfig],
  )
  
}