import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "@core/services/token.service";

export const authGuard: CanActivateFn = () => {
    const router = new Router();
    const tokenService = new TokenService();

    if (!tokenService.getToken()) {
        router.navigate(["/login"]);
        return false;
    }

    return true;
};
