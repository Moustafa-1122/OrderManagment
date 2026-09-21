import { FinanceCalculator, Order, OrderManagment, Validator } from "../src/App";
import { BookBuilder } from "../src/builders/book.builder";
import { ToyBuilder } from "../src/builders/toy.builder";
import { CakeBuilder } from "../src/builders/cake.builder";

describe("OrderManagment", () => {

    //before all new validator and calculator will be created for each test
    //before each new order manager
    let validator: Validator
    let calc: FinanceCalculator
    let orderManager: OrderManagment
    let baseValidator: (order: Order) => void

    beforeAll(() => {
        validator = new Validator([]);
        calc = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate
        validator.validate = jest.fn()//Moch
        orderManager = new OrderManagment(validator, calc);

    });
    afterEach(() => {
        validator.validate = baseValidator
    })


    it("should add in order", () => {
        //Arrange

        const item = "spong";
        const price = 15;

        //Act 
        orderManager.addOrder(item, price);

        //Assert
        expect(orderManager.getOrders()).toEqual([{ id: 1, item, price }])
    });


    it("should get a specifik order", () => {
        //Arrange

        const item = "spong";
        const price = 15;
        orderManager.addOrder(item, price);
        //Act 
        const order = orderManager.getOrder(1);

        //Assert

        expect(order).toEqual({ id: 1, item, price })
    });
    it("should call financial calculater getRevenue", () => {
        const item = "spong";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc, "getRevenue")//bi alb l calc(FinancialCalculator) 3ena function esma getRevenue badi yek ttsama3 3laya
        orderManager.getTotalRevenue();
        expect(spy).toHaveBeenCalled();//t2akad eza t3ayatla lal getTotlaRevenue :(totalRevenue=Revenue)
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }])//t2adak enu t3ayatla bi hayda l order
        expect(spy).toHaveReturnedWith(15)//lezm ytla3 15

    });
    it("should throw addition exception if validator don't pass", () => {
        const item = "sponge"
        const price = 10;
        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("invalid order")
        })


        expect(() => orderManager.addOrder(item, price)).toThrow("[OrderManagment] error adding error invalid order")
    })

});

describe("FinanceCalculator", () => {
    it("should calculate total revenue", () => {
        //Arrange   

        const clac = new FinanceCalculator();
        const orders = [
            { id: 1, item: "spong", price: 15 },
            { id: 2, item: "spong", price: 25 },
            { id: 3, item: "spong", price: 35 }
        ]
        //Act 
        const totalRevenue = clac.getRevenue(orders);
        //Assert
        expect(totalRevenue).toEqual(75)
    });

    it("should calculate average buy power", () => {
        //Arrange
        const clac = new FinanceCalculator();
        const orders = [
            { id: 1, item: "spong", price: 15 },
            { id: 2, item: "spong", price: 25 },
            { id: 3, item: "spong", price: 35 }
        ]
        //Act
        const averageBuyPower = clac.getAverageBuyPower(orders);
        //Assert
        expect(averageBuyPower).toEqual(25)
    });

});




describe("validate BookBuilder", () => {
    it("should build a book with correct properties when all fields are provided", () => {
        // Arrange
        const bookBuilder = new BookBuilder();
        bookBuilder.setItem("www")
            .setAuthor("Moustafa")
            .setPrice(10)
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");
            

        // Act
        const book = bookBuilder.build();

        // Assert
        expect(book.getItem()).toEqual("www");
        expect(book.getAuthor()).toEqual("Moustafa");
        expect(book.getPrice()).toEqual(10);
        expect(book.getQuantity()).toEqual(10);
        expect(book.getCustomerName()).toEqual("Mariam");
        expect(book.getOrderDate()).toEqual("16/06/2024");
        expect(book.getPaymentMethod()).toEqual("credit card");
        expect(book.getStatus()).toEqual("on hold");
    });

    it("should throw an error when a required field is missing", () => {
        // Arrange
        const bookBuilder = new BookBuilder();
        bookBuilder.setItem("www")
            .setAuthor("Moustafa")
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");
            
        //missing price field

        // Act & Assert
        expect(() => bookBuilder.build()).toThrow("Missing required field");
    });
});



describe("validate ToyBuilder", () => {
    it("should build a toy with correct properties when all fields are provided", () => {
        const toyBuilder = new ToyBuilder();
        toyBuilder.setItem("car")
            .setAgeRange("3-5 years")
            .setPrice(10)
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");

        const toy = toyBuilder.build();

        expect(toy.getItem()).toEqual("car");
        expect(toy.getPrice()).toEqual(10);
        expect(toy.getQuantity()).toEqual(10);
        expect(toy.getCustomerName()).toEqual("Mariam");
        expect(toy.getOrderDate()).toEqual("16/06/2024");
        expect(toy.getPaymentMethod()).toEqual("credit card");
        expect(toy.getStatus()).toEqual("on hold");
    });

    it("should throw an error when a required field is missing", () => {
        const toyBuilder = new ToyBuilder();
        toyBuilder.setItem("car")
            .setAgeRange("3-5 years")
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");

        expect(() => toyBuilder.build()).toThrow("Missing required field");
    });
});



describe("validate CakeBuilder", () => {
    it("should build a cake with correct properties when all fields are provided", () => {
        const cakeBuilder = new CakeBuilder();
        cakeBuilder.setItem("Chocolate cake")
            .setPrice(10)
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");

        const cake = cakeBuilder.build();

        expect(cake.getItem()).toEqual("Chocolate cake");
        expect(cake.getPrice()).toEqual(10);
        expect(cake.getQuantity()).toEqual(10);
        expect(cake.getCustomerName()).toEqual("Mariam");
        expect(cake.getOrderDate()).toEqual("16/06/2024");
        expect(cake.getPaymentMethod()).toEqual("credit card");
        expect(cake.getStatus()).toEqual("on hold");
    });

    it("should throw an error when a required field is missing", () => {
        const cakeBuilder = new CakeBuilder();
        cakeBuilder.setItem("Chocolate cake")
            .setQuantity(10)
            .setCustomerName("Mariam")
            .setOrderDate("16/06/2024")
            .setPaymentMethod("credit card")
            .setStatus("on hold");

        expect(() => cakeBuilder.build()).toThrow("Missing required field");
    });
});

