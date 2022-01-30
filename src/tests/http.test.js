import fetchData from '../js/http';

test('fetchData should throw error', () => {
  expect(() => {
    fetchData('url');
  }).toThrow('Mock this!');
});
