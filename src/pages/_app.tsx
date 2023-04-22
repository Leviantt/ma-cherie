import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';

import { api } from '~/utils/api';
import '~/styles/globals.css';

import { Layout } from '~/components/Layout';
import Head from 'next/head';

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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</div>
		</>
	);
};

export default api.withTRPC(MyApp);
