import {MigrationInterface, QueryRunner} from "typeorm";

export class EntitiesMigration1621976439653 implements MigrationInterface {
    name = 'EntitiesMigration1621976439653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_item" ("id" SERIAL NOT NULL, "customer_name" character varying NOT NULL, "item_price" numeric NOT NULL, "quantity" integer NOT NULL, "book_id" integer NOT NULL, CONSTRAINT "PK_439a57a4a0d130329d3d2e671b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "isbn" character varying NOT NULL, "author_id" integer NOT NULL, CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date_of_birth" TIMESTAMP NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_item" ADD CONSTRAINT "FK_edab317976275f527a11f647fa0" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_24b753b0490a992a6941451f405" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_24b753b0490a992a6941451f405"`);
        await queryRunner.query(`ALTER TABLE "sale_item" DROP CONSTRAINT "FK_edab317976275f527a11f647fa0"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "sale_item"`);
    }

}
