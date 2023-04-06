import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './Navbar.module.css';
import { Logo } from '../Logo/';
import { MenuIcon } from '../MenuIcon';

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const router = useRouter();
	console.log(router.pathname);

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
					<li key='1' className={styles.navText}>
						<Link
							href='/'
							className={router.pathname === '/' ? styles.current : ''}
							onClick={toggle}
						>
							<span>Главная</span>
						</Link>
					</li>
					<li key='2' className={styles.navText}>
						<Link
							href='/employees'
							className={
								router.pathname.startsWith('/employees') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Сотрудники</span>
						</Link>
					</li>
					<li key='3' className={styles.navText}>
						<Link
							href='/statistics'
							className={
								router.pathname.startsWith('/statistics') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Статистика</span>
						</Link>
					</li>
					<li key='4' className={styles.navText}>
						<Link
							href='/requests'
							className={
								router.pathname.startsWith('/requests') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Заявки</span>
						</Link>
					</li>
					<li key='5' className={styles.navText}>
						<Link
							href='/clients'
							className={
								router.pathname.startsWith('/clients') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Клиенты</span>
						</Link>
					</li>
					<li key='6' className={styles.navText}>
						<Link
							href='/orders'
							className={
								router.pathname.startsWith('/orders') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Заказы</span>
						</Link>
					</li>
					<li key='7' className={styles.navText}>
						<Link
							href='/settings'
							className={
								router.pathname.startsWith('/settings') ? styles.current : ''
							}
							onClick={toggle}
						>
							<span>Настройки</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
