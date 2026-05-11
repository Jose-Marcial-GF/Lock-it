import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { PasswordService } from '../../services/password.service';
import { PasswordItem } from '../../models/password.model';
import { PasswordGeneratorService } from '../../services/password-generator.service';
import { CloudinaryService } from '../../services/cloudinary.service';
import { AuthService } from '../../services/auth.service';
import { PinService } from '../../services/pin.service';

@Component({
  selector: 'app-password-detail',
  templateUrl: './password-detail.page.html',
  styleUrls: ['./password-detail.page.scss'],
})
export class PasswordDetailPage implements OnInit {
  passwordId!: string;
  passwordItem!: PasswordItem;
  detailForm!: FormGroup;
  charsLength = 12;
  iconUrl = '';
  uploading = false;
  isPinnedLocal = false;
  readonly isMobile = Capacitor.isNativePlatform();

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private passwordService = inject(PasswordService);
  private passGenService = inject(PasswordGeneratorService);
  private cloudinaryService = inject(CloudinaryService);
  private authService = inject(AuthService);
  private pinService = inject(PinService);

  ngOnInit() {
    this.passwordId = this.route.snapshot.paramMap.get('id') || '';

    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.passwordService.getPasswordById(this.passwordId).subscribe(data => {
      if (data) {
        this.passwordItem = data;
        this.iconUrl = data.iconUrl ?? '';
        this.detailForm.patchValue({ name: data.name, value: data.value });

        if (this.isMobile) {
          const user = this.authService.getCurrentUser();
          if (user) {
            this.pinService.isPinned(user.uid, this.passwordId)
              .then(pinned => this.isPinnedLocal = pinned);
          }
        }
      }
    });
  }

  regeneratePassword() {
    const newPass = this.passGenService.generate(this.charsLength);
    this.detailForm.patchValue({ value: newPass });
  }

  uploadImage() {
    this.imageInput.nativeElement.click();
  }

  async onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    try {
      this.iconUrl = await this.cloudinaryService.uploadImage(file);
    } catch {
      console.error('Error uploading image to Cloudinary');
    } finally {
      this.uploading = false;
    }
  }

  async togglePin() {
    if (!this.isMobile) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;
    this.isPinnedLocal = await this.pinService.togglePin(user.uid, this.passwordId);
  }

  async saveChanges() {
    if (this.detailForm.valid) {
      await this.passwordService.updatePassword(this.passwordId, {
        name: this.detailForm.value.name,
        value: this.detailForm.value.value,
        iconUrl: this.iconUrl
      });
      this.router.navigate(['/list']);
    }
  }

  async deletePassword() {
    await this.passwordService.deletePassword(this.passwordId);
    this.router.navigate(['/list']);
  }
}
