import React, { ReactNode, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useDragControls } from 'motion/react';

import { DIALOG_VARIANTS } from '../../lib/motion';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  initialFocus?: boolean;
}

const FOCUSABLE_SELECTORS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Dialog({ isOpen, onClose, title, subtitle, children, footer, initialFocus = true }: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      if (initialFocus) {
        setTimeout(() => {
          const dialog = dialogRef.current;
          const firstFocusable = dialog?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
          firstFocusable?.focus();
        }, 50);
      }
    } else {
      previousActiveElement.current?.focus();
    }
  }, [isOpen, initialFocus]);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialog) return;
      const focusableElements = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dialog-overlay active"
          variants={DIALOG_VARIANTS.overlay}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          style={{ isolation: 'isolate' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <motion.div 
            ref={dialogRef}
            className="dialog-box"
            variants={DIALOG_VARIANTS.content}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || (info.velocity.y > 600 && info.offset.y > 0)) {
                onClose();
              }
            }}
          >
            <div 
              className="dialog-header"
              onPointerDown={(e) => dragControls.start(e)}
              style={{ touchAction: 'none' }}
            >
              <div className="dialog-handle" />
              <div id="dialog-title" className="dialog-title">{title}</div>
              {subtitle && <div className="dialog-subtitle">{subtitle}</div>}
            </div>
            <div className="dialog-content">
              {children}
            </div>
            {footer && (
              <div className="dialog-footer">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
