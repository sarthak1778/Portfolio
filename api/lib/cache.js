// Lightweight in-memory TTL cache for serverless functions
const store = new Map();

function get(key) {
  const item = store.get(key);
  if (!item) return null;
  if (Date.now() > item.expiresAt) {
    store.delete(key);
    return null;
  }
  return item.value;
}

function set(key, value, ttlSeconds = 300) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000
  });
}

function del(key) {
  store.delete(key);
}

module.exports = { get, set, del };
