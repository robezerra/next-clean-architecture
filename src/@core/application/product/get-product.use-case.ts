import { Product } from '../../domain/entities/product';
import { ProductGateway } from '../../domain/gateways/product.gateway';

export class GetProductUseCase {
	constructor(private productGate: ProductGateway) {}

	execute(id: number): Promise<Product> {
		return this.productGate.findById(id);
	}
}
