import styles from './CartDessert.module.css';
import type { Dessert } from '@prisma/client';
import { PlusCrossIcon } from '../PlusCrossIcon';
import { useTranslation } from 'next-i18next';

type CartDessertProps = Dessert & {
	number?: number;
	add?: () => void;
	increment?: () => void;
	decrement?: () => void;
	remove?: () => void;
	disabled?: boolean;
};

export const CartDessert = ({
	add,
	increment,
	decrement,
	remove,
	number,
	name,
	price,
	description,
	disabled,
}: CartDessertProps) => {
	const { t } = useTranslation('orders');
	return (
		<div className={styles.container}>
			<div
				className={
					typeof number === 'number'
						? styles.details
						: [styles.details, styles.notAdded].join(' ')
				}
			>
				<h3>{name}</h3>
				<p className={styles.price}>{t('price')}: {+price}₽</p>
				{number && (
					<>
						<div className={styles.count}>
							<p>
								{t('amount')}: {number}
								{!disabled && (
									<>
										<button onClick={decrement}>-</button>
										<button onClick={increment}>+</button>
									</>
								)}
							</p>
						</div>
						<p className={styles.total}>{t('total')}: {number * +price}₽</p>
					</>
				)}
				<p className={styles.description}>{description}</p>
			</div>
			<PlusCrossIcon
				isAdded={typeof number === 'number'}
				onCrossClick={remove}
				onPlusClick={add}
				isHidden={disabled}
			/>
		</div>
	);
};
