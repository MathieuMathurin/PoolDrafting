import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { PoolerService } from "../../services/pooler.service";
import { InputErrorMessages } from "../../components/input/input.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private poolerService: PoolerService, private router: Router) {
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

  async saveUser(): Promise<void> {
    await this.poolerService.save(this.userNameModel.userName, this.passwordModel.password);
    this.router.navigate(['/search']);
  }

  onUserNameChanged = userName => this.userNameModel.userName = userName;
  onNameStatusChanged = isValid => this.userNameModel.isValid = isValid;

  onPasswordChanged = password => this.passwordModel.password = password;
  onPasswordStatusChanged = isValid => this.passwordModel.isValid = isValid;

  isValid = () => this.userNameModel.isValid && this.passwordModel.isValid;
}
