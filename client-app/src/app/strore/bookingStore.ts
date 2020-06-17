import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";

import { IBooking } from './../models/Booking'

class BookingStore{ 
    @observable submiting = false;

    @action createBooking = async (booking: IBooking) => {
        this.submiting = true;

        try {
            await agent.Booking.create(booking);

            runInAction('continue create booking', () => {
                this.submiting = false;
            })
        } catch (error) {
            console.log(error);
            

            runInAction('error create booking', () => {
                this.submiting = false;
            })
        }
    }
}

export default createContext(new BookingStore())
