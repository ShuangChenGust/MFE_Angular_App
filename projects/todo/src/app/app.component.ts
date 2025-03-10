import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../../shared/src/app/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormComponent, CommonModule, RouterModule],
})
export class AppComponent {
  title = 'todo';
  items: string[] = [];

  constructor(private todoService: TodoService) {
    this.todoService.items$.subscribe((items) => {
      this.items = items;
    });
  }

  addItem(newItem: string) {
    console.log(`Received new item: ${newItem}`);
    this.todoService.addItem(newItem);
  }
}
