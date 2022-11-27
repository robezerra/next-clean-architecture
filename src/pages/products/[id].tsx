import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.provider';

import { container, Registry } from '../../@core/infra/container-registry';
import { GetProductUseCase } from '../../@core/application/product/get-product.use-case';
import { ProductProps } from '../../@core/domain/entities/product';

type ProductDetailPageProps = {
	product: ProductProps;
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
	const useCase = container.get<GetProductUseCase>(Registry.GetProductUseCase);
	const product = await useCase.execute(+id!);

	return {
		props: {
			product: product.toJSON(),
		},
	};
};
