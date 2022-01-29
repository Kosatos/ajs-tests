import fetchData from './http';

export function showHealthStatus({ name: name, health: health }) {
  if (health > 50) {
    return "healthy";
  } else if (health < 15) {
    return "critical";
  } else {
    return "wounded";
  }
}
export function sortHealthStatus(arr) {
  const sortArray = arr.sort((current, next) => {
    return next.health - current.health;
  });

  return sortArray;
}

export function getLevel(userId) {
  const response = fetchData(`https://server/user/${userId}`);

  // TODO: логика обработки
  if (response.status === "ok") {
    return `Ваш текущий уровень: ${response.level}`;
  }

  return `Информация об уровне временно недоступна`;
}
