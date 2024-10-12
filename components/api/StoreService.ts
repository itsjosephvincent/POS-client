import BaseAPIService from './BaseAPIService'
interface StoreServiceParams {
    admin_id?: number
    page?: number
    sortField?: string
    sortOrder?: string
}
export class StoreService extends BaseAPIService {
    #role: string = ''

    constructor(role: string) {
        super()
        this.#role = role
    }

    set role(role: string) {
        this.#role = role
    }
    get role(): string {
        return this.#role
    }

    async stores(params: StoreServiceParams): Promise<any> {
        return await this.request(`/${this.role}/stores`, 'GET', params)
    }
    async store(id: string, params: object) {
        return await this.request(`/${this.role}/stores/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/${this.role}/stores`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/${this.role}/stores/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/${this.role}/stores/${uuid}?_method=PUT`, 'DELETE')
    }
}