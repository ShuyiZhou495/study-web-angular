import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Set } from '../shared/set';

export interface DialogNoteQuick{
    word: string;
    meaning: string;
    comment: string;
    practice: boolean;
    timestamps: string;
    pronounce: string;
    recording: string;
    set: string;
    page: string;
    sets: Set[];
  }

  @Component({
    selector: 'app-quickadd-dialog',
    templateUrl: 'quick-add.component.html',
  })
  export class QuickNoteDialog {
    word: string;
    meaning: string;
    comment: string;
    practice: boolean;
    pronounce: string;
    recording: string;
    set: string;
    page: string;
    setId: number;
    options: FormGroup;
    SetControl = new FormControl(-1);
    PageControl = new FormControl('');
    pageId: string;
    pageDescription: string;
    setname: string;
    description: string;
    photo: string;
    textbook: string;
    level: string;
    fromLanguage: string;
    toLanguage: string;
    constructor(
      public dialogQARef: MatDialogRef<QuickNoteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogNoteQuick, 
      fb: FormBuilder) {
        this.options = fb.group({
            set: this.SetControl,
            page: this.PageControl
          });
      }
  
    onNoClick(): void {
      this.dialogQARef.close();
    }
  
  }