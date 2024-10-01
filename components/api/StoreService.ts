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
}

export const storeService = new StoreService()