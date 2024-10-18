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
}

export interface Cashier {
    id: number;
    name: string;
    role: string;
    username: string;
    uuid: string;
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

export interface Table {
    id: number;
    uuid: string;
    store_id: number;
    name: string;
}

/** Type for Data Table component columns */
export interface DataTableColumns {
    key: string;
    label: string;
    sortable?: boolean;
}
