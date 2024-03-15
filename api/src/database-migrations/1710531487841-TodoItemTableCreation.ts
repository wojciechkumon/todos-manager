import { MigrationInterface, QueryRunner } from 'typeorm';

export class TodoItemTableCreation1710531487841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "todo_items" (
        "id" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        "content" VARCHAR(2000) NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "user_id" UUID NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "users" (id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo_items";`);
  }
}
