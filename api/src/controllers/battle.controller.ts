import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle, Monster } from '../models';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const startBattle = async (req: Request, res: Response): Promise<Response> => {
  const { monsterAId, monsterBId } = req.body;

  if(!monsterAId || !monsterBId) {
    return res.status(StatusCodes.NOT_FOUND).json({message: 'Both monsters must be defined.'});
  }

  const monsterA = await Monster.query().findById(monsterAId);
  const monsterB = await Monster.query().findById(monsterBId);

  if(!monsterA || !monsterB) {
    return res.status(StatusCodes.NOT_FOUND).json({message: 'Both or one of monsters does not exists on the database.'});
  }

  let currentAttacker = monsterA;

  if(monsterB.speed > monsterA.speed || (monsterB.speed === monsterA.speed && monsterB.attack > monsterA.attack)) {
    currentAttacker = monsterB;
  }

  while (monsterA.hp > 0 && monsterB.hp > 0) {
    if(currentAttacker.id === monsterAId) {
      const damage = currentAttacker.attack <= monsterB.defense ? 1 : currentAttacker.attack - monsterB.defense;

      monsterB.hp -= damage;
      currentAttacker = monsterB;

      continue;
    }

    const damage = currentAttacker.attack <= monsterA.defense ? 1 : currentAttacker.attack - monsterA.defense;

    monsterA.hp -= damage;
    currentAttacker = monsterA;
  }

  const winner = currentAttacker.id === monsterA.id ? monsterB : monsterA;

  const battle = {
    winner: Number(winner.id),
    monsterA: Number(monsterAId),
    monsterB: Number(monsterBId),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  await Battle.query().insert(battle);

  return res.status(StatusCodes.OK).json({ winner });
}

export const BattleController = {
  list,
  startBattle
};
