import { API_URL } from '@utils/constants';

export const getIngredients = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  return response.json();
};
