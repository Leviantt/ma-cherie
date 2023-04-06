import styles from './AddressLable.module.css';

type AddressLabelProps = {
	title: string;
};

export const AddressLabel = ({ title }: AddressLabelProps) => {
	return <label className={styles.label}>{title}</label>;
};
