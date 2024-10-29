export interface SuperAdmin {
    id: number;
    name: string;
    role: string;
    username: string;
    uuid: string;
}

export interface Admin {
    id: number;
    firstname: string;
    lastname: string;
    role: string;
    username: string;
    uuid: string;
    is_active: boolean;
    stores?: Array<Store>;
}

export interface Store {
    id: number;
    uuid: string;
    admin_id: number;
    store_name: string;
    branch: string;
    username: string;
    is_active: boolean;
    admin: Admin;
}

export interface Cashier {
    id: number;
    name: string;
    role: string;
    username: string;
    uuid: string;
    store: Store;
}

export interface Category {
    id: number;
    uuid: string;
    admin_id: number;
    name: string;
}

export interface Product {
    id: number;
    uuid: string;
    category_id: number;
    name: string;
    image: string;
    cost: number;
    price: number;
    inventory: number;
}

export interface BillingProduct {
    id: number;
    uuid: string;
    name: string;
    cost: number;
    price: number;
    quantity: number;
    image: string;
    is_voided: boolean;
}

export interface Table {
    id: number;
    uuid: string;
    store_id: number;
    name: string;
}

export interface TableOption {
    id: number;
    name: string;
}

export interface RunningBill {
    id: number;
    uuid: string;
    table_id: number;
    product_id: number;
    quantity: number;
    price: number;
    is_voided: boolean;
}

export interface Cart {
    id: number;
    uuid: string;
    table_id: number;
    product_id: number;
    quantity: number;
    price: number;
    is_voided: boolean;
}

export interface Order {
    id: number;
    cashier_id: number;
    uuid: string;
    order_number: string;
    cashier: Cashier;
    orderDetails: OrderDetail;
    created_at: string;
}

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    uuid: string;
    price: number;
    quantity: number;
    product: Product;
}

/** Type for Data Table component columns */
export interface DataTableColumns {
    key: string;
    label: string;
    sortable?: boolean;
}

export enum TransactionMode {
    RunningBill = 'RUNNING_BILL',
    Cart = 'CART',
}

export enum DrawerPage {
    Orders = 'ORDERS',
    History = 'HISTORY',
}
