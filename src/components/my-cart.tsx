import { useContext } from 'react';
import { CartContext } from '../context/cart.provider';

export const MyCart = () => {
	const cartContext = useContext(CartContext);
	return (
		<nav>
			Cart - Total {cartContext.total} | Items {cartContext.products.length}
		</nav>
	);
};
