import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import styles from './Orders.module.css';
import { Button } from '~/components/Button';
import { addButtonStyles } from '~/components/Button/Button';
import { OrdersTable } from '~/components/OrdersTable';
import { FilterButton } from '~/components/FilterButton';

const Orders: NextPage = () => {
	const router = useRouter();
	const [filterByStatusFlags, setFilterByStatusFlags] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
	]);
	const toggle = (index: number) => {
		setFilterByStatusFlags((arr) => {
			return arr.map((item, i) => (i === index ? !item : false));
		});
	};
	const { t } = useTranslation('orders');
	return (
		<>
			<h2>{t('orders')}</h2>
			<div className={styles.buttons}>
				<Button
					customStyles={addButtonStyles}
					onClick={() => {
						void router.push('/orders/new-order');
					}}
				>
					+ {t('create-order')}
				</Button>
			</div>
			<div className={styles.filterButtons}>
				<div>
					<FilterButton
						isActive={filterByStatusFlags[0]}
						toggle={() => toggle(0)}
					>
						{t('new')}
					</FilterButton>
					<FilterButton
						isActive={filterByStatusFlags[1]}
						toggle={() => toggle(1)}
					>
						{t('at-work')}
					</FilterButton>
					<FilterButton
						isActive={filterByStatusFlags[2]}
						toggle={() => toggle(2)}
					>
						{t('at-delivery')}
					</FilterButton>
				</div>
				<div>
					<FilterButton
						isActive={filterByStatusFlags[3]}
						toggle={() => toggle(3)}
					>
						{t('completed')}
					</FilterButton>
					<FilterButton
						isActive={filterByStatusFlags[4]}
						toggle={() => toggle(4)}
					>
						{t('canceled')}
					</FilterButton>
				</div>
			</div>
			<OrdersTable filterByStatusFlags={filterByStatusFlags} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'orders'])),
		},
	};
};

export default Orders;
