let database = {
  product: "Laptop",
  price: 80000
};

let memoryCache = {};

// App startup
function loadCache() {
  memoryCache = JSON.parse(JSON.stringify(database));
}

loadCache();

console.log("Cache Loaded:", memoryCache);

// Update database
database.price = 85000;

console.log("After DB change:");
console.log("Database:", database);
console.log("Cache:", memoryCache);