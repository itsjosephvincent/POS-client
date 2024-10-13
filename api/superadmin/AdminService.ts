import BaseAPIService from '../BaseAPIService'

class AdminService extends BaseAPIService {
    public static instance: AdminService

    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService()
        }
        return AdminService.instance
    }
    async fetch(params: object|null): Promise<any> {
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
    async delete(uuid: string) {
        return await this.request(`/superadmin/admins/${uuid}`, 'DELETE')
    }
}

export const adminService = AdminService.getInstance()