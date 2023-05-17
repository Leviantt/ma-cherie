import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import styles from './index.module.css';
import { Grid } from '~/components/Grid';
import { Button } from '~/components/Button';
import { StatItem } from '~/components/StatItem';
import type { StatData } from '~/types/StatData';
import { DateButton } from '~/components/DateButton';
import { filterButtonStyles } from '~/components/Button/Button';
import { useTranslation } from 'next-i18next';
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

const Home: NextPage = () => {
	const { t } = useTranslation('index');
	return (
		<>
			<h2>{t('title')}</h2>
			<div className={styles.dates}>
				{/* <DateButton title='Дата: с ' startDate={new Date('01-01-2020')} /> */}
				{/* <DateButton title='Дата: по ' startDate={new Date('01-01-2021')} /> */}
			</div>
			<div className={styles.buttons}>
				<Button customStyles={filterButtonStyles}>{t('filter')}</Button>
			</div>
			<Grid cellMinWidth={250}>
				{MOCK_STAT_ITEMS.map((stat) => (
					<StatItem key={stat.id} {...stat} />
				))}
			</Grid>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'index'])),
		},
	};
};

export default Home;
