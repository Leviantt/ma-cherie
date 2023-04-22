import type { NextPage } from 'next';

import styles from './clients.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { ClientsTable } from '~/components/ClientsTable';
import { filterButtonStyles } from '~/components/Button/Button';
import { basicButtonStyles } from '~/components/Button/Button';

const Clients: NextPage = () => {
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
};

export default Clients;
