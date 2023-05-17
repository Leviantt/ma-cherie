import { useTranslation } from 'next-i18next';
import styles from './ModalClient.module.css';
import Modal from 'react-modal';
import { Grid } from '../Grid';
import { convertDateForValue } from '~/utils/date';
import type { ChangeEvent } from 'react';
import { Button } from '../Button';
import { darkButtonStyles } from '../Button/Button';
import type { ClientData } from '~/types/ClientData';

Modal.setAppElement('#modal-root');

type ModalClientProps = {
	isOpen: boolean;
	closeModal: () => void;
	clientData: Partial<ClientData>;
	handleClientInput: (e: ChangeEvent<HTMLInputElement>) => void;
	save: () => void;
};

export const ModalClient = ({
	isOpen,
	closeModal,
	clientData,
	handleClientInput,
	save,
}: ModalClientProps) => {
	const { t } = useTranslation('clients');

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal} className={styles.modal}>
			<h3>{t('new-client-data')}</h3>
			<Grid cellMinWidth={350}>
				<div className={styles.infoGroup}>
					<label>{t('full-name')}</label>
					<input
						type='text'
						value={clientData.fullName ?? ''}
						placeholder={`${t('full-name')}`}
						onChange={(e) => handleClientInput(e)}
						name='fullName'
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>{t('birthdate')}</label>
					<input
						type='date'
						value={convertDateForValue(clientData.birthdate)}
						placeholder={`${t('birthdate')}`}
						onChange={(e) => handleClientInput(e)}
						name='birthdate'
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>{t('phone')}</label>
					<input
						type='text'
						value={clientData.phone ?? ''}
						placeholder={`${t('phone')}`}
						onChange={(e) => handleClientInput(e)}
						name='phone'
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>{t('source')}</label>
					<input
						type='text'
						value={clientData.source ?? ''}
						placeholder={`${t('source')}`}
						onChange={(e) => handleClientInput(e)}
						name='source'
					/>
				</div>
			</Grid>
			<Button onClick={save} customStyles={darkButtonStyles}>
				{t('save')}
			</Button>
		</Modal>
	);
};
