// Client → Leader Cache → Replication Log → Followers


class DistributedCache {
  constructor() {
    this.store = new Map();
    this.followers = [];
  }

  addFollower(node) {
    this.followers.push(node);
  }

  async set(key, value) {
    this.store.set(key, value);

    // async replication (non-blocking)
    this.replicate(key, value);
  }

  get(key) {
    return this.store.get(key);
  }

  async replicate(key, value) {
    const promises = this.followers.map(follower =>
      follower.sync(key, value)
    );

    // Fire-and-forget replication
    Promise.allSettled(promises);
  }
}

class FollowerCache {
  constructor(name) {
    this.name = name;
    this.store = new Map();
  }

  async sync(key, value) {
    // simulate network delay
    await new Promise(res => setTimeout(res, Math.random() * 100));
    this.store.set(key, value);
  }

  get(key) {
    return this.store.get(key);
  }
}

// Usage
const leader = new DistributedCache();
const follower1 = new FollowerCache("US-East");
const follower2 = new FollowerCache("EU-West");

leader.addFollower(follower1);
leader.addFollower(follower2);

(async () => {
  await leader.set("user:1", { name: "Nawin" });

  setTimeout(() => {
    console.log(follower1.get("user:1")); // eventually consistent
  }, 200);
})();




