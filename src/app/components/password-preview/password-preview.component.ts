import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PasswordItem } from '../../services/password.service';

@Component({
  selector: 'app-password-preview',
  templateUrl: './password-preview.component.html',
  styleUrls: ['./password-preview.component.scss'],
})
export class PasswordPreviewComponent {
  @Input() password!: PasswordItem;
  @Output() onPinToggle = new EventEmitter<string>();

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.password.value);
      console.log('Copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar', err);
    }
  }
}
