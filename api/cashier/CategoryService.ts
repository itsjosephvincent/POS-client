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
        return await this.request(`/cashier/categories`, 'GET')
    }
    async find(uuid: string) {
        return await this.request(`/cashier/categories/${uuid}`, 'GET')
    }
}

export const categoryService = CategoryService.getInstance()