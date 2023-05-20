import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';

import styles from './Order.module.css';
import { Grid } from '~/components/Grid';
import { api } from '~/utils/api';
import { CartDessert } from '~/components/CartDessert';
import { CartDessertList } from '~/components/CartDessertList';
import { ModalConfirm } from '~/components/ModalConfirm';
import { getTotalPrice } from '~/utils/getTotalPrice';
import { convertDatetimeToString } from '~/utils/date';
import { SetStatus } from '~/components/SetStatus';
import { DeleteIcon } from '~/components/DeleteIcon/DeleteIcon';
import { useDeleteOrder } from '~/hooks/order/useDeleteOrder';

function DetailedOrder() {
	const { t } = useTranslation('orders');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const router = useRouter();
	const id = +(router.query.id ?? 0);
	const {
		data: order,
		isLoading,
		isError,
		refetch,
	} = api.order.getOneExtended.useQuery({ id });

	const deleteOrder = useDeleteOrder();

	if (isLoading) return <div>{t('loading')}</div>;

	if (isError) return <div>{t('error')}</div>;

	if (!order) return <div>{t('not-found')}</div>;

	return (
		<>
			<ModalConfirm
				title={t('delete-order') + '?'}
				closeModal={() => setIsModalOpen(false)}
				isOpen={isModalOpen}
				action={() => deleteOrder.mutate({ id: order.id })}
			/>
			<div className={styles.container}>
				<div className={styles.heading}>
					<h2>
						{t('order')} #{order.id}
					</h2>
					<DeleteIcon isActive={true} onClick={() => setIsModalOpen(true)} />
				</div>
				<Grid cellMinWidth={350}>
					<div className={styles.infoGroup}>
						<label>{t('name')}</label>
						<p>{order.name}</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('address')}</label>
						<p>{order.address}</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('created-at')}</label>
						<p>{convertDatetimeToString(order.createdAt)}</p>
					</div>
					<div className={[styles.infoGroup, styles.status].join(' ')}>
						<label>{t('status')}</label>
						<p>
							<SetStatus
								status={order.status}
								orderId={order.id}
								refetch={() => void refetch()}
							/>
						</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('client')}</label>
						<p>{order.client.fullName}</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('client-phone')}</label>
						<p>{order.client.phone}</p>
					</div>
					<div className={[styles.infoGroup, styles.manager].join(' ')}>
						<label>{t('manager')}</label>
						<p>
							<Link href={`/employees/${order.managerId}`}>
								{order.manager.fullName}
							</Link>
						</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('manager-phone')}</label>
						<p>{order.manager.phone}</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('delivery-method')}</label>
						<p>{t(order.deliveryMethod)}</p>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('delivery-price')}</label>
						<p>{+order.deliveryPrice}₽</p>
					</div>
					{order.receivedAt && (
						<div className={styles.infoGroup}>
							<label>{t('received-at')}</label>
							<p>{convertDatetimeToString(order.receivedAt)}</p>
						</div>
					)}
					<div className={[styles.infoGroup, styles.comment].join(' ')}>
						<label>{t('comment')}</label>
						<textarea
							rows={5}
							value={order.comment}
							disabled={true}
							placeholder={`${t('comment')}`}
						/>
					</div>
					<div className={[styles.infoGroup, styles.total].join(' ')}>
						<label>{t('Total')}</label>
						<h3>{getTotalPrice(order.desserts) + +order.deliveryPrice}₽</h3>
					</div>
				</Grid>
				<CartDessertList>
					{order.desserts.map((d) => (
						<CartDessert
							key={d.dessertId}
							{...d.dessert}
							number={d.dessertsNumber}
							disabled={true}
						/>
					))}
				</CartDessertList>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', [
				'common',
				'orders',
				'clients',
			])),
		},
	};
};

export default DetailedOrder;
