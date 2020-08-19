import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyNoteComponent, NoteDialog} from './mynotes/mynotes.component';
import { DialogOverviewExample, DialogOverviewExampleDialog} from './dialog/dialog-overview-example'

import { AppRoutingModule } from './app-routing/app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MyNoteComponent,
    DialogOverviewExample, 
    DialogOverviewExampleDialog,
    NoteDialog
  ],
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    NgbModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    {provide: 'baseURL', useValue: baseURL},
    ProcessHTTPMsgService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExample, 
    DialogOverviewExampleDialog,
    NoteDialog
  ]
})
export class AppModule { }
