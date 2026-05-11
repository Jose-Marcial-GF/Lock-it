import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PasswordItem } from '../../models/password.model';

@Component({
  selector: 'app-password-preview',
  templateUrl: './password-preview.component.html',
  styleUrls: ['./password-preview.component.scss'],
})
export class PasswordPreviewComponent {
  @Input() password!: PasswordItem;
  @Output() pinToggle = new EventEmitter<string>();

  readonly isMobile = Capacitor.isNativePlatform();
  copied = false;

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.password.value);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
