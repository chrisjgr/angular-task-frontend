import { UserRol } from "../enums/userRol.enum";

export interface UserInterface {
    id?: string;
    email: string;
    rol: UserRol;
}

export interface RolInterface {
    id: string;
    title: UserRol;
}
