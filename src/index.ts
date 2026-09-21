import { BookBuilder } from './builders/book.builder';
import { CakeBuilder } from './builders/cake.builder';
import { ToyBuilder } from './builders/toy.builder';

async function main() {
  const cakeBuilder = new CakeBuilder();
  cakeBuilder.setItem("type")//method chaining(returning the same object to call another method on it )
  .setPrice(20)
  .setQuantity(2)
  .setCustomerName("customerName")
  .setOrderDate("orderDate")
  .setPaymentMethod("paymentMethod")
  .setStatus("status")
  .build();// Build the cake order using the builder retuns a cake object

  const cake = cakeBuilder.build();
  console.log(cake);

  const bookBuilder = new BookBuilder();
  bookBuilder.setItem("item")
  .setAuthor("author")
  .setPrice(15)
  .setQuantity(1)
  .setCustomerName("customerName")
  .setOrderDate("orderDate")
  .setPaymentMethod("paymentMethod")
  .setStatus("status")
  .build();// Build the book order using the builder retuns a book object
  const book = bookBuilder.build();
  console.log(book);

  const toyBuilder = new ToyBuilder();
  toyBuilder.setItem("item")
  .setAgeRange("ageRange")
  .setPrice(10)
  .setQuantity(3)
  .setCustomerName("customerName")
  .setOrderDate("orderDate")
  .setPaymentMethod("paymentMethod")
  .setStatus("status")
  .build();// Build the toy order using the builder retuns a toy object
  const toy = toyBuilder.build();
  console.log(toy);

}
main();
