import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { BsX } from 'react-icons/bs';

import styles from './Modal.module.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose: handleClose, children }: Props) => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const modalClass = `${styles.backdrop} ${animating ? styles.backdropOpen : ''}`;
  const modalContentClass = `${styles.content} ${animating ? styles.contentOpen : ''}`;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    },
    [handleClose],
  );

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!visible) return null;

  return createPortal(
    <div className={modalClass} onClick={handleClose} role="dialog" aria-modal="true">
      <div className={modalContentClass} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose} type="button" aria-label="Fechar">
          <BsX />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
