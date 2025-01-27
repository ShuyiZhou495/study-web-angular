import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyNoteComponent} from './mynotes/mynotes.component';
import { NoteDialog} from './add-note/add-note.component';
import { PageDialog } from './add-page/add-page.component';
import { SetDialog } from './add-set/add-set.component';
import { OnePageComponent } from './onePage/onepage.component';
import { PageHomeComponent } from './pageHome/pagehome.component';
import { QuickNoteDialog } from './quick-add/quick-add.component'

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
    NoteDialog,
    PageDialog,
    OnePageComponent,
    PageHomeComponent,
    SetDialog,
    QuickNoteDialog
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
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatCheckboxModule
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
    NoteDialog,
    PageDialog,
    SetDialog,
    QuickNoteDialog
  ]
})
export class AppModule { }
