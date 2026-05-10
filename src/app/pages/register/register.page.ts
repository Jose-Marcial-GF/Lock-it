import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

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

  async onRegister() {
    if (this.registerForm.valid) {
      try {
        const { email, password } = this.registerForm.value;
        await this.authService.register(email, password);
        console.log('Usuario creado exitosamente');

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
      console.log('Logueado con Google exitosamente');
    } catch (error) {
      console.error('Error con Google', error);
    }
  }
}
