import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { BookstoreService } from './services/bookstore.service';

@Controller('bookstore')
export class BookstoreController {
    constructor(private bookstoreService : BookstoreService){
    }

    @Get()
    async getTopAuthorSalesAsync(){
        return this.bookstoreService.getTopAuthorSales10();
    }
}
