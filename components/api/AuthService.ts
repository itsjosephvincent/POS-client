import BaseAPIService from './BaseAPIService'

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request(`/admin/auth/login`, 'POST', params)
    }

    async logout(): Promise<any> {
        return await this.request(`/admin/logout`, 'POST')
    }
}

export const authService = new AuthService()