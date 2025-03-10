import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class FormComponent {
  newItem: string = '';
  items: string[] = [];
  @Output() addItem = new EventEmitter<string>();

  onSubmit() {
    if (this.newItem.trim()) {
      console.log(`Adding item: ${this.newItem}`, `form compoent`);
      this.addItem.emit(this.newItem);
      this.saveItem(this.newItem);
      // fromEvent(window, 'event').subscribe((event) => {
      //   console.log('eventsending', event);
      // });

      const event = new CustomEvent('event', {
        detail: {
          newItem: 'test stuff',
        },
      });
      fromEvent(window, 'event').subscribe((event) => {
        console.log('eventsending', event);
      });
      dispatchEvent(event);
      window.dispatchEvent(event);
    }
  }

  saveItem(item: string) {
    this.items.push(item);
    console.log(`try save`, this.items);
    const existingItems = JSON.parse(localStorage.getItem('items') || '[]');
    existingItems.push(item);
    localStorage.setItem('items', JSON.stringify(existingItems));
  }
}
