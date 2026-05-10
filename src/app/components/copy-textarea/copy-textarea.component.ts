import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-textarea',
  templateUrl: './copy-textarea.component.html',
  styleUrls: ['./copy-textarea.component.scss'],
})
export class CopyTextareaComponent {
  @Input() textContent: string = '';

  async copyToClipboard() {
    if (!this.textContent) return;
    try {
      await navigator.clipboard.writeText(this.textContent);
      console.log('¡Contraseña copiada al portapapeles!');
      // Aquí podrías lanzar un Toast (notificación) de Ionic en el futuro
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }
}
