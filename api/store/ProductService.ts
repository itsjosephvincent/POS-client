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
        return await this.request(`/store/products`, 'GET', params)
    }
    async product(id: string|string[], params: object) {
        return await this.request(`/store/products/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/store/products`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/store/products/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/store/products/${uuid}`, 'DELETE')
    }
    async import(params: object) {
        return await this.request(`/store/products/import/file`, 'POST', params)
    }
}

export const productService = ProductService.getInstance()