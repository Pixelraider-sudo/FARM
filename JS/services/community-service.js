/* =========================================================
   AgriSense — Community Service (ES6 Module)
========================================================= */

import { getAll, create, update, remove, STORAGE_KEYS } from "./storage-service.js";

const SEED_POSTS = [
  { author: "Wanjiru K.", title: "Best time to top-dress maize this season?", body: "My maize is about 5 weeks old. Rains have been inconsistent — should I wait or top-dress now?", tag: "Maize", likes: 4, comments: [{ author: "Mutiso J.", text: "I'd top-dress now if there's any moisture in the soil — waiting too long costs more yield than a slightly dry application." }] },
  { author: "Achieng O.", title: "Tuta absoluta taking over my tomatoes", body: "Tried pheromone traps but still losing fruit. Any organic options that actually work?", tag: "Tomatoes", likes: 7, comments: [] },
  { author: "Otieno B.", title: "Anyone using tissue-culture bananas?", body: "Thinking of switching from suckers to tissue-culture plantlets for disease resistance. Worth the extra cost?", tag: "Banana", likes: 3, comments: [{ author: "Wanjiru K.", text: "Yes — the disease resistance alone paid for itself within two seasons for me." }] },
];

function ensureSeeded() {
  const existing = getAll(STORAGE_KEYS.COMMUNITY_POSTS);
  if (existing.length === 0) {
    SEED_POSTS.forEach((p) => create(STORAGE_KEYS.COMMUNITY_POSTS, p, "post"));
  }
}

export function getPosts() {
  ensureSeeded();
  return getAll(STORAGE_KEYS.COMMUNITY_POSTS).sort((a, b) => b.createdAt - a.createdAt);
}

export function createPost(data) {
  return create(STORAGE_KEYS.COMMUNITY_POSTS, { likes: 0, comments: [], ...data }, "post");
}

export function likePost(id) {
  const posts = getAll(STORAGE_KEYS.COMMUNITY_POSTS);
  const post = posts.find((p) => p.id === id);
  if (!post) return null;
  return update(STORAGE_KEYS.COMMUNITY_POSTS, id, { likes: (post.likes || 0) + 1 });
}

export function addComment(id, author, text) {
  const posts = getAll(STORAGE_KEYS.COMMUNITY_POSTS);
  const post = posts.find((p) => p.id === id);
  if (!post) return null;
  const comments = [...(post.comments || []), { author, text }];
  return update(STORAGE_KEYS.COMMUNITY_POSTS, id, { comments });
}

export function deletePost(id) {
  return remove(STORAGE_KEYS.COMMUNITY_POSTS, id);
}
