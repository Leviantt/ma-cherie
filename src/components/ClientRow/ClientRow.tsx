import styles from './ClientRow.module.css';
import { useTranslation } from 'next-i18next';
import { calculateTotalClientExpenses } from '~/utils/calculateTotal';
import type { ClientExtended } from '~/types/ClientExtended';
import { getFirstManager } from '~/utils/getFirstManager';
import { getLastOrder } from '~/utils/getLastOrder';
import Link from 'next/link';

export const ClientRow = ({
	fullName,
	registrationDate,
	orders,
	source,
	showBirthday,
	birthdate,
}: ClientExtended & { showBirthday: boolean }) => {
	const { t } = useTranslation('clients');
	const lastOrder = getLastOrder(orders);
	const manager = getFirstManager(orders);
	return (
		<tr>
			<td className={styles.col1} data-label={t('client')}>
				{fullName}
			</td>
			<td className={styles.col2} data-label={t('registration-date')}>
				{registrationDate.toLocaleDateString()}
			</td>
			<td className={styles.col3} data-label={t('last-order')}>
				<Link href={lastOrder ? `/orders/${lastOrder.id}` : ''}>
					{lastOrder?.name}
				</Link>
			</td>
			<td className={styles.col4} data-label={t('total')}>
				{calculateTotalClientExpenses(orders)}₽
			</td>
			<td className={styles.col5} data-label={t('source')}>
				{source}
			</td>
			<td
				className={styles.col6}
				data-label={showBirthday ? t('birthday') : t('manager')}
			>
				{showBirthday ? (
					birthdate.toLocaleDateString()
				) : (
					<Link href={manager ? `/employees/${manager.id}` : ''}>
						{manager?.fullName}
					</Link>
				)}
			</td>
		</tr>
	);
};
