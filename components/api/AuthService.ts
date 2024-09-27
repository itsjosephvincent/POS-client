import BaseAPIService from './BaseAPIService'

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request(`/user/login`, 'POST', params)
    }

    async user(): Promise<any> {
        return await this.request(`/user`, 'GET')
    }

    async logout(): Promise<any> {
        return await this.request(`/admin/logout`, 'POST')
    }
}

export const authService = new AuthService()
