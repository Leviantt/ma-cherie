import type { Client } from '~/types/Client';
import styles from './ClientsTable.module.css';
import { ClientRow } from '../ClientRow';

const MOCK_CLIENTS: Client[] = [
	{
		id: '1',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '2',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '3',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '4',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '5',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '6',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '7',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
	{
		id: '8',
		fullName: 'Иванов Иван',
		registerDate: '22.03.2023',
		lastOrder: 'test order',
		totalExpenses: 10000,
		source: 'source',
		manager: 'manager',
	},
];

export const ClientsTable = () => {
	return (
		<table className={styles.clientsTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						Клиенты
					</th>
					<th scope='col' className={styles.col2}>
						Дата регистрации
					</th>
					<th scope='col' className={styles.col3}>
						Последняя покупка
					</th>
					<th scope='col' className={styles.col4}>
						Общая сумма покупок
					</th>
					<th scope='col' className={styles.col5}>
						Источник
					</th>
					<th scope='col' className={styles.col6}>
						Менеджер
					</th>
				</tr>
			</thead>
			<tbody>
				{MOCK_CLIENTS.map((client) => (
					<ClientRow key={client.id} client={client} />
				))}
			</tbody>
		</table>
	);
};
