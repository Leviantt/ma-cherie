import styles from './EditIcon.module.css';

type EditIconProps = {
	onClick: () => void;
	isActive: boolean;
};
// [styles.navMenu, styles.active].join(' ') : styles.navMenu
export const EditIcon = ({ isActive, onClick }: EditIconProps) => {
	return (
		<div
			className={
				isActive ? styles.edit : [styles.edit, styles.active].join(' ')
			}
			onClick={onClick}
		>
			{/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
				<path
					fill='currentColor'
					fillRule='evenodd'
					d='M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z'
					clipRule='evenodd'
				/>
			</svg> */}
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
				<path
					fill='currentColor'
					fillRule='evenodd'
					d='M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z'
					clipRule='evenodd'
				/>
			</svg>
		</div>
	);
};
