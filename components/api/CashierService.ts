import BaseAPIService from './BaseAPIService'

export class CashierService extends BaseAPIService {
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

    async cashiers(params: object|null): Promise<any> {
        return await this.request(`/${this.role}/cashiers`, 'GET', params)
    }
    async find(id: string|string[], params: object) {
        return await this.request(`/${this.role}/cashiers/${id}`, 'GET', params)
    }
    async create(params: object) {
        return await this.request(`/${this.role}/cashiers`, 'POST', params)
    }
    async update(params: object, uuid: string) {
        return await this.request(`/${this.role}/cashiers/${uuid}?_method=PUT`, 'POST', params)
    }
    async delete(uuid: string) {
        return await this.request(`/${this.role}/cashiers/${uuid}`, 'DELETE')
    }
}