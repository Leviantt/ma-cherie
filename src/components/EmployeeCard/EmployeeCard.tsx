import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './EmployeeCard.module.css';
import type { Employee } from '@prisma/client';
import { Button } from '../Button';
import { DotsIcon } from '../DotsIcon';
import { employeeButtonStyles } from '../Button/Button';
import { ModalConfirm } from '../ModalConfirm';
import { useDeleteEmployee } from '~/hooks/employee/useDeleteEmployee';

export const EmployeeCard = ({
	phone,
	email,
	workEmail,
	fullName,
	id,
	pathToAvatarPhoto,
	refetch,
}: Employee & { refetch: () => void }) => {
	const { t } = useTranslation('employees');
	const [isModalConfirmOpen, setIsModalConfirmOpen] = useState<boolean>(false);
	const router = useRouter();
	const deleteEmployee = useDeleteEmployee(refetch);

	const update = () => {
		void router.push(`/employees/${id}`);
	};

	return (
		<>
			<ModalConfirm
				isOpen={isModalConfirmOpen}
				closeModal={() => setIsModalConfirmOpen(false)}
				title={`${t('delete-employee')}`}
				action={() => {
					setIsModalConfirmOpen(false);
					deleteEmployee.mutate({ id });
				}}
			/>

			<div className={styles.card}>
				<div className={styles.heading}>
					<Image
						alt='employee avatar'
						className={styles.avatar}
						src={pathToAvatarPhoto}
						width={70}
						height={70}
					/>
					<div className={styles.identity}>
						<h4>{fullName}</h4>
						<p>id {id}</p>
					</div>
					<DotsIcon
						update={update}
						remove={() => setIsModalConfirmOpen(true)}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label htmlFor=''>{t('phone')}</label>
					<p>{phone}</p>
				</div>
				<div className={styles.infoGroup}>
					<label htmlFor=''>{t('email')}</label>
					<p>{email}</p>
				</div>
				<div className={styles.infoGroup}>
					<label htmlFor=''>{t('work-email')}</label>
					<p>{workEmail}</p>
				</div>
				<Link href={`/employees/${id}`}>
					<Button customStyles={employeeButtonStyles}>{t('detailed')}</Button>
				</Link>
			</div>
		</>
	);
};
