import BaseAPIService from '../BaseAPIService';

class OrderService extends BaseAPIService {
    public static instance: OrderService;

    public static getInstance(): OrderService {
        if (!OrderService.instance) {
            OrderService.instance = new OrderService();
        }
        return OrderService.instance;
    }

    async all(params: object) {
        return await this.request(`/cashier/orders`, 'GET', params);
    }
    async find(id: string | string[], params: object) {
        return await this.request(`/cashier/orders/${id}`, 'GET', params);
    }
    async create(params: object) {
        return await this.request(`/cashier/orders`, 'POST', params);
    }
}

export const orderService = OrderService.getInstance();
