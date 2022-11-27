import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { http } from '../../../@core/infra/http';
import { Order } from '../../../utils/models';

type CheckoutSuccessPageProps = {
	order: Order;
};

export const CheckoutSuccessPage: NextPage<CheckoutSuccessPageProps> = ({
	order,
}) => {
	return (
		<div>
			<h3>Parabéns! Sua compra {order.id} foi efetivada</h3>
			<ul>
				{order.products.map((product) => (
					<li key={product.id}>
						Produto {product.name} - {product.price}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CheckoutSuccessPage;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { id } = context.params || {};
	const { data: order } = await http.get(`orders/${id}`);

	return {
		props: {
			order,
		},
	};
};
