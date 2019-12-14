import { EmailValidator } from '@angular/forms';

export interface IAdminDetails {
    _id: string;
    username: string;
    exp: number;
    iat: number;
}
