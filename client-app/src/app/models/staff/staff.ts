import { IStaffImage } from "./staffImage";

export interface IStaff{
	staffId: number;
	username: string
	firstName: string;
	lastName: string;
	title: string;
	dob: Date;

	workingDaysOfWeek: string;
	workingFrom: Date;
	workingTo: Date;

	servicesStaff: string;

	bookings : any | null;
	staffImage: any[];
	serviceStaff: IStaffImage[];
	leaves: any[];
}