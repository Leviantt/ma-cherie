import type { GetServerSideProps, NextPage } from 'next';

import styles from './clients.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { ClientsTable } from '~/components/ClientsTable';
import { basicButtonStyles } from '~/components/Button/Button';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';
import { makeCompareClients } from '~/utils/compare';
import { CSVLink } from 'react-csv';

const Clients: NextPage = () => {
	const { data: clients, isLoading, error } = api.client.getAll.useQuery();
	const [searchInput, setSearchInput] = useState('');
	const [showBirthday, setShowBirthday] = useState(false);
	const { t } = useTranslation('clients');

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	clients.sort(makeCompareClients(searchInput));

	const headers = [
		{ label: 'Id', key: 'id' },
		{ label: 'FullName', key: 'fullName' },
		{ label: 'RegistrationDate', key: 'registrationDate' },
		{ label: 'Birthdate', key: 'birthdate' },
		{ label: 'Phone', key: 'phone' },
		{ label: 'Source', key: 'source' },
	];
	return (
		<>
			<h2>{t('clients')}</h2>
			<div className={styles.buttons}>
				<CSVLink
					headers={headers}
					data={clients}
					filename='clients'
					separator=';'
				>
					<Button customStyles={basicButtonStyles}>{t('export')}</Button>
				</CSVLink>
				<Button
					customStyles={basicButtonStyles}
					clicked={showBirthday}
					onClick={() => setShowBirthday((prev) => !prev)}
				>
					{t('birthdays')}
				</Button>
			</div>
			<div className={styles.search}>
				<SearchBar
					isDarkBackground={true}
					placeholder={`${t('search')}`}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
				/>
			</div>
			<ClientsTable clients={clients} showBirthday={showBirthday} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'clients'])),
		},
	};
};

export default Clients;
