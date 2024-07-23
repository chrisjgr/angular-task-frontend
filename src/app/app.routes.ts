import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
    },
    {
        path: "example-page",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    }, {
        path: "login",
        loadComponent: () => import("./modules/auth/pages/login/login.component").then((m) => m.LoginComponent)

    }, {
        path: "tasks",
        loadComponent: () => import("./core/layout/dashboard-layout/dashboard-layout/dashboard-layout.component")
            .then((m) => m.DashboardLayoutComponent),
        children: [
            {
                path: "",
                loadComponent: () => import("./modules/tasks/pages/dashboard/dashboard.component")
                    .then((m) => m.DashboardComponent),
            }
        ]

    },
    {
        path: "**",
        loadComponent: () => import("./modules/not-found/pages/not-found/not-found.component")
            .then((m) => m.NotFoundComponent),
        pathMatch: "full"
    }
];
