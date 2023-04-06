import styles from './statistics.module.css';
import { Grid } from '~/components/Grid';
import { Button } from '~/components/Button';
import { StatItem } from '~/components/StatItem';
import type { CustomButtonStyles } from '~/types/CustomButtonStyles';
import type { StatData } from '~/types/StatData';
import { DateButton } from '~/components/DateButton';
const MOCK_STAT_ITEMS: StatData[] = [
	{
		id: 1,
		statNumber: 402,
		description: 'Всего клиентов',
	},
	{
		id: 2,
		statNumber: 402,
		description: 'Всего клиентов',
	},
	{
		id: 3,
		statNumber: 402,
		description: 'Всего клиентов',
	},
	{
		id: 4,
		statNumber: 402,
		description: 'Всего клиентов',
	},
	{
		id: 5,
		statNumber: 402,
		description: 'Всего клиентов',
	},
	{
		id: 6,
		statNumber: 402,
		description: 'Всего клиентов',
	},
];

export default function Statistics() {
	const filterButtonStyles: CustomButtonStyles = {
		backgroundColor: '#fff',
		color: '#246B49',
		boxShadow: '0px 4px 4px 0px #246B4942',
	};
	return (
		<>
			<h2>Статистика</h2>
			<div className={styles.dates}>
				<DateButton title='Дата: с ' startDate={new Date('01-01-2020')} />
				<DateButton title='Дата: по ' startDate={new Date('01-01-2021')} />
			</div>
			<div className={styles.buttons}>
				<Button customStyles={filterButtonStyles}>Фильтр</Button>
			</div>
			<Grid cellMinWidth={250}>
				{MOCK_STAT_ITEMS.map((stat) => (
					<StatItem key={stat.id} {...stat} />
				))}
			</Grid>
		</>
	);
}
