import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import type { Employee as EmployeeType } from '@prisma/client';
import styles from './Employee.module.css';
import { EditIcon } from '~/components/EditIcon';
import { Button } from '~/components/Button';
import { basicButtonStyles } from '~/components/Button/Button';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { z } from 'zod';
import { v4 } from 'uuid';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { TRPCClientErrorBase } from '@trpc/client';
import { DefaultErrorShape } from '@trpc/server';

export const Employee = (employee: Partial<EmployeeType>) => {
	const [isEditable, setIsEditable] = useState<boolean>(
		typeof employee.id !== 'number'
	);

	const [fullName, setFullName] = useState(employee.fullName);
	const [phone, setPhone] = useState(employee.phone);
	const [email, setEmail] = useState(employee.email);
	const [workEmail, setWorkEmail] = useState(employee.workEmail);
	const [position, setPosition] = useState(employee.position);
	const [age, setAge] = useState(employee.age);
	const [hireDate, setHireDate] = useState(employee.hireDate ?? new Date());

	const router = useRouter();

	const [avatar, setAvatar] = useState<File | undefined>();
	const [avatarURL, setAvatarURL] = useState<string | null>(null);

	const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.files && event.currentTarget.files[0]) {
			if (!event.target.files) return;

			const file = event.target.files[0];

			setAvatar(file);
			setAvatarURL(URL.createObjectURL(file as Blob));
		}
	};

	const uploadToServer = async (pathToAvatarPhoto: string) => {
		const body = new FormData();
		if (avatar) {
		}
		body.append('file', avatar!);
		body.append('filepath', pathToAvatarPhoto);
		await fetch('/api/upload-image', {
			method: 'POST',
			body,
		});
	};

	const createEmployee = api.employee.create.useMutation({
		onSuccess: (emp: EmployeeType) => {
			toast.success("Сотрудник успешно добавлен.");
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось добавить сотрудника.');
		},
	});

	const updateEmployee = api.employee.update.useMutation({
		onSuccess: (emp: EmployeeType) => {
			toast.success("Данные сотрудника успешно обновлены.");
			void router.push(`/employees/${emp.id}`);
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось обновить данные сотрудника.');
		},
	});

	const deleteEmployee = api.employee.delete.useMutation({
		onSuccess: () => {
			toast.success("Сотрудник успешно удален.");
			void router.push('/employees');
		},
		onError: (error: TRPCClientErrorBase<DefaultErrorShape>) => {
			console.log(error);
			toast.error('Ошибка. Не удалось удалить сотрудника.');
		},
	});

	const save = async () => {
		const newValues = {
			fullName,
			phone,
			email,
			pathToAvatarPhoto: '/images/default.jpg',
			workEmail,
			position,
			age,
			hireDate,
		};
		if (avatar) {
			newValues.pathToAvatarPhoto = `/images/${v4()}.jpg`;
			await uploadToServer(newValues.pathToAvatarPhoto);
		}

		if (employee.id) {
			updateEmployee.mutate({
				id: employee.id,
				...newValues,
			});
		} else {
			try {
				const validated = z
					.object({
						fullName: z.string(),
						phone: z
							.string()
							.regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/),
						email: z.string().email(),
						workEmail: z.string().email(),
						pathToAvatarPhoto: z.string(),
						position: z.string(),
						age: z.number().int(),
						hireDate: z.date(),
					})
					.parse(newValues);
				createEmployee.mutate({
					...validated,
				});
			} catch (error) {
				console.log(error);
				toast.error('Ошибка. Поля заполнены некорректно.');
			}
		}
	};

	return (
		<div className={styles.employeeProfile}>
			<EditIcon
				isActive={isEditable}
				onClick={() => setIsEditable((prev) => !prev)}
			/>
			{typeof employee.id === 'number' && (
				<DeleteIcon
					isActive={isEditable}
					onClick={() => deleteEmployee.mutate({ id: employee.id! })}
				/>
			)}
			<div className={styles.avatarWrapper}>
				<div
					className={styles.avatar}
					style={{
						backgroundImage: `url(${
							avatarURL ?? employee.pathToAvatarPhoto ?? ''
						}`,
					}}
				></div>
				<input
					type='file'
					disabled={!isEditable}
					className={!isEditable ? styles.disabled : ''}
					onChange={uploadToClient}
				/>
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
						value={hireDate.toISOString().substring(0, 10)}
						placeholder='Дата устройства'
						onChange={(e) => setHireDate(new Date(e.target.value))}
					/>
				</div>
				<br />
				<Button customStyles={basicButtonStyles} onClick={() => save()}>
					Сохранить
				</Button>
			</div>
		</div>
	);
};
