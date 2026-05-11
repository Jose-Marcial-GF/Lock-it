import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

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
  savedMessage = false;

  private passGenService = inject(PasswordGeneratorService);
  private authService = inject(AuthService);
  private passwordService = inject(PasswordService);
  private router = inject(Router);

  ngOnInit() {
    this.onGenerate();
    this.authService.getUserState().subscribe(user => this.isLoggedIn = !!user);
  }

  onGenerate() {
    const chars = this.lengthControl.value || 12;
    this.generatedPassword = this.passGenService.generate(chars);
  }

  handleSave() {
    if (!this.isLoggedIn) this.router.navigate(['/login']);
    else this.onSave();
  }

  async onSave() {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    await this.passwordService.addPassword({
      userId: user.uid,
      name: this.nameControl.value?.trim() || 'Untitled',
      value: this.generatedPassword
    });

    this.nameControl.setValue('');
    this.onGenerate();
    this.savedMessage = true;
    setTimeout(() => this.savedMessage = false, 3000);
  }
}
