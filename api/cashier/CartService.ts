import BaseAPIService from '../BaseAPIService';

export class CartService extends BaseAPIService {
    public static instance: CartService;

    public static getInstance(): CartService {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    async fetch(params: object | null): Promise<any> {
        return await this.request(`/cashier/carts`, 'GET', params);
    }

    async find(id: string | string[], params: object) {
        return await this.request(`/cashier/carts/${id}`, 'GET', params);
    }

    async create(params: object) {
        return await this.request(`/cashier/carts`, 'POST', params);
    }

    async void(params: object, uuid: string) {
        return await this.request(`/cashier/carts/${uuid}`, 'DELETE', params);
    }
}

export const cartService = CartService.getInstance();
