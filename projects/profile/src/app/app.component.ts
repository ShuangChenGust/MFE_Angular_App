import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from '../../../shared/src/app/services/todo.service';
import { CommonModule } from '@angular/common';
import { from, fromEvent } from 'rxjs';

@Component({
  selector: 'app-profile-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrected from 'styleUrl' to 'styleUrls'
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'profile';
  items: string[] = [];
  message = '';
  isDarkMode = false;
  constructor(
    private todoService: TodoService,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {}

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(document.documentElement, 'dark-mode');
      this.renderer.addClass(document.body, 'dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
      localStorage.setItem('theme', 'light');
    }
    this.cdRef.detectChanges(); // Ensure Angular updates the UI
  }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      this.renderer.addClass(document.documentElement, 'dark-mode');
      this.renderer.addClass(document.body, 'dark-mode');
    }

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
