/* eslint-disable class-methods-use-this */
import { Injectable } from "@angular/core";
import { JwtPayloadInterface } from "@core/models/jwtPayload.interface";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    saveToken(token: string): void {
        localStorage.setItem("token", token);
    }

    getToken(): string {
        return localStorage.getItem("token") as string;
    }

    removeToken(): void {
        localStorage.removeItem("token");
    }

    // TODO: Validate with the jwt secret
    translateToken(token: string): JwtPayloadInterface {
        return token ? { id: "" } : { id: "" };
    }
}
