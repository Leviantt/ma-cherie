import type { NextPage } from 'next';

import styles from './employees.module.css';
import { SearchBar } from '~/components/SearchBar';
import { Button } from '~/components/Button';
import { Grid } from '~/components/Grid';
import { EmployeeCard } from '../../components/EmployeeCard';
import { filterButtonStyles } from '~/components/Button/Button';
import { addButtonStyles } from '~/components/Button/Button';

interface Employee {
	phoneNumber: string;
	email: string;
	workEmail: string;
	fullName: string;
	id: string;
	image: string;
}

const MOCK_EMPLOYEES: Employee[] = [
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288281',
		image: '/images/employee1.jpg',
	},
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288282',
		image: '/images/employee2.jpg',
	},
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288283',
		image: '/images/employee3.jpg',
	},
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288284',
		image: '/images/employee4.jpg',
	},
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288285',
		image: '/images/employee5.jpg',
	},
	{
		phoneNumber: '89377020830',
		email: 'directormacherie@mail.ru',
		workEmail: 'financemacherie@tut.by',
		fullName: 'Соловьева Нина',
		id: '8288286',
		image: '/images/employee6.jpg',
	},
];

const Employees: NextPage = () => {
	return (
		<>
			<h2>Сотрудники</h2>
			<SearchBar isDarkBackground={false} placeholder='Поиск сотрудников' />
			<div className={styles.buttons}>
				<Button customStyles={filterButtonStyles}>Фильтр</Button>
				<Button customStyles={addButtonStyles}>+ Добавить сотрудника</Button>
			</div>
			<Grid cellMinWidth={250}>
				{MOCK_EMPLOYEES.map((employee) => (
					<EmployeeCard key={employee.id} {...employee} />
				))}
			</Grid>
		</>
	);
};

export default Employees;
