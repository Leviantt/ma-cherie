import { Button } from '~/components/Button';
import styles from './requests.module.css';
import type { CustomButtonStyles } from '~/types/CustomButtonStyles';
import { RequestsTable } from '~/components/RequestsTable';
import { AddressLabel } from '~/components/AddressLabel';

export default function Requests() {
	const basicButtonStyles: CustomButtonStyles = {
		backgroundColor: '#a2c1b2',
		color: '#fff',
	};
	return (
		<>
			<h2>Заявки</h2>
			<div className={styles.buttons}>
				<Button customStyles={basicButtonStyles}>Экспорт в Excel</Button>
			</div>
			<div className={styles.container}>
				<RequestsTable />
				<div className={styles.addresses}>
					<AddressLabel key={1} title='Молодогвардейская' />
					<AddressLabel key={2} title='Солнечная' />
					<AddressLabel key={3} title='Дачная' />
					<AddressLabel key={4} title='Куйбышева' />
					<AddressLabel key={5} title='Галактионовская' />
					<Button
						customStyles={{ ...basicButtonStyles, backgroundColor: '#cadcd3' }}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</>
	);
}
