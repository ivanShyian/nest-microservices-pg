import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async findOne(productQuery: FilterQuery<Product>): Promise<Product> {
    return this.productModel.findOne(productQuery);
  }

  async find(productQuery: FilterQuery<Product>): Promise<Product[]> {
    return this.productModel.find(productQuery);
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findOneAndUpdate(
    productQuery: FilterQuery<Product>,
    product: Partial<Product>,
  ): Promise<Product> {
    return this.productModel.findOneAndUpdate(productQuery, product);
  }
}
