import styles from './RequestsTable.module.css';

export const RequestsTable = () => {
	return (
		<table className={styles.requestsTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						Десерты
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
				<tr>
					<td className={styles.col1} data-label='Десерты'>
						{' '}
					</td>
					<td className={styles.col2} data-label='ПН'>
						{' '}
					</td>
					<td className={styles.col2} data-label='ВТ'>
						{' '}
					</td>
					<td className={styles.col2} data-label='СР'>
						{' '}
					</td>
					<td className={styles.col2} data-label='ЧТ'>
						{' '}
					</td>
					<td className={styles.col2} data-label='ПТ'>
						{' '}
					</td>
					<td className={styles.col2} data-label='СБ'>
						{' '}
					</td>
					<td className={styles.col2} data-label='ВС'>
						{' '}
					</td>
				</tr>
			</tbody>
		</table>
	);
};
