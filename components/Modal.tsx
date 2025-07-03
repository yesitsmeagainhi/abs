// components/Modal.tsx (fixed version)
import { ReactNode, useEffect } from 'react';

type Props = {
  isOpen: boolean;  // Changed from 'open' to 'isOpen'
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  /* ——— ESC key / outside click ——— */
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [onClose]);

  if (!isOpen) return null;  // Changed from 'open' to 'isOpen'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white shadow-xl relative p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10 text-xl leading-none"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}