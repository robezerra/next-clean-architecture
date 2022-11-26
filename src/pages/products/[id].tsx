import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.provider';

import { api } from '../../utils/http';
import { Product } from '../../utils/models';

type ProductDetailPageProps = {
	product: Product;
};

export const ProductDetailPage: NextPage<ProductDetailPageProps> = ({
	product,
}) => {
	const cartContext = useContext(CartContext);

	return (
		<div>
			<h3>{product.name}</h3>
			<label>Preço:</label> {product.price}
			<button onClick={() => cartContext.addProduct(product)}>
				Adicionar no carrinho
			</button>
		</div>
	);
};

export default ProductDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { id } = context.params || {};
	const { data: product } = await api.get(`products/${id}`);

	return {
		props: {
			product,
		},
	};
};
