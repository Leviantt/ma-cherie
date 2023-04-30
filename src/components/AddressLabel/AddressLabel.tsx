import styles from './AddressLable.module.css';

type AddressLabelProps = {
	title: string;
	isCurrent?: boolean;
};

export const AddressLabel = ({ title, isCurrent }: AddressLabelProps) => {
	return (
		<label
			className={
				isCurrent ? [styles.label, styles.current].join(' ') : styles.label
			}
		>
			{title}
		</label>
	);
};
