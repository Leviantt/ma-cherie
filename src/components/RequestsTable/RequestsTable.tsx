import { api } from '~/utils/api';
import { RequestRow } from '../RequestRow';
import styles from './RequestsTable.module.css';
import { AddRequestRow } from '../AddRequestRow';
import { filterNewDesserts } from '~/utils/filterNewDesserts';

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

	if (isLoading || isLoadingDesserts) return <div>Loading...</div>;

	if (error || dessertsError) {
		console.log(error);
		console.log(dessertsError);
		return <div>Something went wrong...</div>;
	}

	const sorted = requests.sort((a, b) =>
		a.dessert.name.localeCompare(b.dessert.name)
	);

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
							Десерт
						</th>
						<th scope='col' className={styles.col2}>
							ПН
						</th>
						<th scope='col' className={styles.col2}>
							ВТ
						</th>
						<th scope='col' className={styles.col2}>
							СР
						</th>
						<th scope='col' className={styles.col2}>
							ЧТ
						</th>
						<th scope='col' className={styles.col2}>
							ПТ
						</th>
						<th scope='col' className={styles.col2}>
							СБ
						</th>
						<th scope='col' className={styles.col2}>
							ВС
						</th>
					</tr>
				</thead>
				<tbody>
					{sorted.map((request) => (
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
