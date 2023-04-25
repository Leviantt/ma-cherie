import styles from './DeleteIcon.module.css';

type DeleteIconProps = {
	onClick: () => void;
	isActive: boolean;
};
// [styles.navMenu, styles.active].join(' ') : styles.navMenu
export const DeleteIcon = ({ isActive, onClick }: DeleteIconProps) => {
	return (
		<div
			className={
				isActive ? styles.delete : [styles.delete, styles.active].join(' ')
			}
			onClick={isActive ? onClick : undefined}
		>
			{/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
				<path
					fill='currentColor'
					fillRule='evenodd'
					d='M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z'
					clipRule='evenodd'
				/>
			</svg> */}
			<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
				<path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z' />
			</svg>
		</div>
	);
};
