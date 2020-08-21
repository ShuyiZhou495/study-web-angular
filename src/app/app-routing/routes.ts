import { Routes, CanActivate } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MyNoteComponent } from '../mynotes/mynotes.component';
import { OnePageComponent } from '../onePage/onepage.component';
import { PageHomeComponent } from '../pageHome/pagehome.component'

export const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'mynote',  component: MyNoteComponent},
  { path: 'oneset/:setId', component: PageHomeComponent},
  { path: 'onepage/:setId/:pageNo', component: OnePageComponent}
];