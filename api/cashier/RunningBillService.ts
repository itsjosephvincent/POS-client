import BaseAPIService from '../BaseAPIService';

export class RunningBillService extends BaseAPIService {
    public static instance: RunningBillService;

    public static getInstance(): RunningBillService {
        if (!RunningBillService.instance) {
            RunningBillService.instance = new RunningBillService();
        }
        return RunningBillService.instance;
    }
    async fetch(params: object | null): Promise<any> {
        return await this.request(`/cashier/running-bills`, 'GET', params);
    }
    async find(id: string | string[], params: object) {
        return await this.request(
            `/cashier/running-bills/${id}`,
            'GET',
            params,
        );
    }
    async create(params: object) {
        return await this.request(`/cashier/running-bills`, 'POST', params);
    }
    async void(params: object, uuid: string) {
        return await this.request(
            `/cashier/running-bills/${uuid}?_method=PUT`,
            'POST',
            params,
        );
    }
}

export const runningBillService = RunningBillService.getInstance();
