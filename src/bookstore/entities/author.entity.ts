  
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'date_of_birth', type: 'timestamp' })
  dateOfBirth: Date;

  @OneToMany(() => Book, book => book.author )
  books: Book[];
}