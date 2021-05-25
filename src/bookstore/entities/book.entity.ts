import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Author } from './author.entity';
import { SaleItem } from './saleitem.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  isbn: string;

  @ManyToOne(() => Author, author => author.books, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @OneToMany(() => SaleItem, SaleItem => SaleItem.book)
  saleItems: SaleItem[];
}