import styles from './RequestRow.module.css';
import { useState } from 'react';
import type { Request } from '@prisma/client';
import { api } from '~/utils/api';
import { toast } from 'react-hot-toast';
import type { TRPCClientErrorBase } from '@trpc/client';
import type { DefaultErrorShape } from '@trpc/server';
import { isRequestNullable } from '~/utils/isRequestNullable';

type RequestRowProps = Request & {
	dessert: { name: string };
	refetchTable: () => void;
	refetchDesserts: () => void;
};

export const RequestRow = (props: RequestRowProps) => {
	console.log(props);
	const [mondayCount, setMondayCount] = useState(props.mondayCount);
	const [tuesdayCount, setTuesdayCount] = useState(props.tuesdayCount);
	const [wednesdayCount, setWednesdayCount] = useState(props.wednesdayCount);
	const [thursdayCount, setThursdayCount] = useState(props.thursdayCount);
	const [fridayCount, setFridayCount] = useState(props.fridayCount);
	const [saturdayCount, setSaturdayCount] = useState(props.saturdayCount);
	const [sundayCount, setSundayCount] = useState(props.sundayCount);

	const [updateTimer, setUpdateTimer] = useState<NodeJS.Timeout | undefined>();

	const updateRequest = api.request.update.useMutation({
		onSuccess: () => {
			void props.refetchTable();
			void props.refetchDesserts();
			toast.success('Заявки для десерта успешно обновлены');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить заявки для десерта.');
		},
	});

	const deleteRequest = api.request.delete.useMutation({
		onSuccess: () => {
			void props.refetchTable();
			void props.refetchDesserts();
			toast.success('Заявки для десерта удалены, т.к. все столбцы равны 0');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить заявки для десерта.');
		},
	});

	const handleUpdate = () => {
		clearTimeout(updateTimer);
		const timer = setTimeout(() => {
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
				deleteRequest.mutate({ id: props.id });
			} else {
				updateRequest.mutate({ id: props.id, ...counts });
			}
		}, 3000);
		setUpdateTimer(timer);
	};

	return (
		<tr className={styles.row} onBlur={() => handleUpdate()}>
			<td className={styles.col1} data-label='Десерт'>
				<label>{props.dessert.name}</label>
			</td>
			<td className={styles.col2} data-label='ПН'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={mondayCount.toString()}
					onChange={(e) => setMondayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ВТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={tuesdayCount.toString()}
					onChange={(e) => setTuesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='СР'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={wednesdayCount.toString()}
					onChange={(e) => setWednesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ЧТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={thursdayCount.toString()}
					onChange={(e) => setThursdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ПТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={fridayCount.toString()}
					onChange={(e) => setFridayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='СБ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={saturdayCount.toString()}
					onChange={(e) => setSaturdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ВС'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={sundayCount.toString()}
					onChange={(e) => setSundayCount(+e.target.value)}
				/>
			</td>
		</tr>
	);
};
