import { HttpInterceptorFn } from "@angular/common/http";
import { TokenService } from "@core/services/token.service";

// TODO: TEST
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = new TokenService();
    const token: string = tokenService.getToken();

    const servicesToIntercept = [
        "app/api/tasks",
        "app/api/tasks/*",
        "app/api/lists",
        "app/api/lists/*",
    ];

    const shouldIntercept = servicesToIntercept.some((url) => req.url.includes(url));

    if (shouldIntercept && token) {
        const request = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next(request);
    }

    return next(req);
};
