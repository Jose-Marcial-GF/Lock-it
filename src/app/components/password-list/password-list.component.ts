import { Component, OnInit, OnDestroy } from '@angular/core';
import { PasswordService, PasswordItem } from '../../services/password.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { PasswordService } from '../../services/password.service';
import { PasswordItem } from "../../models/password.model"
@Component({
  selector: 'app-password-list',
  template: `
    <div class="list-container">
      <app-password-preview
        *ngFor="let pwd of passwords"
        [password]="pwd"
        (onPinToggle)="handlePinToggle($event)">
      </app-password-preview>
    </div>
  `,
  styles: [`.list-container { max-width: 800px; margin: 0 auto; padding: 20px; }`]
})
export class PasswordListComponent implements OnInit, OnDestroy {
  passwords: PasswordItem[] = [];
  sub!: Subscription;

  constructor(
    private passwordService: PasswordService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserState().subscribe(user => {
      if (user) {
        this.sub = this.passwordService.getUserPasswords(user.uid).subscribe(data => {
          this.passwords = data;
        });
      }
    });
  }

  handlePinToggle(passwordId: string) {
    const pwd = this.passwords.find(p => p.id === passwordId);
    if (pwd && pwd.id) {
      this.passwordService.togglePin(pwd.id, pwd.isPinned);
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
