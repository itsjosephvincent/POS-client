import BaseAPIService from '../BaseAPIService'

export class CashierService extends BaseAPIService {
    public static instance: CashierService

    public static getInstance(): CashierService {
        if (!CashierService.instance) {
            CashierService.instance = new CashierService()
        }
        return CashierService.instance
    }
    async fetch(params: object|null): Promise<any> {
        return await this.request(`/superadmin/cashiers`, 'GET', params)
    }
    async find(id: string|string[], params: object) {
        return await this.request(`/superadmin/cashiers/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/superadmin/cashiers`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/superadmin/cashiers/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/superadmin/cashiers/${uuid}`, 'DELETE')
    }
}

export const cashierService = CashierService.getInstance()