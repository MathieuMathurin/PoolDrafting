import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { PoolerService } from "../../services/pooler.service";
import { InputErrorMessages } from "../../components/input/input.component";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private poolerService: PoolerService, private router: Router, private snackBar: MatSnackBar) {
    this.userNameModel = {};
    this.passwordModel = {};
    this.passwordConfirmationModel = {};
  }

  private userNameModel: {
    userName?: string,
    isValid?: boolean
  };

  private passwordModel: {
    password?: string,
    isValid?: boolean
  };

  private passwordConfirmationModel: {
    password?: string,
    isValid?: boolean
  };

  errorMessages: InputErrorMessages = {
    requiredErrorMessage: "Ce champs est requis"
  };

  async signup(): Promise<void> {
    const isSuccess = await this.poolerService.signup(this.userNameModel.userName, this.passwordModel.password);
    if (isSuccess) {
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open("Votre équipe existe déjà. Veuillez-vous connecter.", "OK", { duration: 3000 });
    }
  }

  onUserNameChanged = userName => this.userNameModel.userName = userName;
  onNameStatusChanged = isValid => this.userNameModel.isValid = isValid;

  onPasswordChanged = password => this.passwordModel.password = password;
  onPasswordStatusChanged = isValid => this.passwordModel.isValid = isValid;

  onPasswordConfirmationChanged = password => this.passwordConfirmationModel.password = password;
  onPasswordConfirmationStatusChanged = isValid => this.passwordConfirmationModel.isValid = isValid;

  isValid = () => {
    const areFieldsValid = this.userNameModel.isValid && this.passwordModel.isValid && this.passwordConfirmationModel.isValid;
    const arePasswordEqual = this.passwordModel.password === this.passwordConfirmationModel.password;

    return areFieldsValid && arePasswordEqual;
  }
}
