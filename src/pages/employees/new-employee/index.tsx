import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { Employee } from '~/components/Employee';

function NewEmployee() {
	return <Employee pathToAvatarPhoto='/images/new-employee.jpg' />;
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'employees'])),
		},
	};
};

export default NewEmployee;
