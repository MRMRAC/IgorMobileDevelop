// Функция для подсчёта суммы всех переданных чисел
export function calculateTotal(...prices) {
  let sum = 0;
  for (let price of prices) {
    sum += price;
  }
  return sum;
}

// Функция для форматирования информации о пользователе
export function formatUserInfo(user) {
  const name = user.name;
  const email = user.email;
  const isActive = user.isActive;

  let status = "Inactive";
  if (isActive) {
    status = "Active";
  }

  return `Пользователь: ${name} (${email}). Status: ${status}`;
}
