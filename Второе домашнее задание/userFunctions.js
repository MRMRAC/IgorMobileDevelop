import { users } from "./data.js";

// 1. Создание пользователя
export function createUser({ name, email }) {
  const newId = Math.max(...users.map(u => u.id)) + 1;
  const newUser = { id: newId, name, email, isActive: true };
  users.push(newUser);
  return newUser;
}

// 2. Поиск по ID
export function findUserById(id) {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  const { name, email } = user;
  return { name, email };
}

// 3. Обновление пользователя
export function updateUser(id, updatedFields) {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updatedFields };
  return users[index];
}
