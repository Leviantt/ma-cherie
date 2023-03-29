import Image from 'next/image';

import { Button } from '../Button';
import type { CustomStyles } from '../Button/Button';
import styles from './EmployeeCard.module.css';
import { DotsIcon } from '../DotsIcon';

type EmployeeCardProps = {
	phoneNumber: string;
	email: string;
	workEmail: string;
	fullName: string;
	id: string;
	image: string;
};

export const EmployeeCard = ({
	phoneNumber,
	email,
	workEmail,
	fullName,
	id,
	image,
}: EmployeeCardProps) => {
	const buttonCustomStyles: CustomStyles = {
		backgroundColor: '#FDFBFB',
		color: '#000',
	};
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				<Image alt='employee avatar' className={styles.avatar} src={image} width={90} height={90} />
				<div className={styles.identity}>
					<h4>{fullName}</h4>
					<p>id {id}</p>
				</div>
				<DotsIcon />
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Телефон</label>
				<p>{phoneNumber}</p>
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Почта</label>
				<p>{email}</p>
			</div>
			<div className={styles.infoGroup}>
				<label htmlFor=''>Рабочая почта</label>
				<p>{workEmail}</p>
			</div>
			<Button customStyles={buttonCustomStyles}>Подробнее</Button>
		</div>
	);
};
