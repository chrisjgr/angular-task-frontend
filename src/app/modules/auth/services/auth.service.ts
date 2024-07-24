/* eslint-disable class-methods-use-this */
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserRol } from "@core/enums/userRol.enum";
import { UserInterface } from "@core/models/user.interface";
import { TokenService } from "@core/services/token.service";
import { HasUserResponse } from "@core/types/hasUserResponse.type";
import { LoginResponse } from "@core/types/loginResponse.type";
import { RegisterResponse } from "@core/types/registerResponse.type";
import { environment } from "@envs/environment";
import {
    BehaviorSubject,
    catchError,
    Observable,
    of,
    switchMap,
    throwError
} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private url = environment.apiUrl;
    private userData = new BehaviorSubject<UserInterface | null>(null);

    public userData$ = this.userData.asObservable();
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) { }

    hasUser(token: string): Observable<HasUserResponse> {
        const payload = this.tokenService.translateToken(token);

        return this.http.get<HasUserResponse>(`${this.http}/auth/auth/user/${payload.id}`)
            .pipe(
                switchMap((res) => {
                    this.setUserState(res.user);
                    return of(res);
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    login(email: string, duration: string): Observable<LoginResponse | null> {
        return this.http.post<LoginResponse>(`${this.url}/auth/login`, { email, duration })
            .pipe(
                switchMap((res) => {
                    this.tokenService.saveToken(res.token);
                    return of(res);
                }),
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        return of(null);
                    }
                    return this.handleError(error);
                })
            );
    }

    register(email: string): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.url}/auth/register`, { email, rol: UserRol.user })
            .pipe(
                switchMap((res) => {
                    this.tokenService.saveToken(res.token);
                    return of(res);
                }),
                catchError((error: HttpErrorResponse) => this.handleError(error))
            );
    }

    logout(): void {
        this.tokenService.removeToken();
        this.userData.next(null);
    }

    handleError(error: HttpErrorResponse) {
        if (error.status !== 500) {
            return of();
        }
        return throwError(() => new Error(`Sorry! something went wrong: ${error}`));
    }

    // * State Manipulation

    setUserState(user: UserInterface | null): void {
        this.userData.next(user);
    }
}
