import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-password-pin',
  templateUrl: 'password-pin.component.html',
  styleUrls: ['password-pin.component.scss',]
})

export class PasswordPinComponent {
  @Input() isPinned = false;
  @Input() iconColor?: string;
  @Output() togglePin = new EventEmitter<void>();
  readonly isMobile = Capacitor.isNativePlatform();

  get resolvedColor(): string {
    if (this.iconColor) return this.iconColor;
    return this.isPinned ? 'var(--primary-blue)' : 'var(--secondary-yellow)';
  }
}
