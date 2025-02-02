import { Id, RelationMappings } from 'objection';
import Base from './base';
import { Battle } from './battle.model';

export class Monster extends Base {
  id!: Id;
  name!: string;
  attack!: number;
  defense!: number;
  hp!: number;
  speed!: number;
  imageUrl!: string;
  battles?: Battle[];

  static tableName = 'monster';

  static get relationMappings(): RelationMappings {
    return {
      battles: {
        modelClass: Battle,
        relation: Base.ManyToManyRelation,
        join: {
          from: 'monster.id',
          to: ['battle.monsterA', 'battle.monsterB']
        }
      }
    };
  }
}
