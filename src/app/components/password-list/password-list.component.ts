import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { PasswordService } from '../../services/password.service';
import { AuthService } from '../../services/auth.service';
import { PinService } from '../../services/pin.service';
import { PasswordItem } from '../../models/password.model';

@Component({
  selector: 'app-password-list',
  templateUrl: 'password-list.component.html',
  styleUrls: ['password-list.component.scss'],
})
export class PasswordListComponent implements OnInit, OnDestroy {
  passwords: PasswordItem[] = [];
  error = '';
  readonly isMobile = Capacitor.isNativePlatform();
  private currentUserId = '';
  private sub!: Subscription;

  private passwordService = inject(PasswordService);
  private authService = inject(AuthService);
  private pinService = inject(PinService);

  ngOnInit() {
    this.sub = this.authService.getUserState().pipe(
      switchMap(user => {
        if (!user) { this.currentUserId = ''; return of([]); }
        this.currentUserId = user.uid;
        return this.passwordService.getUserPasswords(user.uid);
      })
    ).subscribe({
      next: passwords => this.applyPins(passwords),
      error: err => this.error = err.code ?? 'Error loading passwords'
    });
  }

  private async applyPins(passwords: PasswordItem[]) {
    if (this.isMobile && this.currentUserId) {
      const pinnedIds = await this.pinService.getPinnedIds(this.currentUserId);
      this.passwords = passwords
        .map(p => ({ ...p, isPinned: pinnedIds.includes(p.id!) }))
        .sort((a, b) => a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1);
    } else {
      this.passwords = passwords;
    }
  }

  async handlePinToggle(passwordId: string) {
    if (!this.isMobile || !this.currentUserId) return;
    const newState = await this.pinService.togglePin(this.currentUserId, passwordId);
    const pwd = this.passwords.find(p => p.id === passwordId);
    if (pwd) {
      pwd.isPinned = newState;
      this.passwords = [...this.passwords]
        .sort((a, b) => a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
