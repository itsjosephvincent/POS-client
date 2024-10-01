import BaseAPIService from './BaseAPIService'

class CashierService extends BaseAPIService {
    async cashiers(params: object|null): Promise<any> {
        return await this.request(`/admin/cashiers`, 'GET', params)
    }
}

export const cashierService = new CashierService()