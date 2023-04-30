import { api } from '~/utils/api';
import styles from './RequestRow.module.css';
import { useState } from 'react';
import { Dessert, Request } from '@prisma/client';

type RequestRowProps = Request & {
	dessert: Dessert;
	refetchTable: () => void;
};

export const RequestRow = (props: RequestRowProps) => {
	const [mondayCount, setMondayCount] = useState(props.mondayCount);
	const [tuesdayCount, setTuesdayCount] = useState(props.tuesdayCount);
	const [wednesdayCount, setWednesdayCount] = useState(props.wednesdayCount);
	const [thursdayCount, setThursdayCount] = useState(props.thursdayCount);
	const [fridayCount, setFridayCount] = useState(props.fridayCount);
	const [saturdayCount, setSaturdayCount] = useState(props.saturdayCount);
	const [sundayCount, setSundayCount] = useState(props.sundayCount);

	return (
		<tr className={styles.row}>
			<td className={styles.col1} data-label='Десерт'>
				<label>{props.dessert.name}</label>
			</td>
			<td className={styles.col2} data-label='ПН'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={mondayCount}
					onChange={(e) => setMondayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ВТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={tuesdayCount}
					onChange={(e) => setTuesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='СР'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={wednesdayCount}
					onChange={(e) => setWednesdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ЧТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={thursdayCount}
					onChange={(e) => setThursdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ПТ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={fridayCount}
					onChange={(e) => setFridayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='СБ'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={saturdayCount}
					onChange={(e) => setSaturdayCount(+e.target.value)}
				/>
			</td>
			<td className={styles.col2} data-label='ВС'>
				<input
					className={styles.input}
					type='number'
					min={0}
					value={sundayCount}
					onChange={(e) => setSundayCount(+e.target.value)}
				/>
			</td>
		</tr>
	);
};
