import { action, observable, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";
import { IOrder } from "./../models/orders/Order";


class DashboardStore {
    @observable ordersCount = 0; 
    @observable ordersAmount = 0;
    @observable bookingsCount = 0;

    @action loadOrdersCount = async () => {

        try {
            const count = await agent.Order.count();

            runInAction(() => {
                this.ordersCount = count;
            })
        } catch (error) {
            console.log(error);
        }
    };

    @action loadOrdersAmount = async () => {

        try {
            const amount = await agent.Order.amount();

            runInAction(() => {
                this.ordersAmount = amount;
            })
        } catch (error) {
            console.log(error);
        }
    };

    @action loadBookingsCount = async () => {
        try {
            const count = await agent.Booking.count();

            runInAction(() => {
                this.bookingsCount = count;
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default createContext(new DashboardStore());
