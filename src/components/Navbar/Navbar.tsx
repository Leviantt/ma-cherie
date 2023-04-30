import { useState } from 'react';

import styles from './Navbar.module.css';
import { Logo } from '../Logo/';
import { MenuIcon } from '../MenuIcon';
import { NavLink } from '../NavLink';

const navItems = [
	{
		id: 1,
		href: '/',
		title: 'Главная',
	},
	{
		id: 2,
		href: '/employees',
		title: 'Сотрудники',
	},
	{
		id: 3,
		href: '/requests',
		title: 'Заявки',
	},
	{
		id: 4,
		href: '/clients',
		title: 'Клиенты',
	},
	{
		id: 5,
		href: '/orders',
		title: 'Заказы',
	},
	{
		id: 6,
		href: '/desserts',
		title: 'Десерты',
	},
	{
		id: 7,
		href: '/settings',
		title: 'Настройки',
	},
];

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

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
