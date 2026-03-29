// Region A ↔ Region B ↔ Region C
// (each can accept writes)

class MultiRegionDB {
  constructor(region) {
    this.region = region;
    this.data = new Map();
    this.peers = [];
  }

  connect(peer) {
    this.peers.push(peer);
  }

  write(key, value) {
    const record = {
      value,
      timestamp: Date.now(),
      region: this.region
    };

    this.data.set(key, record);

    // replicate to peers
    this.replicate(key, record);
  }

  read(key) {
    return this.data.get(key)?.value;
  }

  async replicate(key, record) {
    for (const peer of this.peers) {
      peer.receiveReplication(key, record);
    }
  }

  receiveReplication(key, incomingRecord) {
    const existing = this.data.get(key);

    if (!existing || incomingRecord.timestamp > existing.timestamp) {
      this.data.set(key, incomingRecord);
    }
  }
}

// Usage
const regionA = new MultiRegionDB("India");
const regionB = new MultiRegionDB("US");

regionA.connect(regionB);
regionB.connect(regionA);

// Conflict scenario
regionA.write("order:1", "PLACED");
setTimeout(() => {
  regionB.write("order:1", "CANCELLED");
}, 10);

setTimeout(() => {
  console.log(regionA.read("order:1")); // depends on timestamp resolution
}, 100);




