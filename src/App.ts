//single responsability principles(srp)
//open closed principles(ocp)

import logger from "./util/logger";

export interface Order {
    id: number,
    price: number,
    item: string
}

export class OrderManagment {
constructor(private validator:Ivalidator,private calculator:Icalculator) {
    logger.debug("orderManagment instance created with validator and calculator")

}

    private orders: Order[] = [];
    getOrders() {
        return this.orders
    }
    addOrder(item: string, price: number) {
        try{
            const order: Order = { id: this.orders.length + 1, item, price };
        this.validator.validate(order);
        this.orders.push(order);
        }catch(error:any) { 
            throw new Error("[OrderManagment] error adding error "+error.message)
        }
        
    }
    getOrder(id: number): Order | undefined {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            logger.warn(`[OrderManagment] Order with ID ${id} not found.`);
        }
        return order;
    }
    getTotalRevenue(): number {
        return this.calculator.getRevenue(this.orders);
    }
    getAverageBuyPower(): number {
        return this.calculator.getAverageBuyPower(this.orders);
    }

}

export class PremiumOrderManagment extends OrderManagment {
    getOrder(id: number): Order | undefined {
        console.log("Alert: Premium order management is being used.");
        return super.getOrder(id);
    }
       
    }



interface Ivalidator {
    validate(order: Order): void;
}

interface possibleItems {
    getPossibleItems(): string[];
}


export class Validator implements Ivalidator,possibleItems {
    getPossibleItems(): string[] {
       return ValidateItem.possibleItems;
    }

    constructor(private rules: Ivalidator[]) {

    }
    
    

    validate(order: Order): void {
        this.rules.forEach(rule => rule.validate(order));
    }

}

export class ValidateMaxPrice implements Ivalidator {
    validate(order: Order): void {
        if (order.price >100) {
             logger.error(`[ValidateItem] Invalid price:Price must be less than or equal to 100 ${order.price}`);
           
            throw new Error("Price must be less than or equal to 100");
        }
    }
}



export class ValidatePrice implements Ivalidator {

    validate(order: Order): void {
        if (order.price <= 0) {
             logger.error(`[ValidateItem] Invalid price: ${order.price}`);
            throw new Error(`Price must be a positive number. Given price: ${order.price}`);
        }
    }

}

export class ValidateItem implements Ivalidator {
    public static possibleItems = [
        "Sponge",
        "Chocolate",
        "Fruit",
        "Red Velvet",
        "Birthday",
        "Carrot",
        "Marble",
        "Coffee",
    ];

    validate(order: Order): void {
        if (!ValidateItem.possibleItems.includes(order.item)) {
            throw new Error(`Invalid item. Must be one of: ${ValidateItem.possibleItems.join(", ")}`);
        }
    }

}

interface Icalculator {
    getRevenue(orders: Order[]): number;
    getAverageBuyPower(orders: Order[]): number;
}

export class FinanceCalculator implements Icalculator {
        static getAverageBuyPower(orders: Order[]): number {
                return orders.length === 0
                        ? 0
                        : orders.reduce((total, order) => total + order.price, 0) / orders.length;
    }
    public  getRevenue(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.price, 0);
    }
    public  getAverageBuyPower(orders: Order[]): number {
        return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
    }

}
