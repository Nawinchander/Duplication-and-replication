let primaryDB = {
  user1: "Nawin"
};

let replica1 = {};
let replica2 = {};

// Replication function
function replicate() {
  replica1 = JSON.parse(JSON.stringify(primaryDB));
  replica2 = JSON.parse(JSON.stringify(primaryDB));
}

// Update function
function updatePrimary(key, value) {
  primaryDB[key] = value;
  replicate(); // auto sync
}

// Initial replication
replicate();

console.log("Before Update:");
console.log(replica1);

// Update primary
updatePrimary("user1", "Ironman Nawin");

console.log("After Update:");
console.log("Replica1:", replica1);
console.log("Replica2:", replica2);