import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { authInterceptor } from "@core/interceptors/auth.interceptor";
import { LayoutService } from "@core/services/layout.service";
import { TokenService } from "@core/services/token.service";
import { AuthService } from "@modules/auth/services/auth.service";
import { ListsService } from "@modules/tasks/services/lists.service";
import { TasksService } from "@modules/tasks/services/tasks.service";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        AuthService,
        TasksService,
        ListsService,
        LayoutService,
        TokenService,
    ]
};
