// Сумма
export function calculateTotal(...prices) {
  return prices.reduce((acc, p) => acc + p, 0);
}

// Форматирование информации
export function formatUserInfo(user) {
  const { name, email, isActive } = user;
  return `Пользователь: ${name} (${email}). Status: ${isActive ? "Active" : "Inactive"}`;
}
