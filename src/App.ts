//single responsability principles(srp)
//open closed principles(ocp)

export interface Order {
    id: number,
    price: number,
    item: string
}

export class OrderManagment {
constructor(private validator:Ivalidator,private calculator:Icalculator) {

}

    private orders: Order[] = [];
    getOrders() {
        return this.orders
    }
    addOrder(item: string, price: number) {
        const order: Order = { id: this.orders.length + 1, item, price };
        this.validator.validate(order);
        this.orders.push(order);
    }
    getOrder(id: number): Order | undefined {
        return this.getOrders().find(order => order.id === id);
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
        if (order.price <= 0) {
            throw new Error("Price must be greater than zero");
        }
    }
}



export class ValidatePrice implements Ivalidator {

    validate(order: Order): void {
        if (order.price > 100) {
            throw new Error(`Price must not exceed 100. Given price: ${order.price}`);
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
    static getAverageBuyPower(orders: { id: number; item: string; price: number; }[]) {
      throw new Error("Method not implemented.");
    }
    public  getRevenue(orders: Order[]): number {
        return orders.reduce((total, order) => total + order.price, 0);
    }
    public  getAverageBuyPower(orders: Order[]): number {
        return orders.length === 0 ? 0 : this.getRevenue(orders) / orders.length;
    }

}