import { Author } from '../../bookstore/entities/author.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(Author, (faker: typeof Faker) => {
  const author = new Author();
  author.name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  author.dateOfBirth = faker.date.past();
  return author;
});