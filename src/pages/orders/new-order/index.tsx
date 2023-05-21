import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { type ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from './NewOrder.module.css';
import { Grid } from '~/components/Grid';
import { api } from '~/utils/api';
import { PlusIcon } from '~/components/PlusIcon';
import { CartDessert } from '~/components/CartDessert';
import { filterAddedDesserts } from '~/utils/filterAddedDesserts';
import type { Map } from '~/types/Map';
import { SearchBar } from '~/components/SearchBar';
import { CartDessertList } from '~/components/CartDessertList';
import { DeliveryMethod } from '@prisma/client';
import { getDeliveryMethodByValue } from '~/utils/getDeliveryMethodByValue';
import type { ClientData } from '~/types/ClientData';
import { ModalClient } from '~/components/ModalClient';
import { validateClient } from '~/utils/validateClient';
import { Button } from '~/components/Button';
import { useCreateOrder } from '~/hooks/order/useCreateOrder';
import { calculateTotal } from '~/utils/calculateTotal';
import { validateOrder } from '~/utils/validateOrder';
import { useCreateOrderWithClient } from '~/hooks/order/useCreateOrderWithClient';
import { makeCompareDesserts } from '~/utils/compare';

function NewOrder() {
	const { t } = useTranslation('orders');
	const NOT_SELECTED = t('not-selected');

	const [addedDesserts, setAddedDesserts] = useState<Map>({});

	const [searchInput, setSearchInput] = useState<string>('');

	const [name, setName] = useState<string>('');
	const [comment, setComment] = useState<string>('');
	const [address, setAddress] = useState<string>('');
	const [clientId, setClientId] = useState<number>(-1);
	const [managerId, setManagerId] = useState<number>(-1);
	const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
		DeliveryMethod.SELF_DELIVERY
	);
	const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [clientData, setClientData] = useState<ClientData>({
		fullName: '',
		birthdate: new Date(),
		phone: '',
		source: '',
	});

	const createOrder = useCreateOrder();
	const createOrderWithClient = useCreateOrderWithClient();

	const handleClientInput = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setClientData((prev) => {
			if (name === 'birthdate') return { ...prev, [name]: new Date(value) };

			return { ...prev, [name]: value };
		});
	};

	const remove = (id: number) => {
		setAddedDesserts((prevDesserts) => {
			const { [id]: _, ...updated } = prevDesserts;
			return updated;
		});
	};

	const incrementDessertsNumber = (id: number) => {
		setAddedDesserts((prevDesserts) => ({
			...prevDesserts,
			[id]: (prevDesserts[id] ?? 0) + 1,
		}));
	};

	const decrementDessertsNumber = (id: number) => {
		setAddedDesserts((prevDesserts) => {
			const newValue = (prevDesserts[id] ?? 0) - 1;
			if (newValue <= 0) return prevDesserts;

			return { ...prevDesserts, [id]: newValue };
		});
	};

	const {
		data: managers,
		isLoading: isLoadingManagers,
		error: managersError,
	} = api.employee.getManagers.useQuery();

	const {
		data: clients,
		isLoading: isLoadingClients,
		error: clientsError,
	} = api.client.getAll.useQuery();

	const {
		data: desserts,
		isLoading: isLoadingDesserts,
		error: dessertsError,
	} = api.dessert.getAll.useQuery();

	if (isLoadingManagers || isLoadingClients || isLoadingDesserts)
		return <div>{t('loading')}</div>;

	if (managersError || clientsError || dessertsError) {
		console.log(clientsError);
		console.log(managersError);
		console.log(dessertsError);
		return <div>{t('error')}</div>;
	}

	const [added, notAdded] = filterAddedDesserts(desserts, addedDesserts);
	notAdded.sort(makeCompareDesserts(searchInput));

	const saveClient = () => {
		try {
			validateClient(clientData);
			setIsModalOpen(false);
			setClientId(0);
		} catch (err) {
			toast.error(t('add-client-error'));
		}
	};

	const saveOrder = () => {
		try {
			const validated = validateOrder(
				name,
				address,
				clientId,
				managerId,
				deliveryMethod,
				deliveryPrice,
				comment,
				clientData,
				addedDesserts
			);
			if (validated.clientId === 0) {
				createOrderWithClient.mutate(validated);
			} else {
				createOrder.mutate(validated);
			}
		} catch (err) {
			console.log(err);
			toast.error(t('add-error'));
		}
	};

	return (
		<>
			<ModalClient
				clientData={clientData}
				closeModal={() => setIsModalOpen(false)}
				handleClientInput={handleClientInput}
				isOpen={isModalOpen}
				save={saveClient}
			/>
			<div className={styles.container}>
				<h2>{t('new-order')}</h2>
				<Grid cellMinWidth={350}>
					<div className={styles.infoGroup}>
						<label>{t('name')}</label>
						<input
							type='text'
							value={name}
							placeholder={`${t('name')}`}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('address')}</label>
						<input
							type='text'
							value={address}
							placeholder={`${t('address')}`}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</div>
					<div className={[styles.infoGroup, styles.client].join(' ')}>
						<label>{t('client')}</label>
						<select
							value={clientId}
							onChange={(e) => setClientId(+e.target.value)}
							disabled={clientId === 0}
						>
							<option value={-1}>{NOT_SELECTED}</option>
							{clients.map((c) => (
								<option key={c.id} value={c.id}>
									{c.fullName}
								</option>
							))}
							{clientId === 0 && (
								<option value={0}>{clientData.fullName}</option>
							)}
						</select>
						<PlusIcon
							onClick={() => setIsModalOpen(true)}
							disabled={clientId === 0}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('manager')}</label>
						<select
							value={managerId}
							onChange={(e) => setManagerId(+e.target.value)}
						>
							<option value={-1}>{NOT_SELECTED}</option>
							{managers.map((m) => (
								<option key={m.id} value={m.id}>
									{m.fullName}
								</option>
							))}
						</select>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('delivery-method')}</label>
						<select
							value={deliveryMethod}
							onChange={(e) =>
								setDeliveryMethod(getDeliveryMethodByValue(e.target.value))
							}
						>
							<option value={DeliveryMethod.SELF_DELIVERY}>
								{t(DeliveryMethod.SELF_DELIVERY)}
							</option>
							<option value={DeliveryMethod.BY_COURIER}>
								{t(DeliveryMethod.BY_COURIER)}
							</option>
						</select>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('delivery-price')}</label>
						<input
							type='number'
							min={0}
							value={deliveryPrice.toString()}
							placeholder={`${t('delivery-price')}`}
							onChange={(e) => setDeliveryPrice(+e.target.value)}
						/>
					</div>

					<div className={[styles.infoGroup, styles.comment].join(' ')}>
						<label>{t('comment')}</label>
						<textarea
							rows={5}
							value={comment}
							placeholder={`${t('comment')}`}
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>
					<div className={styles.createButtonContainer}>
						<div className={[styles.infoGroup, styles.total].join(' ')}>
							<label>{t('Total')}</label>
							<h3>
								{calculateTotal(addedDesserts, desserts) + deliveryPrice}₽
							</h3>
						</div>
						<Button onClick={saveOrder}>{t('create')}</Button>
					</div>
				</Grid>
				<CartDessertList>
					{added.map((d) => (
						<CartDessert
							key={d.id}
							{...d}
							number={addedDesserts[d.id]}
							increment={() => incrementDessertsNumber(d.id)}
							decrement={() => decrementDessertsNumber(d.id)}
							remove={() => remove(d.id)}
						/>
					))}
				</CartDessertList>
				{notAdded.length !== 0 && (
					<SearchBar
						placeholder={t('search-desserts')}
						searchInput={searchInput}
						setSearchInput={setSearchInput}
					/>
				)}
				<CartDessertList>
					{notAdded.map((d) => (
						<CartDessert
							key={d.id}
							{...d}
							add={() => incrementDessertsNumber(d.id)}
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

export default NewOrder;
