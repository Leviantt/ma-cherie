import styles from './ClientsTable.module.css';
import { ClientRow } from '../ClientRow';

export const ClientsTable = () => {
	return (
		<table className={styles.clientsTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						Клиент
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
				{/* {MOCK_CLIENTS.map((client) => (
					<ClientRow key={client.id} {...client} />
				))} */}
			</tbody>
		</table>
	);
};
