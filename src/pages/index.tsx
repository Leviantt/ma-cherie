import styles from './index.module.css';
import { type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { api } from '~/utils/api';

const Home: NextPage = () => {
	const hello = api.example.hello.useQuery({ text: 'from tRPC' });

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name='description' content='ma cherie sweetshop' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<h1>some text</h1>
			</main>
		</>
	);
};

export default Home;
