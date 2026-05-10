import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-card',
  templateUrl: './password-card.component.html',
  styleUrls: ['./password-card.component.scss'],
})
export class PasswordCardComponent implements OnInit {

  nameControl = new FormControl('');
  lengthControl = new FormControl(12);
  generatedPassword = '';
  isLoggedIn = false;

  constructor(
    private passGenService: PasswordGeneratorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.onGenerate();
    this.authService.getUserState().subscribe(user => {
      this.isLoggedIn = !!user; // Si hay user es true, si es null es false
    });
  }

  onGenerate() {
    const chars = this.lengthControl.value || 12;
    this.generatedPassword = this.passGenService.generate(chars);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSave() {
    console.log('Guardando contraseña de verdad...');
  }
}
