
import styles from './OrdersTable.module.css';
import { OrderRow } from '../OrderRow';


export const OrdersTable = () => {
	// const {  } = api.
	return (
		<table className={styles.ordersTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						Номер
					</th>
					<th scope='col' className={styles.col2}>
						Название
					</th>
					<th scope='col' className={styles.col3}>
						Статус
					</th>
					<th scope='col' className={styles.col4}>
						Время создания
					</th>
					<th scope='col' className={styles.col5}>
						Цена
					</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
		</table>
	);
};
