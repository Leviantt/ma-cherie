import type { GetServerSideProps, NextPage } from 'next';

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
import { ModalConfirm } from '~/components/ModalConfirm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Employees: NextPage = () => {
	const router = useRouter();
	const { data: employees, isLoading, error } = api.employee.getAll.useQuery();
	const { t } = useTranslation('employees');
	const [searchInput, setSearchInput] = useState<string>('');

	if (isLoading) return <div>{t('loading')}</div>;

	if (error) {
		console.log(error);
		return <div>{t('error')}</div>;
	}

	employees.sort(makeCompareEmployees(searchInput));

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
				<Button customStyles={filterButtonStyles}>{t('filter')}</Button>
				<Button
					customStyles={addButtonStyles}
					onClick={() => {
						void router.push('/employees/new-employee');
					}}
				>
					+ {t('add')}
				</Button>
			</div>
			<Grid cellMinWidth={250}>
				{employees.length === 0 ? (
					<div>{t('no-employees')}</div>
				) : (
					employees.map((employee) => (
						<EmployeeCard key={employee.id} {...employee} />
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
