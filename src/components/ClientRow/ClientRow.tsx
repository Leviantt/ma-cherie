import type { Client } from '@prisma/client';
import styles from './ClientRow.module.css';

export const ClientRow = ({
	fullName,
	registrationDate,
	// lastOrder,
	// totalExpenses,
	source,
}: // manager,
Client) => {
	return (
		<tr>
			<td className={styles.col1} data-label='Клиент'>
				{fullName}
			</td>
			<td className={styles.col2} data-label='Дата регистрации'>
				{registrationDate.toLocaleDateString()}
			</td>
			<td className={styles.col3} data-label='Последняя покупка'>
				{/* {lastOrder} */}
			</td>
			<td className={styles.col4} data-label='Общая сумма покупок'>
				{/* {totalExpenses} */}
			</td>
			<td className={styles.col5} data-label='Источник'>
				{source}
			</td>
			<td className={styles.col6} data-label='Менеджер'>
				{/* {manager} */}
			</td>
		</tr>
	);
};
