import BaseAPIService from './BaseAPIService'
interface StoreServiceParams {
    admin_id?: number
    page?: number
    sortField?: string
    sortOrder?: string
}
class StoreService extends BaseAPIService {
    async stores(params: StoreServiceParams): Promise<any> {
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

export const storeService = new StoreService()