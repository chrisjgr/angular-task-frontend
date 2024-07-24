import { Component } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { LoginFormComponent } from "@modules/auth/components/login-form/login-form.component";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        MatButton,
        LoginFormComponent
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent {

}
