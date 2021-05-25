import { Factory, Seeder } from 'typeorm-seeding';
import { SaleItem } from '../../bookstore/entities/saleitem.entity';

export default class SaleItems implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(SaleItem)().createMany(20);
  }
}