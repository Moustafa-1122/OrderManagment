import { FinanceCalculator, OrderManagment, ValidateItem, ValidateMaxPrice, ValidatePrice, Validator } from "./App";
import logger from "./util/logger";


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
const item = "Sponge";
const price = 45;
orderManagement.addOrder(item, price);


logger.info("Orders after adding a new order:%o", orderManagement.getOrders());

// Calculate Total Revenue directly

logger.info("Total Revenue: %o", orderManagement.getTotalRevenue().toFixed(2));

// Calculate Average Buy Power directly

logger.info("Average Buy Power: %o", orderManagement.getAverageBuyPower().toFixed(2));

// Fetching an order directly
const fetchId = 2;
const fetchedOrder = orderManagement.getOrder(fetchId);
logger.info("Order with ID 2: %o", fetchedOrder);//%o:bikhalini etba3 l object kamel %d:bikhalini etba3 l number bas %e:bikhalini etba3 l error message bas %s:bikhalini etba3 l string bas %y:bi

// Attempt to fetch a non-existent order
const nonExistentId = 10;
const nonExistentOrder = orderManagement.getOrder(nonExistentId);
logger.info("Order with ID 10 (non-existent): %o", nonExistentOrder);