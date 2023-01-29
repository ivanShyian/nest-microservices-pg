import { Body, Controller, Get, Param, Post, Patch, Inject } from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { IProductService } from '../common/grpc.interface';

type ProductServiceType = IProductService<Product, CreateProductDto>;

@Controller('products')
export class ProductController {
  private productsService: ProductServiceType;

  constructor(
    @Inject('PRODUCT_CONTROLLER') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.productsService = this.client.getService<ProductServiceType>('ProductController');
  }
  
  @Get()
  async getProducts(): Promise<Product[]> {
    return this.productsService.getProducts({});
  }

  @Get(':productId')
  async getProduct(@Param() productId: string): Promise<Product> {
    return this.productsService.getProduct(productId);
  }

  @Post()
  async createProduct(
    @Body('product') createUserDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createUserDto);
  }

  @Patch(':productId')
  async updateProduct(
    @Param() productId: string,
    @Body('product') createUserDto: Partial<CreateProductDto>,
  ): Promise<Product> {
    const data = {
      productId,
      product: createUserDto,
    };
    return this.productsService.updateProduct(data);
  }
}
