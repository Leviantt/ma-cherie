import { useState } from 'react';
import type { Request } from '@prisma/client';
import { useTranslation } from 'next-i18next';

import styles from './RequestRow.module.css';
import { isRequestNullable } from '~/utils/isRequestNullable';
import { useUpdateRequest } from '~/hooks/request/useUpdateRequest';
import { useDeleteRequest } from '~/hooks/request/useDeleteRequest';

type RequestRowProps = Request & {
	dessert: { name: string };
	refetchRequests: () => void;
	refetchDesserts: () => void;
};

export const RequestRow = (props: RequestRowProps) => {
	const [mondayCount, setMondayCount] = useState(props.mondayCount);
	const [tuesdayCount, setTuesdayCount] = useState(props.tuesdayCount);
	const [wednesdayCount, setWednesdayCount] = useState(props.wednesdayCount);
	const [thursdayCount, setThursdayCount] = useState(props.thursdayCount);
	const [fridayCount, setFridayCount] = useState(props.fridayCount);
	const [saturdayCount, setSaturdayCount] = useState(props.saturdayCount);
	const [sundayCount, setSundayCount] = useState(props.sundayCount);

	const [updateTimer, setUpdateTimer] = useState<NodeJS.Timeout | undefined>();

	const updateRequest = useUpdateRequest(
		props.refetchRequests,
		props.refetchDesserts
	);

	const deleteRequest = useDeleteRequest(
		props.refetchRequests,
		props.refetchDesserts
	);
	const { t } = useTranslation('requests');
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
			<td className={styles.col2} data-label={`${t('mon')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={mondayCount.toString()}
					onChange={(e) => setMondayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('tue')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={tuesdayCount.toString()}
					onChange={(e) => setTuesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('wed')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={wednesdayCount.toString()}
					onChange={(e) => setWednesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('thu')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={thursdayCount.toString()}
					onChange={(e) => setThursdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('fri')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={fridayCount.toString()}
					onChange={(e) => setFridayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('sat')}`}>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={saturdayCount.toString()}
					onChange={(e) => setSaturdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label={`${t('sun')}`}>
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
