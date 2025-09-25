
import { getActiveUsers, getUserWithPosts, findUserByEmail } from './userFunctions.js';
import { getRecentPosts, getPostsByTitleSearch, getPostsStats } from './orderFunctions.js';
import { simulateLoading, withTimeout, retryOperation } from './utils.js';

async function main() {
  console.log('=== Начало демонстрации ===');

  try {
    console.log('1) Активные пользователи:');
    const activeUsers = await getActiveUsers();
    console.log(activeUsers);
    await simulateLoading(500);

    if (activeUsers.length > 0) {
      console.log('2) Первый активный пользователь + его посты:');
      const userData = await getUserWithPosts(activeUsers[0].id);
      console.log(userData);
      await simulateLoading(500);
    }

    console.log('3) Последние посты:');
    console.log(await getRecentPosts(5));
    await simulateLoading(500);

    console.log('4) Статистика по постам:');
    console.log(await getPostsStats());
    await simulateLoading(500);

    console.log('5) Поиск по email и по заголовку:');
    console.log(await findUserByEmail('Sincere@april.biz'));
    console.log(await getPostsByTitleSearch('qui'));

    console.log('6) Демонстрация retry + timeout:');
    let count = 0;
    const unstable = async () => {
      count++;
      if (count < 3) throw new Error('Ошибка (нестабильно)');
      return { success: true, attempt: count };
    };
    const result = await withTimeout(retryOperation(unstable, 5, 300), 5000);
    console.log(result);

  } catch (err) {
    console.error('Ошибка в main:', err.message);
  } finally {
    console.log('=== Конец демонстрации ===');
  }
}

main();
