import { useRef, type ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './EmployeeFilter.module.css';
import type { EmployeeFilterParams } from '~/types/EmployeeFilterParams';
import { convertDateForValue } from '~/utils/date';
import { Grid } from '../Grid';

type EmployeeFilterProps = {
	expanded: boolean;
	filterParams: EmployeeFilterParams;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EmployeeFilter = ({
	expanded,
	filterParams: fp,
	handleChange,
}: EmployeeFilterProps) => {
	const { t } = useTranslation('employees');
	const hireDateSinceRef = useRef<HTMLInputElement>(null);
	const showDatePicker = () => {
		hireDateSinceRef.current?.showPicker();
	};

	return (
		<div
			className={
				expanded
					? [styles.expander, styles.expanded].join(' ')
					: styles.expander
			}
		>
			<div className={styles.expanderContent}>
				<Grid>
					<div>
						<div onClick={showDatePicker} className={styles.dateContainer}>
							{t('hire-date-since') +
								' ' +
								convertDateForValue(fp.hireDateSince).split('-').join('.')}
							<input
								className={styles.date}
								ref={hireDateSinceRef}
								type='date'
								value={convertDateForValue(fp.hireDateSince)}
								onChange={handleChange}
								name='hireDateSince'
							/>
						</div>
						<div className={styles.checkboxContainer}>
							{t('managers-only')}
							<input
								type='checkbox'
								checked={fp.managersOnly}
								placeholder={`${t('managers-only')}`}
								onChange={handleChange}
								className={styles.checkbox}
								name='managersOnly'
							/>
						</div>
					</div>
					<div className={styles.age}>
						<h3>{t('age')}</h3>
						<div className={styles.ageContainer}>
							<label>{t('from')}</label>
							<input
								type='number'
								step={1}
								min={0}
								value={fp.startAge.toString()}
								placeholder={`${t('from')}`}
								onChange={handleChange}
								name='startAge'
							/>
						</div>

						<div className={styles.ageContainer}>
							<label>{t('until')}</label>
							<input
								type='number'
								step={1}
								min={0}
								value={fp.endAge.toString()}
								placeholder={`${t('until')}`}
								onChange={handleChange}
								name='endAge'
							/>
						</div>
					</div>
				</Grid>
			</div>
		</div>
	);
};
