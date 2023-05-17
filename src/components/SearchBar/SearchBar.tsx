import styles from './SearchBar.module.css';
type SearchBarProps = {
	placeholder: string;
	isDarkBackground?: boolean;
	searchInput: string;
	setSearchInput: (newSearchInput: string) => void;
};

export const SearchBar = ({
	placeholder,
	isDarkBackground,
	searchInput,
	setSearchInput,
}: SearchBarProps) => {
	return (
		<input
			value={searchInput}
			onChange={(e) => setSearchInput(e.target.value)}
			type='text'
			placeholder={placeholder}
			className={styles.searchBar}
			style={{ backgroundColor: isDarkBackground ? '#a2c1b2' : '#cadcd3' }}
		/>
	);
};
