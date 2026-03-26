import { ReactNode } from "react";

interface Props {
  onClose: () => void;
  children: ReactNode;
  width?: string;
}

export default function Modal({ onClose, children, width = "max-w-md" }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${width} mx-4 bg-white rounded-2xl shadow-2xl p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}