
import styles from './ModalContainer.module.css';

export const ModalContainer = ({ children }) => {
	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalWrapper}>{children}</div>
		</div>
	);
};