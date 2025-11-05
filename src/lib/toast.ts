import type { ToastType } from '../ui/Toast';

type ToastCallback = (message: string, type: ToastType) => void;

let toastCallback: ToastCallback | null = null;

export function setToastCallback(callback: ToastCallback) {
  toastCallback = callback;
}

export function showToast(message: string, type: ToastType = 'info') {
  if (toastCallback) {
    toastCallback(message, type);
  }
}

