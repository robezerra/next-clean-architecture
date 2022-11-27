import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FormEvent, useContext } from 'react';
import { CartContext } from '../../context/cart.provider';
import { http } from '../../@core/infra/http';

export const CheckoutPage: NextPage = () => {
	const cartContext = useContext(CartContext);
	const router = useRouter();

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const credit_card_number = event.currentTarget.credit_card_number.value;

		const { data: order } = await http.post('orders', {
			products: cartContext.cart.products.map((product) => ({
				...product.props,
			})),
			credit_card_number,
		});

		router.push(`/checkout/${order.id}/success`);
	}

	return (
		<div>
			<h3>Meu carrinho</h3>
			<ul>
				{cartContext.cart.products.map((product) => (
					<li key={product.id}>
						Produto {product.name} - {product.price}
					</li>
				))}
			</ul>
			<form onSubmit={onSubmit}>
				<div>
					<label>Cartão de crédito</label>
					<input
						type="text"
						name="credit_card_number"
						id="credit_card_number"
					/>
				</div>
				<div>
					<button type="submit">Comprar</button>
				</div>
			</form>
		</div>
	);
};

export default CheckoutPage;
