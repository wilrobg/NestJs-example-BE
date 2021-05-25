import { Module } from '@nestjs/common';
import { BookstoreModule } from '../bookstore/bookstore.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),TypeOrmModule.forRoot(), BookstoreModule]
})
export class AppModule {}
