export type ToastType = 'success' | 'danger' | 'warning' | 'info';


export interface ToastData {
  show: boolean;
  type: ToastType;
  message: string;
}