const BASE = 'https://jsonplaceholder.typicode.com';

async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (err) {
    console.error(`[api] Ошибка при запросе ${url}:`, err.message);
    throw err;
  }
}

export async function fetchUsers() {
  return await safeFetch(`${BASE}/users`);
}

export async function fetchUserById(id) {
  try {
    const data = await safeFetch(`${BASE}/users/${id}`);
    if (!data || Object.keys(data).length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export async function fetchPosts() {
  return await safeFetch(`${BASE}/posts`);
}

export async function fetchPostsByUserId(userId) {
  return await safeFetch(`${BASE}/posts?userId=${userId}`);
}
