import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadComponent: () => import("./modules/example-page/example-page.component").then((m) => m.ExamplePageComponent)

    }, {
        path: "login",
        loadComponent: () => import("./modules/auth/login/login.component").then((m) => m.LoginComponent)

    }, {
        path: "tasks",
        loadComponent: () => import("./modules/tasks/tasks.component").then((m) => m.TasksComponent)

    }
];
