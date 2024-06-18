import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EmailComponent } from "../email/email.component";

@Injectable({
    providedIn: 'root'
})

export class DialogService {
    constructor(private matDialog: MatDialog) { }
    openDialogCustom() {
        this.matDialog.open(EmailComponent)
    }
}