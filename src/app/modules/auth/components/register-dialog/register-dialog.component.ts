import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from "@angular/material/dialog";

export interface DialogData {
    wantRegister: boolean;
}

@Component({
    selector: "app-register-dialog",
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
    templateUrl: "./register-dialog.component.html",
    styleUrl: "./register-dialog.component.scss"
})
export class RegisterDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<RegisterDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    onYesClick(): void {
        this.data.wantRegister = true;
        this.dialogRef.close({ wantRegister: this.data.wantRegister });
    }

    onNoClick(): void {
        this.data.wantRegister = false;
        this.dialogRef.close({ wantRegister: this.data.wantRegister });
    }
}
