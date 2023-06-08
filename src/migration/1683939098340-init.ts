import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1683939098340 implements MigrationInterface {
  name = 'init1683939098340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "extra_service" ("id" SERIAL NOT NULL, "src" text NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8d741b4c689497daeae3414b60e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "extra_service_pkey" ON "extra_service" ("id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'client', 'owner', 'employee')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" text NOT NULL, "surname" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'client', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "organization_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "user_pkey" ON "user" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" text NOT NULL, "director_full_name" text NOT NULL, "email" text NOT NULL, "phone" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "organization_pkey" ON "organization" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pavilion_map" ("id" SERIAL NOT NULL, "name" text NOT NULL, "coords" numeric array NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "organization_id" integer NOT NULL, CONSTRAINT "PK_ee49c6ce278d0d61486d3a1aa83" PRIMARY KEY ("id", "organization_id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "pavilion_map_pkey" ON "pavilion_map" ("id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."pavilion_type_enum" AS ENUM('house', 'pavilion')`,
    );
    await queryRunner.query(
      `CREATE TABLE "pavilion" ("id" SERIAL NOT NULL, "name" text NOT NULL, "coords" numeric array NOT NULL, "square" numeric NOT NULL, "type" "public"."pavilion_type_enum" NOT NULL DEFAULT 'pavilion', "capacity" integer NOT NULL, "bedrooms" integer NOT NULL, "price" numeric NOT NULL, "main_img" text, "images" text array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pavilion_map_id" integer NOT NULL, CONSTRAINT "PK_f29004933b6302eb9eafba7692d" PRIMARY KEY ("id", "pavilion_map_id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "pavilion_pkey" ON "pavilion" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "extra_service_pavilion" ("id" SERIAL NOT NULL, "price" numeric NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pavilion_id" integer NOT NULL, "extra_service_id" integer NOT NULL, CONSTRAINT "PK_1f6acc3af2ab39cdcaad34bf156" PRIMARY KEY ("id", "pavilion_id", "extra_service_id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "extra_service_pavilion_pkey" ON "extra_service_pavilion" ("id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "reserve" ("id" SERIAL NOT NULL, "hours" integer NOT NULL, "client_name" text NOT NULL, "client_surname" text NOT NULL, "client_phone" text NOT NULL, "guests" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "client_id" integer, "pavilion_id" integer NOT NULL, CONSTRAINT "PK_fad0402f7aa2e5fe055fff53c81" PRIMARY KEY ("id", "pavilion_id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "reserve_pkey" ON "reserve" ("id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "pavilion_map" ADD CONSTRAINT "FK_9985cc9d7d93e5c9ce906938fc2" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pavilion" ADD CONSTRAINT "FK_9cb96dc658d552aec6a2b55753d" FOREIGN KEY ("pavilion_map_id") REFERENCES "pavilion_map"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "extra_service_pavilion" ADD CONSTRAINT "FK_1e7e934e454ab6a054a744860f7" FOREIGN KEY ("pavilion_id") REFERENCES "pavilion"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "extra_service_pavilion" ADD CONSTRAINT "FK_3509858b3cc158747a1e2be3c6a" FOREIGN KEY ("extra_service_id") REFERENCES "extra_service"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD CONSTRAINT "FK_228f2ef8752e6c2bcaf095f26c6" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve" ADD CONSTRAINT "FK_97caa67bbbef0700def1b76630e" FOREIGN KEY ("pavilion_id") REFERENCES "pavilion"("id") ON DELETE RESTRICT ON UPDATE RESTRICT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reserve" DROP CONSTRAINT "FK_97caa67bbbef0700def1b76630e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reserve" DROP CONSTRAINT "FK_228f2ef8752e6c2bcaf095f26c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "extra_service_pavilion" DROP CONSTRAINT "FK_3509858b3cc158747a1e2be3c6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "extra_service_pavilion" DROP CONSTRAINT "FK_1e7e934e454ab6a054a744860f7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pavilion" DROP CONSTRAINT "FK_9cb96dc658d552aec6a2b55753d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pavilion_map" DROP CONSTRAINT "FK_9985cc9d7d93e5c9ce906938fc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_3e103cdf85b7d6cb620b4db0f0c"`,
    );
    await queryRunner.query(`DROP INDEX "public"."reserve_pkey"`);
    await queryRunner.query(`DROP TABLE "reserve"`);
    await queryRunner.query(
      `DROP INDEX "public"."extra_service_pavilion_pkey"`,
    );
    await queryRunner.query(`DROP TABLE "extra_service_pavilion"`);
    await queryRunner.query(`DROP INDEX "public"."pavilion_pkey"`);
    await queryRunner.query(`DROP TABLE "pavilion"`);
    await queryRunner.query(`DROP TYPE "public"."pavilion_type_enum"`);
    await queryRunner.query(`DROP INDEX "public"."pavilion_map_pkey"`);
    await queryRunner.query(`DROP TABLE "pavilion_map"`);
    await queryRunner.query(`DROP INDEX "public"."organization_pkey"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(`DROP INDEX "public"."user_pkey"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP INDEX "public"."extra_service_pkey"`);
    await queryRunner.query(`DROP TABLE "extra_service"`);
  }
}
