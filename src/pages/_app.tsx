import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';

import { api } from '~/utils/api';
import '~/styles/globals.css';

import { Layout } from '~/components/Layout';

const inter = Inter({
	subsets: ['cyrillic', 'latin'],
});

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<div className={inter.className}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
};

export default api.withTRPC(MyApp);
