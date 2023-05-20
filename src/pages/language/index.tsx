import styles from './Language.module.css';

import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Language: NextPage = () => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const [selectedLanguage, setSelectedLanguage] = useState<string>(
		router.locale ?? 'ru'
	);

	useEffect(() => {
		const path = router.asPath;
		void router.push(path, path, { locale: selectedLanguage });
		localStorage.setItem('locale', selectedLanguage);
	}, [selectedLanguage, router]);

	return (
		<div className={styles.container}>
			<h2>{t('language')}</h2>
			<div className={styles.languages}>
				<label>
					<input
						type='radio'
						value='ru'
						checked={selectedLanguage === 'ru'}
						onChange={(e) => setSelectedLanguage(e.target.value)}
					/>
					Русский
				</label>
				<label>
					<input
						type='radio'
						value='en'
						checked={selectedLanguage === 'en'}
						onChange={(e) => setSelectedLanguage(e.target.value)}
					/>
					English
				</label>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
	return {
		props: {
			...(await serverSideTranslations(locale ?? 'ru', ['common'])),
		},
	};
};

export default Language;
