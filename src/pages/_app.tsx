import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { Layout } from '~/components/Layout';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { api } from '~/utils/api';
import '~/styles/globals.css';
import { appWithTranslation } from 'next-i18next';

const inter = Inter({
	subsets: ['cyrillic', 'latin'],
});

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Ma Cherie</title>
				<meta name='description' content='ma cherie sweetshop' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={inter.className}>
				<Toaster />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</div>
		</>
	);
};

export default api.withTRPC(appWithTranslation(MyApp));
