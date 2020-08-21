import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    selector: 'app-addnote-dialog',
    templateUrl: 'add-note.component.html',
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