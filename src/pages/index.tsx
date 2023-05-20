import type { NextPage, GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './index.module.css';
import { Grid } from '~/components/Grid';
import { StatItem } from '~/components/StatItem';
import { DateButton } from '~/components/DateButton';
import { api } from '~/utils/api';

const Home: NextPage = () => {
	const { t } = useTranslation('index');
	const [startDate, setStartDate] = useState(new Date('2023-01-01'));
	const [endDate, setEndDate] = useState(new Date('2024-01-01'));

	const {
		data: stats,
		isLoading,
		error,
	} = api.order.getStatistics.useQuery({ startDate, endDate });

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	return (
		<>
			<h2>{t('title')}</h2>
			<div className={styles.dates}>
				<DateButton
					title={t('date-from') + ' '}
					date={startDate}
					setDate={setStartDate}
				/>
				<DateButton
					title={t('date-until') + ' '}
					date={endDate}
					setDate={setEndDate}
				/>
			</div>
			<Grid cellMinWidth={250}>
				{stats.map((stat) => (
					<StatItem key={stat.title} {...stat} />
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
