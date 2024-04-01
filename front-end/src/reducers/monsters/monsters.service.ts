import { API_URL } from '../../constants/env';
import { Monster } from '../../models/interfaces/monster.interface';

const getAll = async (): Promise<Monster[]> =>
  await fetch(`${API_URL}/monsters`).then((response) => response.json());

interface StartBattlePayload {
  monsterAId: number;
  monsterBId: number;
}

const startBattle = async (data: StartBattlePayload ) => 
  await fetch(`${API_URL}/battle`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": 'application/json',
      "Accept": "application/json"
    }
  }).then((response) => response.json());

export const MonsterService = {
  getAll,
  startBattle
};
