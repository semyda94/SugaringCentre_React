import { observable, action, runInAction, computed } from 'mobx';
import { createContext } from 'react';
import agent from './../api/agent'
import { IStaff } from '../models/staff/staff';

class StaffStore {
    @observable staffRegistry = new Map();
    @observable staffList : IStaff[] = [];
    @observable staffForMain: IStaff[] = [];
    
    @observable bookingSelectedStaff : number = 0;

    @observable loadingInitial = false;
    @observable submiting = false;

    @observable workingDaysOfSelectedStaff: number[] = [];
    @observable timeOptions: {value: Date, label: string}[] = []


    @computed get staffByDate() {
        return this.sortStaffByDate(Array.from(this.staffRegistry.values()))
    }

    sortStaffByDate(staff: IStaff[]) {
        return Object.entries(staff.reduce((staffList) => {
            return staffList;
        }, {} as {[key: number]: IStaff}        ));
    }
    

    @action setBookingSelectedStaff = (id: number) => {
        this.bookingSelectedStaff = id;
    }

    @action loadStaff = async () => {
        this.loadingInitial = true;
        this.staffList= [];
        try {
            const staff = await agent.Staff.list();
            runInAction('continue  load staff', () => {
                staff.forEach(staff => {
                    this.staffList.push(staff);
                });

                if (this.staffList.length > 0)
                    this.bookingSelectedStaff = this.staffList[0].staffId;

                this.loadingInitial = false;
            });

        } catch (error) {
            console.log(error);

            runInAction('after load staff error', () => {
                this.loadingInitial = false;
            })
        }
    }

    @action loadStaffForMain = async () => {
        this.staffForMain = [];

        try {
            const staff = await agent.Staff.top();

            runInAction('continue load staff', () => {
                staff.forEach(staff => {
                    this.staffForMain.push(staff);
                });
            })
        } catch (error) {
            
        }
    }

    @action workingDaysOfStaff = async (id: number)  => {
        this.submiting = true;
        this.workingDaysOfSelectedStaff = [];
        
        try {
            const wd = await agent.Staff.workingDays(id);

            runInAction('continue getting working days', () => {
                this.workingDaysOfSelectedStaff = wd;
                this.submiting = false;
            });

        } catch (error) {
            console.log(error);

            runInAction('error get working days', () => {
                this.submiting = false;
            });
        }
    }

    @action loadTimeOptionsForDate = async (staffId: number, serviceId: number, date: Date) => {
        this.submiting = true;

        try {
            const options = await agent.Staff.timeOptions(staffId, serviceId, date);

            runInAction('continue options', () => {
                this.timeOptions = options;

            });
        } catch (error) {
            console.log(error);

            runInAction('error get time options for date', () => {
                this.submiting = false
            })            
        }
    }

    @action deleteStaff = async (idx: number) => {
        this.submiting = true;

        try {
            await agent.Staff.delete(this.staffList[idx].staffId);

            runInAction('continue delete staff', () => {
                delete this.staffList[idx];
                this.submiting = false;
            })
        } catch (error) {
            console.log(error);
            
            runInAction('delete staff error', () => {
                this.submiting = false;
            })
        }
    }

    @action createStaff = async (staff: IStaff) => {
        this.submiting = true
        try {
            await agent.Staff.create(staff);

            runInAction("continue create staff", () => {
                // this.staffList.push(staff);
                this.submiting = false;
            });

        } catch (error) {
            console.log(error);
            
            runInAction("error creating staff", () => {
                this.submiting = false;
            })
        }
    }
}

export default createContext(new StaffStore())