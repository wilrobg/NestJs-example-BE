import { Controller, Get, Param } from '@nestjs/common';
import { BookstoreService } from './services/bookstore.service';

@Controller('bookstore')
export class BookstoreController {
    constructor(private readonly bookstoreService : BookstoreService){
    }

    @Get(':name')
    async getTopAuthorSalesAsync(@Param('name') name: string){
        return this.bookstoreService.getTopAuthorSales10(name);
    }
}
