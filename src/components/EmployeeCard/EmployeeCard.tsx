import Image from 'next/image';
import Link from 'next/link';
import type { Employee } from '@prisma/client';

import styles from './EmployeeCard.module.css';
import { Button } from '../Button';
import { DotsIcon } from '../DotsIcon';
import { employeeButtonStyles } from '../Button/Button';

export const EmployeeCard = ({
	phone,
	email,
	workEmail,
	fullName,
	id,
	pathToAvatarPhoto,
}: Employee) => {
	return (
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
				<DotsIcon />
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Телефон</label>
				<p>{phone}</p>
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Почта</label>
				<p>{email}</p>
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Рабочая почта</label>
				<p>{workEmail}</p>
			</div>
			<Link href={`/employees/${id}`}>
				<Button customStyles={employeeButtonStyles}>Подробнее</Button>
			</Link>
		</div>
	);
};
