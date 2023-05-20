import type { GetServerSideProps, NextPage } from 'next';

import styles from './requests.module.css';
import { RequestsTable } from '~/components/RequestsTable';
import { AddressLabel } from '~/components/AddressLabel';
import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Requests: NextPage = () => {
	const { t } = useTranslation('requests');
	const addresses = [
		t('mol'),
		t('sol'),
		t('dach'),
		t('kui'),
		t('gal'),
	] as const;
	const [currentAddress, setCurrentAddress] = useState<string>(addresses[0]);

	return (
		<>
			<h2>{t('requests')}</h2>
			<div className={styles.container}>
				<RequestsTable address={currentAddress} />
				<div className={styles.addresses}>
					{addresses.map((address) => (
						<AddressLabel
							key={address}
							title={address}
							isCurrent={address === currentAddress}
							onClick={() => setCurrentAddress(address)}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common', 'requests'])),
		},
	};
};

export default Requests;
