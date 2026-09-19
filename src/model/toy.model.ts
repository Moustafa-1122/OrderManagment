import { Item, itemCategory } from "./item.model";

export class Toy implements Item {
    private item: string;
    private ageRange: string;
    private price: number;
    private quantity: number;
    private customerName: string;
    private orderDate: string;
    private paymentMethod: string;
    private status: string;

    constructor(
        item: string,
        ageRange: string,
        price: number,
        quantity: number,
        customerName: string,
        orderDate: string,
        paymentMethod: string,
        status: string
    ) {
        this.item = item;
        this.ageRange = ageRange;
        this.price = price;
        this.quantity = quantity;
        this.customerName = customerName;
        this.orderDate = orderDate;
        this.paymentMethod = paymentMethod;
        this.status = status;
    }

    getItem() {
        return this.item;
    }

    getAgeRange() {
        return this.ageRange;
    }

    getCategory() {
        return itemCategory.TOY;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }

    getTotal() {
        return this.price * this.quantity;
    }

    getCustomerName() {
        return this.customerName;
    }

    getOrderDate() {
        return this.orderDate;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    getStatus() {
        return this.status;
    }
}