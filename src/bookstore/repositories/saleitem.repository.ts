import { EntityRepository, Repository } from 'typeorm';
import { SaleItem } from '../entities/saleitem.entity';
import { ResponseDto } from '../dto/responseDto.dto';

@EntityRepository(SaleItem)
export class SaleItemRepository extends Repository<SaleItem> {

    async getTopAuthorSales(name?: string): Promise<ResponseDto[]>{

        const salesQuery = this.createQueryBuilder('saleItem')
        .select('SUM(saleItem.item_price * saleItem.quantity)', 'total_sale')
        .addSelect('author.name','author_name')
        .innerJoin('saleItem.book', 'book')
        .innerJoin('book.author', 'author')
        .groupBy('author.id')
        .limit(10);

        if (name) {
            salesQuery.andWhere('name ilike :name', { name: `%${name}%` });
        }
          
        return salesQuery.getRawMany();
    }

}