import { Body, Controller, Get, Param, Post, Patch, Inject } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProductEvents, ProductUpdateData } from './types/product.types';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  
  @Get()
  async getProducts(): Promise<Observable<Product[]>> {
    return this.client.send<Product[], string>(ProductEvents.FIND_ALL, '');
  }

  @Get(':productId')
  async getProduct(@Param() productId: string): Promise<Observable<Product>> {
    return this.client.send<Product, string>(ProductEvents.FIND_ONE, productId);
  }

  @Post()
  async createProduct(
    @Body('product') createUserDto: CreateProductDto,
  ): Promise<Observable<Product>> {
    return this.client.send<Product, CreateProductDto>(ProductEvents.CREATE, createUserDto);
  }

  @Patch(':productId')
  async updateProduct(
    @Param() productId: string,
    @Body('product') createUserDto: Partial<CreateProductDto>,
  ): Promise<Observable<Product>> {
    const data = { ...createUserDto, productId };
    return this.client.send<Product, ProductUpdateData>(ProductEvents.UPDATE, data);
  }
}
