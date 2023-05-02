import styles from './ModalConfirm.module.css';
import Modal from 'react-modal';


Modal.setAppElement('#modal-root');

type ModalConfirmProps = {
	isOpen: boolean;
	title: string;
	closeModal: () => void;
	action: () => void;
};

export const ModalConfirm = ({
	isOpen,
	title,
	closeModal,
	action,
}: ModalConfirmProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			// style={customStyles}
			contentLabel='Подтверждение'
			className={styles.modal}
		>
			<h4>{title}</h4>
			<div className={styles.buttons}>
				<button onClick={closeModal}>Нет</button>
				<button onClick={action}>Да</button>
			</div>
		</Modal>
	);
};
