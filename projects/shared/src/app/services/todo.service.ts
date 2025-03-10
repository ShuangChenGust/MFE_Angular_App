import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {
    console.log('TodoService instance created');
  }
  private itemsSubject = new BehaviorSubject<string[]>([]);
  items$ = this.itemsSubject.asObservable();

  addItem(newItem: string) {
    console.log(`Adding item: ${newItem}`, `todoservice`);
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next([...currentItems, newItem]);
  }
}
