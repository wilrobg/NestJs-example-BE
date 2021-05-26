import { Injectable, NotFoundException } from '@nestjs/common';
import { SaleItem } from '../entities/saleitem.entity';
import { authorssales } from '../mocks/authorssales.mock';
import { SaleItemRepository } from '../repositories/saleitem.repository';
import { ResponseDto } from '../dto/responseDto.dto';

@Injectable()
export class BookstoreService {
    constructor(private readonly saleItemRepository: SaleItemRepository) {}
    private sales = authorssales;

    public async getTopAuthorSales10(name?: string) : Promise<ResponseDto[]> {
        const sales = await this.saleItemRepository.getTopAuthorSales(name);
        if (!sales.length) {
            throw new NotFoundException(`No authors found with name ${name}`);
        }
        return sales;
    }
}
