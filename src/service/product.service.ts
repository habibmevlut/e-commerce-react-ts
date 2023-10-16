import axios from 'axios';
import UIHelperService from '../shared/service/uihelper.service.ts';
import { ApplicationConfigService } from '../shared/service/application-config.service.ts';
import { IProduct } from '../shared/model/product.model.ts';

const uiHelperService = new UIHelperService();

let baseApiUrl: string = '';

class ProductService {
    private applicationConfigService: ApplicationConfigService;

    constructor(applicationConfigService: ApplicationConfigService) {
        this.applicationConfigService = applicationConfigService;
        baseApiUrl = this.applicationConfigService.getEndpointFor('api/products');
    }

    /**
     * Find a product by id
     * @param id
     */
    public async find(id: number): Promise<IProduct> {
        const res = await axios.get(`${baseApiUrl}/${id}`);
        return res.data;
    }

    /**
     * Retrieve all products
     */
    public async retrieve(req?: any): Promise<any> {
        const query = uiHelperService.createRequestOptionMultipleWithoutNull(req);
        const url = baseApiUrl + '?' + query;
        const res = await axios.get(url);
        return res.data;
    }

    /**
     * Delete a product by id
     * @param id
     */
    public delete(id: number | null): Promise<any> {
        return axios.delete(`${baseApiUrl}/${id}`).then(res => res.data);
    }

    /**
     * Create a new product
     * @param entity
     */
    public create(entity: IProduct): Promise<IProduct> {
        return axios.post(`${baseApiUrl}`, entity).then(res => res.data);
    }

    /**
     * Update a product
     * @param entity
     */
    public update(entity: IProduct): Promise<IProduct> {
        return axios.put(`${baseApiUrl}/${entity.id}`, entity).then(res => res.data);
    }

    /**
     * Partially update a product
     * @param entity
     */
    public partialUpdate(entity: IProduct): Promise<IProduct> {
        return axios.patch(`${baseApiUrl}/${entity.id}`, entity).then(res => res.data);
    }
}

export default ProductService;
