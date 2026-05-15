import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private authSub!: Subscription;

  ngOnInit() {
    this.authSub = this.authService.getUserState().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/home']);
  }
}
