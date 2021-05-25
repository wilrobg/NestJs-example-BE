import { Book } from '../../bookstore/entities/book.entity';
import { Author } from '../../bookstore/entities/author.entity';
import { define, factory } from 'typeorm-seeding';
import Faker from 'faker';

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.isbn = faker.random.uuid();
  book.author = factory(Author)() as any;
  return book;
});