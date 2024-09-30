import BaseAPIService from './BaseAPIService'

class AdminService extends BaseAPIService {
    async admins(page: number | null): Promise<any> {
        return await this.request(`/superadmin/admins${!page ? '' : `?page=${page}`}`, 'GET')
    }
}

export const adminService = new AdminService()