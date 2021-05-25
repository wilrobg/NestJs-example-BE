import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class SaleItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'customer_name' })
  customerName: string;

  @Column({ type: 'decimal', name: 'item_price' })
  itemPrice: number;

  @Column({ type: 'integer' })
  quantity: number;

  @ManyToOne(() => Book, book => book.saleItems, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: Book;
}