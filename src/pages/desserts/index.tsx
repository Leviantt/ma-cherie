import { useState } from 'react';
import type { NextPage } from 'next';

import { api } from '~/utils/api';
import { SearchBar } from '~/components/SearchBar';
import { Grid } from '~/components/Grid';
import { DessertCard } from '~/components/DessertCard';
import { AddDessertCard } from '~/components/AddDessertCard';

const Desserts: NextPage = () => {
	const {
		data: desserts,
		isLoading,
		error,
		refetch,
	} = api.dessert.getAll.useQuery();

	const [searchInput, setSearchInput] = useState<string>('');

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		console.log(error);
		return <div>Something went wrong...</div>;
	}

	// const sorted = employees.sort(makeCompareEmployees(searchInput));

	return (
		<>
			<h2>Десерты</h2>
			<SearchBar
				isDarkBackground={false}
				placeholder='Поиск десертов'
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<Grid cellMinWidth={250}>
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

export default Desserts;
