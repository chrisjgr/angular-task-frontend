import { CanActivateFn, Router } from "@angular/router";
import { TokenService } from "@core/services/token.service";
import { AuthService } from "@modules/auth/services/auth.service";

export const authGuard: CanActivateFn = () => {
    const router = new Router();
    const tokenService = new TokenService();
    const authService = new AuthService();

    if (!tokenService.getToken) {
        router.navigate(["/login"]);
        return false;
    }

    // TODO: Validate User
    const userExist = authService.hasUser();

    if (!userExist) {
        router.navigate(["/login"]);
        return false;
    }

    return true;
};
