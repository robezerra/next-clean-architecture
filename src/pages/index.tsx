import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { api } from '../utils/http';
import { Product } from '../utils/models';

type HomeProps = {
	products: Product[];
};

const Home: NextPage<HomeProps> = ({ products }) => {
	return (
		<div>
			<h1>Ecommerce</h1>
			<ul>
				{products.map((product, key) => (
					<li key={key}>
						<label>Name: </label> {product.name} |
						<Link href={`/products/${product.id}`} passHref legacyBehavior>
							<a href="#">Ver</a>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { data: products } = await api.get('products');

	return {
		props: {
			products,
		},
	};
};
