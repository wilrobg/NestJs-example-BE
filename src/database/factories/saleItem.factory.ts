import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Book } from '../../bookstore/entities/book.entity';
import { SaleItem } from '../../bookstore/entities/saleitem.entity';

define(SaleItem, (faker: typeof Faker) => {
  const { random, name, commerce } = faker;
  const saleItem = new SaleItem();

  saleItem.customerName = `${name.firstName()} ${name.lastName()}`;
  saleItem.itemPrice = Number(commerce.price());
  saleItem.quantity = random.number({ min: 1, max: 10});
  saleItem.book = factory(Book)() as any;

  return saleItem;
});

export default factory;