import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogSet{
    setname: string;
    description: string;
    photo: string;
    textbook: string;
    level: string;
    fromLanguage: string;
    toLanguage: string;
  }

  @Component({
    selector: 'app-addset-dialog',
    templateUrl: 'add-set.component.html',
  })
  export class SetDialog {
    setname: string;
    description: string;
    photo: string;
    textbook: string;
    level: string;
    fromLanguage: string;
    toLanguage: string;
    constructor(
      public dialogSetRef: MatDialogRef<SetDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogSet) {}
  
    onNoClick(): void {
      this.dialogSetRef.close();
    }
  
  }