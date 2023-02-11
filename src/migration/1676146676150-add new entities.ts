import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewEntities1676146676150 implements MigrationInterface {
    name = 'addNewEntities1676146676150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "extra_service" ("id" SERIAL NOT NULL, "src" text NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8d741b4c689497daeae3414b60e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "extra_service_pkey" ON "extra_service" ("id") `);
        await queryRunner.query(`CREATE TABLE "pavilion_map" ("id" SERIAL NOT NULL, "name" text NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_237ced2ddc8587f0da356c7bf2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pavilion_map_pkey" ON "pavilion_map" ("id") `);
        await queryRunner.query(`CREATE TABLE "pavilion" ("id" SERIAL NOT NULL, "name" text NOT NULL, "square" numeric NOT NULL, "type" text NOT NULL, "capacity" integer NOT NULL, "bedrooms" integer NOT NULL, "price" numeric NOT NULL, "main_img" text, "images" text array, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pavilion_map_id" integer, CONSTRAINT "PK_67a7906a4d5a18b600b49e677b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "pavilion_pkey" ON "pavilion" ("id") `);
        await queryRunner.query(`CREATE TABLE "extra_service_pavilion" ("id" SERIAL NOT NULL, "price" numeric DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pavilion_id" integer, "extra_service_id" integer, CONSTRAINT "PK_f18bed6056de2e51780ddc7c388" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "extra_service_pavilion_pkey" ON "extra_service_pavilion" ("id") `);
        await queryRunner.query(`CREATE TABLE "reserve" ("id" SERIAL NOT NULL, "hours" integer NOT NULL, "client_name" text NOT NULL, "client_surname" text NOT NULL, "client_phone" text NOT NULL, "guests" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "client_id" integer, "pavilion_id" integer, CONSTRAINT "PK_619d1e12dbedbe126620cac8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "reserve_pkey" ON "reserve" ("id") `);
        await queryRunner.query(`ALTER TABLE "pavilion" ADD CONSTRAINT "FK_9cb96dc658d552aec6a2b55753d" FOREIGN KEY ("pavilion_map_id") REFERENCES "pavilion_map"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "extra_service_pavilion" ADD CONSTRAINT "FK_1e7e934e454ab6a054a744860f7" FOREIGN KEY ("pavilion_id") REFERENCES "pavilion"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "extra_service_pavilion" ADD CONSTRAINT "FK_3509858b3cc158747a1e2be3c6a" FOREIGN KEY ("extra_service_id") REFERENCES "extra_service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_228f2ef8752e6c2bcaf095f26c6" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "reserve" ADD CONSTRAINT "FK_97caa67bbbef0700def1b76630e" FOREIGN KEY ("pavilion_id") REFERENCES "pavilion"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_97caa67bbbef0700def1b76630e"`);
        await queryRunner.query(`ALTER TABLE "reserve" DROP CONSTRAINT "FK_228f2ef8752e6c2bcaf095f26c6"`);
        await queryRunner.query(`ALTER TABLE "extra_service_pavilion" DROP CONSTRAINT "FK_3509858b3cc158747a1e2be3c6a"`);
        await queryRunner.query(`ALTER TABLE "extra_service_pavilion" DROP CONSTRAINT "FK_1e7e934e454ab6a054a744860f7"`);
        await queryRunner.query(`ALTER TABLE "pavilion" DROP CONSTRAINT "FK_9cb96dc658d552aec6a2b55753d"`);
        await queryRunner.query(`DROP INDEX "public"."reserve_pkey"`);
        await queryRunner.query(`DROP TABLE "reserve"`);
        await queryRunner.query(`DROP INDEX "public"."extra_service_pavilion_pkey"`);
        await queryRunner.query(`DROP TABLE "extra_service_pavilion"`);
        await queryRunner.query(`DROP INDEX "public"."pavilion_pkey"`);
        await queryRunner.query(`DROP TABLE "pavilion"`);
        await queryRunner.query(`DROP INDEX "public"."pavilion_map_pkey"`);
        await queryRunner.query(`DROP TABLE "pavilion_map"`);
        await queryRunner.query(`DROP INDEX "public"."extra_service_pkey"`);
        await queryRunner.query(`DROP TABLE "extra_service"`);
    }

}
