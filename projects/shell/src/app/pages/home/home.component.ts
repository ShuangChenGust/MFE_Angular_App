import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { TodoService } from '../../../../../shared/src/app/services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-shell-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: string[] = [];
  printer = '';

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    fromEvent(window, 'event').subscribe((event) => {
      console.log('event listening in home', event);
      const customEvent = event as CustomEvent;

      if (customEvent.detail?.newItem) {
        // Ensure newItem is an array or wrap it in an array
        this.items = Array.isArray(customEvent.detail.newItem)
          ? customEvent.detail.newItem
          : [customEvent.detail.newItem];
      }

      this.ngZone.run(() => {
        this.items = Array.isArray(customEvent.detail.newItem)
          ? customEvent.detail.newItem
          : [customEvent.detail.newItem];
        console.log('items', this.items);
      });
      this.cdr.markForCheck();
    });
    this.loadItems();
    // this.todoService.items$.subscribe((items) => {
    //   console.log('receiving items home', items);
    //   this.items = items;
    // });
  }
  loadItems() {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.printer = JSON.parse(storedItems);
    }
  }
}
