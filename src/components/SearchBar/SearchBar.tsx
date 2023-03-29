import styles from './SearchBar.module.css';
type SearchBarProps = {
	placeholder: string;
	isDarkBackground: boolean;
};

export const SearchBar = ({
	placeholder,
	isDarkBackground,
}: SearchBarProps) => {
	return (
		<input
			type='text'
			placeholder={placeholder}
			className={styles.searchBar}
			style={{ backgroundColor: isDarkBackground ? '#a2c1b2' : '#cadcd3' }}
		/>
	);
};
