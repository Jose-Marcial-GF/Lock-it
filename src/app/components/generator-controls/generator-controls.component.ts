import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generator-controls',
  templateUrl: './generator-controls.component.html',
  styleUrls: ['./generator-controls.component.scss'],
})
export class GeneratorControlsComponent {
  @Input() charsLength = 12;
  @Output() charsLengthChange = new EventEmitter<number>();
  @Input() showLock = false;
  @Output() generate = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  onCharsChange(event: Event) {
    const val = +(event.target as HTMLInputElement).value;
    this.charsLength = val;
    this.charsLengthChange.emit(val);
  }
}
