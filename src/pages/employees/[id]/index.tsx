import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { Employee } from '~/components/Employee';

function DetailedEmployee() {
	const router = useRouter();
	const id = +(router.query.id ?? 0);
	const {
		data: employee,
		isLoading,
		isError,
	} = api.employee.getOne.useQuery({ id });

	if (isLoading) return <div>Loading...</div>;

	if (isError) return <div>Something went wrong.</div>;

	if (!employee) return <div>Not Found</div>;

	return <Employee {...employee} />;
}

export default DetailedEmployee;
/*
<div className={styles.employeeProfile}>
			<EditIcon
				isActive={isEditable}
				onClick={() => setIsEditable((prev) => !prev)}
			/>
			<div className={styles.avatarWrapper}>
				<Image
					alt='employee avatar'
					className={styles.avatar}
					src={'/images/employee1.jpg'}
					width={300}
					height={300}
					unoptimized={true}
				/>
				<input type='file' disabled={!isEditable} />
			</div>
			<div className={styles.employeeInfo}>
				<div className={styles.infoGroup}>
					<label>Имя</label>
					<input disabled={!isEditable} type='text' value={'Соловьева Нина'} />
				</div>
				<div className={styles.infoGroup}>
					<label>Телефон</label>
					<input disabled={!isEditable} type='text' value={'89377020830'} />
				</div>
				<div className={styles.infoGroup}>
					<label>Почта</label>
					<input
						disabled={!isEditable}
						type='text'
						value={'directormacherie@mail.ru'}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Рабочая почта</label>
					<input
						disabled={!isEditable}
						type='text'
						value={'financemacherie@tut.by'}
					/>
				</div>
				<div className={styles.infoGroup}>
					<label>Должность</label>
					<input disabled={!isEditable} type='text' value={'Управляющий'} />
				</div>
				<div className={styles.infoGroup}>
					<label>Возраст</label>
					<input disabled={!isEditable} type='number' step={1} value={25} />
				</div>
				<div className={styles.infoGroup}>
					<label>Дата устройства в компанию</label>
					<input disabled={!isEditable} type='date' />
				</div>
				<br />
				<Button customStyles={basicButtonStyles}>Сохранить</Button>
			</div>
		</div>
*/
