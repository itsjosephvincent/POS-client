import BaseAPIService from '../BaseAPIService'

class CategoryService extends BaseAPIService {
    public static instance: CategoryService

    public static getInstance(): CategoryService {
        if (!CategoryService.instance) {
            CategoryService.instance = new CategoryService()
        }
        return CategoryService.instance
    }
    async fetch(): Promise<any> {
        return await this.request(`/store/categories`, 'GET')
    }
    async find(uuid: string) {
        return await this.request(`/store/categories/${uuid}`, 'GET')
    }
    async create(params: object) {
        return await this.request(`/store/categories`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/store/categories/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/store/categories/${uuid}`, 'DELETE')
    }
}

export const categoryService = CategoryService.getInstance()