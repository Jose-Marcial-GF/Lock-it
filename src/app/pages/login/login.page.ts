import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        await this.authService.login(email, password);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  async onGoogleSignIn() {
    try {
      await this.authService.loginWithGoogle();
      console.log('Login con Google exitoso!');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error con Google', error);
    }
  }
}
