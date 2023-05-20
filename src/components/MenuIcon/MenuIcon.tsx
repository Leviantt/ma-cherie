import React from 'react';

import styles from './MenuIcon.module.css';

type MenuIconProps = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

export const MenuIcon = ({ toggleSidebar, isSidebarOpen }: MenuIconProps) => {
	return (
		<label
			className={
				isSidebarOpen
					? [styles.hamburgerMenu, styles.open].join(' ')
					: styles.hamburgerMenu
			}
		>
			<input type='checkbox' onClick={toggleSidebar} />
		</label>
	);
};
