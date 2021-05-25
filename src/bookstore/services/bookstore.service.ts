import { Injectable } from '@nestjs/common';
//import { authorsSales } from '../mocks/authorsSales.mock';

@Injectable()
export class BookstoreService {
    private sales = authorsSales;

    public async getTopAuthorSales10() {
        return this.sales;
    }
}
