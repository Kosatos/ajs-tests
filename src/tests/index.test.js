import { showHealthStatus, sortHealthStatus, getLevel } from '../js/index';
import fetchData from '../js/http';

jest.mock('../js/http');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Game functions: ', () => {
  test('showHealthStatus should return correct status', () => {
    expect(showHealthStatus({ name: 'гладиатор', health: 25 })).toEqual(
      'wounded',
    );
    expect(showHealthStatus({ name: 'гладиатор', health: 5 })).toEqual(
      'critical',
    );
    expect(showHealthStatus({ name: 'гладиатор', health: 70 })).toEqual(
      'healthy',
    );
  });

  test('sortHealthStatus should return correct order of characters', () => {
    expect(
      sortHealthStatus([
        { name: 'бард', health: 15 },
        { name: 'чародей', health: 85 },
        { name: 'целитель', health: 20 },
        { name: 'ассассин', health: 45 },
        { name: 'страж', health: 90 },
      ]),
    ).toEqual([
      { name: 'страж', health: 90 },
      { name: 'чародей', health: 85 },
      { name: 'ассассин', health: 45 },
      { name: 'целитель', health: 20 },
      { name: 'бард', health: 15 },
    ]);
  });
});

describe('Functions for mocking: ', () => {
  test('fetchData should be called with correct url', () => {
    fetchData.mockReturnValue(JSON.stringify({}));
    getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
  });

  test('getLevel should return correct response', () => {
    fetchData.mockReturnValue({ status: 'ok', level: 100 });
    expect(getLevel(1)).toEqual('Ваш текущий уровень: 100');
  });
});
