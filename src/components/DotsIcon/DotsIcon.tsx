import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import styles from './DotsIcon.module.css';

type DotsIconProps = {
	update: () => void;
	remove: () => void;
};

export const DotsIcon = ({ update, remove }: DotsIconProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dotsRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation('employees');
	const className = isOpen
		? [styles.dropdownContainer, styles.open].join(' ')
		: styles.dropdownContainer;

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (!dotsRef.current) {
				return;
			}
			if (!dotsRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		// `true` will enable the `capture` phase of event handling by browser
		document.addEventListener('click', handler, true);
		return () => {
			document.removeEventListener('click', handler);
		};
	}, []);

	return (
		<div
			className={className}
			onClick={() => setIsOpen((prev) => !prev)}
			ref={dotsRef}
		>
			<div className={styles.status}>
				<div className={[styles.dots, className].join(' ')}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='currentColor'
						viewBox='0 0 16 16'
					>
						<path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
					</svg>
				</div>
			</div>
			<ul className={styles.dropdown}>
				<li className={styles.update} onClick={update} key={1}>
					{t('update')}
				</li>
				<li className={styles.delete} onClick={remove} key={2}>
					{t('delete')}
				</li>
			</ul>
		</div>
	);
};

// 	return (
// 		<div className={[styles.dots, className].join(' ')}>
// 			<svg
// 				xmlns='http://www.w3.org/2000/svg'
// 				fill='currentColor'
// 				viewBox='0 0 16 16'
// 				onClick={() => setIsOpen((prev) => !prev)}
// 			>
// 				<path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
// 			</svg>
// 		</div>
// 	);
// };
