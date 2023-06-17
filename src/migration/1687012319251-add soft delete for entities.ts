import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSoftDeleteForEntities1687012319251
  implements MigrationInterface
{
  name = 'addSoftDeleteForEntities1687012319251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pavilion_map" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "pavilion" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pavilion" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "pavilion_map" DROP COLUMN "deletedAt"`,
    );
  }
}
