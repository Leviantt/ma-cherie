import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';

import styles from './AddRequestRow.module.css';
import { api } from '~/utils/api';
import { Button } from '../Button';
import { basicButtonStyles } from '../Button/Button';
import { isRequestNullable } from '~/utils/isRequestNullable';

type AddRequestRowProps = {
	refetchTable: () => void;
	address: string;
	desserts: { id: number; name: string }[];
	refetchDesserts: () => void;
};

const DESSERT_NOT_SELECTED = '<не выбрано>';

export const AddRequestRow = ({
	refetchTable,
	address,
	desserts,
	refetchDesserts,
}: AddRequestRowProps) => {
	const [dessertName, setDessertName] = useState(DESSERT_NOT_SELECTED);
	const [mondayCount, setMondayCount] = useState(0);
	const [tuesdayCount, setTuesdayCount] = useState(0);
	const [wednesdayCount, setWednesdayCount] = useState(0);
	const [thursdayCount, setThursdayCount] = useState(0);
	const [fridayCount, setFridayCount] = useState(0);
	const [saturdayCount, setSaturdayCount] = useState(0);
	const [sundayCount, setSundayCount] = useState(0);

	const addRequest = api.request.create.useMutation({
		onSuccess: () => {
			toast.success('Заявки для десерта успешно добавлены');
			setDessertName(DESSERT_NOT_SELECTED);
			setMondayCount(0);
			setTuesdayCount(0);
			setWednesdayCount(0);
			setThursdayCount(0);
			setFridayCount(0);
			setSaturdayCount(0);
			setSundayCount(0);
			refetchTable();
			refetchDesserts();
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось добавить заявки для десерта.');
		},
	});

	const handleAddRequest = () => {
		console.log('add');
		if (dessertName === DESSERT_NOT_SELECTED) {
			toast.error('Выберите новый десерт для добавления заявок.');
			return;
		}
		const counts = {
			mondayCount,
			tuesdayCount,
			wednesdayCount,
			thursdayCount,
			fridayCount,
			saturdayCount,
			sundayCount,
		};
		if (isRequestNullable(counts)) {
			toast.error('Хотя бы один из столбцов должен быть ненулевым.');
			return;
		}
		addRequest.mutate({
			dessertId: desserts.find((d) => d.name === dessertName)?.id ?? -1,
			address,
			...counts,
		});
	};

	return (
		<>
			<div className={styles.row}>
				<div className={styles.col1} data-label='Десерт'>
					<select
						value={dessertName}
						onChange={(e) => setDessertName(e.target.value)}
						className={styles.input}
					>
						<option value={DESSERT_NOT_SELECTED}>{DESSERT_NOT_SELECTED}</option>
						{desserts.map((dessert) => (
							<option key={dessert.id} value={dessert.name}>
								{dessert.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.col2} data-label='ПН'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={mondayCount.toString()}
						onChange={(e) => setMondayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='ВТ'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={tuesdayCount.toString()}
						onChange={(e) => setTuesdayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='СР'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={wednesdayCount.toString()}
						onChange={(e) => setWednesdayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='ЧТ'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={thursdayCount.toString()}
						onChange={(e) => setThursdayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='ПТ'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={fridayCount.toString()}
						onChange={(e) => setFridayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='СБ'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={saturdayCount.toString()}
						onChange={(e) => setSaturdayCount(+e.target.value)}
					/>
				</div>
				<div className={styles.col2} data-label='ВС'>
					<input
						className={styles.input}
						type='number'
						min={0}
						value={sundayCount.toString()}
						onChange={(e) => setSundayCount(+e.target.value)}
					/>
				</div>
			</div>
			<Button customStyles={basicButtonStyles} onClick={handleAddRequest}>
				Добавить
			</Button>
		</>
	);
};
