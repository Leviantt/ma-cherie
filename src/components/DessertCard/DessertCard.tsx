import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Prisma, type Dessert } from '@prisma/client';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';

import styles from './DessertCard.module.css';
import { EditIcon } from '~/components/EditIcon';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { ModalConfirm } from '../ModalConfirm';
import { useUpdateDessert } from '~/hooks/dessert/useUpdateDessert';
import { useDeleteDessert } from '~/hooks/dessert/useDeleteDessert';

type DessertCardProps = {
	dessert: Dessert;
	refetch: () => void;
};

export const DessertCard = ({ dessert, refetch }: DessertCardProps) => {
	const { t } = useTranslation('desserts');
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);

	const [name, setName] = useState(dessert.name);
	const [price, setPrice] = useState(dessert.price);
	const [description, setDescription] = useState(dessert.description);

	const updateDessert = useUpdateDessert(refetch);
	const deleteDessert = useDeleteDessert(refetch);

	const save = () => {
		if (isEditable) {
			setIsEditable(false);
			const newValues = {
				name,
				price: Number(price),
				description,
			};

			try {
				const validated = z
					.object({
						name: z.string().min(2).optional(),
						price: z.number().nonnegative().optional(),
						description: z.string().optional(),
					})
					.parse(newValues);
				updateDessert.mutate({
					id: dessert.id,
					...validated,
				});
			} catch (error) {
				console.log(error);
				toast.error('Ошибка. Поля заполнены некорректно.');
			}
		} else {
			setIsEditable(true);
		}
	};

	return (
		<>
			<ModalConfirm
				isOpen={isModalConfirmOpen}
				closeModal={() => setIsModalConfirmOpen(false)}
				title={t('delete-dessert')}
				action={() => deleteDessert.mutate({ id: dessert.id })}
			/>
			<div className={styles.dessertContainer}>
				<EditIcon isActive={isEditable} onClick={save} />
				<DeleteIcon
					isActive={isEditable}
					onClick={() => setIsModalConfirmOpen(true)}
				/>
				<div className={styles.dessertInfo}>
					<div className={styles.infoGroup}>
						<label>{t('name')}</label>
						<input
							disabled={!isEditable}
							className={isEditable ? styles.editable : ''}
							type='text'
							value={name ?? ''}
							placeholder={`${t('name')}`}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('price')}</label>
						<input
							disabled={!isEditable}
							className={isEditable ? styles.editable : ''}
							type='text'
							value={price?.toString() ?? ''}
							placeholder={`${t('price')}`}
							onChange={(e) => setPrice(new Prisma.Decimal(+e.target.value))}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('description')}</label>
						<textarea
							disabled={!isEditable}
							className={isEditable ? styles.editable : ''}
							rows={5}
							value={description ?? ''}
							placeholder={`${t('description')}`}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
