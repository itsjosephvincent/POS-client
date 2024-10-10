import BaseAPIService from './BaseAPIService'

class AdminService extends BaseAPIService {
    async admins(params: object|null): Promise<any> {
        return await this.request(`/superadmin/admins`, 'GET', params)
    }
    async find(uuid: string|string[], params: object) {
        return await this.request(`/superadmin/admins/${uuid}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/superadmin/admins`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/superadmin/admins/${uuid}?_method=PUT`, 'POST', params)
    }
}

export const adminService = new AdminService()