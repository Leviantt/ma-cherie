import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Prisma } from '@prisma/client';
import { z } from 'zod';

import styles from './AddDessertCard.module.css';
import { CloseIcon } from '../CloseIcon';
import { CheckIcon } from '../CheckIcon';
import { useCreateDessert } from '~/hooks/dessert/useCreateDessert';

type AddDessertCardProps = {
	refetch: () => void;
};

export const AddDessertCard = ({ refetch }: AddDessertCardProps) => {
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
						<label>Название</label>
						<input
							type='text'
							value={name ?? ''}
							placeholder='Название'
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>Цена</label>
						<input
							type='text'
							value={price.toString()}
							placeholder='Цена'
							onChange={(e) => setPrice(new Prisma.Decimal(+e.target.value))}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>Описание</label>
						<textarea
							rows={5}
							value={description ?? ''}
							placeholder='Описание'
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
