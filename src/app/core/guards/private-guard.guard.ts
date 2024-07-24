import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "@core/services/token.service";

export const privateGuardGuard: CanActivateFn = () => {
    const router = new Router();
    const tokenService = new TokenService();

    if (tokenService.getToken()) {
        router.navigate(["/dashboard"]);
        return false;
    }
    return true;
};
