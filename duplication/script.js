let mainDatabase = {
  user1: "Nawin",
  user2: "Ironman"
};

// Manual duplication
function duplicateDatabase(db) {
  return JSON.parse(JSON.stringify(db));
}

let backupDatabase = duplicateDatabase(mainDatabase);

console.log("Before change:");
console.log(backupDatabase);

// Change original
mainDatabase.user1 = "Updated Nawin";

console.log("After change:");
console.log("Backup:", backupDatabase);
console.log("Main:", mainDatabase);