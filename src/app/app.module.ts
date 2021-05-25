import { Module } from '@nestjs/common';
import { BookstoreModule } from '../bookstore/bookstore.module';

@Module({
  imports: [BookstoreModule]
})
export class AppModule {}
