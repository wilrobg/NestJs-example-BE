import { Controller, Get, Query } from '@nestjs/common';
import { get } from 'http';
import { BookstoreService } from './services/bookstore.service';
import { RequestDto } from "./dto/requestDto.dto";

@Controller('bookstore')
export class BookstoreController {
    constructor(private readonly bookstoreService : BookstoreService){
    }

    @Get()
    async getTopAuthorSalesAsync(@Query() request: RequestDto){
        return this.bookstoreService.getTopAuthorSales10(request.name);
    }
}
