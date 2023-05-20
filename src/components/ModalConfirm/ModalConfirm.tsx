import { useTranslation } from 'next-i18next';
import Modal from 'react-modal';

import styles from './ModalConfirm.module.css';

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
	const { t } = useTranslation('common');
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			contentLabel={`${t('confirmation')}`}
			className={styles.modal}
		>
			<h4>{title}</h4>
			<div className={styles.buttons}>
				<button onClick={action}>{t('yes')}</button>
				<button onClick={closeModal}>{t('no')}</button>
			</div>
		</Modal>
	);
};
