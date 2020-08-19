import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MyNoteComponent } from '../mynotes/mynotes.component';
import { DialogOverviewExample, DialogOverviewExampleDialog} from '../dialog/dialog-overview-example'

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'mynote',  component: MyNoteComponent},
  { path: '', component: DialogOverviewExample}
];