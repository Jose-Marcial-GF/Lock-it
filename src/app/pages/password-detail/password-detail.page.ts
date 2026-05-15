import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { PasswordService } from '../../services/password.service';
import { PasswordItem } from '../../models/password.model';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { AuthService } from '../../services/auth.service';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-password-detail',
  templateUrl: './password-detail.page.html',
  styleUrls: ['./password-detail.page.scss'],
})
export class PasswordDetailPage implements OnInit, OnDestroy {
  passwordId!: string;
  passwordItem!: PasswordItem;
  detailForm!: FormGroup;
  charsLength = 12;
  iconUrl = '';
  isPinnedLocal = false;
  readonly isMobile = Capacitor.isNativePlatform();
  private currentUserId = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private passwordService = inject(PasswordService);
  private passGenService = inject(PasswordGeneratorService);
  private authService = inject(AuthService);
  private pinService = inject(PinService);
  private ngZone = inject(NgZone);
  private passwordSub!: Subscription;
  private authSub!: Subscription;

  ngOnInit() {
    this.passwordId = this.route.snapshot.paramMap.get('id') || '';

    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });

    // Capture user ID from observable so it's always available, even on first load
    this.authSub = this.authService.getUserState().subscribe(user => {
      this.currentUserId = user?.uid ?? '';
    });

    this.passwordSub = this.passwordService.getPasswordById(this.passwordId).subscribe(data => {
      if (data) {
        this.passwordItem = data;
        this.iconUrl = data.iconUrl ?? '';
        this.detailForm.patchValue({ name: data.name, value: data.value });

        if (this.isMobile && this.currentUserId) {
          this.pinService.isPinned(this.currentUserId, this.passwordId)
            .then(pinned => this.ngZone.run(() => this.isPinnedLocal = pinned));
        }
      }
    });
  }

  ngOnDestroy() {
    this.passwordSub?.unsubscribe();
    this.authSub?.unsubscribe();
  }

  regeneratePassword() {
    const newPass = this.passGenService.generate(this.charsLength);
    this.detailForm.patchValue({ value: newPass });
  }

  async togglePin() {
    if (!this.isMobile || !this.currentUserId) return;
    const pinned = await this.pinService.togglePin(this.currentUserId, this.passwordId);
    this.ngZone.run(() => this.isPinnedLocal = pinned);
  }

  async saveChanges() {
    if (this.detailForm.valid) {
      await this.passwordService.updatePassword(this.passwordId, {
        name: this.detailForm.value.name,
        value: this.detailForm.value.value,
        iconUrl: this.iconUrl
      });
      await this.router.navigate(['/list']);
    }
  }

  async deletePassword() {
    await this.passwordService.deletePassword(this.passwordId);
    await this.router.navigate(['/list']);
  }
}
