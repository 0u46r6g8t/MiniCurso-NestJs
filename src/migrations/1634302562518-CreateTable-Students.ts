import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateTableStudents1634302562518
  implements MigrationInterface
{
  name = 'CreateTableStudents1634302562518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_students" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "password" character varying(75) NOT NULL, CONSTRAINT "UQ_364d317fd80925bf23090c18e80" UNIQUE ("email"), CONSTRAINT "PK_cc50c35f38199c93329e2dd9ef6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tb_students"`);
  }
}
