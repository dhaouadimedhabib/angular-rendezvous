import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit  {
 
  resetData = {
    token: '',
    password: ''
  };

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Récupérer le token depuis les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.resetData.token = params['token'];
    });
  }

  onSubmit() {
    this.userService.resetPassword(this.resetData.token, this.resetData.password)
      .subscribe(
        response => {
          console.log('Password reset successful:', response);
          alert('Password reset successful !');
          // Optionnel : rediriger l'utilisateur ou afficher un autre message de succès
        },
        error => {
          console.error('Error resetting password:', error);
          alert('Une erreur est survenue lors de la réinitialisation du mot de passe. Veuillez réessayer.');
          // Optionnel : afficher un message d'erreur plus détaillé
        }
      );
  }
}
