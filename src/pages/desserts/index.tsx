import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { api } from '~/utils/api';
import { SearchBar } from '~/components/SearchBar';
import { Grid } from '~/components/Grid';
import { DessertCard } from '~/components/DessertCard';
import { AddDessertCard } from '~/components/AddDessertCard';
import { makeCompareDesserts } from '~/utils/compare';

const Desserts: NextPage = () => {
	const {
		data: desserts,
		isLoading,
		error,
		refetch,
	} = api.dessert.getAll.useQuery();

	const { t } = useTranslation('desserts');

	const [searchInput, setSearchInput] = useState<string>('');

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	desserts.sort(makeCompareDesserts(searchInput));

	return (
		<>
			<h2>{t('desserts')}</h2>
			<SearchBar
				isDarkBackground={false}
				placeholder={t('search')}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<Grid cellMinWidth={350}>
				<AddDessertCard refetch={() => void refetch()} />
				{desserts.map((dessert) => (
					<DessertCard
						key={dessert.id}
						dessert={dessert}
						refetch={() => void refetch()}
					/>
				))}
			</Grid>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'desserts'])),
		},
	};
};

export default Desserts;
