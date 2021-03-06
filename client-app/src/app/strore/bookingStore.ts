import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";

import { IBooking } from './../models/Booking';
import { EmailService} from './../services/EmailService';

class BookingStore{ 
    @observable bookingList : IBooking[] = [];
    @observable selectedBooking: IBooking | undefined = undefined; 

    @observable listForStaff : IBooking[] = [];
    @observable submiting = false;

    @action createBooking = async (booking: IBooking, masterName: string) => {
        this.submiting = true;

        try {
            await agent.Booking.create(booking);

            runInAction('continue create booking', () => {
                this.submiting = false;
                console.log(booking);
                
                EmailService.NewBookingEmail(booking.email, booking.date, booking.time, masterName);
            })
        } catch (error) {
            console.log(error);
            

            runInAction('error create booking', () => {
                this.submiting = false;
            })
        }
    }

    @action editBooking = async (booking: IBooking) => {
        this.submiting = true;

        try {
            await agent.Booking.edit(booking);

            runInAction(() => {
                this.cleanSelectedBooking();
                this.submiting = false;
            });
        } catch (error) {
            console.log(error);
            
            runInAction('Error update booking', () => {
                this.submiting = false;
                this.cleanSelectedBooking();
            })
        }
    }

    @action cancelBooking = async () => {
        if (this.selectedBooking !== undefined) {
            this.submiting = true;

            try {
                await agent.Booking.delete(this.selectedBooking.bookingId);
                
                runInAction(() => {
                    var id = -1;

                    this.bookingList.forEach(b => {
                        if (b.bookingId == this.selectedBooking!.bookingId) {
                            id = b.bookingId;
                        }
                    });

                    if (id >= 0 ) {
                        this.bookingList.splice(id, 1);
                    }
                    
                    this.cleanSelectedBooking();
                    this.submiting = false;
                })
            } catch (error) {
                console.log(error);

                runInAction('Error delete booking', () => {
                    this.submiting = false;
                    this.cleanSelectedBooking();
                });
            }
        }
    }

    @action cleanSelectedBooking = () => {
        this.selectedBooking = undefined;
    }

    @action loadBookings = async () => {
        this.submiting = true;
        this.bookingList = [];
        try {
            const booking = await agent.Booking.list();

            runInAction(() => {
                this.bookingList = booking;
                this.submiting = false;
            });

        } catch (error) {
            console.log(error);

            runInAction('Error get bookings list', () => {
                this.submiting = false;
            });
        }
    }

    @action loadBooking = async (id: number) => {
        this.submiting = true;

        try {
            const booking = await agent.Booking.details(id);

            runInAction(() => {
                this.selectedBooking = booking;

                this.submiting = false;
            });
        } catch (error) {
            console.log(error);
            
            runInAction('Error load booking', () => {
                this.submiting = false;
            });
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
