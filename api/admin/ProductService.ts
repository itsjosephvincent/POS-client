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
        return await this.request(`/admin/products`, 'GET', params)
    }
    async find(id: string|string[], params: object) {
        return await this.request(`/admin/products/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/admin/products`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/admin/products/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/admin/products/${uuid}`, 'DELETE')
    }
    async import(params: object) {
        return await this.request(`/admin/products/import/file`, 'POST', params)
    }
}

export const productService = ProductService.getInstance()