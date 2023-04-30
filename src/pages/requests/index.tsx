import type { NextPage } from 'next';

import styles from './requests.module.css';
import { Button } from '~/components/Button';
import { RequestsTable } from '~/components/RequestsTable';
import { AddressLabel } from '~/components/AddressLabel';
import { basicButtonStyles } from '~/components/Button/Button';
import { AddRequestRow } from '~/components/AddRequestRow';

const Requests: NextPage = () => {
	return (
		<>
			<h2>Заявки</h2>
			<div className={styles.buttons}>
				<Button customStyles={basicButtonStyles}>Экспорт в Excel</Button>
			</div>
			<div className={styles.container}>
				<RequestsTable />
				<div className={styles.addresses}>
					<AddressLabel key={1} title='Молодогвардейская' isCurrent={true} />
					<AddressLabel key={2} title='Солнечная' />
					<AddressLabel key={3} title='Дачная' />
					<AddressLabel key={4} title='Куйбышева' />
					<AddressLabel key={5} title='Галактионовская' />
				</div>
			</div>
		</>
	);
};
export default Requests;
