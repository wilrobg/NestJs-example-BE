import { Module } from '@nestjs/common';
import { BookstoreController } from './bookstore.controller';
import { BookstoreService } from './services/bookstore.service';
import { SaleItemRepository } from './repositories/saleitem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([SaleItemRepository])
    ],
  controllers: [BookstoreController],
  providers: [BookstoreService]
})
export class BookstoreModule {}
