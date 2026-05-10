import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserState().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  // Función para cerrar sesión
  async logout() {
    await this.authService.logout();
    window.location.reload();
  }
}
