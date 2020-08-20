import { Component, OnInit, Inject } from '@angular/core';
import { Set } from '../shared/set';
import { SetService } from '../services/set.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../shared/note';
import { Page } from '../shared/page';


@Component({
    selector: 'app-mynote',
    templateUrl: './mynotes.component.html',
    styleUrls: ['../app.component.css', '../bootstrap.min.css'],
    // tslint:disable-next-line:use-host-property-decorator
    // host: {
    //   '[@flyInOut]': 'true',
    //   'style': 'display: block;'
    // }
  })
  export class MyNoteComponent implements OnInit {
  
    sets: Set[];
    setErrMess: String;
    selectedSet: Set;
    selectedPage: Page;
    pageDescription: String;
    noteForm: FormGroup;
    newNote: Note;
    newPage: Page;
  
    constructor(private setservice: SetService,
      @Inject('baseURL') private baseURL, 
      public dialog: MatDialog,
      private fb: FormBuilder) { }
  
    ngOnInit() {
      this.setservice.getSets()
        .subscribe(set=> this.sets = set,
          errmess => this.setErrMess = <any>errmess);
    }

    onSelect(set: Set, page: Page) {
      this.selectedSet = set;
      this.selectedPage = page;
    }

    onSelectSet(set: Set) {
      this.selectedSet = set;
    }

    openPostNoteDialog(): void {
      const dialogRef = this.dialog.open(NoteDialog, {
        width: '500px',
        data: {
          set: this.selectedSet.setname, 
          page: this.selectedPage.description,
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.newNote = result;
        if(result){
        this.setservice.postNote(this.selectedSet._id, this.selectedPage._id, this.newNote).subscribe(()=>{
          console.log('posted');
        })
      }
      });
    }
    openPostPageDialog(): void {
      const dialogPageRef = this.dialog.open(PageDialog, {
        width: '500px',
        data: {
          set: this.selectedSet.setname,
          descripPlaceHolder: 'page ' + this.selectedSet.pages.length.toString()
        }
      });
  
      dialogPageRef.afterClosed().subscribe(result => {
        this.newPage = result;
        
        if(result){
        this.setservice.postNewPage(this.selectedSet._id, this.newPage).subscribe(()=>{
          
          console.log('posted');
          window.location.reload();
        })
      }
      });
    }
  }

  export interface DialogNote{
    word: string;
    meaning: string;
    comment: string;
    practice: boolean;
    timestamps: string;
    pronounce: string;
    recording: string;
    set: string;
    page: string;
  }

  @Component({
    selector: 'app-mynote-dialog',
    templateUrl: 'mynotes-dialog.html',
  })
  export class NoteDialog {
    word: string;
    meaning: string;
    comment: string;
    practice: boolean;
    pronounce: string;
    recording: string;
    set: string;
    page: string;
    constructor(
      public dialogRef: MatDialogRef<NoteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogNote) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }

  export interface DialogPage{
    description: string;
    setid: string;
  }

  @Component({
    selector: 'app-mypage-dialog',
    templateUrl: 'mypage-dialog.html',
  })
  export class PageDialog {
    description: string;
    set: string;
    constructor(
      public dialogPageRef: MatDialogRef<PageDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogPage) {}
  
    onNoClick(): void {
      this.dialogPageRef.close();
    }
  
  }