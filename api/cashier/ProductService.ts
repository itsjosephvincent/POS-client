import BaseAPIService from '../BaseAPIService'

class ProductService extends BaseAPIService {
    public static instance: ProductService

    public static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService()
        }
        return ProductService.instance
    }

    async all(params: object) {
        return await this.request(`/cashier/products`, 'GET', params)
    }
    async product(id: string|string[], params: object) {
        return await this.request(`/cashier/products/${id}`, 'GET', params)
    }
}

export const productService = ProductService.getInstance()