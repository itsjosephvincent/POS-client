import BaseAPIService from './BaseAPIService'

class ClassificationService extends BaseAPIService {
    async all(): Promise<any> {
        return await this.request(`/admin/categories`, 'GET')
    }
    async find(uuid: string) {
        return await this.request(`/admin/categories/${uuid}`, 'GET')
    }
    async create(params: object) {
        return await this.request(`/admin/categories`, 'POST', params)
    }
}

export const classificationService = new ClassificationService()