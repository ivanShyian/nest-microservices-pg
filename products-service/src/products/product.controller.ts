import { Controller, Logger } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductEvents } from './types/product.types';

@Controller('products')
export class ProductController {
  private readonly logger = new Logger('ClientController')
  constructor(private readonly productService: ProductService) {}

  @MessagePattern(ProductEvents.FIND_ALL)
  async getProducts(): Promise<Product[]> {
    this.logger.log('SERVICE_ALL')
    return this.productService.getProducts();
  }

  @MessagePattern(ProductEvents.FIND_ONE)
  async getProduct(@Payload() productId: string): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  @MessagePattern(ProductEvents.CREATE)
  async createProduct(
    @Payload('product') createUserDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.createProduct(createUserDto);
  }

  @MessagePattern(ProductEvents.UPDATE)
  async updateProduct(
    @Payload('product') { productId, createUserDto }: { createUserDto: Partial<CreateProductDto>, productId: string },
  ): Promise<Product> {
    return this.productService.updateProduct(productId, createUserDto);
  }
}
