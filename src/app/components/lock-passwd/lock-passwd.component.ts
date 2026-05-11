import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-lock-passwd',
  templateUrl: 'lock-passwd.component.html',
  styleUrls: ['lock-passwd.component.scss',]
})

export class LockPasswdComponent {
  @Input() isPinned = false;
  @Output() togglePin = new EventEmitter<void>();
  readonly isMobile = Capacitor.isNativePlatform();
}
