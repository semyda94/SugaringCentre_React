import { action } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";
import { IOrder } from "./../models/orders/Order";


class OderStore {
  @action createOrder = async (order: IOrder) => {

    try {
        await agent.Order.create(order);
    } catch (error) {
        console.log(error);
        
    }
  };
}

export default createContext(new OderStore());
