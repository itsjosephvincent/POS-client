import BaseAPIService from './BaseAPIService'
interface ProductServiceParams {
    category_uuid?: string | string[]
    page?: number
    sortField?: string
    sortOrder?: string
}
class ProductService extends BaseAPIService {
    async all(params: ProductServiceParams): Promise<any> {
        return await this.request(`/admin/products`, 'GET', params)
    }
    async product(id: string|string[], params: object) {
        return await this.request(`/admin/products/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/admin/products`, 'POST', params)
    }
    async import(params: object) {
        return await this.request(`/admin/products/import/file`, 'POST', params)
    }
}

export const productService = new ProductService()