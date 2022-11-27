import { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { ListProductsUseCase } from '../@core/application/product/list-products.use-case';
import { ProductProps } from '../@core/domain/entities/product';
import { container, Registry } from '../@core/infra/container-registry';

type HomeProps = {
	products: ProductProps[];
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
	const useCase = container.get<ListProductsUseCase>(
		Registry.ListProductsUseCase
	);
	const products = await useCase.execute();

	return {
		props: {
			products: products.map((product) => product.toJSON()),
		},
	};
};
