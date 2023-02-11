import { MigrationInterface, QueryRunner } from 'typeorm';

export class start1676019104193 implements MigrationInterface {
  name = 'start1676019104193';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text NOT NULL, "reg_date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_pkey" ON "user" ("id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."user_pkey"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
