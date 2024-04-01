import { Knex } from "knex";
import { Monster } from "../../src/models";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.table(Monster.tableName, (table) => {
    table.string('name').notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.table(Monster.tableName, (table) => {
    table.dropColumn('name');
  });
}

