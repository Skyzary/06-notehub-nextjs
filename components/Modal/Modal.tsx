'use client';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect, useState } from 'react';

export default function Modal({
  children,
  onClose,
  isOpen = true,
}: {
  children: React.ReactNode;
  onClose: () => void;
  isOpen?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
