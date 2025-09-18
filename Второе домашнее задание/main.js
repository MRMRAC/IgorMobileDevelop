import { users, orders } from "./data.js";
import { createUser, findUserById, updateUser } from "./userFunctions.js";
import { getUserOrders, addProductToOrder, getOrderSummary } from "./orderFunctions.js";
import { calculateTotal, formatUserInfo } from "./utils.js";

// --- Работа с пользователями ---
console.log("=== Пользователи ===");
console.log("Все пользователи:", users);

const newUser = createUser({ name: "Иван", email: "ivan@yandex.ru" });
console.log("Новый пользователь:", newUser);

console.log("Поиск пользователя id=2:", findUserById(2));
console.log("Поиск пользователя id=99:", findUserById(99));

console.log("Обновление пользователя id=1:", updateUser(1, { email: "alice_new@yandex.ru" }));

// --- Работа с заказами ---
console.log("\n**********************Заказы*****************************");
console.log("Все заказы:", orders);

console.log("Заказы пользователя id=1:", getUserOrders(1));

console.log("Добавляем продукт в заказ 101:", addProductToOrder(101, "Тетрадь"));

console.log("Сводка по заказу 103:", getOrderSummary(103));

// --- Вспомогательные функции ---
console.log("\n=== Вспомогательные функции ===");
console.log("Общая сумма:", calculateTotal(10, 20.5, 5));

console.log("Форматированная инфо о пользователе:", formatUserInfo(users[0]));
