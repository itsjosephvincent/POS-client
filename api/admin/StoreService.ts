import BaseAPIService from '../BaseAPIService'

export class StoreService extends BaseAPIService {
    public static instance: StoreService

    public static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService()
        }
        return StoreService.instance
    }
    async stores(params: object) {
        return await this.request(`/admin/stores`, 'GET', params)
    }
    async store(id: string, params: object) {
        return await this.request(`/admin/stores/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/admin/stores`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/admin/stores/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/admin/stores/${uuid}?_method=PUT`, 'DELETE')
    }
}

export const storeService = StoreService.getInstance()