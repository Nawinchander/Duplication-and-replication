// You have a product list.
// Every night at 12 AM, you create a snapshot backup.

// After that, if main data changes → backup remains same.


let productDB = {
  p1: { name: "Shoes", price: 2000 },
  p2: { name: "Watch", price: 5000 }
};

let backupSnapshot = null;

// Take snapshot
function takeBackup() {
  backupSnapshot = JSON.parse(JSON.stringify(productDB));
  console.log("Backup taken successfully");
}

// Simulate backup at night
takeBackup();

console.log("Before change:", backupSnapshot);

// Change main DB
productDB.p1.price = 2500;

console.log("After change:");
console.log("Main DB:", productDB);
console.log("Backup Snapshot:", backupSnapshot);