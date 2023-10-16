export interface ICategory {
    id?: number;
    name?: string | null;
    code?: string | null;
    description?: string | null;
}

export interface ICategoryResponseResult {
    count?: number;
    categories?: ICategory[];
}

export class Category implements ICategory {

    constructor(
        public id?: number,
        public name?: string | null,
        public code?: string | null,
        public description?: string | null,
    ) {
    }
}
