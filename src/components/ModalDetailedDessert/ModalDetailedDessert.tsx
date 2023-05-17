import type { Dessert } from '@prisma/client';
import styles from './ModalDetailedDessert.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#modal-root');

type ModalDetailedDessertProps = Dessert & {
	isOpen: boolean;
	closeModal: () => void;
};

export const ModalDetailedDessert = ({
	isOpen,
	closeModal,
	name,
	price,
	description,
}: ModalDetailedDessertProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			// contentLabel='Подтверждение'
			className={styles.modal}
		>
			<h4>{name}</h4>
			<p>Цена: {+price}</p>
			<p>Описание</p>
			<p>{description}</p>
		</Modal>
	);
};
