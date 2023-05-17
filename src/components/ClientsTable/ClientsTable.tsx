import styles from './ClientsTable.module.css';
import { ClientRow } from '../ClientRow';
import { useTranslation } from 'next-i18next';
import type { ClientExtended } from '~/types/ClientExtended';

type ClientsTableProps = {
	clients: ClientExtended[];
};

export const ClientsTable = ({ clients }: ClientsTableProps) => {
	const { t } = useTranslation('clients');

	return (
		<table className={styles.clientsTable}>
			<thead>
				<tr>
					<th scope='col' className={styles.col1}>
						{t('client')}
					</th>
					<th scope='col' className={styles.col2}>
						{t('registration-date')}
					</th>
					<th scope='col' className={styles.col3}>
						{t('last-order')}
					</th>
					<th scope='col' className={styles.col4}>
						{t('total')}
					</th>
					<th scope='col' className={styles.col5}>
						{t('source')}
					</th>
					<th scope='col' className={styles.col6}>
						{t('manager')}
					</th>
				</tr>
			</thead>
			<tbody>
				{clients.map((client) => (
					<ClientRow key={client.id} {...client} />
				))}
			</tbody>
		</table>
	);
};
