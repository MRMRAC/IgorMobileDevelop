import { fetchUsers, fetchUserById, fetchPostsByUserId } from './api.js';

export async function getActiveUsers() {
  try {
    const users = await fetchUsers();
    return users.filter(u => u.id % 2 === 0);
  } catch {
    return [];
  }
}

export async function getUserWithPosts(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetchUserById(userId),
      fetchPostsByUserId(userId)
    ]);
    if (!user) return null;
    return { ...user, posts };
  } catch {
    return null;
  }
}

export async function findUserByEmail(email) {
  try {
    const users = await fetchUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  } catch {
    return null;
  }
}
