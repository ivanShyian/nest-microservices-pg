import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';

const microserviceOptions: ClientProviderOptions = {
  name: 'PRODUCT_SERVICE',
  transport: Transport.TCP
}

@Module({
  imports: [
    ClientsModule.register([microserviceOptions]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class ProductModule {}
