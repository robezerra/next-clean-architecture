import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { Product } from '../utils/models';

export type CartContextType = {
	products: Product[];
	addProduct: (product: Product) => void;
	removeProduct: (product: Product) => void;
	clear: () => void;
	total: number;
};

const defaultContext: CartContextType = {
	products: [],
	addProduct: () => {},
	removeProduct: () => {},
	clear: () => {},
	total: 0,
};

export const CartContext = createContext(defaultContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
	const [products, setProducts] = useState<Product[] | null>(null);

	useEffect(() => {
		setProducts(JSON.parse(localStorage.getItem('products') || '[]'));
	}, []);

	useEffect(() => {
		if (!products) {
			return;
		}

		localStorage.setItem('products', JSON.stringify(products));
	}, [products]);

	const addProduct = useCallback((product: Product) => {
		setProducts((prevState) => [...prevState!, product]);
	}, []);

	const removeProduct = useCallback((product: Product) => {
		setProducts((prevState) => prevState!.filter((p) => p.id !== product.id));
	}, []);

	const clear = useCallback(() => {
		setProducts([]);
	}, []);

	const total = useMemo(() => {
		if (!products) {
			return 0;
		}

		return products.reduce((acc, product) => acc + product.price, 0);
	}, [products]);

	return (
		<CartContext.Provider
			value={{
				products: products || [],
				addProduct,
				removeProduct,
				clear,
				total,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
