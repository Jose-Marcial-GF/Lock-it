import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService, PasswordItem } from '../../services/password.service';
import { PasswordGeneratorService } from '../../services/password-generator.service';

@Component({
  selector: 'app-password-detail',
  templateUrl: './password-detail.page.html',
  styleUrls: ['./password-detail.page.scss'],
})
export class PasswordDetailPage implements OnInit {
  passwordId!: string;
  passwordItem!: PasswordItem;
  detailForm!: FormGroup;
  charsLength = 12; // Por defecto

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private passGenService: PasswordGeneratorService // Reutilizamos lógica (DRY)
  ) { }

  ngOnInit() {
    this.passwordId = this.route.snapshot.paramMap.get('id') || '';

    this.detailForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });

    // Cargamos los datos de Firebase
    this.passwordService.getPasswordById(this.passwordId).subscribe(data => {
      if (data) {
        this.passwordItem = data;
        this.detailForm.patchValue({
          name: data.name,
          value: data.value
        });
      }
    });
  }

  // Regenerar la contraseña reutilizando el servicio
  regeneratePassword() {
    const newPass = this.passGenService.generate(this.charsLength);
    this.detailForm.patchValue({ value: newPass });
  }

  togglePin() {
    this.passwordItem.isPinned = !this.passwordItem.isPinned;
    // Guardamos el pin instantáneamente
    this.passwordService.togglePin(this.passwordId, !this.passwordItem.isPinned);
  }

  async saveChanges() {
    if (this.detailForm.valid) {
      await this.passwordService.updatePassword(this.passwordId, {
        name: this.detailForm.value.name,
        value: this.detailForm.value.value,
        isPinned: this.passwordItem.isPinned
      });
      this.router.navigate(['/list']);
    }
  }

  async deletePassword() {
    await this.passwordService.deletePassword(this.passwordId);
    this.router.navigate(['/list']);
  }

  uploadImage() {
    console.log('Botón de imagen pulsado - A implementar con Firebase Storage');
  }
}
