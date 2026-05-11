import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CloudinaryService } from '../../services/cloudinary.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  profilePictureUrl = '';
  uploading = false;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cloudinaryService = inject(CloudinaryService);
  private router = inject(Router);

  ngOnInit() {
    this.registerForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password !== confirmPassword && control.get('confirmPassword')?.dirty) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    try {
      this.profilePictureUrl = await this.cloudinaryService.uploadImage(file);
    } catch {
      console.error('Error al subir la imagen a Cloudinary');
    } finally {
      this.uploading = false;
    }
  }

  async onRegister() {
    if (this.registerForm.valid) {
      try {
        const { email, password } = this.registerForm.value;
        await this.authService.register(email, password);
        if (this.profilePictureUrl) {
          await this.authService.updateUserProfile(this.profilePictureUrl);
        }
        await this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar', error);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  async onGoogleSignIn() {
    try {
      await this.authService.loginWithGoogle();
      await this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error con Google', error);
    }
  }
}
