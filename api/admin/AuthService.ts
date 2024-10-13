import BaseAPIService from '../BaseAPIService'

class AuthService extends BaseAPIService {
    private static instance: AuthService

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService()
        }
        return AuthService.instance
    }

    async login(params: object|null): Promise<any> {
        return await this.request(`/admin/auth/login`, 'POST', params)
    }
    async logout(): Promise<any> {
        return await this.request(`/admin/logout`, 'POST')
    }
}
export const authService = AuthService.getInstance()