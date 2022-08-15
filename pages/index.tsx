import type { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/layout';

const Home: NextPage = () => {
	return (
		<div>
			<Layout name='home'>
				<p>P</p>
				<p><Link href='mapa'>mapa</Link></p>
        <p><Link href='start'>Start</Link></p>
			</Layout>
		</div>
	)
}

export default Home;
