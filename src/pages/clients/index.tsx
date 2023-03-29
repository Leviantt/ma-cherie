import styles from './clients.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import type { CustomStyles } from '~/components/Button/Button';
import { ClientsTable } from '~/components/ClientsTable';

export default function clients() {
	const basicButtonStyles: CustomStyles = {
		backgroundColor: '#a2c1b2',
		color: '#fff',
	};

	const filterButtonStyles: CustomStyles = {
		backgroundColor: '#fff',
		color: '#246B49',
		boxShadow: '0px 4px 4px 0px #246B4942',
	};

	return (
		<>
			<h2>Клиенты</h2>
			<div className={styles.buttons}>
				<Button customStyles={basicButtonStyles}>Экспорт в Excel</Button>
				<Button customStyles={basicButtonStyles}>Дни рождения</Button>
			</div>
			<div className={styles.search}>
				<Button customStyles={filterButtonStyles}>Фильтр</Button>
				<SearchBar isDarkBackground={true} placeholder='Поиск клиента' />
			</div>
			<ClientsTable />
		</>
	);
}
