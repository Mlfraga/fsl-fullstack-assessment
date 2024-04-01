import { Id, RelationMappings } from 'objection';
import Base from './base';
import { Monster } from './monster.model';

export class Battle extends Base {
  id!: Id;
  monsterA!: number;
  monsterB!: number;
  winner!: number;

  static tableName = 'battle';

  static get relationMappings(): RelationMappings {
    return {
      monsterARelation: {
        modelClass: Monster,
        relation: Base.BelongsToOneRelation,
        join: {
          from: 'batle.monsterA',
          to: 'monster.id'
        }
      },
      monsterBRelation: {
        modelClass: Monster,
        relation: Base.BelongsToOneRelation,
        join: {
          from: 'batle.monsterB',
          to: 'monster.id'
        }
      },
      winnerRelation: {
        modelClass: Monster,
        relation: Base.BelongsToOneRelation,
        join: {
          from: 'batle.winner',
          to: 'monster.id'
        }
      },
    };
  }
}
