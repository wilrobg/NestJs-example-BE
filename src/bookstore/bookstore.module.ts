import { Module, CacheModule, CACHE_MANAGER, Inject, CacheInterceptor } from '@nestjs/common';
import { BookstoreController } from './bookstore.controller';
import { BookstoreService } from './services/bookstore.service';
import { SaleItemRepository } from './repositories/saleitem.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
      CacheModule.register(),
      TypeOrmModule.forFeature([SaleItemRepository])
    ],
  controllers: [BookstoreController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
    ,
    BookstoreService]
})
export class BookstoreModule {
}
