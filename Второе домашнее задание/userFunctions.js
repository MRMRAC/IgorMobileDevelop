import { orders } from "./data.js";

// Получить заказы пользователя по userId
export function getUser Orders(userId) {
  // Фильтруем заказы, чтобы оставить только те, где userId совпадает
  return orders.filter(order => order.userId === userId);
}

// Добавить новый товар в заказ по orderId
export function addProductToOrder(orderId, newProduct) {
  // Находим заказ по id
  const order = orders.find(order => order.id === orderId);
  if (!order) {
    // Если заказ не найден, возвращаем null
    return null;
  }
  // Добавляем новый товар в массив products
  order.products.push(newProduct);
  return order;
}

// Получить краткую информацию о заказе
export function getOrderSummary(orderId) {
  // Находим заказ по id
  const order = orders.find(order => order.id === orderId);
  if (!order) {
    return null;
  }

  // Считаем количество товаров
  const productsCount = order.products.length;
  // Форматируем сумму с двумя знаками после запятой и добавляем знак $
  const total = `$${order.total.toFixed(2)}`;
  // Статус делаем заглавными буквами
  const status = order.status.toUpperCase();
  const userId = order.userId;

  return {
    productsCount,
    total,
    status,
    userId
  };
}
