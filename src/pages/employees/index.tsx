import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import styles from './employees.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { Grid } from '~/components/Grid';
import { EmployeeCard } from '../../components/EmployeeCard';
import { filterButtonStyles } from '~/components/Button/Button';
import { addButtonStyles } from '~/components/Button/Button';
import { api } from '~/utils/api';
import { type ChangeEvent, useState } from 'react';
import { makeCompareEmployees } from '~/utils/compare';
import { EmployeeFilter } from '~/components/EmployeeFilter';
import type { EmployeeFilterParams } from '~/types/EmployeeFilterParams';
import { filterEmployees } from '~/utils/filterEmployees';

const Employees: NextPage = () => {
	const router = useRouter();
	const {
		data: employees,
		isLoading,
		error,
		refetch,
	} = api.employee.getAll.useQuery();
	const { t } = useTranslation('employees');
	const [searchInput, setSearchInput] = useState<string>('');
	const [showFilter, setShowFilter] = useState<boolean>(false);
	const [filterParams, setFilterParams] = useState<EmployeeFilterParams>({
		startAge: 0,
		endAge: 100,
		hireDateSince: new Date('2010'),
		managersOnly: false,
	});

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	employees.sort(makeCompareEmployees(searchInput));

	const filtered = showFilter
		? filterEmployees(filterParams, employees)
		: employees;

	const handleFilterParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.type === 'checkbox') {
			setFilterParams((prev) => ({
				...prev,
				[e.target.name]: e.target.checked,
			}));
		} else if (e.target.type === 'date') {
			setFilterParams((prev) => ({
				...prev,
				[e.target.name]: new Date(e.target.value),
			}));
		} else {
			setFilterParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
		}
	};

	return (
		<>
			<h2>{t('employees')}</h2>
			<SearchBar
				isDarkBackground={false}
				placeholder={`${t('search-employees')}`}
				searchInput={searchInput}
				setSearchInput={setSearchInput}
			/>
			<div className={styles.buttons}>
				<Button
					customStyles={filterButtonStyles}
					onClick={() => setShowFilter((prev) => !prev)}
				>
					{t('filter')}
				</Button>
				<Button
					customStyles={addButtonStyles}
					onClick={() => {
						void router.push('/employees/new-employee');
					}}
				>
					+ {t('add')}
				</Button>
			</div>
			<EmployeeFilter
				expanded={showFilter}
				filterParams={filterParams}
				handleChange={handleFilterParamsChange}
			/>
			<Grid cellMinWidth={250}>
				{employees.length === 0 ? (
					<div>{t('no-employees')}</div>
				) : (
					filtered.map((employee) => (
						<EmployeeCard
							key={employee.id}
							{...employee}
							refetch={() => void refetch()}
						/>
					))
				)}
			</Grid>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', [
				'common',
				'employees',
			])),
		},
	};
};

export default Employees;
