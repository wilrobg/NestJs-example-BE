import { EntityRepository, Repository } from 'typeorm';
import { SaleItem } from '../entities/saleitem.entity';

@EntityRepository(SaleItem)
export class SaleItemRepository extends Repository<SaleItem> {

    async getTopAuthorSales(name: string): Promise<SaleItem[]>{
        
        const salesQuery = this.createQueryBuilder('saleItem')
        .innerJoin('saleItem.book', 'book')
        .innerJoin('book.author', 'author')
        .limit(10);

        console.log(name);  
        if (name) {
            salesQuery.andWhere('name ilike :name', { name: `%${name}%` });
        }
        
        console.log(salesQuery.getQuery());  
        return salesQuery.getRawMany();
    }

}