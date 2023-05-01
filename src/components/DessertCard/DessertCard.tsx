import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Prisma, type Dessert } from '@prisma/client';
import { z } from 'zod';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';

import styles from './DessertCard.module.css';
import { api } from '~/utils/api';
import { EditIcon } from '~/components/EditIcon';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';

type DessertCardProps = {
	dessert: Dessert;
	refetch: () => void;
};

export const DessertCard = ({ dessert, refetch }: DessertCardProps) => {
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const [name, setName] = useState(dessert.name);
	const [price, setPrice] = useState(dessert.price);
	const [description, setDescription] = useState(dessert.description);

	const updateDessert = api.dessert.update.useMutation({
		onSuccess: () => {
			toast.success('Данные десерта успешно обновлены.');
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить данные десерта.');
		},
	});

	const deleteDessert = api.dessert.delete.useMutation({
		onSuccess: () => {
			toast.success('Десерт успешно удален.');
			refetch();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить сотрудника.');
		},
	});

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
		<div className={styles.dessertContainer}>
			<EditIcon isActive={isEditable} onClick={save} />
			<DeleteIcon
				isActive={isEditable}
				onClick={() => deleteDessert.mutate({ id: dessert.id })}
			/>
			<div className={styles.dessertInfo}>
				<div className={styles.infoGroup}>
					<label>Название</label>
					<input
						disabled={!isEditable}
						className={isEditable ? styles.editable : ''}
						type='text'
						value={name ?? ''}
						placeholder='Название'
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Цена</label>
					<input
						disabled={!isEditable}
						className={isEditable ? styles.editable : ''}
						type='text'
						value={price?.toString() ?? ''}
						placeholder='Цена'
						onChange={(e) => setPrice(new Prisma.Decimal(+e.target.value))}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Описание</label>
					<textarea
						disabled={!isEditable}
						className={isEditable ? styles.editable : ''}
						rows={5}
						value={description ?? ''}
						placeholder='Описание'
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};
