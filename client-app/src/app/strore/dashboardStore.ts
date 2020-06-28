import { action, observable, runInAction } from "mobx";
import { createContext } from "react";
import agent from "./../api/agent";
import { IBarOptions } from "./../models/charts/barChart";
import da from "../../assets/vendor/fullcalendar/dist/locale/da";


class DashboardStore {
    @observable ordersCount = 0; 
    @observable ordersAmount = 0;
    @observable bookingsCount = 0;

    // Colors
    colors = {
        gray: {
            100: "#f6f9fc",
            200: "#e9ecef",
            300: "#dee2e6",
            400: "#ced4da",
            500: "#adb5bd",
            600: "#8898aa",
            700: "#525f7f",
            800: "#32325d",
            900: "#212529"
        },
        theme: {
            default: "#172b4d",
            primary: "#5e72e4",
            secondary: "#f4f5f7",
            info: "#11cdef",
            success: "#2dce89",
            danger: "#f5365c",
            warning: "#fb6340"
        },
        black: "#12263F",
        white: "#FFFFFF",
        transparent: "transparent"
    };

    @observable ordersCountBarChartData: IBarOptions | undefined = undefined;
    @observable bookingsCountBarChartData: IBarOptions | undefined = undefined;
    @observable bookingsCountPerMasterPieChartData: IBarOptions | undefined = undefined;



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

    @action loadOrdersCountBars = async () => {
        try {
            const data = await agent.Order.orderCountBarStat();

            runInAction(() => {
                console.log(data);
                this.ordersCountBarChartData = {
                    labels: data.labels,
                    datasets: data.datasets
                }
                // this.ordersCountBarChartData = {
                //     label: da
                //     data: 
                //     maxBarThickness:  
                //     backgroundColor: 
                // };
            });

        } catch (error) {
            console.log(error);
            
        }
    }

    @action loadBookingsCountBars = async () => {
        try {
            const data = await agent.Booking.bookingCountBarStat();

            runInAction(() => {
                console.log(data);
                this.bookingsCountBarChartData = {
                    labels: data.labels,
                    datasets: data.datasets
                }
            });

        } catch (error) {
            console.log(error);
            
        }
    }

    @action loadBookingsCountPerMaster = async () => {
        try {
            const data = await agent.Booking.bookingCountPermasterPieStat();

            runInAction(() => {
                console.log(data);
                this.bookingsCountPerMasterPieChartData = {
                    labels: data.labels,
                    datasets: data.datasets
                }
            });

        } catch (error) {
            console.log(error);
            
        }
    }
}

export default createContext(new DashboardStore());
