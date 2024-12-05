import BaseAPIService from '../BaseAPIService';

class ReportService extends BaseAPIService {
    public static instance: ReportService;

    public static getInstance(): ReportService {
        if (!ReportService.instance) {
            ReportService.instance = new ReportService();
        }
        return ReportService.instance;
    }

    async summary(params: object) {
        return await this.request(`/admin/reports/summary`, 'GET', params);
    }
    async popular(params: object) {
        return await this.request(
            `/admin/reports/popular_items`,
            'GET',
            params,
        );
    }
    async category(params: object) {
        return await this.request(
            `/admin/reports/category_earnings`,
            'GET',
            params,
        );
    }
    async store(params: object) {
        return await this.request(
            `/admin/reports/store_earnings`,
            'GET',
            params,
        );
    }
    async item_sales(params: object) {
        return await this.request(`/admin/reports/item_sales`, 'GET', params);
    }
    async cashier_sales(params: object) {
        return await this.request(
            `/admin/reports/cashier_sales`,
            'GET',
            params,
        );
    }
    async category_sales(params: object) {
        return await this.request(
            `/admin/reports/category_sales`,
            'GET',
            params,
        );
    }
    async item_sales_daily(params: object) {
        return await this.request(
            `/admin/reports/item_sales_daily`,
            'GET',
            params,
        );
    }
    async cashier_sales_daily(params: object) {
        return await this.request(
            `/admin/reports/cashier_sales_daily`,
            'GET',
            params,
        );
    }
    async category_sales_daily(params: object) {
        return await this.request(
            `/admin/reports/category_sales_daily`,
            'GET',
            params,
        );
    }
}

export const reportService = ReportService.getInstance();
