let primaryDB = {
  users: []
};

let replicaA = {};
let replicaB = {};

// Replicate data
function syncReplicas() {
  replicaA = JSON.parse(JSON.stringify(primaryDB));
  replicaB = JSON.parse(JSON.stringify(primaryDB));
}

// Add user (write only to primary)
function addUser(name) {
  primaryDB.users.push(name);
  syncReplicas(); // automatic sync
}

// Read from replica (load balancing)
function getUsers(server) {
  if (server === "A") {
    return replicaA.users;
  } else {
    return replicaB.users;
  }
}

// Initial sync
syncReplicas();

addUser("Nawin");
addUser("Ironman");

console.log("Read from Replica A:", getUsers("A"));
console.log("Read from Replica B:", getUsers("B"));