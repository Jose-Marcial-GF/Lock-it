import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { CloudinaryService } from '../../services/cloudinary.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  @Input() iconUrl = '';
  @Output() iconUrlChange = new EventEmitter<string>();

  uploading = false;

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  private cloudinaryService = inject(CloudinaryService);

  triggerUpload() {
    this.imageInput.nativeElement.click();
  }

  async onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    try {
      const url = await this.cloudinaryService.uploadImage(file);
      this.iconUrl = url;
      this.iconUrlChange.emit(url);
    } catch {
      console.error('Error uploading image to Cloudinary');
    } finally {
      this.uploading = false;
    }
  }
}
