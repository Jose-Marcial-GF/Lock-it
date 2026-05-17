import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-copy-textarea',
  templateUrl: './copy-textarea.component.html',
  styleUrls: ['./copy-textarea.component.scss'],
})
export class CopyTextareaComponent {
  @Input() textContent: string = '';
  copied = false;

  async copyToClipboard() {
    if (!this.textContent) return;
    try {
      await navigator.clipboard.writeText(this.textContent);
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }
}
