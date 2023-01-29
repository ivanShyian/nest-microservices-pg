import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/createProduct.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private readonly goodsPreviewRepository: ProductRepository) {}

  async getProductById(goodsId: string): Promise<Product> {
    return this.goodsPreviewRepository.findOne({ goodsId });
  }

  async getProducts(): Promise<Product[]> {
    return this.goodsPreviewRepository.find({});
  }

  async createProduct(goodsDto: CreateProductDto): Promise<Product> {
    return this.goodsPreviewRepository.create({
      productId: uuidv4(),
      ...goodsDto,
    });
  }

  async updateProduct(
    goodsId: string,
    goodsPreviewUpdates: Partial<CreateProductDto>,
  ): Promise<Product> {
    return this.goodsPreviewRepository.findOneAndUpdate(
      { goodsId },
      goodsPreviewUpdates,
    );
  }
}
