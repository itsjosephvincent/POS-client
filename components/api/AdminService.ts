import BaseAPIService from './BaseAPIService'

class AdminService extends BaseAPIService {
    async admins(params: object|null): Promise<any> {
        return await this.request(`/superadmin/admins`, 'GET', params)
    }
}

export const adminService = new AdminService()