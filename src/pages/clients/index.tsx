import type { GetServerSideProps, NextPage } from 'next';

import styles from './clients.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { ClientsTable } from '~/components/ClientsTable';
import { filterButtonStyles } from '~/components/Button/Button';
import { basicButtonStyles } from '~/components/Button/Button';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { api } from '~/utils/api';
import { makeCompareClients } from '~/utils/compare';

const Clients: NextPage = () => {
	const [searchInput, setSearchInput] = useState('');
	const { t } = useTranslation('clients');
	const { data: clients, isLoading, error } = api.client.getAll.useQuery();

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	clients.sort(makeCompareClients(searchInput));

	return (
		<>
			<h2>{t('clients')}</h2>
			<div className={styles.buttons}>
				<Button customStyles={basicButtonStyles}>{t('export')}</Button>
				<Button customStyles={basicButtonStyles}>{t('birthdays')}</Button>
			</div>
			<div className={styles.search}>
				<Button customStyles={filterButtonStyles}>{t('filter')}</Button>
				<SearchBar
					isDarkBackground={true}
					placeholder={`${t('search')}`}
					searchInput={searchInput}
					setSearchInput={setSearchInput}
				/>
			</div>
			<ClientsTable clients={clients} />
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
