import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class FormComponent {
  newItem: string = '';

  @Output() addItem = new EventEmitter<string>();

  onSubmit() {
    if (this.newItem.trim()) {
      console.log(`Adding item: ${this.newItem}`, `formcompoent`);
      this.addItem.emit(this.newItem);
      this.newItem = '';
    }
  }
}
