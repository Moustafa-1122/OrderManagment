import { FinanceCalculator, Order, OrderManagment, Validator } from "../src/App";

describe("OrderManagment", () => {

    //before all new validator and calculator will be created for each test
    //before each new order manager
    let validator: Validator
    let calc: FinanceCalculator
    let orderManager: OrderManagment
    let baseValidator:(order:Order) =>void

    beforeAll(() => {
        validator = new Validator([]);
        calc = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate
        validator.validate = jest.fn()//Moch
        orderManager = new OrderManagment(validator, calc);

    });
    afterEach(()=>{
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
    it("should call financial calculater getRevenue",()=>{
         const item = "spong";
        const price = 15;
        orderManager.addOrder(item, price);
        const spy = jest.spyOn(calc,"getRevenue")//bi alb l calc(FinancialCalculator) 3ena function esma getRevenue badi yek ttsama3 3laya
        orderManager.getTotalRevenue();
        expect(spy).toHaveBeenCalled();//t2akad eza t3ayatla lal getTotlaRevenue :(totalRevenue=Revenue)
        expect(spy).toHaveBeenCalledWith([{ id: 1, item, price }])//t2adak enu t3ayatla bi hayda l order
        expect(spy).toHaveReturnedWith(15)//lezm ytla3 15

    });
    it("should throw addition exception if validator don't pass",()=>{
        const item="sponge"
        const price=10;
        (validator.validate as jest.Mock).mockImplementation(()=>{
            throw new Error("invalid order")
        })

        
        expect(()=>orderManager.addOrder(item, price)).toThrow("[OrderManagment] error adding error invalid order")
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