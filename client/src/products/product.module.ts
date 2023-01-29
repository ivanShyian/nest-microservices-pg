import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientProviderOptions, ClientsModule } from '@nestjs/microservices';
import grpcOptions from '../common/grpc.options';

const microserviceOptions = { name: 'PRODUCT_CONTROLLER', ...grpcOptions } as ClientProviderOptions;

@Module({
  imports: [
    ClientsModule.register([microserviceOptions]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
