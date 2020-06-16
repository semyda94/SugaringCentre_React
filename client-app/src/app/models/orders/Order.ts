import './OrderItem'
import { IOrderItem } from './OrderItem';

export interface IOrder {
    externalId: string;
    date: string;
    amount: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    orderItems: IOrderItem[];
}