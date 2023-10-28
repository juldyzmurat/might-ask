export interface User {
    name?: string;
    email?: string;
    password?: string;
    access?: 'admin' | 'normal';
    _id?: string;
 }