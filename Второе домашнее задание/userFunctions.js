
import { users } from "./data.js";


//Создание пользователя
export function createUser({ name, email, isActive = true }) {
  
  const newId = Math.max(...users.map(u => u.id)) + 1;
  
  const newUser = { id: newId, name, email, isActive };

  
  users.push(newUser);
  
  return newUser;
}

// Поиск пользователя по ID
export function findUserById(id) {
  
  const user = users.find(u => u.id === id);

  
  if (!user) return null;
  
  const { name, email } = user;
  
  return { name, email };
}



// Обновление пользователя
export function updateUser(id, updatedFields) {
  
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updatedFields };
  return users[userIndex];
}
