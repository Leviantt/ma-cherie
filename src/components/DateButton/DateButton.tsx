import { useRef } from 'react';

import styles from './DateButton.module.css';
import { Button } from '../Button';
import { convertDateForValue } from '~/utils/date';

type DateButtonProps = {
	title: string;
	date: Date;
	setDate: (date: Date) => void;
};

export const DateButton = ({ title, date, setDate }: DateButtonProps) => {
	const dateInputRef = useRef<HTMLInputElement>(null);
	const showPicker = () => {
		dateInputRef.current?.showPicker();
	};
	return (
		<Button onClick={showPicker}>
			{title + convertDateForValue(date).split('-').join('.')}
			<input
				className={styles.date}
				ref={dateInputRef}
				type='date'
				value={convertDateForValue(date)}
				onChange={(e) => setDate(new Date(e.target.value))}
			/>
		</Button>
	);
};
