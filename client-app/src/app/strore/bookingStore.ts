import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";

import { IBooking } from './../models/Booking'

class BookingStore{ 
    @observable listForStaff : IBooking[] = [];
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

    @action loadForStaff =  async (id: number) : Promise<IBooking[]> => {
        this.submiting = true;

        try {
            const bookings = await agent.Booking.forStaff(id);

            runInAction('Continue getting bookings for staff', () => {
                this.listForStaff = bookings;
                this.submiting = false;

                return bookings;
            });
        } catch (error) {
            console.log(error);

            runInAction('Error getting bookings for staff', () => {
                this.submiting = false;

                return []
            });
        }

        return [];
    }
}

export default createContext(new BookingStore())
