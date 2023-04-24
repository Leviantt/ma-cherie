import Image from 'next/image';
import { useState } from 'react';

import type { Employee as EmployeeType } from '@prisma/client';
import styles from './Employee.module.css';
import { EditIcon } from '~/components/EditIcon';
import { Button } from '~/components/Button';
import { basicButtonStyles } from '~/components/Button/Button';
import { api } from '~/utils/api';

export const Employee = (employee: Partial<EmployeeType>) => {
	const [isEditable, setIsEditable] = useState<boolean>(true);
	/*
fullName: string;
    phone: string;
    email: string;
    workEmail: string;
    pathToAvatarPhoto: string;
    position: string;
    age: number;
    hireDate: Date;
*/
	const [fullName, setFullName] = useState(employee.fullName);
	const [phone, setPhone] = useState(employee.phone);
	const [email, setEmail] = useState(employee.email);
	const [workEmail, setWorkEmail] = useState(employee.workEmail);
	const [pathToAvatarPhoto, setPathToAvatarPhoto] = useState(
		employee.pathToAvatarPhoto
	);
	const [position, setPosition] = useState(employee.position);
	const [age, setAge] = useState(employee.age);
	const [hireDate, setHireDate] = useState(employee.hireDate);

	console.log(pathToAvatarPhoto);

	const save = () => {
		if (employee.id) {
		}
	};
	return (
		<div className={styles.employeeProfile}>
			<EditIcon
				isActive={isEditable}
				onClick={() => setIsEditable((prev) => !prev)}
			/>
			<div className={styles.avatarWrapper}>
				<Image
					alt='employee avatar'
					className={styles.avatar}
					src={pathToAvatarPhoto ?? ''}
					width={300}
					height={300}
					unoptimized={true}
				/>
				<input type='file' disabled={!isEditable} />
			</div>
			<div className={styles.employeeInfo}>
				<div className={styles.infoGroup}>
					<label>Имя</label>
					<input
						disabled={!isEditable}
						type='text'
						value={fullName ?? ''}
						placeholder='Имя'
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Телефон</label>
					<input
						disabled={!isEditable}
						type='text'
						value={phone ?? ''}
						placeholder='Телефон'
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Почта</label>
					<input
						disabled={!isEditable}
						type='text'
						value={email ?? ''}
						placeholder='Почта'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Рабочая почта</label>
					<input
						disabled={!isEditable}
						type='text'
						value={workEmail ?? ''}
						placeholder='Рабочая почта'
						onChange={(e) => setWorkEmail(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Должность</label>
					<input
						disabled={!isEditable}
						type='text'
						value={position ?? ''}
						placeholder='Должность'
						onChange={(e) => setPosition(e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Возраст</label>
					<input
						disabled={!isEditable}
						type='number'
						step={1}
						value={age ?? ''}
						placeholder='Возраст'
						onChange={(e) => setAge(+e.target.value)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Дата устройства в компанию</label>
					<input
						disabled={!isEditable}
						type='date'
						value={hireDate?.toDateString() ?? new Date().toDateString()}
						placeholder='Дата устройства'
						onChange={(e) => setHireDate(new Date(e.target.value))}
					/>
				</div>
				<br />
				<Button customStyles={basicButtonStyles}>Сохранить</Button>
			</div>
		</div>
	);
};
