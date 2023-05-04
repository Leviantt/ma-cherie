import type { NextPage } from 'next';

import styles from './employees.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { Grid } from '~/components/Grid';
import { EmployeeCard } from '../../components/EmployeeCard';
import { filterButtonStyles } from '~/components/Button/Button';
import { addButtonStyles } from '~/components/Button/Button';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { makeCompareEmployees } from '~/utils/compare';

const Employees: NextPage = () => {
	const router = useRouter();
	const { data: employees, isLoading, error } = api.employee.getAll.useQuery();

	const [searchInput, setSearchInput] = useState<string>('');

	if (isLoading) return <div>Loading...</div>;

	if (error) {
		console.log(error);
		return <div>Something went wrong...</div>;
	}

	const sorted = employees.sort(makeCompareEmployees(searchInput));

	return (
		<>
			<h2>Сотрудники</h2>
			<SearchBar
				isDarkBackground={false}
				placeholder='Поиск сотрудников'
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<div className={styles.buttons}>
				<Button customStyles={filterButtonStyles}>Фильтр</Button>
				<Button
					customStyles={addButtonStyles}
					onClick={() => {
						void router.push('/employees/new-employee');
					}}
				>
					+ Добавить сотрудника
				</Button>
			</div>
			<Grid cellMinWidth={250}>
				{sorted.length === 0 ? (
					<div>There is no employees yet</div>
				) : (
					sorted.map((employee) => (
						<EmployeeCard key={employee.id} {...employee} />
					))
				)}
			</Grid>
		</>
	);
};

export default Employees;
