import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.getUserState().subscribe(user => this.isLoggedIn = !!user);
  }

  async logout() {
    await this.authService.logout();
    window.location.reload();
  }
}
