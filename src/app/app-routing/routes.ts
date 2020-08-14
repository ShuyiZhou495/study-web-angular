import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MyNoteComponent } from '../mynotes/mynotes.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'mynote',  component: MyNoteComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];