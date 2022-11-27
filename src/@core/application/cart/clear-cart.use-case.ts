import { CartGateway } from '../../domain/gateways/cart.gateway';

export class ClearCartUseCase {
	constructor(private cartGateway: CartGateway) {}

	async execute() {
		const cart = this.cartGateway.get();

		cart.clear();

		this.cartGateway.save(cart);

		return cart;
	}
}
