export interface IProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
    categoryId: number;
}

export interface IProductResponseResult {
    count?: number;
    products?: IProduct[];
}

export class Product implements IProduct {
    constructor(
        public id: number,
        public title: string,
        public price: number,
        public quantity: number,
        public description: string,
        public image: string,
        public categoryId: number) {
    }
}
