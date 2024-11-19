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
        return await this.request(`/admin/orders`, 'GET', params);
    }

    async find(id: string | string[], params: object) {
        return await this.request(`/admin/orders/${id}`, 'GET', params);
    }
}

export const orderService = OrderService.getInstance();
