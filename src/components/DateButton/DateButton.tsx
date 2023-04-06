import { forwardRef, useState } from 'react';
import styles from './DateButton.module.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

type DateButtonProps = {
	title: string;
	startDate: Date;
};

export const DateButton = ({ title, startDate }: DateButtonProps) => {
	registerLocale('ru', ru);
	const [selectedDate, setSelectedDate] = useState<Date | null>(startDate);

	const CustomInput = forwardRef<HTMLButtonElement, any>(
		({ value, onClick }, ref) => (
			<button
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				onClick={onClick}
				ref={ref}
				className={styles.dateButton}
			>
				{title} {value}
			</button>
		)
	);
	CustomInput.displayName = 'CustomInput';

	const compareDays = (
		date1: Date | null | undefined,
		date2: Date | null | undefined
	): boolean => {
		if (!date1 || !date2) return false;
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);
		return date1.getTime() === date2.getTime();
	};

	return (
		<DatePicker
			closeOnScroll={true}
			dateFormat='dd.MM.yyyy'
			selected={selectedDate}
			onChange={setSelectedDate}
			customInput={
				<CustomInput value={selectedDate} onClick={setSelectedDate} />
			}
			locale='ru'
			dayClassName={(date) =>
				compareDays(date, selectedDate) ? styles.day ?? '' : null
			}
			calendarClassName={styles.calendar}
			className={styles.datePicker}
		/>
	);
};
