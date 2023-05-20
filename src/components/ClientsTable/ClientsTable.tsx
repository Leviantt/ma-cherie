import styles from './ClientsTable.module.css';
import { ClientRow } from '../ClientRow';
import { useTranslation } from 'next-i18next';
import type { ClientExtended } from '~/types/ClientExtended';
import { compareClosestToCurrentDay } from '~/utils/compare';

type ClientsTableProps = {
	clients: ClientExtended[];
	showBirthday: boolean;
};

export const ClientsTable = ({ clients, showBirthday }: ClientsTableProps) => {
	const { t } = useTranslation('clients');

	if (showBirthday) {
		clients.sort(compareClosestToCurrentDay);
	}

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
						{showBirthday ? t('birhtday') : t('manager')}
					</th>
				</tr>
			</thead>
			<tbody>
				{clients.map((client) => (
					<ClientRow key={client.id} {...client} showBirthday={showBirthday} />
				))}
			</tbody>
		</table>
	);
};
