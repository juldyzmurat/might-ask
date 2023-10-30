export interface Task {
    _id?: string;
    user?:string;
    category?:string;
    recurrence?:number;
    name?:string;
    start?:string;
    due?:string;
    estimated_duration?:number;
    location?:string;
 }