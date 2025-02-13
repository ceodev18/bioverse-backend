import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1739166555951 implements MigrationInterface {
    name = 'InitDatabase1739166555951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."question_type_enum" AS ENUM('mcq', 'input')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" integer NOT NULL, "text" character varying NOT NULL, "type" "public"."question_type_enum" NOT NULL, "options" text, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionnaire_question" ("id" integer NOT NULL, "priority" integer NOT NULL DEFAULT '0', "questionnaireId" integer, "questionId" integer, CONSTRAINT "PK_eae0e95bd5a0ba7fe0fc1e3470b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionnaire" ("id" integer NOT NULL, "title" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_e8232a11eaabac903636eb7e71e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" text NOT NULL, "userId" uuid, "questionnaireId" integer, "questionId" integer, CONSTRAINT "PK_37b32f666e59572775b1b020fb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questionnaire_question" ADD CONSTRAINT "FK_2ee7a8df54fe5f2350f8d29a621" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_question" ADD CONSTRAINT "FK_7fda037d4aff37cbb2a8dec49d5" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_9c6be2365ee3df4d764bc66230a" FOREIGN KEY ("questionnaireId") REFERENCES "questionnaire"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_answer" ADD CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_39bb21c637a8c11e2f3abd527e6"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_9c6be2365ee3df4d764bc66230a"`);
        await queryRunner.query(`ALTER TABLE "user_answer" DROP CONSTRAINT "FK_4333f41c4fc441ddb4ba0cc9f2d"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_question" DROP CONSTRAINT "FK_7fda037d4aff37cbb2a8dec49d5"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_question" DROP CONSTRAINT "FK_2ee7a8df54fe5f2350f8d29a621"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_answer"`);
        await queryRunner.query(`DROP TABLE "questionnaire"`);
        await queryRunner.query(`DROP TABLE "questionnaire_question"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
    }

}
