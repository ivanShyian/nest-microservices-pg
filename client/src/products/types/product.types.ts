import { CreateProductDto } from '../dto/createProduct.dto';

export interface IProductService<Product, ProductDTO> {
    getProducts({}): Promise<Product[]>;
    getProduct(productId: string): Promise<Product>;
    createProduct(product: ProductDTO): Promise<Product>;
    updateProduct(data: IUpdateProductArgs<ProductDTO>): Promise<Product>;
}

interface IUpdateProductArgs<T> {
    productId: string;
    product: Partial<T>;
}

export enum ProductEvents {
	FIND_ONE = 'get_product',
	FIND_ALL = 'get_products',
	UPDATE = 'update_product',
	CREATE = 'create_product',
};

export type ProductUpdateData = Partial<CreateProductDto> & { productId: string }