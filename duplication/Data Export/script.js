// You export user data from your app to a reporting system.
// After export → no automatic sync


let mainUsers = [
  { id: 1, name: "Nawin" },
  { id: 2, name: "Ironman" }
];

let reportingSystem = [];

// Manual export
function exportData() {
  reportingSystem = JSON.parse(JSON.stringify(mainUsers));
  console.log("Data exported!");
}

exportData();

console.log("Reporting Data:", reportingSystem);

// Change main system
mainUsers.push({ id: 3, name: "MBA Engineer" });

console.log("After change:");
console.log("Main:", mainUsers);
console.log("Reporting:", reportingSystem);


