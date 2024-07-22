import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  uploadedFiles: File[] = [];
  isDragging: boolean = false;

  constructor() { }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    const files: File[] = Array.from(event.dataTransfer!.files);
    if (files.length > 0) {
      this.uploadedFiles.push(...files);
      const statusMessage = `Selected files: ${files.map(file => file.name).join(', ')}`;
      this.announceStatus(statusMessage);
    }
  }

  onFileSelected(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (files.length > 0) {
      this.uploadedFiles.push(...files);
      const statusMessage = `Selected files: ${files.map(file => file.name).join(', ')}`;
      this.announceStatus(statusMessage);
    }
  }

  announceStatus(message: string) {
    const statusElement = document.createElement('div');
    statusElement.setAttribute('role', 'status');
    statusElement.style.position = 'absolute';
    statusElement.style.left = '-9999px';
    statusElement.innerText = message;
    document.body.appendChild(statusElement);

    setTimeout(() => {
      document.body.removeChild(statusElement);
    }, 1000);
  }
}
