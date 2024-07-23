import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRol } from "@core/enums/userRol.enum";
import { TokenService } from "@core/services/token.service";
import { HasUserResponse } from "@core/types/hasUserResponse.type";
import { LoginResponse } from "@core/types/loginResponse.type";
import { RegisterResponse } from "@core/types/registerResponse.type";
import { environment } from "@envs/environment";
import {
    catchError,
    Observable,
    of,
    switchMap
} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private url = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    hasUser(token: string): Observable<boolean> {
        const payload = this.tokenService.translateToken(token);

        return this.http.get<HasUserResponse>(`${this.http}/auth/auth/user/${payload.id}`)
            .pipe(
                switchMap((res) => {
                    if (!res.user) return of(true);
                    return of(false);
                }),
                catchError(() => of(false))
            );
    }

    login(email: string, duration: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.url}/auth/login`, { email, duration })
            .pipe(
                switchMap((res) => {
                    this.tokenService.saveToken(res.token);
                    return of(res);
                }),
            );
    }

    register(email: string): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.url}/auth/register`, { email, rol: UserRol.user })
            .pipe(
                switchMap((res) => {
                    this.tokenService.saveToken(res.token);
                    return of(res);
                }),
            );
    }

    logout(): void {
        this.tokenService.removeToken();
    }
}
