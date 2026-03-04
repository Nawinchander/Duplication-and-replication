// You have servers in:

// India
// US
// Europe

// Write once → replicate everywhere.
// (Like global databases in real systems such as Amazon Web Services or Google Cloud)


let primaryRegion = { orders: [] };
let indiaRegion = {};
let usRegion = {};
let europeRegion = {};

function globalReplication() {
  indiaRegion = JSON.parse(JSON.stringify(primaryRegion));
  usRegion = JSON.parse(JSON.stringify(primaryRegion));
  europeRegion = JSON.parse(JSON.stringify(primaryRegion));
}

function createOrder(order) {
  primaryRegion.orders.push(order);
  globalReplication();
}

globalReplication();

createOrder("Order-101");

console.log("India:", indiaRegion.orders);
console.log("US:", usRegion.orders);
console.log("Europe:", europeRegion.orders);