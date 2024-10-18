import BaseAPIService from '../BaseAPIService';

export class TableService extends BaseAPIService {
    public static instance: TableService;

    public static getInstance(): TableService {
        if (!TableService.instance) {
            TableService.instance = new TableService();
        }
        return TableService.instance;
    }
    async fetch(params: object | null): Promise<any> {
        return await this.request(`/store/tables`, 'GET', params);
    }
    async find(id: string | string[], params: object) {
        return await this.request(`/store/tables/${id}`, 'GET', params);
    }
    async create(params: object) {
        return await this.request(`/store/tables`, 'POST', params);
    }
    async update(params: object, uuid: string) {
        return await this.request(
            `/store/tables/${uuid}?_method=PUT`,
            'POST',
            params,
        );
    }
    async delete(uuid: string) {
        return await this.request(`/store/tables/${uuid}`, 'DELETE');
    }
}

export const tableService = TableService.getInstance();
