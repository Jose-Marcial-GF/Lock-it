import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lock-passwd',
  template: `
    <ion-button fill="clear" class="pin-btn" (click)="toggle.emit()">
      <ion-icon [name]="isPinned ? 'pin' : 'pin-outline'"></ion-icon>
    </ion-button>
  `,
  styles: [`
    .pin-btn { margin: 0; padding: 0; height: 100%; }
    ion-icon { font-size: 24px; }
  `]
})
export class LockPasswdComponent {
  @Input() isPinned: boolean = false;
  @Output() toggle = new EventEmitter<void>();
}
