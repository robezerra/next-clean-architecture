import { Cart } from '../../domain/entities/cart';
import { CartGateway } from '../../domain/gateways/cart.gateway';

export class GetCartUseCase {
	constructor(private cartGateway: CartGateway) {}

	async execute(): Promise<Cart> {
		return this.cartGateway.get();
	}
}
