import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { useTranslation } from 'next-i18next';

import styles from './AddDessertCard.module.css';
import { CloseIcon } from '../CloseIcon';
import { CheckIcon } from '../CheckIcon';
import { useCreateDessert } from '~/hooks/dessert/useCreateDessert';

type AddDessertCardProps = {
	refetch: () => void;
};

export const AddDessertCard = ({ refetch }: AddDessertCardProps) => {
	const { t } = useTranslation('desserts');
	const [isActive, setIsActive] = useState<boolean>(false);

	const [name, setName] = useState('');
	const [price, setPrice] = useState(new Prisma.Decimal(0));
	const [description, setDescription] = useState('');
	const resetInputs = () => {
		setName('');
		setPrice(new Prisma.Decimal(0));
		setDescription('');
	};

	const createDessert = useCreateDessert(refetch, resetInputs);

	const save = () => {
		setIsActive(false);
		const newValues = {
			name,
			price: Number(price),
			description,
		};

		try {
			const validated = z
				.object({
					name: z.string().min(2),
					price: z.number().nonnegative(),
					description: z.string(),
				})
				.parse(newValues);
			createDessert.mutate({
				...validated,
			});
		} catch (error) {
			console.log(error);
			toast.error('Ошибка. Поля заполнены некорректно.');
		}
	};

	const close = () => {
		resetInputs();
		setIsActive(false);
	};

	return (
		<div className={styles.dessertContainer}>
			<div className={isActive ? '' : styles.active}>
				<CheckIcon onClick={save} />
				<CloseIcon onClick={close} />
				<div className={styles.dessertInfo}>
					<div className={styles.infoGroup}>
						<label>{t('name')}</label>
						<input
							type='text'
							value={name ?? ''}
							placeholder={`${t('name')}`}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('price')}</label>
						<input
							type='text'
							value={price.toString()}
							placeholder={`${t('price')}`}
							onChange={(e) => setPrice(new Prisma.Decimal(+e.target.value))}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('description')}</label>
						<textarea
							rows={5}
							value={description ?? ''}
							placeholder={`${t('description')}`}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div
				className={
					isActive ? [styles.plus, styles.active].join(' ') : styles.plus
				}
				onClick={() => setIsActive(true)}
			></div>
		</div>
	);
};
