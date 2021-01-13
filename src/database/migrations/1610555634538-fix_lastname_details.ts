import {MigrationInterface, QueryRunner} from "typeorm";

export class fixLastnameDetails1610555634538 implements MigrationInterface {
    name = 'fixLastnameDetails1610555634538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_details"."lastname" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user_details"."lastname" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "lastname" SET NOT NULL`);
    }

}
