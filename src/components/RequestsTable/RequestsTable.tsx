import { api } from '~/utils/api';
import { RequestRow } from '../RequestRow';
import styles from './RequestsTable.module.css';
import { AddRequestRow } from '../AddRequestRow';
import { filterNewDesserts } from '~/utils/filterNewDesserts';
import { useTranslation } from 'next-i18next';

type RequestsTableProps = {
	address: string;
};

export const RequestsTable = ({ address }: RequestsTableProps) => {
	const {
		data: requests,
		isLoading,
		error,
		refetch,
	} = api.request.getAllByAddress.useQuery({ address });

	const {
		data: desserts,
		isLoading: isLoadingDesserts,
		error: dessertsError,
		refetch: refetchDesserts,
	} = api.dessert.getAll.useQuery();

	const { t } = useTranslation('requests');

	if (isLoading || isLoadingDesserts) return <div>{t('loading')}</div>;

	if (error || dessertsError) {
		console.log(error);
		console.log(dessertsError);
		return <div>{t('error')}</div>;
	}

	requests.sort((a, b) => a.dessert.name.localeCompare(b.dessert.name));

	return (
		<div className={styles.requestsTableContainer}>
			<AddRequestRow
				refetchRequests={() => void refetch()}
				address={address}
				desserts={filterNewDesserts(requests, desserts)}
				refetchDesserts={() => void refetchDesserts()}
			/>
			<table className={styles.requestsTable}>
				<thead>
					<tr>
						<th scope='col' className={styles.col1}>
							{t('dessert')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('mon')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('tue')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('wed')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('thu')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('fri')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('sat')}
						</th>
						<th scope='col' className={styles.col2}>
							{t('sun')}
						</th>
					</tr>
				</thead>
				<tbody>
					{requests.map((request) => (
						<RequestRow
							key={request.id}
							{...request}
							refetchRequests={() => void refetch()}
							refetchDesserts={() => void refetchDesserts()}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
