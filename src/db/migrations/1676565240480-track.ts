import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class track1676565240480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'track',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'artistId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'albumId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'duration',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('track');
  }
}
