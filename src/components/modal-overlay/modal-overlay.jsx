import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClose }) => {
  return <div onClick={onClose} className={styles.modal_overlay}></div>;
};
