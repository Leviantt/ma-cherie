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
						>
							<span>Главная</span>
						</Link>
					</li>
					<li key='2' className={styles.navText}>
						<Link
							href='/employees'
							className={router.pathname === '/employees' ? styles.current : ''}
						>
							<span>Сотрудники</span>
						</Link>
					</li>
					<li key='3' className={styles.navText}>
						<Link
							href='/statistics'
							className={
								router.pathname === '/statistics' ? styles.current : ''
							}
						>
							<span>Статистика</span>
						</Link>
					</li>
					<li key='4' className={styles.navText}>
						<Link
							href='/requests'
							className={router.pathname === '/requests' ? styles.current : ''}
						>
							<span>Заявки</span>
						</Link>
					</li>
					<li key='5' className={styles.navText}>
						<Link
							href='/clients'
							className={router.pathname === '/clients' ? styles.current : ''}
						>
							<span>Клиенты</span>
						</Link>
					</li>
					<li key='6' className={styles.navText}>
						<Link
							href='/orders'
							className={router.pathname === '/orders' ? styles.current : ''}
						>
							<span>Заказы</span>
						</Link>
					</li>
					<li key='7' className={styles.navText}>
						<Link
							href='/settings'
							className={router.pathname === '/settings' ? styles.current : ''}
						>
							<span>Настройки</span>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};
