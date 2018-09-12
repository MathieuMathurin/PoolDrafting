import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";

// Import services
import { AccountService } from "../../services/account.service";
import { InputErrorMessages } from "../../components/input/input.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(private accountService: AccountService, private router: Router, private snackBar: MatSnackBar) {
        this.userNameModel = {};
        this.passwordModel = {};
     }
    
    private userNameModel: {
        userName?: string,
        isValid?: boolean
    };
    private passwordModel: {
        password?: string,
        isValid?: boolean
    };

    errorMessages: InputErrorMessages = {
        requiredErrorMessage: "Ce champs est requis",
        maxLengthErrorMessage: "Le nom d'utilisateur ne doit pas dépasser 12 caractères"
    };

    async login(): Promise<void> {
        const isSuccess = await this.accountService.login(this.userNameModel.userName, this.passwordModel.password);

        if (isSuccess) {
            this.router.navigate(['/home']);
        } else {
            this.snackBar.open("Mauvais nom d'équipe ou mauvais mot de passe. Veuillez réessayer.", "OK", { duration: 3000 });
        }
    }

    onUserNameChanged = userName => this.userNameModel.userName = userName;
    onNameStatusChanged = isValid => this.userNameModel.isValid = isValid;

    onPasswordChanged = password => this.passwordModel.password = password;
    onPasswordStatusChanged = isValid => this.passwordModel.isValid = isValid;

    isValid = () => this.userNameModel.isValid && this.passwordModel.isValid;
}
