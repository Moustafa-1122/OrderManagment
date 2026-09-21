import { Cake } from "../model/cake.model";
import logger from "../util/logger";

export class CakeBuilder{
    private item!: string;
    private price!: number;
    private quantity!: number;
    private customerName!: string;
    private orderDate!: string;
    private paymentMethod!: string;
    private status!: string;

   

    setItem(item: string): CakeBuilder {//method chaining(returning the same object to call another method on it )
        this.item = item;
        return this;
    }

    setPrice(price: number): CakeBuilder {
        if(price <= 0){
            logger.error("Price cannot be negative");
            throw new Error("Price cannot be negative");
        }
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): CakeBuilder {
        if(quantity <= 0){
            logger.error("Quantity cannot be negative");
            throw new Error("Quantity cannot be negative");
        }
        this.quantity = quantity;
        return this;
    }

    setCustomerName(customerName: string): CakeBuilder {
        if(!customerName || customerName.trim() === "") {
            logger.error("Customer name cannot be empty");
            throw new Error("Customer name cannot be empty");
        }
        this.customerName = customerName;
        return this;
    }

    setOrderDate(orderDate: string): CakeBuilder {
        if(!orderDate || orderDate.trim() === "") {
            logger.error("Order date cannot be empty");
            throw new Error("Order date cannot be empty");
        }
        this.orderDate = orderDate;
        return this;
    }

    setPaymentMethod(paymentMethod: string): CakeBuilder {
        this.paymentMethod = paymentMethod;
        return this;
    }

    setStatus(status: string): CakeBuilder {
        this.status = status;
        return this;
    }

    

    build() {
    const requiredFields = [//if any of these fields are missing, log an error and throw an error mafik tekhla2 cakeOrder
        this.item,
        this.price,
        this.quantity,
        this.customerName,
        this.orderDate,
        this.paymentMethod,
        this.status
    ];
    for(const prop of requiredFields) {
        if(!prop) {
            logger.error("Missing required field for Cake");
            throw new Error("Missing required field for Cake");
        }  
    }

        return new Cake(
            this.item,
            this.price,
            this.quantity,
            this.customerName,
            this.orderDate,
            this.paymentMethod,
            this.status
        );
    }
}