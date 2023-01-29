import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  productId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop([String])
  tags: string[];

  @Prop()
  categories: string[];

  @Prop({ required: true })
  price: string;

  @Prop([String])
  image: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
