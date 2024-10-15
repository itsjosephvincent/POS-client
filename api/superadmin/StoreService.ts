import BaseAPIService from '../BaseAPIService';

export class StoreService extends BaseAPIService {
    public static instance: StoreService;

    public static getInstance(): StoreService {
        if (!StoreService.instance) {
            StoreService.instance = new StoreService();
        }
        return StoreService.instance;
    }
    async fetch(params: object) {
        return await this.request(`/superadmin/stores`, 'GET', params);
    }
    async find(id: string, params: object) {
        return await this.request(`/superadmin/stores/${id}`, 'GET', params);
    }
    async create(params: object) {
        return await this.request(`/superadmin/stores`, 'POST', params);
    }
    async update(params: object, uuid: string) {
        return await this.request(
            `/superadmin/stores/${uuid}?_method=PUT`,
            'POST',
            params,
        );
    }
    async delete(uuid: string) {
        return await this.request(
            `/superadmin/stores/${uuid}?_method=PUT`,
            'DELETE',
        );
    }
}

export const storeService = StoreService.getInstance();
