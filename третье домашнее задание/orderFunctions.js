import { fetchPosts, fetchUsers } from './api.js';

export async function getRecentPosts(limit = 5) {
  try {
    const posts = await fetchPosts();
    return posts.sort((a, b) => b.id - a.id).slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPostsByTitleSearch(searchTerm) {
  try {
    const posts = await fetchPosts();
    return posts.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch {
    return [];
  }
}

export async function getPostsStats() {
  try {
    const [posts, users] = await Promise.all([fetchPosts(), fetchUsers()]);
    const totalPosts = posts.length;
    const totalUsers = users.length;
    return {
      totalPosts,
      totalUsers,
      avgPostsPerUser: totalUsers > 0 ? totalPosts / totalUsers : 0
    };
  } catch {
    return { totalPosts: 0, totalUsers: 0, avgPostsPerUser: 0 };
  }
}
