import { Controller, Logger } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger('ClientController')
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod()
  async getProducts(): Promise<{ products: Product[] }> {
    this.logger.log('SERVICE_ALL')
    const products = await this.productService.getProducts()
    return {
      products
    };
  }

  @GrpcMethod()
  async getProduct(productId: string): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  @GrpcMethod()
  async createProduct(createUserDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createUserDto);
  }

  @GrpcMethod()
  async updateProduct({ productId, createUserDto }: {
    createUserDto: Partial<CreateProductDto>;
    productId: string;
  }): Promise<Product> {
    return this.productService.updateProduct(productId, createUserDto);
  }
}
