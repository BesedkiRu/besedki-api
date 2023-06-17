import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSofrDeleteForOrg1687007633756 implements MigrationInterface {
  name = 'addSofrDeleteForOrg1687007633756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "deletedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "deletedAt"`,
    );
  }
}
