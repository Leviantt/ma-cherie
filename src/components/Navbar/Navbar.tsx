import { useState } from 'react';

import styles from './Navbar.module.css';
import { Logo } from '../Logo/';
import { MenuIcon } from '../MenuIcon';
import { NavLink } from '../NavLink';
import { useNavItems } from './useNavItems';

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navItems = useNavItems();
	const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

	return (
		<>
			<MenuIcon toggleSidebar={toggle} isSidebarOpen={isOpen} />
			<nav
				className={
					isOpen ? [styles.navMenu, styles.active].join(' ') : styles.navMenu
				}
			>
				<Logo />
				<ul className={styles.navMenuItems}>
					{navItems.map((navItem) => (
						<NavLink key={navItem.id} {...navItem} onClick={toggle} />
					))}
				</ul>
			</nav>
		</>
	);
};
