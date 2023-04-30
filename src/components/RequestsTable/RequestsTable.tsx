import { api } from '~/utils/api';
import { RequestRow } from '../RequestRow';
import styles from './RequestsTable.module.css';
import { AddRequestRow } from '../AddRequestRow';
import { Prisma } from '@prisma/client';

export const RequestsTable = () => {
	const { data, isLoading, error, refetch } = api.request.getAll.useQuery();

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		console.log(error);
		return <div>Something went wrong...</div>;
	}
	const mock_data: typeof data = [
		{
			id: 1,
			dessert: {
				id: 1,
				description: '',
				name: 'random',
				price: new Prisma.Decimal(100),
			},
			dessertId: 1,
			mondayCount: 1,
			tuesdayCount: 12,
			wednesdayCount: 3,
			thursdayCount: 3,
			fridayCount: 10,
			saturdayCount: 5,
			sundayCount: 64,
		},
		{
			id: 2,
			dessert: {
				id: 1,
				description: '',
				name: 'random',
				price: new Prisma.Decimal(100),
			},
			dessertId: 1,
			mondayCount: 1,
			tuesdayCount: 12,
			wednesdayCount: 3,
			thursdayCount: 3,
			fridayCount: 10,
			saturdayCount: 5,
			sundayCount: 64,
		},
		{
			id: 3,
			dessert: {
				id: 1,
				description: '',
				name: 'random',
				price: new Prisma.Decimal(100),
			},
			dessertId: 1,
			mondayCount: 1,
			tuesdayCount: 12,
			wednesdayCount: 3,
			thursdayCount: 3,
			fridayCount: 10,
			saturdayCount: 5,
			sundayCount: 64,
		},
		{
			id: 4,
			dessert: {
				id: 1,
				description: '',
				name: 'random',
				price: new Prisma.Decimal(100),
			},
			dessertId: 1,
			mondayCount: 1,
			tuesdayCount: 12,
			wednesdayCount: 3,
			thursdayCount: 3,
			fridayCount: 10,
			saturdayCount: 5,
			sundayCount: 64,
		},
	];

	return (
		<div className={styles.requestsTableContainer}>
			<AddRequestRow refetchTable={() => void refetch()} />
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
					{mock_data.map((request) => (
						<RequestRow
							key={request.id}
							{...request}
							refetchTable={() => void refetch()}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
