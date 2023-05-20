import { useState } from 'react';
import { toast } from 'react-hot-toast';
import type { Employee as EmployeeType } from '@prisma/client';
import { z } from 'zod';
import { v4 } from 'uuid';
import { useTranslation } from 'next-i18next';

import styles from './Employee.module.css';
import { EditIcon } from '~/components/EditIcon';
import { Button } from '~/components/Button';
import { basicButtonStyles } from '~/components/Button/Button';
import { DeleteIcon } from '../DeleteIcon/DeleteIcon';
import { ModalConfirm } from '../ModalConfirm';
import { uploadToClient, uploadToServer } from '~/utils/uploadAvatar';
import { useCreateEmployee } from '~/hooks/employee/useCreateEmployee';
import { useUpdateEmployee } from '~/hooks/employee/useUpdateEmployee';
import { useDeleteEmployee } from '~/hooks/employee/useDeleteEmployee';
import type { NewEmployeeData } from '~/types/NewEmployeeData';

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

	const [avatar, setAvatar] = useState<File | undefined>();
	const [avatarURL, setAvatarURL] = useState<string | null>(null);
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);

	const createEmployee = useCreateEmployee();
	const updateEmployee = useUpdateEmployee();
	const deleteEmployee = useDeleteEmployee();

	const { t } = useTranslation('employees');
	const save = async () => {
		const newValues: NewEmployeeData = {
			fullName,
			phone,
			email,
			workEmail,
			position,
			age,
			hireDate,
		};
		if (avatar) {
			newValues.pathToAvatarPhoto = `/images/${v4()}.jpg`;
			await uploadToServer(newValues.pathToAvatarPhoto, avatar);
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
						pathToAvatarPhoto: z.string().optional(),
						position: z.string(),
						age: z.number().int().nonnegative(),
						hireDate: z.date(),
					})
					.parse(newValues);
				createEmployee.mutate({
					pathToAvatarPhoto: '/images/default.jpg',
					...validated,
				});
			} catch (error) {
				console.log(error);
				toast.error('Ошибка. Поля заполнены некорректно.');
			}
		}
	};

	return (
		<>
			<div className={styles.employeeProfile}>
				<EditIcon
					isActive={isEditable}
					onClick={() => setIsEditable((prev) => !prev)}
				/>
				{typeof employee.id === 'number' && (
					<>
						<ModalConfirm
							isOpen={isModalConfirmOpen}
							closeModal={() => setIsModalConfirmOpen(false)}
							title={`${t('delete-employee')}`}
							action={() => deleteEmployee.mutate({ id: employee.id! })}
						/>
						<DeleteIcon
							isActive={isEditable}
							onClick={() => setIsModalConfirmOpen(true)}
						/>
					</>
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
						accept='image/*'
						disabled={!isEditable}
						className={!isEditable ? styles.disabled : ''}
						onChange={(e) => uploadToClient(e, setAvatar, setAvatarURL)}
					/>
				</div>
				<div className={styles.employeeInfo}>
					<div className={styles.infoGroup}>
						<label>{t('name')}</label>
						<input
							disabled={!isEditable}
							type='text'
							value={fullName ?? ''}
							placeholder={`${t('name')}`}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('phone')}</label>
						<input
							disabled={!isEditable}
							type='text'
							value={phone ?? ''}
							placeholder={`${t('phone')}`}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('email')}</label>
						<input
							disabled={!isEditable}
							type='text'
							value={email ?? ''}
							placeholder={`${t('email')}`}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('work-email')}</label>
						<input
							disabled={!isEditable}
							type='text'
							value={workEmail ?? ''}
							placeholder={`${t('work-email')}`}
							onChange={(e) => setWorkEmail(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('position')}</label>
						<input
							disabled={!isEditable}
							type='text'
							value={position ?? ''}
							placeholder={`${t('position')}`}
							onChange={(e) => setPosition(e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('age')}</label>
						<input
							disabled={!isEditable}
							type='number'
							step={1}
							min={0}
							value={age?.toString() ?? ''}
							placeholder={`${t('age')}`}
							onChange={(e) => setAge(+e.target.value)}
						/>
					</div>
					<div className={styles.infoGroup}>
						<label>{t('hire-date')}</label>
						<input
							disabled={!isEditable}
							type='date'
							value={hireDate.toISOString().substring(0, 10)}
							placeholder={`${t('hire-date')}`}
							onChange={(e) => setHireDate(new Date(e.target.value))}
						/>
					</div>
					<br />
					<Button customStyles={basicButtonStyles} onClick={() => save()}>
						{t('save')}
					</Button>
				</div>
			</div>
		</>
	);
};
