import BaseAPIService from './BaseAPIService'

class AdminService extends BaseAPIService {
    async admins(page: number | null): Promise<any> {
        debugger
        return await this.request(`/admins${!page ? '' : `?page=${page}`}`, 'GET')
    }
}

export const adminService = new AdminService()