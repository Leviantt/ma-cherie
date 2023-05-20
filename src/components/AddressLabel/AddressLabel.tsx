import styles from './AddressLabel.module.css';

type AddressLabelProps = {
	title: string;
	isCurrent?: boolean;
	onClick?: () => void;
};

export const AddressLabel = ({
	title,
	isCurrent,
	onClick,
}: AddressLabelProps) => {
	return (
		<label
			className={
				isCurrent ? [styles.label, styles.current].join(' ') : styles.label
			}
			onClick={onClick}
		>
			{title}
		</label>
	);
};
