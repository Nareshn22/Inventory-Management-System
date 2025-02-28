export class Item {

    id?:number;
    name!:string;
    description!:string;
    categoryId!:number;
    supplierId!:number;
    quantity!:number;
    price!:number;
    revenue?:number;
    created_at?:string;
}

export class Category {

    id?:number;
    name!:string;
    description?:string;
}

export class Supplier {
    id?:number;
    name!:string;
    company_name!:string;
    phn_no!:number;
    email!:string;
    address!:string;
    notes?:string;
}



