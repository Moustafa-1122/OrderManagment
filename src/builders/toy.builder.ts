import { Toy } from "../model/toy.model";
import logger from "../util/logger";

export class ToyBuilder {
    private item!: string;
    private ageRange!: string
    private price!: number;
    private quantity!: number;
    private customerName!: string
    private orderDate!: string;
    private paymentMethod!: string;
    private status!: string;

    setItem(item: string): ToyBuilder {
        this.item = item;
        return this;
    }

    setAgeRange(ageRange: string): ToyBuilder {
        this.ageRange = ageRange;
        return this;
    }

    setPrice(price: number): ToyBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): ToyBuilder {
        this.quantity = quantity;
        return this;
    }   

    setCustomerName(customerName: string): ToyBuilder {
        this.customerName = customerName;
        return this;
    }

    setOrderDate(orderDate: string): ToyBuilder {
        this.orderDate = orderDate;
        return this;
    }   

    setPaymentMethod(paymentMethod: string): ToyBuilder {
        this.paymentMethod = paymentMethod; 
        return this;
    }

    setStatus(status: string): ToyBuilder {
        this.status = status;
        return this;
    }

    build() {
        const requiredFields = [
            this.item,
            this.ageRange,
            this.price,
            this.quantity,
            this.customerName,
            this.orderDate,
            this.paymentMethod,
            this.status
        ];
        for(const prop of requiredFields) {
            if(!prop) {
                logger.error('Missing required field for Toy order');
                throw new Error('Missing required field for Toy order');
            }
        }

        return new Toy( 
            this.item,
            this.ageRange,  
            this.price,
            this.quantity,
            this.customerName,
            this.orderDate,
            this.paymentMethod,
            this.status
        );
    }   
}