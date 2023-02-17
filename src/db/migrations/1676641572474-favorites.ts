import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class favorites1676641572474 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'favorite',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
        ],
      }),
      true,
    );
    await queryRunner.addColumn(
      'favorite',
      new TableColumn({
        name: 'artistId',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );
    await queryRunner.addColumn(
      'favorite',
      new TableColumn({
        name: 'trackId',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );
    await queryRunner.addColumn(
      'favorite',
      new TableColumn({
        name: 'albumId',
        type: 'uuid',
        isNullable: true,
        default: null,
      }),
    );
    await queryRunner.createForeignKey(
      'favorite',
      new TableForeignKey({
        columnNames: ['trackId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'track',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'favorite',
      new TableForeignKey({
        columnNames: ['albumId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'album',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'favorite',
      new TableForeignKey({
        columnNames: ['artistId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'artist',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('favorite');
  }
}
