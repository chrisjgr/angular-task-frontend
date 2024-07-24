import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { AuthService } from "@modules/auth/services/auth.service";

import { RegisterDialogComponent } from "../register-dialog/register-dialog.component";

// TODO: Dump and smart component

@Component({
    selector: "app-login-form",
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        NgOptimizedImage,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
    ],
    templateUrl: "./login-form.component.html",
    styleUrl: "./login-form.component.scss"
})
export class LoginFormComponent {
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private autService: AuthService,
        public dialog: MatDialog,
        private router: Router,
    ) {
        this.form = this.formBuilder.group({
            email: ["", [Validators.required, Validators.email]]
        });
    }

    login(event: Event) {
        event.preventDefault();
        if (this.form.valid) {
            const { email } = this.form.value;

            this.autService.login(email, "7d")
                .subscribe((res) => {
                    if (res !== null) {
                        this.autService.setUserState(res.user);
                        this.router.navigate(["/dashboard"]);
                    } else {
                        this.openDialog();
                    }
                });
        } else {
            this.form.markAllAsTouched();
        }
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(
            RegisterDialogComponent,
            { data: { wantRegister: false } }
        );

        dialogRef.afterClosed().subscribe((result: { wantRegister: boolean }) => {
            if (result.wantRegister) {
                this.autService.register(this.form.value.email)
                    .subscribe(() => {
                        this.router.navigate(["/dashboard"]);
                    });
            }
        });
    }

    getError(inputName: string, errorName: string) {
        return this.form.get(inputName)?.hasError(errorName);
    }
}
