import {IProductImage} from './productImage'

export interface IProduct {
    productId: number;
    title: string;
    desc: string;
    shortDescription: string;
    price: number;
    categorySelected: string;
    productImages: IProductImage[];
}