import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { Employee } from '~/components/Employee';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

function DetailedEmployee() {
	const router = useRouter();
	const id = +(router.query.id ?? 0);
	const { t } = useTranslation('employees');
	const {
		data: employee,
		isLoading,
		isError,
	} = api.employee.getOne.useQuery({ id });

	if (isLoading) return <div>{t('loading')}</div>;

	if (isError) return <div>{t('error')}</div>;

	if (!employee) return <div>{t('not-found')}</div>;

	return <Employee {...employee} />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'employees'])),
		},
	};
};

export default DetailedEmployee;
