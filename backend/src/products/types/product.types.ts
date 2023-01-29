import { CreateProductDto } from '../dto/createProduct.dto';

export enum ProductEvents {
	FIND_ONE = 'get_product',
	FIND_ALL = 'get_products',
	UPDATE = 'update_product',
	CREATE = 'create_product',
};

export type ProductUpdateData = Partial<CreateProductDto> & { productId: string }