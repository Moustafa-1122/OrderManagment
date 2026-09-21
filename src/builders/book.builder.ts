import { Book } from "../model/book.model";
import logger from "../util/logger";

export class BookBuilder {
    private item!: string
    private author!: string;
    private price!: number;
    private quantity!: number;
    private customerName!: string;
    private orderDate!: string
    private paymentMethod!: string;
    private status!: string;

    setItem(item: string): BookBuilder {
        this.item = item;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    setPrice(price: number): BookBuilder {
        if(price <= 0){
            logger.error("Price cannot be negative");
            throw new Error("Price cannot be negative");
        }
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): BookBuilder {
        if(quantity <= 0){
            logger.error("Quantity cannot be negative");
            throw new Error("Quantity cannot be negative");
        }
        this.quantity = quantity;
        return this;
    }

    setCustomerName(customerName: string): BookBuilder {
        if(!customerName || customerName.trim() === "") {
            logger.error("Customer name cannot be empty");
            throw new Error("Customer name cannot be empty");
        }
        this.customerName = customerName;
        return this;
    }

    setOrderDate(orderDate: string): BookBuilder {
         if(!orderDate || orderDate.trim() === "") {
            logger.error("Order date cannot be empty");
            throw new Error("Order date cannot be empty");
        }
        this.orderDate = orderDate;
        return this;
    }

    setPaymentMethod(paymentMethod: string): BookBuilder {
        this.paymentMethod = paymentMethod;
        return this;
    }

    setStatus(status: string): BookBuilder {
        this.status = status;
        return this;
    }

    build() {
        const requiredFields = [
            this.item,
            this.author,
            this.price,
            this.quantity,
            this.customerName,
            this.orderDate,
            this.paymentMethod,
            this.status
        ];
        for (const prop of requiredFields) {
            if (!prop) {
                logger.error("Missing required field");
                throw new Error("Missing required field");
            }
        }

        return new Book(
            this.item,
            this.author,
            this.price,
            this.quantity,
            this.customerName,
            this.orderDate,
            this.paymentMethod,
            this.status
        );
    }
}
