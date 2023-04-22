import styles from './NavLink.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function defineCurrentLink(pathname: string, link: string): boolean {
	if (link === '/') {
		return pathname === link;
	}

	return pathname.startsWith(link);
}

type NavLinkProps = {
	title: string;
	href: string;
	onClick: () => void;
};

export const NavLink = ({ href, title, onClick }: NavLinkProps) => {
	const router = useRouter();

	return (
		<li className={styles.navLink}>
			<Link
				href={href}
				className={
					defineCurrentLink(router.pathname, href) ? styles.current : ''
				}
				onClick={onClick}
			>
				<span>{title}</span>
			</Link>
		</li>
	);
};
