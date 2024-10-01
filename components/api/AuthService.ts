import BaseAPIService from './BaseAPIService'

class AuthService extends BaseAPIService {
    async superAdminLogin(params: object|null): Promise<any> {
        return await this.request(`/superadmin/auth/login`, 'POST', params)
    }
    async adminLogin(params: object|null): Promise<any> {
        return await this.request(`/admin/auth/login`, 'POST', params)
    }
    async storeLogin(params: object|null): Promise<any> {
        return await this.request(`/store/auth/login`, 'POST', params)
    }

    async user(): Promise<any> {
        return await this.request(`/user`, 'GET')
    }

    async logout(): Promise<any> {
        return await this.request(`/admin/logout`, 'POST')
    }
}

export const authService = new AuthService()
