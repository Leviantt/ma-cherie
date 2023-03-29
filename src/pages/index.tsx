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
				<title>Ma Cherie</title>
				<meta name='description' content='ma cherie sweetshop' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<h1>Главная</h1>
				<p>{hello.data?.greeting}</p>
			</main>
		</>
	);
};

export default Home;
