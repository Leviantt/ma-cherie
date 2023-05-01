import type { NextPage } from 'next';

import styles from './requests.module.css';
import { Button } from '~/components/Button';
import { RequestsTable } from '~/components/RequestsTable';
import { AddressLabel } from '~/components/AddressLabel';
import { basicButtonStyles } from '~/components/Button/Button';
import { useState } from 'react';

export const addresses = [
	'Молодогвардейская',
	'Солнечная',
	'Дачная',
	'Куйбышева',
	'Галактионовская',
] as const;

const Requests: NextPage = () => {
	const [currentAddress, setCurrentAddress] = useState<string>(addresses[0]);

	return (
		<>
			<h2>Заявки</h2>
			<div className={styles.buttons}>
				<Button customStyles={basicButtonStyles}>Экспорт в Excel</Button>
			</div>
			<div className={styles.container}>
				<RequestsTable address={currentAddress} />
				<div className={styles.addresses}>
					{addresses.map((address) => (
						<AddressLabel
							key={address}
							title={address}
							isCurrent={address === currentAddress}
							onClick={() => setCurrentAddress(address)}
						/>
					))}
				</div>
			</div>
		</>
	);
};
export default Requests;
