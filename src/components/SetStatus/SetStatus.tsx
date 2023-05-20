import { useTranslation } from 'next-i18next';
import { useState, type ReactElement, useRef, useEffect } from 'react';

import styles from './SetStatus.module.css';
import { Status } from '@prisma/client';
import { useCancelOrder } from '~/hooks/order/useCancelOrder';
import { useChangeStatusToAtWorkOrder } from '~/hooks/order/useChangeStatusToAtWorkOrder';
import { useCompleteOrder } from '~/hooks/order/useCompleteOrder';
import { useChangeStatusToAtDeliveryOrder } from '~/hooks/order/useChangeStatusToAtDeliveryOrder';
import { getColorByStatus } from '~/utils/status';

type StatusProps = {
	status: Status;
	refetch: () => void;
	orderId: number;
};

export const SetStatus = ({ status, refetch, orderId }: StatusProps) => {
	const changeStatusToAtWork = useChangeStatusToAtWorkOrder(refetch);
	const changeStatusToAtDelivery = useChangeStatusToAtDeliveryOrder(refetch);
	const cancel = useCancelOrder(refetch);
	const complete = useCompleteOrder(refetch);

	const [isOpen, setIsOpen] = useState(false);

	const statuses: ReactElement[] = [];
	const { t } = useTranslation('orders');
	const statusRef = useRef<HTMLDivElement>(null);
	if (status === Status.NEW) {
		statuses.push(
			<li
				style={{ color: getColorByStatus(Status.AT_WORK) }}
				className={styles.status}
				onClick={() => changeStatusToAtWork.mutate({ id: orderId })}
				key={Status.AT_WORK}
			>
				{t('TO_' + Status.AT_WORK)}
			</li>,
			<li
				style={{ color: getColorByStatus(Status.CANCELED) }}
				className={styles.status}
				onClick={() => cancel.mutate({ id: orderId })}
				key={Status.CANCELED}
			>
				{t('TO_' + Status.CANCELED)}
			</li>
		);
	}
	if (status === Status.AT_WORK) {
		statuses.push(
			<li
				style={{ color: getColorByStatus(Status.AT_DELIVERY) }}
				className={styles.status}
				onClick={() => changeStatusToAtDelivery.mutate({ id: orderId })}
				key={Status.AT_DELIVERY}
			>
				{t('TO_' + Status.AT_DELIVERY)}
			</li>,
			<li
				style={{ color: getColorByStatus(Status.CANCELED) }}
				className={styles.status}
				onClick={() => cancel.mutate({ id: orderId })}
				key={Status.CANCELED}
			>
				{t('TO_' + Status.CANCELED)}
			</li>
		);
	}
	if (status === Status.AT_DELIVERY) {
		statuses.push(
			<li
				style={{ color: getColorByStatus(Status.COMPLETED) }}
				className={styles.status}
				onClick={() => complete.mutate({ id: orderId })}
				key={Status.COMPLETED}
			>
				{t('TO_' + Status.COMPLETED)}
			</li>,
			<li
				style={{ color: getColorByStatus(Status.CANCELED) }}
				className={styles.status}
				onClick={() => cancel.mutate({ id: orderId })}
				key={Status.CANCELED}
			>
				{t('TO_' + Status.CANCELED)}
			</li>
		);
	}

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (!statusRef.current) {
				return;
			}
			if (!statusRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		// `true` will enable the `capture` phase of event handling by browser
		document.addEventListener('click', handler, true);
		return () => {
			document.removeEventListener('click', handler);
		};
	}, []);

	const className =
		status === Status.COMPLETED || status === Status.CANCELED
			? isOpen
				? [styles.dropdownContainer, styles.notEditable, styles.open].join(' ')
				: [styles.dropdownContainer, styles.notEditable].join(' ')
			: isOpen
			? [styles.dropdownContainer, styles.open].join(' ')
			: styles.dropdownContainer;

	return (
		<div
			className={className}
			onClick={() => setIsOpen((prev) => !prev)}
			ref={statusRef}
		>
			<div
				style={{ color: getColorByStatus(status) }}
				className={styles.status}
			>
				{t(status)}
			</div>
			<ul className={styles.dropdown}>{statuses}</ul>
		</div>
	);
};
