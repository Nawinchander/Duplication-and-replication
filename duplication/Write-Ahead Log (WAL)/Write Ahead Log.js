// Client → Write → WAL (Log)
//                    ↓
//          Duplicate Consumers (DB replicas, backups, analytics)


class WriteAheadLog {
  constructor() {
    this.log = [];
  }

  append(entry) {
    this.log.push(entry);
  }

  getLogs(fromIndex = 0) {
    return this.log.slice(fromIndex);
  }
}

class PrimaryDB {
  constructor(wal) {
    this.data = new Map();
    this.wal = wal;
  }

  write(key, value) {
    const entry = {
      key,
      value,
      timestamp: Date.now()
    };

    // Step 1: write to WAL (durability guarantee)
    this.wal.append(entry);

    // Step 2: apply to primary DB
    this.data.set(key, value);
  }

  read(key) {
    return this.data.get(key);
  }
}

class ReplicaDB {
  constructor(name, wal) {
    this.name = name;
    this.data = new Map();
    this.wal = wal;
    this.lastSyncedIndex = 0;
  }

  sync() {
    const logs = this.wal.getLogs(this.lastSyncedIndex);

    for (const entry of logs) {
      this.data.set(entry.key, entry.value);
      this.lastSyncedIndex++;
    }
  }

  read(key) {
    return this.data.get(key);
  }
}

// Setup
const wal = new WriteAheadLog();
const primary = new PrimaryDB(wal);
const replica1 = new ReplicaDB("Replica-1", wal);
const replica2 = new ReplicaDB("Replica-2", wal);

// Writes
primary.write("user:1", { name: "Nawin" });
primary.write("order:1", { status: "PLACED" });

// Replication via duplication log replay
replica1.sync();
replica2.sync();

console.log(replica1.read("user:1"));
console.log(replica2.read("order:1"));




