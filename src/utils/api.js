import { API_URL, ORDERS_API_URL } from '@utils/constants';

export const getIngredients = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error('Не удалось получить список ингредиентов');
  }

  return data;
};

export const createOrder = async (ingredients) => {
  const response = await fetch(ORDERS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success || !Number.isInteger(data.order?.number)) {
    throw new Error('Не удалось получить номер заказа');
  }

  return data.order.number;
};
