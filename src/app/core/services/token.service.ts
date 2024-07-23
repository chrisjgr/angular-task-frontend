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

    // TODO: Validate Token
    validateToken(): boolean {
        return false;
    }

    removeToken(): void {
        localStorage.removeItem("token");
    }

    // TODO: Finishing this
    translateToken(): JwtPayloadInterface {
        return { id: "" };
    }
}
