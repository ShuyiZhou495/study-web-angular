import { Component, OnInit, Inject } from '@angular/core';
import { Set } from '../shared/set';
import { SetService } from '../services/set.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../shared/note';
import { Page } from '../shared/page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
    word: string;
    meaning: string;
    comment: string;
    practice: boolean;
    timestamps: string;
    pronounce: string;
    recording: string;
  
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

    openDialog(): void {
      const dialogRef = this.dialog.open(NoteDialog, {
        width: '500px',
        data: {
          word: this.word, 
          set: this.selectedSet.setname, 
          page: this.selectedPage.description,
          meaning: this.meaning,
          comment: this.comment,
          practice: this.practice,
          timestamps: this.timestamps,
          pronounce: this.pronounce,
          recording: this.recording
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.word = result;
      });
    }

    createForm() {
      this.noteForm = this.fb.group({
        word: '',
        meaning: '',
        comment: '',
        practice: true,
        timestamps: '',
        pronounce: '',
        recording: ''
      });
  
      this.noteForm.valueChanges;
  
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
  
    constructor(
      public dialogRef: MatDialogRef<NoteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogNote) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }