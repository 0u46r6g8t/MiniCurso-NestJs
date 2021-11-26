import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateBD1637206841857 implements MigrationInterface {
  name = 'CreateBD1637206841857';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tb_subjects" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(20) NOT NULL, "nameTeacher" character varying(35) NOT NULL, "workload" integer NOT NULL, "timeInTheWeek" character varying NOT NULL, CONSTRAINT "PK_49ea4fe678430cbf4a3f23f32b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_students" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(50) NOT NULL, "email" character varying(75) NOT NULL, "password" character varying(75) NOT NULL, CONSTRAINT "UQ_364d317fd80925bf23090c18e80" UNIQUE ("email"), CONSTRAINT "PK_cc50c35f38199c93329e2dd9ef6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tb_students_subjects_tb_subjects" ("tbStudentsId" character varying NOT NULL, "tbSubjectsId" character varying NOT NULL, CONSTRAINT "PK_056ee457f90a522cb7555291714" PRIMARY KEY ("tbStudentsId", "tbSubjectsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa1708a2b61e5188d045ab09ff" ON "tb_students_subjects_tb_subjects" ("tbStudentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e13504761174fc6a8e131073ec" ON "tb_students_subjects_tb_subjects" ("tbSubjectsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_students_subjects_tb_subjects" ADD CONSTRAINT "FK_fa1708a2b61e5188d045ab09ffe" FOREIGN KEY ("tbStudentsId") REFERENCES "tb_students"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_students_subjects_tb_subjects" ADD CONSTRAINT "FK_e13504761174fc6a8e131073ecc" FOREIGN KEY ("tbSubjectsId") REFERENCES "tb_subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tb_students_subjects_tb_subjects" DROP CONSTRAINT "FK_e13504761174fc6a8e131073ecc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tb_students_subjects_tb_subjects" DROP CONSTRAINT "FK_fa1708a2b61e5188d045ab09ffe"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e13504761174fc6a8e131073ec"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa1708a2b61e5188d045ab09ff"`,
    );
    await queryRunner.query(`DROP TABLE "tb_students_subjects_tb_subjects"`);
    await queryRunner.query(`DROP TABLE "tb_students"`);
    await queryRunner.query(`DROP TABLE "tb_subjects"`);
  }
}
