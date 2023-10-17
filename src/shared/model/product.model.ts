export interface IProduct {
    id: number;
    title: string;
    price: number;
    quantityInStock: number;
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
        public quantityInStock: number,
        public description: string,
        public image: string,
        public categoryId: number) {
    }
}
