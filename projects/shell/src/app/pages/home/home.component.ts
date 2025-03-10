import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../../../shared/src/app/services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shell-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: string[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.items$.subscribe((items) => {
      console.log('receiving items home', items);
      this.items = items;
    });
  }
}
