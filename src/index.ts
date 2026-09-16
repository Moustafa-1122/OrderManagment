import { FinanceCalculator, OrderManagment, ValidateItem, ValidateMaxPrice, ValidatePrice, Validator } from "./App";



const orders = [
  { id: 1, item: "Sponge", price: 15 },
  { id: 2, item: "Chocolate", price: 20 },
  { id: 3, item: "Fruit", price: 18 },
  { id: 4, item: "Red Velvet", price: 25 },
  { id: 5, item: "Coffee", price: 8 },
];


const rules =[
new ValidateItem(),
new ValidatePrice(),
new ValidateMaxPrice()
];

const orderManagement = new OrderManagment(new Validator(rules), new FinanceCalculator());
for (const order of orders) {
  orderManagement.addOrder(order.item, order.price);
}



// Adding a new order directly
const newItem = "Marble";
const newPrice = 22;


console.log("Orders after adding a new order:", orderManagement.getOrders());

// Calculate Total Revenue directly

console.log("Total Revenue:", orderManagement.getTotalRevenue().toFixed(2));

// Calculate Average Buy Power directly

console.log("Average Buy Power:", orderManagement.getAverageBuyPower().toFixed(2));

// Fetching an order directly
const fetchId = 2;
const fetchedOrder = orderManagement.getOrder(fetchId);
console.log("Order with ID 2:", fetchedOrder);

// Attempt to fetch a non-existent order
const nonExistentId = 10;
const nonExistentOrder = orderManagement.getOrder(nonExistentId);
console.log("Order with ID 10 (non-existent):", nonExistentOrder);