import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './pages/home/home.component';
// import { About }

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    loadComponent: () =>
      loadRemoteModule('shell', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      loadRemoteModule('dashboard', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      loadRemoteModule('about', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'todo',
    loadComponent: () =>
      loadRemoteModule('todo', './Component').then((m) => m.AppComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      loadRemoteModule('profile', './Component').then((m) => m.AppComponent),
  },
  // {
  //   path: 'about',
  //   loadChildren: () =>
  //     import('about/Module').then((m) => m.AppModule),
  // },
  //wildcard route
  {
    path: '**',
    component: HomeComponent,
  },
];
