import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from '../../../shared/src/app/services/todo.service';
import { CommonModule } from '@angular/common';
import { from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-profile-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'profile';
  items: string[] = [];
  message = '';
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    console.log('AppComponent initialized');
    this.todoService.items$.subscribe((items) => {
      console.log('receiving items in app component in profile', items);
      this.items = items;
    });

    fromEvent(window, 'event').subscribe((event) => {
      console.log(`event in profile`, event);
      this.message = (event as CustomEvent).detail.newItem;
      console.log(`message in profile`, this.message);
    });
  }
}
