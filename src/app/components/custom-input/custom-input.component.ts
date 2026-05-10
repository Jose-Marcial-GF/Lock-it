import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() control!: AbstractControl | null;

  get formControl(): FormControl {
    return this.control as FormControl;
  }
}
