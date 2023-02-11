import {MigrationInterface, QueryRunner} from "typeorm";

export class fixOrganization1676150158179 implements MigrationInterface {
    name = 'fixOrganization1676150158179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" RENAME COLUMN "password" TO "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organization" RENAME COLUMN "phone" TO "password"`);
    }

}
