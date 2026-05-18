import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { AuthService } from '../../services/auth.service';
import { PasswordService } from '../../services/password.service';

@Component({
  selector: 'app-password-card',
  templateUrl: './password-card.component.html',
  styleUrls: ['./password-card.component.scss'],
})
export class PasswordCardComponent implements OnInit, OnDestroy {
  nameControl = new FormControl('', Validators.required);
  charsLength = 12;
  generatedPassword = '';
  isLoggedIn = false;
  savedMessage = false;

  private passGenService = inject(PasswordGeneratorService);
  private authService = inject(AuthService);
  private passwordService = inject(PasswordService);
  private router = inject(Router);
  private authSub!: Subscription;

  ngOnInit() {
    this.onGenerate();
    this.authSub = this.authService.getUserState().subscribe(user => this.isLoggedIn = !!user);
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  onGenerate() {
    this.generatedPassword = this.passGenService.generate(this.charsLength);
  }

  handleSave() {
    if (!this.isLoggedIn) this.router.navigate(['/login']);
    else if (this.nameControl.invalid) this.nameControl.markAsTouched();
    else this.onSave();
  }

  async onSave() {
    const user = this.authService.getCurrentUser();
    if (!user) { this.router.navigate(['/login']); return; }

    await this.passwordService.addPassword({
      userId: user.uid,
      name: this.nameControl.value!.trim(),
      value: this.generatedPassword
    });

    this.nameControl.setValue('');
    this.onGenerate();
    this.savedMessage = true;
    setTimeout(() => this.savedMessage = false, 3000);
  }
}
