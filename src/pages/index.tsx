import type { NextPage } from 'next';

import styles from './index.module.css';
import { Grid } from '~/components/Grid';
import { Button } from '~/components/Button';
import { StatItem } from '~/components/StatItem';
import type { StatData } from '~/types/StatData';
import { DateButton } from '~/components/DateButton';
import { filterButtonStyles } from '~/components/Button/Button';
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

import { api } from '~/utils/api';

const Home: NextPage = () => {
	const hello = api.example.hello.useQuery({ text: 'from tRPC' });

	return (
		<>
			<h2>Главная</h2>
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
};

export default Home;
