import { useTranslation } from 'next-i18next';

export function useNavItems() {
	const { t } = useTranslation('common');
	return [
		{
			id: 1,
			href: '/',
			title: t('home'),
		},
		{
			id: 2,
			href: '/employees',
			title: t('employees'),
		},
		{
			id: 3,
			href: '/requests',
			title: t('requests'),
		},
		{
			id: 4,
			href: '/clients',
			title: t('clients'),
		},
		{
			id: 5,
			href: '/orders',
			title: t('orders'),
		},
		{
			id: 6,
			href: '/desserts',
			title: t('desserts'),
		},
		{
			id: 7,
			href: '/language',
			title: t('language'),
		},
	];
}
