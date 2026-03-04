// Here we simulate replication triggered automatically when data changes.

const EventEmitter = require("events");
const emitter = new EventEmitter();

let primary = { balance: 1000 };
let replica = {};

// Listen for changes
emitter.on("dataChanged", () => {
  replica = JSON.parse(JSON.stringify(primary));
  console.log("Replica synced!");
});

// Update function
function updateBalance(amount) {
  primary.balance += amount;
  emitter.emit("dataChanged");
}

// Initial sync
emitter.emit("dataChanged");

updateBalance(500);

console.log("Primary:", primary);
console.log("Replica:", replica);