### Step 1: Generate the Form Component

Use Angular CLI to generate a new component named `todo-form`:

```bash
ng generate component todo-form
```

### Step 2: Create the Form Template

Edit the `todo-form.component.html` file to create a form that allows users to input new todo items:

```html
<!-- filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/todo-form/todo-form.component.html -->
<form (ngSubmit)="onSubmit()" #todoForm="ngForm">
  <div>
    <label for="title">Todo Item:</label>
    <input
      type="text"
      id="title"
      required
      [(ngModel)]="todoItem.title"
      name="title"
    />
  </div>
  <button type="submit" [disabled]="!todoForm.form.valid">Add Todo</button>
</form>
```

### Step 3: Create the Component Logic

Edit the `todo-form.component.ts` file to handle form submission and emit the new todo item:

```typescript
// filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/todo-form/todo-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todoItem = { title: '' };

  @Output() addTodo = new EventEmitter<{ title: string }>();

  onSubmit() {
    if (this.todoItem.title) {
      this.addTodo.emit({ title: this.todoItem.title });
      this.todoItem.title = ''; // Clear the input after submission
    }
  }
}
```

### Step 4: Update the Dashboard Component

Assuming you have a dashboard component where you want to display the todo items, you need to handle the new items emitted from the `todo-form` component.

Edit the `dashboard.component.html` to include the `todo-form` component and display the list of todo items:

```html
<!-- filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/dashboard/dashboard.component.html -->
<app-todo-form (addTodo)="onAddTodo($event)"></app-todo-form>

<ul>
  <li *ngFor="let todo of todos">{{ todo.title }}</li>
</ul>
```

### Step 5: Update the Dashboard Component Logic

Edit the `dashboard.component.ts` file to manage the list of todos:

```typescript
// filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/dashboard/dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  todos: { title: string }[] = [];

  onAddTodo(newTodo: { title: string }) {
    this.todos.push(newTodo);
  }
}
```

### Step 6: Update the Module

Ensure that the new `TodoFormComponent` is declared in the appropriate module (e.g., `app.module.ts` or a specific feature module):

```typescript
// filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TodoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 7: Style the Form (Optional)

You can add styles to `todo-form.component.css` to make the form look better:

```css
/* filepath: /Users/shuangchen/Desktop/interview/MFE-Angular/my-workspace/projects/todo/src/app/todo-form/todo-form.component.css */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}
```

### Step 8: Test the Application

Run your Angular application and navigate to the dashboard. You should see the form to add new todo items, and upon submission, the items should appear in the list below.

### Conclusion

You have successfully created a new form component that allows users to add new todo items, which are then displayed on the dashboard. You can further enhance this functionality by adding features like validation, persistence (e.g., saving to local storage or a backend), and more styling.