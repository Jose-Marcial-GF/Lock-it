import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
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
  selectedFileName = '';
  uploading = false;
  googleError = '';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private cloudinaryService = inject(CloudinaryService);
  private router = inject(Router);

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
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
    this.selectedFileName = file.name;
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
        const { name, surname, phone, email, password } = this.registerForm.value;
        const user = await this.authService.register(email, password);
        if (this.profilePictureUrl) {
          await this.authService.updateUserProfile(this.profilePictureUrl);
        }
        await this.userService.saveUser({
          uid: user.uid,
          email,
          name,
          surname,
          phone,
          ...(this.profilePictureUrl && { photoURL: this.profilePictureUrl })
        });
        await this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al registrar', error);
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  async onGoogleSignIn() {
    this.googleError = '';
    try {
      await this.authService.loginWithGoogle();
      await this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error con Google', error);
      this.googleError = error?.message ?? 'Error al iniciar sesión con Google.';
    }
  }
}
