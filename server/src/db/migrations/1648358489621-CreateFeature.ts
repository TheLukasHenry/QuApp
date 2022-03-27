import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeature1648358489621 implements MigrationInterface {
  private featureTable = new Table({
    name: 'features',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.featureTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.featureTable);
  }
}
