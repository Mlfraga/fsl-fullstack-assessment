import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      const response = await request(server).post('/battle').send({
        monsterAId: 1,
        monsterBId: undefined
      });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe('Both monsters must be defined.');
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {      
      const response = await request(server).post('/battle').send({
        monsterAId: 83432,
        monsterBId: 1
      });

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body.message).toBe('Both or one of monsters does not exists on the database.');
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      const response = await request(server).post('/battle').send({
        monsterAId: 3,
        monsterBId: 2
      });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner.id).toBe(3);
      
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const response = await request(server).post('/battle').send({
        monsterAId: 1,
        monsterBId: 2
      });

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.winner.id).toBe(2);
    });
  });
});
