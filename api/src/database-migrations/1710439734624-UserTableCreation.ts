import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserTableCreation1710439734624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "email" VARCHAR(128) UNIQUE NOT NULL,
        "password_hash" VARCHAR(60) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
