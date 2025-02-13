import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1739432066782 implements MigrationInterface {
    name = 'SeedUsers1739432066782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" (username, password, role) 
            VALUES 
            ('admin1', 'adminpassword1', 'admin'),
            ('admin2', 'adminpassword2', 'admin'),
            ('user1', 'userpassword1', 'user'),
            ('user2', 'userpassword2', 'user');
        `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user" WHERE username IN ('admin1', 'admin2', 'user1', 'user2');
        `);
    }

}
